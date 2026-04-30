import { config, fields, collection, singleton } from "@keystatic/core";

export const showAdminUI = process.env.NODE_ENV === "development";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "src/content/posts/*",
      entryLayout: "content",
      format: { contentField: "content", data: "yaml" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        publishedDate: fields.date({ label: "Published Date" }),
        content: fields.markdoc({
          label: "Content",
          options: {
            image: {
              directory: "public/images/posts",
              publicPath: "/images/posts/",
            },
          },
        }),
      },
    }),
  },
  singletons: {
    about: singleton({
      label: "About",
      path: "src/content/about",
      format: { data: "yaml" },
      schema: {
        bio: fields.markdoc({ label: "Bio / Summary" }),
        skills: fields.array(
          fields.object({
            category: fields.text({ label: "Category (e.g., Languages)" }),
            items: fields.array(fields.text({ label: "Skill" }), {
              label: "Items",
              itemLabel: (props) => props.value || "New Skill",
            }),
          }),
          {
            label: "Technical Skills",
            itemLabel: (props) => props.fields.category.value || "New Category",
          }
        ),
        experience: fields.array(
          fields.object({
            company: fields.text({ label: "Company Name" }),
            role: fields.text({ label: "Role" }),
            dateRange: fields.array(fields.date({ label: "Date" }), {
              label: "Date Range",
              itemLabel: (props) => props.value || "Select Date",
            }),
            location: fields.text({ label: "Location" }),
            description: fields.markdoc({ label: "Description" }),
            techStack: fields.array(fields.text({ label: "Tech" }), {
              label: "Tech Stack",
              itemLabel: (props) => props.value || "New Tech",
            }),
          }),
          {
            label: "Professional Experience",
            slugField: "company",
            itemLabel: (props) =>
              `${props.fields.company.value || "New Experience"} - ${props.fields.role.value || ""}`,
          }
        ),
        projects: fields.array(
          fields.object({
            name: fields.text({ label: "Project Name" }),
            dateRange: fields.array(fields.date({ label: "Date" }), {
              label: "Date Range",
              itemLabel: (props) => props.value || "Select Date",
            }),
            description: fields.markdoc({ label: "Description" }),
            techStack: fields.array(fields.text({ label: "Tech" }), {
              label: "Tech Stack",
              itemLabel: (props) => props.value || "New Tech",
            }),
            repo: fields.url({ label: "GitHub Repository" }),
            demo: fields.url({ label: "Live Demo" }),
            images: fields.array(
              fields.image({
                label: "Screenshot",
                directory: "public/images/projects",
                publicPath: "/images/projects/",
              }),
              {
                label: "Project Images",
                itemLabel: (props) => props.value?.filename || "New Image",
              }
            ),
          }),
          {
            label: "Projects",
            slugField: "name",
            itemLabel: (props) => props.fields.name.value || "New Project",
          }
        ),
        education: fields.array(
          fields.object({
            institution: fields.text({ label: "Institution Name" }),
            degree: fields.text({ label: "Degree / Certificate" }),
            dateRange: fields.array(fields.date({ label: "Date" }), {
              label: "Date Range",
              itemLabel: (props) => props.value || "Select Date",
            }),
            location: fields.text({ label: "Location" }),
            grade: fields.text({ label: "Grade / GPA (Optional)" }),
          }),
          {
            label: "Education",
            slugField: "institution",
            itemLabel: (props) =>
              props.fields.institution.value || "New Education",
          }
        ),
      },
    }),
    details: singleton({
      label: "Details",
      path: "src/content/details",
      format: { data: "yaml" },
      schema: {
        name: fields.text({ label: "Full Name" }),
        role: fields.text({ label: "Professional Role" }),
        email: fields.text({ label: "Email Address" }),
        github: fields.url({ label: "GitHub URL" }),
        linkedin: fields.url({ label: "LinkedIn URL" }),
        location: fields.text({ label: "Location" }),
        resume: fields.file({
          label: "Resume (PDF)",
          directory: "public/assets",
          publicPath: "/assets/",
        }),
      },
    }),
    settings: singleton({
      label: "Settings",
      path: "src/content/settings",
      format: { data: "yaml" },
      schema: {
        siteName: fields.text({ label: "Site Name" }),
        description: fields.text({ label: "Site Description (SEO)", multiline: true }),
        ogImage: fields.image({
          label: "Social Share Image (OG Image)",
          directory: "public/images/settings",
          publicPath: "/images/settings/",
        }),
        favicon: fields.image({
          label: "Favicon",
          directory: "public/assets",
          publicPath: "/assets/",
        }),
        socialLinks: fields.array(
          fields.object({
            platform: fields.text({ label: "Platform Name" }),
            url: fields.url({ label: "URL" }),
          }),
          {
            label: "Additional Social Links",
            itemLabel: (props) => props.fields.platform.value || "New Link",
          }
        ),
        copyright: fields.text({ label: "Copyright Text" }),
      },
    }),
  },
});
