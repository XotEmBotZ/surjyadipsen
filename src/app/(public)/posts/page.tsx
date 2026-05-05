import { getReader } from "@/lib/reader";
import { Container } from "@/components/layout-components";
import DisplayPosts from "./DisplayPosts";
import { getItemListSchema, getBreadcrumbSchema } from "@/lib/seo";
import { JSONLD } from "@/components/json-ld";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const reader = await getReader();
  const settings = await reader.singletons.settings.read();
  const ogImage = settings?.ogImage ? [{ url: settings.ogImage }] : [];

  return {
    title: "Journal | Posts",
    description:
      "Technical ledger and field notes on software engineering, automation, and AI.",
    alternates: {
      canonical: "/posts",
    },
    openGraph: {
      title: "Journal | Posts",
      description:
        "Technical ledger and field notes on software engineering, automation, and AI.",
      url: "/posts",
      images: ogImage,
    },
    twitter: {
      title: "Journal | Posts",
      description:
        "Technical ledger and field notes on software engineering, automation, and AI.",
      images: ogImage,
    },
  };
}

export default async function PostsPage() {
  const reader = await getReader();
  const posts = await reader.collections.posts.all();

  const categories = Array.from(
    new Set(posts.map((p) => p.entry.category))
  ).filter((cat): cat is NonNullable<typeof cat> => Boolean(cat));

  const serializedPosts = posts.map((post) => ({
    slug: post.slug,
    entry: {
      title: post.entry.title,
      publishedDate: post.entry.publishedDate,
      summary: post.entry.summary,
      category: post.entry.category,
      tags: post.entry.tags,
      image: post.entry.image,
    },
  }));

  const itemListSchema = getItemListSchema(
    serializedPosts.map((post, index) => ({
      url: `/posts/${post.slug}`,
      position: index + 1,
    }))
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Posts", item: "/posts" },
  ]);

  return (
    <main className="grow pb-32 md:pb-12">
      <JSONLD data={[itemListSchema, breadcrumbSchema]} />
      <Container>
        <DisplayPosts initialPosts={serializedPosts} categories={categories} />
      </Container>
    </main>
  );
}
