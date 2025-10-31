"use client";

import Image from "next/image";
import { cn } from "@/utils/functions";
import { useEffect, useState } from "react";

type LogoProps = {
  className?: string;
};

export const Logo = ({ className }: LogoProps) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkTheme = () => {
        const theme = localStorage.getItem("theme") || "light";
        setIsDark(theme === "dark");
      };

      checkTheme();

      const handleStorageChange = () => {
        checkTheme();
      };

      window.addEventListener("storage", handleStorageChange);

      const intervalId = setInterval(checkTheme, 100);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
        clearInterval(intervalId);
      };
    }
  }, []);

  return (
    <Image
      src="/icons/logo.png"
      alt="Devovia Logo"
      width={100}
      height={24}
      className={cn(className, {
        invert: !isDark,
      })}
      priority
    />
  );
};

export const SmallLogo = ({ className }: LogoProps) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkTheme = () => {
        const theme = localStorage.getItem("theme") || "light";
        setIsDark(theme === "dark");
      };

      checkTheme();

      const handleStorageChange = () => {
        checkTheme();
      };

      window.addEventListener("storage", handleStorageChange);

      const intervalId = setInterval(checkTheme, 100);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
        clearInterval(intervalId);
      };
    }
  }, []);

  return (
    <Image
      src="/logo/logo.png"
      alt="Devovia Logo"
      width={100}
      height={100}
      className={cn(className, {
        invert: !isDark,
      })}
      priority
    />
  );
};

export function LogoWithTitle({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Logo className="h-8 w-8" />
      <span className="font-bold text-lg tracking-tight">Devovia</span>
    </div>
  );
};
