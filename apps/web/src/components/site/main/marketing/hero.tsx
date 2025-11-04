"use client";
import { Container } from "@/components/site/container";
import { Heading } from "@/components/site/heading";
import { SubHeading } from "@/components/site/subheading";
import { GartnerLogo, GartnerLogoText, Star } from "@/components/site/icons/general";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/site/badge";
import Link from "next/link";
// import { Link } from "react-router-dom"; // Removed for portability

export const Hero = () => {
  return (
    <Container className="border-divide flex flex-col items-center justify-center border-x px-4 pt-10 pb-10 md:pt-32 md:pb-20">
      <Badge text="Build complete apps with AI." />
      <Heading className="mt-4">
        Design, build, and deploy <br /> full stack{" "}
        <span className="text-brand">apps</span>
      </Heading>

      <SubHeading className="mx-auto mt-6 max-w-lg">
        Devovia lets you plan, design, develop, test, and deploy complete web apps frontend, backend, and AI models from one platform.
      </SubHeading>

      <div className="mt-6 flex items-center gap-4">
        <Button>
          <Link href="/sign-up">Start building</Link>
        </Button>
        <Button variant="secondary">
          <Link href="/pricing">View pricing</Link>
        </Button>
      </div>
      <div className="mt-6 flex items-center gap-2">
        <GartnerLogo />
        <div className="-gap-5 flex items-center">
          {[...Array(5)].map((_, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{ duration: 1, delay: index * 0.05 }}
            >
              <Star key={index} />
            </motion.div>
          ))}
        </div>
        <span className="border-l border-gray-500 pl-4 text-[10px] text-gray-600 sm:text-sm">
          Innovative AI solution 2025 by
        </span>
        <GartnerLogoText className="size-12 sm:size-16" />
      </div>
    </Container>
  );
};
