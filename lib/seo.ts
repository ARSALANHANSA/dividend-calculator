import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "./site-config";

// Static image in app/opengraph-image.png.
const ogImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Dividend Calculator: estimate dividend income, DRIP growth, and yield on cost",
};

type PageMetaOptions = {
  title: string;
  description: string;
  path: string;
  /** Use the title as-is instead of appending the site name. */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  absoluteTitle,
  type = "website",
  noIndex,
}: PageMetaOptions): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      // Page-level openGraph replaces the inherited one, so restate the image.
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [ogImage.url],
    },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export const publisherJsonLd = {
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
};
