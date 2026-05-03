import { getReader } from "@/lib/reader";
import config from "@/../keystatic.config";
import DisplayProject from "./DisplayProjects";
import { getItemListSchema, getBreadcrumbSchema } from "@/lib/seo";
import { JSONLD } from "@/components/json-ld";

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
