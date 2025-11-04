/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftIcon, Eye, EyeOff } from "lucide-react";
import { FADE_IN_VARIANTS } from "@/utils/constants";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { resetPasswordMutationFn } from "@/services";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Logo } from "@/components/global/logo";

const formSchema = z.object({
  password: z.string().trim().min(1, {
    message: "Password is required",
  }),
  confirmPassword: z.string().trim().min(1, {
    message: "Confirm password is required",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ResetPassForm({
  onSuccess,
}: React.ComponentProps<"form"> & { onSuccess?: () => void }) {
  const [isEmailLoading, setIsEmailLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { mutateAsync: resetPassword, isPending } = useMutation({
    mutationFn: resetPasswordMutationFn,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsEmailLoading(true);
    if (isPending) return;
    setError(null);
    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      // await resetPassword({ newPassword: values.password });
      toast.success("Password reset successfully");
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('resetEmail');
      }
      router.push('/auth/login');
      onSuccess?.();
    } catch (err: unknown) {
      const maybeAxios = err as { response?: { data?: { message?: string } } };
      toast.error("Password reset failed", {
        description: maybeAxios?.response?.data?.message || "An error occurred. Please try again.",
      });
      setError(maybeAxios?.response?.data?.message || "Failed to reset password");
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
      {/* Reset password Header */}
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

        <h1 className="text-2xl text-center mt-4">Reset your password</h1>

        <p className="text-sm text-muted-foreground mt-2">
          Enter your new password
        </p>
      </motion.div>
      {/* Reset password form */}
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

              <div className="w-full">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className="w-full pr-10"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
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
                    "Change Password"
                  )}
                </Button>
              </div>
              <div className="w-full">
                <Button
                  type="button"
                  variant="ghost"
                  disabled={isEmailLoading}
                  className="w-full"
                >
                  <ArrowLeftIcon className="w-3.5 h-3.5 mr-2" />
                  Back to sign in
                </Button>
              </div>

              {/* Privacy & Terms at the bottom of the form */}
              <div className="w-full flex justify-center items-center mt-8 mb-2">
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
    </div>
  );
}
