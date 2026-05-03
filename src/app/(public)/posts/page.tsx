import { getReader } from "@/lib/reader";
import { Container } from "@/components/layout-components";
import DisplayPosts from "./DisplayPosts";

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

  return (
    <main className="grow pb-32 md:pb-12">
      <Container>
        <DisplayPosts initialPosts={serializedPosts} categories={categories} />
      </Container>
    </main>
  );
}
