import type { Metadata } from "next";
import AboutContent from "./about-content";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the team behind Duckie. Learn how we're building AI that doesn't just answer questions—it fixes problems.",
};

export default function AboutPage() {
  return <AboutContent />;
}
