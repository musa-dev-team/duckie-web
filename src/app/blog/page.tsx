import type { Metadata } from "next";
import BlogContent from "./blog-content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights and updates on AI, customer support automation, and building technology that helps.",
};

export default function BlogPage() {
  return <BlogContent />;
}
