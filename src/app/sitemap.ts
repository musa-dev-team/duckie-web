import { MetadataRoute } from "next";
import { blogPosts } from "@/config/blog-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: "https://duckie.ai", lastModified: new Date(), priority: 1 },
    { url: "https://duckie.ai/about", lastModified: new Date(), priority: 0.8 },
    {
      url: "https://duckie.ai/integrations",
      lastModified: new Date(),
      priority: 0.8,
    },
    { url: "https://duckie.ai/blog", lastModified: new Date(), priority: 0.7 },
    {
      url: "https://duckie.ai/security",
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: "https://duckie.ai/privacy",
      lastModified: new Date(),
      priority: 0.3,
    },
    { url: "https://duckie.ai/terms", lastModified: new Date(), priority: 0.3 },
  ];

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `https://duckie.ai/blog/${post.slug}`,
    lastModified: new Date(),
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
