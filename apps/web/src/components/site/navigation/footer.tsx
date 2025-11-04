import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/container";
import { LogoWithTitle } from "@/components/global/logo";
import { SubHeading } from "@/components/site/subheading";
import { SendIcon } from "../icons/bento-icons";
import { InstagramIcon, LinkedInIcon, TwitterIcon } from "../icons/general";

export const Footer = () => {
  const product = [
    {
      title: "Features",
      href: "/features"
    },
    {
      title: "Pricing",
      href: "/pricing"
    },
    {
      title: "AI Models",
      href: "/ai-models"
    },
  ];

  const company = [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Contact",
      href: "/contact",
    },
    {
      title: "FAQs",
      href: "/faq"
    },
    {
      title: "Blog",
      href: "https://devhub.devovia.vercel.app/blog",
    },
    {
      title: "Docs",
      href: "https://devhub.devovia.vercel.app/docs",
    },
    {
      title: "Tutorials",
      href: "https://devhub.devovia.vercel.app/tutorials"
    },
    {
      title: "Help Center",
      href: "/help-center"
    },
  ];

  const legal = [
    {
      title: "Privacy Policy",
      href: "/privacy",
    },
    {
      title: "Terms of Service",
      href: "/terms",
    },
    {
      title: "Cookie Policy",
      href: "/cookies",
    },
    {
      title: "Security",
      href: "/security",
    },
  ];

  return (
    <Container>
      <div className="grid grid-cols-1 px-4 py-20 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
        <div className="mb-6 sm:col-span-2 md:col-span-4 lg:col-span-3">
          <LogoWithTitle />
          <SubHeading as="p" className="mt-4 max-w-lg text-left">
            Manage and simulate agentic workflows
          </SubHeading>
          <Button variant="secondary" className="mt-4 mb-8 lg:mb-0">Start building</Button>
        </div>
        <div className="col-span-1 mb-4 flex flex-col gap-2 md:col-span-1 md:mb-0">
          <p className="text-sm font-medium text-gray-600">Product</p>
          {product.map((item) => (
            <Link
              href={item.href}
              key={item.title}
              className="text-footer-link my-2 text-sm font-medium"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="col-span-1 mb-4 flex flex-col gap-2 md:col-span-1 md:mb-0">
          <p className="text-sm font-medium text-gray-600">Company</p>
          {company.map((item) => (
            <Link
              href={item.href}
              key={item.title}
              className="text-footer-link my-2 text-sm font-medium"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="col-span-1 mb-4 flex flex-col gap-2 md:col-span-1 md:mb-0">
          <p className="text-sm font-medium text-gray-600">Legal</p>
          {legal.map((item) => (
            <Link
              href={item.href}
              key={item.title}
              className="text-footer-link my-2 text-sm font-medium"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="col-span-1 mb-4 flex flex-col items-start md:col-span-1 md:mb-0 lg:col-span-2">
          <p className="text-footer-link text-sm font-medium">Newsletter</p>
          <div className="mt-2 flex w-full items-center rounded-xl border border-gray-300 bg-gray-200 p-1 placeholder-gray-600 dark:border-neutral-700 dark:bg-neutral-800">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-transparent px-2 text-sm outline-none focus:outline-none"
            />
            <Button className="my-0 flex size-8 shrink-0 items-center justify-center rounded-lg px-0 py-0 text-center">
              <SendIcon />
            </Button>
          </div>
          <SubHeading
            as="p"
            className="mt-4 text-left text-sm md:text-sm lg:text-sm"
          >
            Get the latest product news and behind the scenes updates.
          </SubHeading>
        </div>
      </div>
      <div className="my-4 flex flex-col items-center justify-between px-4 pt-8 md:flex-row">
        <p className="text-footer-link text-sm">
          © {new Date().getFullYear()} Devovia, All rights reserved.
        </p>
        <div className="mt-4 flex items-center gap-4 md:mt-0">
          <Link
            href="https://twitter.com"
            className="text-footer-link transition-colors hover:text-gray-900"
          >
            <TwitterIcon className="w-6 h-6" />
          </Link>
          <Link
            href="https://linkedin.com"
            className="text-footer-link transition-colors hover:text-gray-900"
          >
            <LinkedInIcon className="w-6 h-6" />
          </Link>
          <Link
            href="https://instagram.com"
            className="text-footer-link transition-colors hover:text-gray-900"
          >
            <InstagramIcon className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </Container>
  );
};
