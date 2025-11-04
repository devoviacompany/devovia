"use client";
import { useState } from "react";
import { LogoWithTitle } from "@/components/global/logo";
import { Container } from "@/components/site/container";
import { Button } from "@/components/ui/button";
import { CloseIcon, HamburgerIcon } from "@/components/site/icons/general";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import ThemeToggle from "@/components/global/theme-toggle";
import Link from "next/link";
import Menu from "./menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Box,
  CalendarClock,
  Captions,
  CircleHelp,
  CopyCheck,
  FileText,
  Layers3,
  LineChart,
  Newspaper,
  UserCog,
  Waypoints,
} from "lucide-react";

export const Navbar = () => {
  return (
    <Container as="nav" className="">
      <FloatingNav />
      <DesktopNav />
      <MobileNav />
    </Container>
  );
};

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative flex items-center justify-between p-2 md:hidden">
      <LogoWithTitle />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="shadow-aceternity flex size-6 flex-col items-center justify-center rounded-md"
        aria-label="Toggle menu"
      >
        <HamburgerIcon className="size-4 shrink-0 text-gray-600" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] h-full w-full bg-white shadow-lg dark:bg-neutral-900"
          >
            <div className="absolute right-4 bottom-4">
              <ThemeToggle />
            </div>

            <div className="flex items-center justify-between p-2">
              <LogoWithTitle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="shadow-aceternity flex size-6 flex-col items-center justify-center rounded-md"
                aria-label="Toggle menu"
              >
                <CloseIcon className="size-4 shrink-0 text-gray-600" />
              </button>
            </div>
            <div className="divide-divide border-divide mt-6 flex flex-col divide-y border-t">
              <ul className="flex flex-col items-start flex-1 w-full space-y-3">

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-transparent">
                    <AccordionTrigger className="px-4 py-2 text-lg hover:text-muted-foreground font-normal">
                      <span className="flex items-center">
                        <CopyCheck className="w-4 h-4 mr-2" />
                        Features
                      </span>
                    </AccordionTrigger>
                    <AccordionContent
                      onClick={() => setIsOpen(false)}
                      className="flex flex-col items-start gap-1 mt-1"
                    >
                      <li className="w-full px-4 py-2 text-lg font-normal transition transform rounded-md cursor-pointer text-foreground/80 hover:text-muted-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80">
                        <Link
                          href="/"
                          className="flex items-center w-full text-start"
                        >
                          <Captions className="w-4 h-4 mr-2" />
                          Caption Generation
                        </Link>
                      </li>
                      <li className="w-full px-4 py-2 text-lg font-normal transition transform rounded-md cursor-pointer text-foreground/80 hover:text-muted-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80">
                        <Link
                          href="/"
                          className="flex items-center w-full text-start"
                        >
                          <CalendarClock className="w-4 h-4 mr-2" />
                          Post Scheduling
                        </Link>
                      </li>
                      <li className="w-full px-4 py-2 text-lg font-normal transition transform rounded-md cursor-pointer text-foreground/80 hover:text-muted-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80">
                        <Link
                          href="/"
                          className="flex items-center w-full text-start"
                        >
                          <LineChart className="w-4 h-4 mr-2" />
                          Analytics Dashboard
                        </Link>
                      </li>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <li
                  onClick={() => setIsOpen(false)}
                  className="w-full px-4 py-2 text-lg hover:text-muted-foreground font-normal transition transform rounded-md cursor-pointer text-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
                >
                  <Link
                    href="/docs"
                    className="flex items-center w-full text-start"
                  >
                    <UserCog className="w-4 h-4 mr-2" />
                    AI Models
                  </Link>
                </li>

                <li
                  onClick={() => setIsOpen(false)}
                  className="w-full px-4 py-2 text-lg hover:text-muted-foreground font-normal transition transform rounded-md cursor-pointer text-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
                >
                  <Link
                    href="/docs"
                    className="flex items-center w-full text-start"
                  >
                    <UserCog className="w-4 h-4 mr-2" />
                    Abouts
                  </Link>
                </li>

                <li
                  onClick={() => setIsOpen(false)}
                  className="w-full px-4 py-2 text-lg hover:text-muted-foreground font-normal transition transform rounded-md cursor-pointer text-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80"
                >
                  <Link href="/" className="flex items-center w-full text-start">
                    <Waypoints className="w-4 h-4 mr-2" />
                    Pricing
                  </Link>
                </li>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-transparent">
                    <AccordionTrigger className="px-4 py-2 text-lg hover:text-muted-foreground font-normal">
                      <span className="flex items-center">
                        <Layers3 className="w-4 h-4 mr-2" />
                        Resources
                      </span>
                    </AccordionTrigger>
                    <AccordionContent
                      onClick={() => setIsOpen(false)}
                      className="flex flex-col items-start gap-1 mt-1"
                    >
                      <li className="w-full px-4 py-2 text-lg font-normal transition transform rounded-md cursor-pointer text-foreground/80 hover:text-muted-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80">
                        <Link
                          href="https://devhub.devovia.vercel.app/blog"
                          className="flex items-center w-full text-start"
                        >
                          <Newspaper className="w-4 h-4 mr-2" />
                          Blog
                        </Link>
                      </li>
                      <li className="w-full px-4 py-2 text-lg font-normal transition transform rounded-md cursor-pointer text-foreground/80 hover:text-muted-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80">
                        <Link
                          href="/"
                          className="flex items-center w-full text-start"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Case Studies
                        </Link>
                      </li>
                      <li className="w-full px-4 py-2 text-lg font-normal transition transform rounded-md cursor-pointer text-foreground/80 hover:text-muted-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80">
                        <Link
                          href="/"
                          className="flex items-center w-full text-start"
                        >
                          <Box className="w-4 h-4 mr-2" />
                          Tools
                        </Link>
                      </li>
                      <li className="w-full px-4 py-2 text-lg font-normal transition transform rounded-md cursor-pointer text-foreground/80 hover:text-muted-foreground text-start active:scale-95 hover:bg-muted/20 active:opacity-80">
                        <Link
                          href="/help-center"
                          className="flex items-center w-full text-start"
                        >
                          <CircleHelp className="w-4 h-4 mr-2" />
                          Support
                        </Link>
                      </li>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

              </ul>
              <div className="mt-4 p-4">
                <Button
                  className="w-full"
                  variant="ghost"
                >
                  <Link href="/sign-in">
                    Login
                  </Link>
                </Button>
                <Button
                  onClick={() => setIsOpen(false)}
                  className="w-full"
                >
                  <Link href="/sign-up">
                    Start building
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DesktopNav = () => {
  return (
    <div className="hidden items-center justify-between px-4 py-4 md:flex">
      <LogoWithTitle />
      <div className="flex items-center gap-10">
        <Menu />
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button
          className="w-full"
          variant="ghost"
        >
          <Link href="/sign-in">
            Login
          </Link>
        </Button>
        <Button>
          <Link href="/sign-up">
            Start building
          </Link>
        </Button>
      </div>
    </div>
  );
};

const FloatingNav = () => {
  const { scrollY } = useScroll();
  const springConfig = {
    stiffness: 300,
    damping: 30,
  };
  const y = useSpring(
    useTransform(scrollY, [100, 120], [-100, 10]),
    springConfig,
  );
  return (
    <motion.div
      style={{ y }}
      className="shadow-aceternity fixed inset-x-0 top-0 z-50 mx-auto hidden max-w-[calc(80rem-4rem)] items-center justify-between bg-white/80 px-2 py-2 backdrop-blur-sm md:flex xl:rounded-2xl dark:bg-neutral-900/80 dark:shadow-[0px_2px_0px_0px_var(--color-neutral-800),0px_-2px_0px_0px_var(--color-neutral-800)]"
    >
      <LogoWithTitle />
      <div className="flex items-center gap-10">
        <Menu />
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button
          className="w-full"
          variant="ghost"
        >
          <Link href="/sign-in">
            Login
          </Link>
        </Button>
        <Button>
          <Link href="/sign-up">
            <span>Start building</span>
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};
