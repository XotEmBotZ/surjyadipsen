"use server";

import { getPostHogClient } from "@/lib/posthog-server";

export async function sendContactMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("DISCORD_WEBHOOK_URL is not defined");
    return;
  }

  const discordMessage = {
    content: "@everyone",
    embeds: [
      {
        title: "New Transmission Received",
        color: 0, // Black/Primary
        fields: [
          {
            name: "OPERATOR_IDENTITY",
            value: name || "Anonymous",
            inline: true,
          },
          {
            name: "CONTACT_LINK",
            value: email || "No email provided",
            inline: true,
          },
          {
            name: "TRANSMISSION_DATA",
            value: message || "No message content",
          },
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: "FIELD NOTES TECHNICAL LEDGER // SECURE CHANNEL V.04",
        },
      },
    ],
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordMessage),
    });

    if (!response.ok) {
      throw new Error("Failed to send transmission to terminal.");
    }

    const posthog = getPostHogClient();
    posthog.capture({
      distinctId: email,
      event: "contact_form_submitted",
      properties: { name, email },
    });
    await posthog.shutdown();
  } catch (error) {
    console.error("Webhook Error:", error);
  }
}
