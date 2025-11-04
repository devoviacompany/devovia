/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftIcon, Eye, EyeOff } from "lucide-react";
import { FADE_IN_VARIANTS } from "@/utils/constants";
import { toast } from "sonner";
import { baseURL } from "@/services/base-url";
import { loginMutationFn } from "@/services";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Logo } from "@/components/global/logo";
import { GoogleIcon, GitHubIcon } from "../icons/general";

const formSchema = z.object({
  email: z.string().trim().email("Invalid email address").min(1, {
    message: "Workspace name is required",
  }),
  password: z.string().trim().min(1, {
    message: "Password is required",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function LoginForm() {
  const [isEmailOpen, setIsEmailOpen] = useState<boolean>(true);
  const [isEmailLoading, setIsEmailLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const authFrom = searchParams.get("from");

  const handleOAuth = (method: string) => {
    if (method === "google") {
      setIsGoogleLoading(true);
      window.location.href = `${baseURL}/api/v1/auth/google`;
    } else if (method === "github") {
      setIsGitHubLoading(true);
      window.location.href = `${baseURL}/api/v1/auth/github`;
    }
  };

  const { mutateAsync: login, isPending } = useMutation({
    mutationFn: loginMutationFn,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsEmailLoading(true);
    if (isPending) return;
    try {
      // const me = await login(values);
      // await queryClient.invalidateQueries({ queryKey: ["authUser"] });
      // const userId = me?.data?.user?._id;
      toast.success("Welcome back to Devovia.");

      // if (userId) {
      //   // Cross-origin redirect to admin dashboard for this user
      //   window.location.assign(`${process.env.NEXT_PUBLIC_APP_ADMIN_DOMAIN}/${userId}`);
      // } else {
      //   // Fallback if userId is not found
      //   toast.error("Login Failed", {
      //     description: "An error occurred. Please try again.",
      //   });
      //   router.push("/");
      // }
    } catch (err: unknown) {
      const maybeAxios = err as { response?: { data?: { message?: string } } };
      const msg = maybeAxios?.response?.data?.message || "Login failed. Please check your credentials.";
      toast.error("Login Failed", {
        description: msg || "An error occurred. Please try again.",
      });
      setFormError(msg);
    }
  };

  useEffect(() => {
    if (authFrom) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsEmailOpen(false);
    }
  }, [authFrom]);

  return (
    <div className="flex flex-col text-center w-full">
      {/* Login Header */}
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

        <h1 className="text-2xl text-center mt-4">Welcome back to Lunra</h1>

        <p className="text-sm text-muted-foreground mt-2">
          {isEmailOpen
            ? "Choose a method to login"
            : "Enter your credentials below"}
        </p>
      </motion.div>

      {isEmailOpen ? (
        //! Login methods
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
                  <Loader className="w-4 h-4 absolute left-4 animate-spin" />
                ) : (
                  <GitHubIcon className="w-4 h-4" />
                )}
                Continue with GitHub
              </Button>
            </div>

            <div className="text-sm text-muted-foreground mt-2">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="underline underline-offset-4"
              >
                Sign up
              </Link>
            </div>
          </motion.div>
        </div>
      ) : (

        //? Sign in with email
        <div>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="py-8 w-full flex flex-col gap-4"
              >
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
                              className="w-full pr-10"
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

                {formError && (
                  <p className="text-sm text-red-500" role="alert">{formError}</p>
                )}

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

                <div className="text-sm text-muted-foreground mt-2">
                  Need help logging in?{" "}
                  <Link
                    href="/auth/forget-password"
                    className="underline underline-offset-2 hover:text-primary"
                  >
                    Reset your Password
                  </Link>
                </div>
              </form>
            </Form>

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
          </div>
        </div>
      )}
    </div>
  );
}
