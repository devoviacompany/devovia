"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  CalendarRangeIcon,
  CircleHelp,
  HashIcon,
  Newspaper,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Logo } from "@/components/global/logo";

interface Props {
  title: string;
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

export default function Menu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-muted-foreground hover:bg-none focus:bg-none">
            Features
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid rounded-3xl gap-3 p-4 md:w-[400px] lg:w-[500px] xl:w-[550px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className="flex flex-col justify-end w-full h-full p-4 no-underline rounded-lg outline-none "
                  >
                    <Logo className="w-6 h-6" />
                    <div className="my-2 text-lg font-normal">Devovia</div>
                    <p className="text-sm text-muted-foreground">
                      Your ultimate project builder tool
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <Item
                title="Content Calendar"
                href="/features"
                icon={<CalendarRangeIcon className="w-5 h-5" />}
              >
                Plan and visualize your content strategy.
              </Item>
              <Item
                title="Hashtag Manager"
                href="/features/hashtag-manager"
                icon={<HashIcon className="w-5 h-5" />}
              >
                Research and track trending hashtags.
              </Item>
              <Item
                title="Real-Time Collaboration"
                href="/features"
                icon={<UsersIcon className="w-5 h-5" />}
              >
                Plan and visualize your project with your team.
              </Item>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/ai-models" className="h-10 px-4 py-2 text-sm font-normal rounded-md text-muted-foreground hover:text-foreground w-max hover:bg-none">
            AI Models
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/about" className="h-10 px-4 py-2 text-sm font-normal rounded-md text-muted-foreground hover:text-foreground w-max hover:bg-none">
            About
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/pricing" className="h-10 px-4 py-2 text-sm font-normal rounded-md text-muted-foreground hover:text-foreground w-max hover:bg-none">
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-muted-foreground hover:text-foreground">
            Resources
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px] xl:w-[500px]">
              <Item
                title="Blog"
                href="https://devhub.devovia.vercel.app/blog"
                icon={<Newspaper className="w-5 h-5" />}
              >
                Read our latest articles and updates.
              </Item>
              <Item
                title="Support"
                href="/help-center"
                icon={<CircleHelp className="w-5 h-5" />}
              >
                Get help with any issues you may have.
              </Item>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const Item = ({ title, href, children, icon, ...props }: Props) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          passHref
          href={href}
          {...props}
          className="grid grid-cols-[.15fr_1fr] select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-muted/50 hover:text-muted-foreground focus:bg-muted/50 focus:text-muted-foreground"
        >
          <div className="flex items-center mt-1 justify-center p-1 w-8 h-8 rounded-md border border-border/80">
            {icon}
          </div>
          <div className="text-start ml-3">
            <span className="text-sm font-normal leading-none">
              {title}
            </span>
            <p className="text-sm mt-0.5 line-clamp-2 text-muted-foreground">
              {children}
            </p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

Item.displayName = "Item";
