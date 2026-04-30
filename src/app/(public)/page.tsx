import { getReader } from "@/lib/reader";

export default async function HomePage() {
  const reader = await getReader();
  const settings = await reader.singletons.settings.read();
  const details = await reader.singletons.details.read();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Welcome to&nbsp;
          <code className="font-bold">{settings?.siteName || "Your Site"}</code>
        </p>
      </div>

      <div className="relative flex place-items-center">
        <h1 className="text-6xl font-bold tracking-tight">
          {details?.name || "Blank Slate"}
        </h1>
      </div>

      <div className="mt-8 text-center">
        <p className="text-xl text-muted-foreground">
          {details?.role || "Ready to build something great."}
        </p>
      </div>
    </main>
  );
}
