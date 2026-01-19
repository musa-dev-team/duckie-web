import type { Metadata } from "next";
import IntegrationsContent from "./integrations-content";

export const metadata: Metadata = {
  title: "Integrations",
  description: "Connect Duckie with Slack, Zendesk, Jira, Notion, and 20+ tools your team already uses.",
};

export default function IntegrationsPage() {
  return <IntegrationsContent />;
}
