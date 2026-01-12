import { Metadata } from "next";

interface MetadataProps {
  title?: string;
  description?: string;
  image?: string | null;
  icons?: Metadata["icons"];
  noIndex?: boolean;
  keywords?: string[];
  author?: string;
  twitterHandle?: string;
  type?: "website";
  locale?: string;
  alternates?: Record<string, string>;
  publishedTime?: string;
  modifiedTime?: string;
}

export const generateMetadata = ({
  title = `${process.env.NEXT_PUBLIC_APP_NAME || "Devovia"} – AI-powered SaaS builder platform`,
  description = "Devovia is an AI-powered SaaS builder platform that empowers developers, software agencies, and freelancers to plan, design, develop, test, and deploy complete AI-powered web applications in a single unified interface.",
  image = "/icons/favicon-32x32.png",
  icons = [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/icons/favicon-32x32.png"
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/icons/favicon-16x16.png"
    }
  ],
  noIndex = false,
  keywords = [
    "Devovia",
    "AI-powered SaaS builder platform",
    "AI-powered web applications",
    "Low-code SaaS builder platform",
    "AI-powered web applications",
  ],
  author = process.env.NEXT_PUBLIC_AUTHOR_NAME || "Devovia Team",
  twitterHandle = "@devovia", // Replace with your real handle
  type = "website",
  locale = "en_US",
  alternates = {},
  publishedTime,
  modifiedTime
}: MetadataProps = {}): Metadata => {
  const metadataBase = new URL(process.env.NEXT_PUBLIC_APP_URL || "https://devovia.vercel.app");
  const imageUrl = image ? new URL(image, metadataBase).toString() : null;

  return {
    metadataBase,
    title: {
      template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME || "Devovia"}`,
      default: title
    },
    description,
    keywords,
    authors: [{ name: author }],
    creator: author,
    publisher: process.env.NEXT_PUBLIC_APP_NAME || "Devovia",
    formatDetection: {
      email: false,
      address: false,
      telephone: false
    },
    icons,

    openGraph: {
      type,
      siteName: process.env.NEXT_PUBLIC_APP_NAME || "Devovia",
      title,
      description,
      ...(imageUrl && {
        images: [{
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title
        }]
      }),
      locale,
      alternateLocale: Object.keys(alternates),
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime })
    },

    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      site: twitterHandle,
      creator: twitterHandle,
      title,
      description,
      ...(imageUrl && { images: [imageUrl] })
    },

    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },

    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION
    }
  };
};
