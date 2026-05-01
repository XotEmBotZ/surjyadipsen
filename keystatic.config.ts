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
        publishedDate: fields.date({
          label: "Published Date",
          defaultValue: { kind: "today" },
        }),
        summary: fields.text({ label: "Summary", multiline: true }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Software", value: "software" },
            { label: "Hardware", value: "hardware" },
            { label: "Architecture", value: "architecture" },
            { label: "Field Log", value: "log" },
          ],
          defaultValue: "log",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value || "New Tag",
        }),
        image: fields.image({
          label: "Cover Image",
          directory: "public/images/posts",
          publicPath: "/images/posts/",
        }),
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
    testimonials: collection({
      label: "Testimonials",
      slugField: "authorName",
      path: "src/content/testimonials/*",
      format: { data: "yaml" },
      schema: {
        authorName: fields.slug({ name: { label: "Author Name" } }),
        authorRole: fields.text({ label: "Author Role" }),
        publishedDate: fields.date({
          label: "Published Date",
          defaultValue: { kind: "today" },
        }),
        content: fields.text({ label: "Testimonial Content", multiline: true }),
      },
    }),
    projects: collection({
      label: "Projects",
      slugField: "name",
      path: "src/content/projects/*/",
      entryLayout: "content",
      format: { contentField: "description", data: "yaml" },
      schema: {
        name: fields.slug({ name: { label: "Project Name" } }),
        summary: fields.text({ label: "Summary", multiline: true }),
        dateRange: fields.array(fields.date({ label: "Date" }), {
          label: "Date Range",
        }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "Deployed", value: "deployed" },
            { label: "In Development", value: "development" },
            { label: "Archived", value: "archived" },
            { label: "Operational", value: "operational" },
          ],
          defaultValue: "deployed",
        }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Hardware", value: "hardware" },
            { label: "Software", value: "software" },
            { label: "Neural", value: "neural" },
            { label: "Redundancy", value: "redundancy" },
            { label: "Research", value: "research" },
          ],
          defaultValue: "software",
        }),
        duration: fields.text({ label: "Duration (e.g., 760 HOURS)" }),
        stakeholders: fields.text({ label: "Stakeholders" }),
        latency: fields.text({ label: "Latency / Performance Metric" }),
        description: fields.markdoc({
          label: "Detailed Description",
          options: {
            image: {
              directory: "public/images/projects",
              publicPath: "/images/projects/",
            },
          },
        }),
        resolution: fields.markdoc({ label: "Technical Resolution / Outcome" }),
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
          }
        ),
      },
    }),
    experience: collection({
      label: "Experience",
      slugField: "company",
      path: "src/content/experience/*",
      entryLayout: "content",
      schema: {
        company: fields.slug({ name: { label: "Company Name" } }),
        role: fields.text({ label: "Role" }),
        dateRange: fields.array(fields.date({ label: "Date" }), {
          label: "Date Range",
        }),
        location: fields.text({ label: "Location" }),
        description: fields.text({ label: "Description", multiline: true }),
        techStack: fields.array(fields.text({ label: "Tech" }), {
          label: "Tech Stack",
          itemLabel: (props) => props.value || "New Tech",
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
        bio: fields.text({ label: "Bio / Summary", multiline: true }),
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
        location: fields.text({ label: "Location" }),
        picture: fields.image({
          label: "Picture",
          directory: "public/images/details",
          publicPath: "/images/details/",
        }),
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
        description: fields.text({
          label: "Site Description (SEO)",
          multiline: true,
        }),
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
