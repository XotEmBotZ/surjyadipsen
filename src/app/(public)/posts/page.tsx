import { getReader } from '@/lib/reader';
import Link from 'next/link';

export default async function Page() {
  const reader = await getReader();
  const posts = await reader.collections.posts.all();
  
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.entry.title}</Link>
          </li>
        ))}
      </ul>
      <hr />
      <Link href="/">Home</Link>
    </div>
  );
}
