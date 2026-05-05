import { MetadataRoute } from "next";
import { getReader } from "@/lib/reader";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const reader = await getReader();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const posts = (await reader.collections.posts.all().catch(() => [])) || [];
  const projects =
    (await reader.collections.projects.all().catch(() => [])) || [];

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.entry.lastUpdatedDate
      ? new Date(post.entry.lastUpdatedDate)
      : post.entry.publishedDate
        ? new Date(post.entry.publishedDate)
        : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const projectUrls: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.entry.lastUpdatedDate
      ? new Date(project.entry.lastUpdatedDate)
      : project.entry.dateRange.end
        ? new Date(project.entry.dateRange.end)
        : project.entry.dateRange.start
          ? new Date(project.entry.dateRange.start)
          : new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  return [...staticUrls, ...postUrls, ...projectUrls];
}
