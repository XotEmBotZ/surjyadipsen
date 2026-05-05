import { config, fields, collection, singleton } from "@keystatic/core";
import { componentBlocks } from "./src/components/custom-components";

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
          validation: { isRequired: true },
        }),
        lastUpdatedDate: fields.date({
          label: "Last Updated Date",
          defaultValue: { kind: "today" },
          validation: { isRequired: false },
        }),
        summary: fields.text({
          label: "Summary",
          multiline: true,
          validation: { isRequired: true },
        }),
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
          validation: { isRequired: false },
        }),
        content: fields.markdoc({
          label: "Content",
          options: {
            image: {
              directory: "public/images/posts",
              publicPath: "/images/posts/",
            },
          },
          components: componentBlocks,
        }),
      },
    }),
    testimonials: collection({
      label: "Testimonials",
      slugField: "authorName",
      path: "src/content/testimonials/*",
      format: { data: "yaml" },
      schema: {
        authorName: fields.slug({
          name: {
            label: "Author Name",
            validation: { isRequired: false },
          },
        }),
        authorRole: fields.text({
          label: "Author Role",
          validation: { isRequired: true },
        }),
        publishedDate: fields.date({
          label: "Published Date",
          defaultValue: { kind: "today" },
          validation: { isRequired: true },
        }),
        content: fields.text({
          label: "Testimonial Content",
          multiline: true,
          validation: { isRequired: true },
        }),
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
        summary: fields.text({
          label: "Summary",
          multiline: true,
          validation: { isRequired: true },
        }),
        dateRange: fields.object({
          start: fields.date({
            label: "Start Date",
            validation: { isRequired: true },
          }),
          end: fields.date({
            label: "End Date (Leave blank if ongoing)",
            validation: { isRequired: false },
          }),
        }),
        lastUpdatedDate: fields.date({
          label: "Last Updated Date",
          validation: { isRequired: false },
        }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "Deployed", value: "deployed" },
            { label: "In Development", value: "development" },
            { label: "Archived", value: "archived" },
          ],
          defaultValue: "deployed",
        }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Hardware", value: "hardware" },
            { label: "Software", value: "software" },
            { label: "Neural", value: "neural" },
            { label: "Architecture", value: "Architecture" },
            { label: "Research", value: "research" },
          ],
          defaultValue: "software",
        }),
        duration: fields.text({
          label: "Duration (e.g., 760 HOURS)",
          validation: { isRequired: true },
        }),
        stakeholders: fields.text({
          label: "Stakeholders",
          validation: { isRequired: false },
        }),
        latency: fields.text({
          label: "Latency / Performance Metric",
          validation: { isRequired: false },
        }),
        description: fields.markdoc({
          label: "Detailed Description",
          options: {
            image: {
              directory: "public/images/projects",
              publicPath: "/images/projects/",
            },
          },
          components: componentBlocks,
        }),
        resolution: fields.markdoc({
          label: "Technical Resolution / Outcome",
          components: componentBlocks,
        }),
        techStack: fields.array(fields.text({ label: "Tech" }), {
          label: "Tech Stack",
          itemLabel: (props) => props.value || "New Tech",
          validation: { length: { min: 1 } },
        }),
        repo: fields.url({
          label: "GitHub Repository",
          validation: { isRequired: false },
        }),
        demo: fields.url({
          label: "Live Demo",
          validation: { isRequired: false },
        }),
        images: fields.array(
          fields.image({
            label: "Screenshot",
            directory: "public/images/projects",
            publicPath: "/images/projects/",
            validation: { isRequired: false },
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
        role: fields.text({
          label: "Role",
          validation: { isRequired: true },
        }),
        dateRange: fields.object({
          start: fields.date({
            label: "Start Date",
            validation: { isRequired: true },
          }),
          end: fields.date({
            label: "End Date",
            validation: { isRequired: true },
          }),
        }),
        location: fields.text({
          label: "Location",
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
          validation: { isRequired: true },
        }),
        techStack: fields.array(fields.text({ label: "Tech" }), {
          label: "Tech Stack",
          itemLabel: (props) => props.value || "New Tech",
          validation: { length: { min: 1 } },
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
        bio: fields.text({
          label: "Bio / Summary",
          multiline: true,
          validation: { isRequired: true },
        }),
        skills: fields.array(
          fields.object({
            category: fields.text({
              label: "Category (e.g., Languages)",
              validation: { isRequired: true },
            }),
            items: fields.array(fields.text({ label: "Skill" }), {
              label: "Items",
              itemLabel: (props) => props.value || "New Skill",
              validation: { length: { min: 1 } },
            }),
          }),
          {
            label: "Technical Skills",
            itemLabel: (props) => props.fields.category.value || "New Category",
            validation: { length: { min: 1 } },
          }
        ),
        education: fields.array(
          fields.object({
            institution: fields.text({
              label: "Institution Name",
              validation: { isRequired: true },
            }),
            degree: fields.text({
              label: "Degree / Certificate",
              validation: { isRequired: true },
            }),
            dateRange: fields.object({
              start: fields.date({
                label: "Start Date",
                validation: { isRequired: true },
              }),
              end: fields.date({
                label: "End Date",
                validation: { isRequired: true },
              }),
            }),
            location: fields.text({
              label: "Location",
              validation: { isRequired: true },
            }),
            grade: fields.text({
              label: "Grade / GPA",
              validation: { isRequired: true },
            }),
          }),
          {
            label: "Education",
            slugField: "institution",
            itemLabel: (props) =>
              props.fields.institution.value || "New Education",
            validation: { length: { min: 1 } },
          }
        ),
      },
    }),
    details: singleton({
      label: "Details",
      path: "src/content/details",
      format: { data: "yaml" },
      schema: {
        name: fields.text({
          label: "Full Name",
          validation: { isRequired: true },
        }),
        role: fields.text({
          label: "Professional Role",
          validation: { isRequired: true },
        }),
        email: fields.text({
          label: "Email Address",
          validation: { isRequired: true },
        }),
        location: fields.text({
          label: "Location",
          validation: { isRequired: true },
        }),
        picture: fields.image({
          label: "Picture",
          directory: "public/images/details",
          publicPath: "/images/details/",
          validation: { isRequired: true },
        }),
        resume: fields.file({
          label: "Resume (PDF)",
          directory: "public/assets",
          publicPath: "/assets/",
          validation: { isRequired: true },
        }),
      },
    }),
    settings: singleton({
      label: "Settings",
      path: "src/content/settings",
      format: { data: "yaml" },
      schema: {
        siteName: fields.text({
          label: "Site Name",
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: "Site Description (SEO)",
          multiline: true,
          validation: { isRequired: true },
        }),
        ogImage: fields.image({
          label: "Social Share Image (OG Image)",
          directory: "public/images/settings",
          publicPath: "/images/settings/",
          validation: { isRequired: true },
        }),
        socialLinks: fields.array(
          fields.object({
            platform: fields.text({
              label: "Platform Name",
              validation: { isRequired: true },
            }),
            url: fields.url({
              label: "URL",
              validation: { isRequired: true },
            }),
          }),
          {
            label: "Additional Social Links",
            itemLabel: (props) => props.fields.platform.value || "New Link",
            validation: { length: { min: 1 } },
          }
        ),
        copyright: fields.text({
          label: "Copyright Text",
          validation: { isRequired: true },
        }),
      },
    }),
  },
});
