import type { ReactNode } from "react";
import PageHeader from "./PageHeader";
import { siteConfig } from "@/lib/site-config";

/** Shared shell for About, legal, and policy pages. */
export default function ContentPage({
  title,
  path,
  intro,
  showUpdated = true,
  children,
}: {
  title: string;
  path: string;
  intro?: ReactNode;
  showUpdated?: boolean;
  children: ReactNode;
}) {
  const updated = new Date(`${siteConfig.lastReviewed}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
  return (
    <>
      <PageHeader
        title={title}
        intro={intro}
        crumbs={[
          { name: "Home", path: "/" },
          { name: title, path },
        ]}
        meta={showUpdated ? <>Last updated {updated}</> : undefined}
      />
      <div className="container-page py-10">
        <article className="prose-content">{children}</article>
      </div>
    </>
  );
}

/** Renders the contact address, or an honest note if the owner hasn't configured one. */
export function ContactEmail() {
  const email = siteConfig.contactEmail;
  if (!email) return <>the contact page (an email address will be published there)</>;
  return <a href={`mailto:${email}`}>{email}</a>;
}
