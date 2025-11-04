/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { FADE_IN_VARIANTS } from "@/utils/constants";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { requestResetPasswordMutationFn } from "@/services";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Logo } from "@/components/global/logo";

const formSchema = z.object({
  email: z.string().trim().email("Invalid email address").min(1, {
    message: "Email is required",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ForgetPasswordForm({
  onSuccess,
}: React.ComponentProps<'form'> & { onSuccess?: (data: { email: string }) => void }) {
  const [isEmailLoading, setIsEmailLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const { mutateAsync: requestReset, isPending } = useMutation({
    mutationFn: requestResetPasswordMutationFn,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsEmailLoading(true);
    if (isPending) return;
    setError(null);
    try {
      // await requestReset({ email: values.email });
      toast.success("A reset code has been sent successfully");
      if (typeof window !== 'undefined') sessionStorage.setItem('resetEmail', values.email);
      onSuccess?.({ email: values.email });
    } catch (err: unknown) {
      const maybeAxios = err as { response?: { data?: { message?: string } } };
      setError(maybeAxios?.response?.data?.message || "Failed to send reset code");
      toast.error("Failed to send reset code", {
        description: maybeAxios?.response?.data?.message || "An error occurred. Please try again.",
      });
    }
    setIsEmailLoading(false);
  };

  return (
    <div className="flex flex-col text-center w-full">
      {/* Request reset password Header */}
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
          Enter your email address to reset your password
        </p>
      </motion.div>

      {/* Request reset password with email */}
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          autoFocus={true}
                          type="email"
                          placeholder="Enter your email address"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>

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
                  onClick={() => router.back()}
                  className="w-full"
                >
                  <ArrowLeftIcon className="w-3.5 h-3.5 mr-2" />
                  Back
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
