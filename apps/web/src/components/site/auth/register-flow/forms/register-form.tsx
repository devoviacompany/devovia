/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftIcon, Eye, EyeOff } from "lucide-react";
import { FADE_IN_VARIANTS } from "@/utils/constants";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { baseURL } from "@/services/base-url";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { registerMutationFn } from "@/services";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Logo } from "@/components/global/logo";
import { GitHubIcon, GoogleIcon } from "@/components/site/icons/general";
import { cn } from "@/utils/functions";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Name is required",
  }),
  email: z.string().trim().email("Invalid email address").min(1, {
    message: "Email is required",
  }),
  password: z.string().trim().min(1, {
    message: "Password is required",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function RegisterForm({
  onSuccess,
}: React.ComponentProps<'form'> & { onSuccess?: (data: { email: string; name?: string }) => void }) {
  const [isEmailOpen, setIsEmailOpen] = useState<boolean>(true);
  const [isEmailLoading, setIsEmailLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = sessionStorage.getItem('verifyEmail');
      if (email) {
        onSuccess?.({ email });
      }
    }
  }, [onSuccess]);

  const handleOAuth = (method: string) => {
    if (method === "google") {
      setIsGoogleLoading(true);
      window.location.href = `${baseURL}/api/v1/auth/google`;
    } else if (method === "github") {
      setIsGitHubLoading(true);
      window.location.href = `${baseURL}/api/v1/auth/github`;
    }
  };

  const { mutateAsync: register, isPending } = useMutation({
    mutationFn: registerMutationFn,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsEmailLoading(true);
    setError(null);
    if (isPending) return;
    try {
      // await register({ name: values.name, email: values.email, password: values.password });
      toast.success(
        "Registration successful! Please check your email to verify your account.",
      );
      // keep email and name for next steps
      if (typeof window !== "undefined") {
        sessionStorage.setItem("verifyEmail", values.email);
        sessionStorage.setItem("registerName", values.name);
      }
      onSuccess?.({ email: values.email, name: values.name });
    } catch (err: unknown) {
      const maybeAxios = err as { response?: { data?: { message?: string } } };
      const msg = maybeAxios?.response?.data?.message || "Registration failed";
      toast.error("Registration Failed", {
        description: msg || "An error occurred. Please try again.",
      });
      setError(msg);
    }
  };

  // Evaluate password strength and unmet requirements
  const evaluatePassword = (p: string) => {
    const checks = {
      length: p.length >= 8,
      lower: /[a-z]/.test(p),
      upper: /[A-Z]/.test(p),
      number: /\d/.test(p),
      symbol: /[^A-Za-z0-9]/.test(p),
    };

    // Count how many requirements are met
    const metCount = Object.values(checks).filter(Boolean).length;

    return {
      score: metCount,
      checks,
      metCount
    };
  };

  // eslint-disable-next-line react-hooks/incompatible-library
  const password = form.watch("password");
  const { score: pwScore, metCount } = evaluatePassword(password);
  const isPasswordStrongEnough = pwScore >= 4; // require at least 4 out of 5 requirements

  // Calculate progress percentage (0-100)
  const progressPercentage = password ? (metCount / 5) * 100 : 0;

  return (
    <div className="flex flex-col text-center w-full">
      {/* Register Header */}
      <motion.div
        variants={FADE_IN_VARIANTS}
        animate="visible"
        initial="hidden"
      >
        <div className="flex justify-center">
          <Link href="/">
            <Logo className="w-8 h-8" />
          </Link>
        </div>

        <h1 className="text-2xl text-center mt-4">Create your account</h1>

        <p className="text-sm text-muted-foreground mt-2">
          Create an account to start using Devovia
        </p>
      </motion.div>

      {isEmailOpen ? (
        //? Sign Up methods
        <div>
          <motion.div
            variants={FADE_IN_VARIANTS}
            animate="visible"
            initial="hidden"
            className="flex flex-col gap-4 py-8"
          >

            <div className="w-full">
              <Button
                size="lg"
                type="button"
                disabled={isGoogleLoading || isGitHubLoading || isEmailLoading}
                onClick={() => setIsEmailOpen(false)}
                variant="default"
                className="w-full"
              >
                Continue with Email
              </Button>
            </div>

            <div className="w-full">
              <Button
                size="lg"
                type="button"
                disabled={isGoogleLoading || isGitHubLoading || isEmailLoading}
                onClick={() => handleOAuth("google")}
                variant="ghost"
                className="w-full"
              >
                {isGoogleLoading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <GoogleIcon className="w-4 h-4" />
                )}
                Continue with Google
              </Button>
            </div>

            <div className="w-full">
              <Button
                size="lg"
                type="button"
                disabled={isGoogleLoading || isGitHubLoading || isEmailLoading}
                onClick={() => handleOAuth("github")}
                variant="ghost"
                className="w-full"
              >
                {isGitHubLoading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <GitHubIcon className="w-4 h-4" />
                )}
                Continue with GitHub
              </Button>
            </div>

            <div className="text-sm text-muted-foreground mt-2">
              Already using Devovia?{" "}
              <Link
                href="/auth/login"
                className="underline underline-offset-4"
              >
                Login
              </Link>
            </div>
          </motion.div>
        </div>
      ) : (
        //! Sign up with email
        <div>
          <div>
            <Form {...form}>
              <form
                className="py-8 w-full flex flex-col gap-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            autoFocus={true}
                            type="name"
                            placeholder="Enter your username"
                            className="w-full"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            autoFocus={true}
                            type="email"
                            placeholder="m@example.com"
                            className="w-full"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              required
                              className={cn("w-full pr-10", !isPasswordStrongEnough && password ? "border-red-500/40" : "")}
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {(() => {
                  const strengthLabels = ["Very weak", "Weak", "Fair", "Good", "Strong"];
                  const strengthColors = [
                    "text-red-500",
                    "text-orange-500",
                    "text-amber-500",
                    "text-lime-500",
                    "text-green-500"
                  ];
                  const barColors = [
                    "bg-red-500",
                    "bg-orange-500",
                    "bg-amber-500",
                    "bg-lime-500",
                    "bg-green-500"
                  ];
                  const strengthIndex = Math.max(0, metCount - 1);
                  return (
                    <div className="space-y-2">
                      <p className={`text-xs ${password ? strengthColors[strengthIndex] : "text-muted-foreground"}`}>
                        Strength: {password ? strengthLabels[strengthIndex] : "Start typing a password"}
                      </p>
                      {password && (
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${barColors[strengthIndex]}`}
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })()}

                {error && <p className="text-sm text-red-500">{error}</p>}

                <div className="w-full">
                  <Button type="submit" disabled={isPending} className="w-full">
                    {isPending ? (
                      <Loader className="mr-2 animate-spin" />
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </div>

                <div className="w-full">
                  <Button
                    type="button"
                    variant="ghost"
                    disabled={isEmailLoading}
                    onClick={() => setIsEmailOpen(true)}
                    className="w-full"
                  >
                    <ArrowLeftIcon className="w-3.5 h-3.5 mr-2" />
                    Back
                  </Button>
                </div>

                {/* Privacy & Terms at the bottom of the form */}
                <div className="w-full flex justify-center items-center">
                  <p className="text-xs text-muted-foreground text-center max-w-md">
                    By using Devovia, you are agreeing to our{" "}
                    <a
                      className="underline underline-offset-2 hover:text-primary"
                      href="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      privacy policy
                    </a>{" "}
                    and{" "}
                    <a
                      className="underline underline-offset-2 hover:text-primary"
                      href="/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      terms of service
                    </a>
                    .
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}
