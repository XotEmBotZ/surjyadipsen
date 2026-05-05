import { getReader } from "@/lib/reader";
import config from "@/../keystatic.config";
import DisplayProject from "./DisplayProjects";
import { getItemListSchema, getBreadcrumbSchema } from "@/lib/seo";
import { JSONLD } from "@/components/json-ld";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const reader = await getReader();
  const settings = await reader.singletons.settings.read();
  const ogImage = settings?.ogImage ? [{ url: settings.ogImage }] : [];

  return {
    title: "Project | Projects",
    description:
      "Archive of technical operations, scalable systems, and AI-driven automation projects.",
    alternates: {
      canonical: "/projects",
    },
    openGraph: {
      title: "Project | Projects",
      description:
        "Archive of technical operations, scalable systems, and AI-driven automation projects.",
      url: "/projects",
      images: ogImage,
    },
    twitter: {
      title: "Project | Projects",
      description:
        "Archive of technical operations, scalable systems, and AI-driven automation projects.",
      images: ogImage,
    },
  };
}

export default async function ProjectsPage() {
  const reader = await getReader();
  const projects = await reader.collections.projects.all();
  const categories = config.collections.projects.schema.category.options;

  // Sanitize projects by removing Markdoc functions which cannot be serialized
  const serializedProjects = projects.map((p) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { description, resolution, ...entry } = p.entry;
    return {
      ...p,
      entry,
    };
  });

  const itemListSchema = getItemListSchema(
    serializedProjects.map((project, index) => ({
      url: `/projects/${project.slug}`,
      position: index + 1,
    }))
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Projects", item: "/projects" },
  ]);

  return (
    <>
      <JSONLD data={[itemListSchema, breadcrumbSchema]} />
      <DisplayProject categories={categories} projects={serializedProjects} />
    </>
  );
}
