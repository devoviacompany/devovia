/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FADE_IN_VARIANTS } from "@/utils/constants";
import { toast } from "sonner";
import { ArrowLeftIcon, Loader } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { verifyEmailMutationFn } from "@/services";
import { Logo } from "@/components/global/logo";
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
  code: z.string().length(6, "Code must be 6 digits"),
});

type FormValues = z.infer<typeof formSchema>;

export default function VerifyEmailForm({
  email,
  onSuccess,
}: React.ComponentProps<'form'> & { email?: string; onSuccess?: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(90); // 1.5 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { code: "" },
    mode: "onChange",
  });

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  // Format countdown to MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Handle resend code
  const handleResend = () => {
    if (canResend) {
      setCountdown(60);
      setCanResend(false);
      // Optional: trigger a resend endpoint if available
    }
  };

  const { mutateAsync: verifyEmail } = useMutation({
    mutationFn: verifyEmailMutationFn
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const email = typeof window !== 'undefined' ? sessionStorage.getItem('verifyEmail') : null;
      if (!email) {
        setError("Missing email in session. Please register again.");
        setIsLoading(false);
        return;
      }
      // await verifyEmail({ email, code: values.code });
      sessionStorage.removeItem("verifyEmail");
      toast.success(
        "Email verified successfully!",
      );
      onSuccess?.();
    } catch (err: unknown) {
      const maybeAxios = err as { response?: { data?: { message?: string } } };
      setError(maybeAxios?.response?.data?.message || "Invalid or expired code");
      toast.error("Email verification failed", {
        description: maybeAxios?.response?.data?.message || "An error occurred. Please try again.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col text-center w-full">
      {/* Header */}
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
        <h1 className="text-2xl text-center mt-4">Verify your email</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Enter the 6-digit code sent to{" "}
          <span className="font-semibold">{email}</span>
        </p>
      </motion.div>
      <div>
        <form
          className="py-8 w-full flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="w-full flex flex-col items-center">
            <InputOTP
              maxLength={6}
              // eslint-disable-next-line react-hooks/incompatible-library
              value={form.watch("code")}
              onChange={(val) => form.setValue("code", val)}
              disabled={isLoading}
            >
              <InputOTPGroup>
                {[...Array(6)].map((_, i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isLoading || form.watch("code").length !== 6}
          >
            {isLoading ? <Loader className="mr-2 animate-spin" /> : "Verify"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            disabled={isLoading}
            onClick={() => router.back()}
            className="w-full"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5 mr-2" />
            Back
          </Button>

          {/* Countdown Timer */}
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">
              {formatTime(countdown)}
            </div>
            <div className="text-sm text-gray-600">
              {canResend ? (
                <span
                  className="text-foreground cursor-pointer"
                  onClick={handleResend}
                >
                  Don&apos;t receive the OTP?{" "}
                  <a href="#" className="underline underline-offset-4 hover:text-primary cursor-pointer">
                    Resend
                  </a>{" "}
                </span>
              ) : (
                <span className="text-gray-600">
                  Don&apos;t receive the OTP? Resend
                </span>
              )}
            </div>
          </div>
        </form>

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
  );
}
