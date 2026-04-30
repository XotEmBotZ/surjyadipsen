import { getReader } from "@/lib/reader";
import React from "react";
import Markdoc from "@markdoc/markdoc";
import Link from 'next/link';

export async function generateStaticParams() {
  const reader = await getReader();
  const posts = await reader.collections.posts.list();
  return posts.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const reader = await getReader();
  const post = await reader.collections.posts.read(slug);
  
  if (!post) {
    return <div>No Post Found</div>;
  }
  
  const { node } = await post.content();
  const errors = Markdoc.validate(node);
  
  if (errors.length) {
    console.error(errors);
    throw new Error('Invalid content');
  }
  
  const renderable = Markdoc.transform(node);
  
  return (
    <div style={{ padding: '2rem' }}>
      <h1>{post.title}</h1>
      <div className="prose">
        {Markdoc.renderers.react(renderable, React)}
      </div>
      <hr />
      <Link href="/posts">Back to Posts</Link>
    </div>
  );
}
