"use client";

import Image from "next/image";
import { cn } from "@/utils/functions";
import Link from "next/link";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/icons/logo.png"
      alt="Devovia Logo"
      width={35}
      height={35}
      priority
      className={className}
    />
  );
};

export const SmallLogo = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/logo/logo.png"
      alt="Devovia Logo"
      width={100}
      height={100}
      priority
      className={className}
    />
  );
};

export function LogoWithTitle() {
  return (
    <Link href="/">
      <div className={cn("flex items-center space-x-2")}>
        <Logo />
        <span className="font-bold text-lg tracking-tight">Devovia</span>
      </div>
    </Link>
  );
};
