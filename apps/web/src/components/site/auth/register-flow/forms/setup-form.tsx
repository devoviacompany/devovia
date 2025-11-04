/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FADE_IN_VARIANTS } from "@/utils/constants";
import { toast } from "sonner";
import { ArrowLeftIcon, ArrowRight } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  checkCouponCodeValidMutationFn,
  checkUserNameAvailabilityMutationFn,
  uploadUserProfilePictureMutationFn,
  welcomeUserMutationFn,
  welcomeUserOAuthGoogleMutationFn,
} from "@/services";
import { Logo } from "@/components/global/logo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

const formSchema = z.object({
  userName: z.string().min(2, "Username is required"),
  projectName: z.string().min(2, "Project name is required"),
  projectTemplate: z.enum(["Blank", "SaaS starter", "Admin dashboard"]).optional(),
  familiarity: z.enum(["Advanced", "Proficient", "Beginner"]).optional(),
  hasUseCase: z.enum(["yes", "no"]).optional(),
  useCaseDescription: z.string().max(255).optional(),
  knowAboutUs: z.string().min(2, "How did you hear about us is required"),
  knowAboutUsOther: z.string().optional(),
  couponCode: z.string().optional(),
  avatarFile: z.any().optional(),
  fullName: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const howHeardOptions = [
  "Friend or colleague",
  "Google search",
  "Twitter/X",
  "Instagram",
  "YouTube",
  "Reddit",
  "Blog/Article",
  "Other",
] as const;

export default function SetupForm({ fullName: fullNameProp }: { fullName?: string }) {
  const router = useRouter();
  const [step, setStep] = useState<number>(0); // 0: profile, 1: project, 2: template, 3: familiarity, 4: hasUseCase, 5: description, 6: referral+coupon

  // Common
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutateAsync: welcomeEmail } = useMutation({ mutationFn: welcomeUserMutationFn });
  const { mutateAsync: welcomeOAuth } = useMutation({ mutationFn: welcomeUserOAuthGoogleMutationFn });
  const { mutateAsync: checkUsernameAPI } = useMutation({ mutationFn: checkUserNameAvailabilityMutationFn });
  const { mutateAsync: checkCouponAPI } = useMutation({ mutationFn: checkCouponCodeValidMutationFn });
  const { mutateAsync: uploadAvatarAPI } = useMutation({ mutationFn: uploadUserProfilePictureMutationFn });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      projectName: "",
      projectTemplate: "SaaS starter",
      familiarity: undefined,
      hasUseCase: undefined,
      useCaseDescription: "",
      knowAboutUs: "",
      knowAboutUsOther: "",
      couponCode: "",
      avatarFile: undefined,
      fullName: "",
    },
    mode: "onChange",
  });

  // Local UI state
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [usernameChecking, setUsernameChecking] = useState<boolean>(false);
  const [hasCoupon, setHasCoupon] = useState<boolean>(false);
  const [couponValid, setCouponValid] = useState<boolean | null>(null);
  const [couponChecking, setCouponChecking] = useState<boolean>(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);

  // Hydrate full name for initials fallback (prop > sessionStorage)
  useEffect(() => {
    if (fullNameProp) {
      form.setValue("fullName", fullNameProp);
      if (typeof window !== "undefined") sessionStorage.setItem("registerName", fullNameProp);
      return;
    }
    if (typeof window !== "undefined") {
      const name = sessionStorage.getItem("registerName") || "";
      form.setValue("fullName", name);
    }
  }, [form, fullNameProp]);

  const getInitials = (name: string) => {
    if (!name) return "";
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1]![0] : "";
    return (first + last).toUpperCase();
  };

  // Watch fields
  const username = form.watch("userName");
  const couponCode = form.watch("couponCode");
  const knowAboutUs = form.watch("knowAboutUs");
  const knowAboutUsOther = form.watch("knowAboutUsOther");
  const familiarity = form.watch("familiarity");
  const hasUseCase = form.watch("hasUseCase");
  const useCaseDescription = form.watch("useCaseDescription");

  // Username availability (debounced)
  useEffect(() => {
    let active = true;
    if (!username) {
      setUsernameAvailable(null);
      return;
    }
    setUsernameChecking(true);
    const t = setTimeout(async () => {
      try {
        // const res = await checkUsernameAPI({ username });
        // if (active) setUsernameAvailable(Boolean(res?.data?.available));
        if (active) setUsernameAvailable(true);
      } catch {
        if (active) setUsernameAvailable(null);
      } finally {
        if (active) setUsernameChecking(false);
      }
    }, 400);
    return () => {
      active = false;
      clearTimeout(t);
    };
  }, [username, checkUsernameAPI]);

  // Coupon validation (debounced)
  const emailFromSession = useMemo(() => (typeof window !== "undefined" ? sessionStorage.getItem("verifyEmail") : null), []);
  useEffect(() => {
    let active = true;
    if (!hasCoupon) {
      setCouponValid(null);
      return;
    }
    if (!couponCode || !emailFromSession) {
      setCouponValid(null);
      return;
    }
    setCouponChecking(true);
    const t = setTimeout(async () => {
      try {
        // const res = await checkCouponAPI({ email: emailFromSession!, couponCode });
        // if (active) setCouponValid(Boolean(res?.data?.valid));
        if (active) setCouponValid(true);
      } catch {
        if (active) setCouponValid(false);
      } finally {
        if (active) setCouponChecking(false);
      }
    }, 500);
    return () => {
      active = false;
      clearTimeout(t);
    };
  }, [couponCode, hasCoupon, emailFromSession, checkCouponAPI]);

  const next = async () => {
    setError(null);
    if (step === 0) {
      const ok = await form.trigger(["userName"]);
      if (!ok) return;
      if (usernameAvailable === false) {
        setError("Username is not available");
        return;
      }
      setStep(1);
      return;
    }
    if (step === 1) {
      const ok = await form.trigger(["projectName"]);
      if (!ok) return;
      setStep(2);
      return;
    }
    if (step === 2) {
      setStep(3);
      return;
    }
    if (step === 3) {
      if (!familiarity) {
        setError("Please select your programming familiarity");
        return;
      }
      setStep(4);
      return;
    }
    if (step === 4) {
      if (!hasUseCase) {
        setError("Please tell us if you have a use case in mind");
        return;
      }
      setStep(5);
      return;
    }
    if (step === 5) {
      if (hasUseCase === "yes" && !useCaseDescription?.trim()) {
        setError("Please describe what you are building");
        return;
      }
      setStep(6);
      return;
    }
    if (step === 6) {
      if (knowAboutUs === "Other" && !knowAboutUsOther) {
        setError("Please tell us how you heard about us");
        return;
      }
      if (hasCoupon && couponValid === false) {
        setError("Invalid coupon code");
        return;
      }
      await submitSetup(form.getValues());
    }
  };

  const back = () => {
    setError(null);
    setStep((s) => Math.max(0, s - 1));
  };

  const submitSetup = async (values: FormValues) => {
    try {
      setIsLoading(true);
      setError(null);
      const role = "USER";
      const email = emailFromSession;
      const finalKnow = values.knowAboutUs === "Other" ? (values.knowAboutUsOther || "Other") : values.knowAboutUs;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let me: any;

      if (email) {
        // me = await welcomeEmail({ email, role, username: values.userName, knowAboutUs: finalKnow });
      } else {
        // me = await welcomeOAuth({ role, username: values.userName, knowAboutUs: finalKnow });
      }

      await queryClient.invalidateQueries({ queryKey: ["authUser"] });
      const userId = me?.data?.userId;

      if (userId && avatarFile) {
        try {
          // await uploadAvatarAPI({ userId, profilePicture: avatarFile });
        } catch { }
      }

      toast.success("Setup complete. Redirecting you now...");
      if (userId) {
        const dest = process.env.NEXT_PUBLIC_APP_ADMIN_DOMAIN ? `${process.env.NEXT_PUBLIC_APP_ADMIN_DOMAIN}/${userId}` : "/";
        window.location.assign(dest);
      } else {
        router.push("/");
      }
    } catch (err: unknown) {
      const maybeAxios = err as { response?: { data?: { message?: string } } };
      setError(maybeAxios?.response?.data?.message || "Failed to complete setup");
      toast.error(maybeAxios?.response?.data?.message || "Failed to complete setup");
    } finally {
      setIsLoading(false);
    }
  };

  const totalSteps = 7;
  const displayStep = Math.min(step + 1, totalSteps);
  const remaining = Math.max(0, totalSteps - displayStep);

  return (
    <div className="flex flex-col text-center w-full">

      <div className="py-8 w-full flex flex-col gap-6">
        {/* Steps */}
        {step === 0 && (
          <div className="space-y-6">
            <motion.div variants={FADE_IN_VARIANTS} animate="visible" initial="hidden">
              <div className="flex justify-center">
                <Link href="/">
                  <Logo className="w-8 h-8" />
                </Link>
              </div>
              <h1 className="text-xl text-center mt-4">Set up your Devovia workspace</h1>
              <p className="text-sm text-muted-foreground mt-2">
                Tell us a bit and we&apos;ll prepare your first project.
              </p>
            </motion.div>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted text-xl font-semibold">
              {avatarPreview ? (
                <Image src={avatarPreview} alt="avatar preview" width={80} height={80} className="mt-2 h-20 w-20 rounded-full object-cover" />
              ) : (
                getInitials(form.watch("fullName") || "U S")
              )}
            </div>
            <div className="flex flex-col items-start gap-2">
              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    setAvatarFile(f);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    form.setValue("avatarFile", f as any);
                    const reader = new FileReader();
                    reader.onload = () => setAvatarPreview(reader.result as string);
                    reader.readAsDataURL(f);
                  }
                }}
              />
              <p className="text-xs text-muted-foreground">Optional: upload a profile photo</p>
            </div>

            <div>
              <label className="text-left block text-sm font-medium mb-1">Username</label>
              <Input
                autoFocus
                type="text"
                placeholder="your-handle"
                {...form.register("userName")}
              />
              <div className="mt-1 text-xs">
                {usernameChecking && <span className="text-muted-foreground">Checking availability &hellip;</span>}
                {!usernameChecking && username && usernameAvailable === true && (
                  <span className="text-green-600">Available</span>
                )}
                {!usernameChecking && username && usernameAvailable === false && (
                  <span className="text-red-600">Not available</span>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <motion.div variants={FADE_IN_VARIANTS} animate="visible" initial="hidden">
              <div className="flex justify-center">
                <Link href="/">
                  <Logo className="w-8 h-8" />
                </Link>
              </div>
              <div className="mt-1 text-lg text-center-muted-foreground">
                <h1 className="text-xl text-center mt-4">Set up your Devovia workspace</h1>
                <p className="text-sm text-muted-foreground mt-2">
                  Step {displayStep} of {totalSteps} • {remaining} left
                </p>
              </div>
            </motion.div>
            <p className="text-sm text-muted-foreground text-start">Enter the project name</p>
            <div>
              <label className="text-left block text-sm font-medium mb-1">Project name</label>
              <Input
                type="text"
                placeholder="e.g. My First App"
                {...form.register("projectName")}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <motion.div variants={FADE_IN_VARIANTS} animate="visible" initial="hidden">
              <div className="flex justify-center">
                <Link href="/">
                  <Logo className="w-8 h-8" />
                </Link>
              </div>
              <div className="mt-1 text-lg text-center-muted-foreground">
                <h1 className="text-xl text-center mt-4">Set up your Devovia workspace</h1>
                <p className="text-sm text-muted-foreground mt-2">
                  Step {displayStep} of {totalSteps} • {remaining} left
                </p>
              </div>
            </motion.div>
            <p className="text-sm text-muted-foreground text-start">Choose a starting template</p>
            {(["SaaS starter", "Admin dashboard", "Blank"] as const).map((tpl) => (
              <label key={tpl} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="projectTemplate"
                  value={tpl}
                  checked={form.watch("projectTemplate") === tpl}
                  onChange={() => form.setValue("projectTemplate", tpl)}
                />
                {tpl}
              </label>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <motion.div variants={FADE_IN_VARIANTS} animate="visible" initial="hidden">
              <div className="flex justify-center">
                <Link href="/">
                  <Logo className="w-8 h-8" />
                </Link>
              </div>
              <div className="mt-1 text-lg text-center-muted-foreground">
                <h1 className="text-xl text-center mt-4">Set up your Devovia workspace</h1>
                <p className="text-sm text-muted-foreground mt-2">
                  Step {displayStep} of {totalSteps} • {remaining} left
                </p>
              </div>
            </motion.div>
            <h2 className="text-[17px] font-medium text-start">How familiar are you with programming?</h2>
            <p className="text-sm text-muted-foreground text-start">Your answer here will help us craft the best setup experience</p>
            {(["Advanced", "Proficient", "Beginner"] as const).map((lvl) => (
              <label key={lvl} className="flex items-center gap-2 text-sm rounded-md border p-3">
                <input
                  type="radio"
                  name="familiarity"
                  value={lvl}
                  checked={familiarity === lvl}
                  onChange={() => form.setValue("familiarity", lvl)}
                />
                <span className="font-medium">{lvl}</span>
                {lvl === "Advanced" && <span>, I love building apps</span>}
                {lvl === "Proficient" && <span>, I can hack something together</span>}
                {lvl === "Beginner" && <span>, I&apos;ve never written code before</span>}
              </label>
            ))}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <motion.div variants={FADE_IN_VARIANTS} animate="visible" initial="hidden">
              <div className="flex justify-center">
                <Link href="/">
                  <Logo className="w-8 h-8" />
                </Link>
              </div>
              <div className="mt-1 text-lg text-center-muted-foreground">
                <h1 className="text-xl text-center mt-4">Set up your Devovia workspace</h1>
                <p className="text-sm text-muted-foreground mt-2">
                  Step {displayStep} of {totalSteps} • {remaining} left
                </p>
              </div>
            </motion.div>
            <h2 className="text-lg font-medium text-left">Do you have a use case in mind?</h2>
            {(["yes", "no"] as const).map((ans) => (
              <label key={ans} className="flex items-center gap-2 text-sm rounded-md border p-3">
                <input
                  type="radio"
                  name="hasUseCase"
                  value={ans}
                  checked={hasUseCase === ans}
                  onChange={() => form.setValue("hasUseCase", ans)}
                />
                <span className="font-medium capitalize">{ans === "yes" ? "Yes" : "No"}</span>
                {ans === "yes" ? <span>, I know what I want to build</span> : <span>, just checking this out</span>}
              </label>
            ))}
          </div>
        )}

        {step === 5 && (
          <div className="space-y-2">
            <motion.div variants={FADE_IN_VARIANTS} animate="visible" initial="hidden">
              <div className="flex justify-center">
                <Link href="/">
                  <Logo className="w-8 h-8" />
                </Link>
              </div>
              <div className="mt-1 text-lg text-center-muted-foreground">
                <h1 className="text-xl text-center mt-4">Set up your Devovia workspace</h1>
                <p className="text-sm text-muted-foreground mt-2">
                  Step {displayStep} of {totalSteps} • {remaining} left
                </p>
              </div>
            </motion.div>
            <h2 className="text-lg font-medium text-left">What are you building?</h2>
            <textarea
              className="w-full min-h-[120px] rounded-md border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Tell us a bit about the app you want to build..."
              maxLength={255}
              value={useCaseDescription || ""}
              onChange={(e) => form.setValue("useCaseDescription", e.target.value)}
            />
            <div className="text-right text-xs text-muted-foreground">{(useCaseDescription?.length || 0)}/255</div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-6">
            <motion.div variants={FADE_IN_VARIANTS} animate="visible" initial="hidden">
              <div className="flex justify-center">
                <Link href="/">
                  <Logo className="w-8 h-8" />
                </Link>
              </div>
              <div className="mt-1 text-lg text-center-muted-foreground">
                <h1 className="text-xl text-center mt-4">Set up your Devovia workspace</h1>
                <p className="text-sm text-muted-foreground mt-2">
                  Step {displayStep} of {totalSteps} • {remaining} left
                </p>
              </div>
            </motion.div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">How did you hear about Devovia?</p>
              {howHeardOptions.map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-sm mb-1">
                  <input
                    type="radio"
                    name="knowAboutUs"
                    value={opt}
                    checked={form.watch("knowAboutUs") === opt}
                    onChange={() => form.setValue("knowAboutUs", opt)}
                  />
                  {opt}
                </label>
              ))}
              {knowAboutUs === "Other" && (
                <Input
                  className="mt-2"
                  placeholder="Tell us more"
                  {...form.register("knowAboutUsOther")}
                />
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={hasCoupon} onChange={(e) => setHasCoupon(e.target.checked)} />
                I have a coupon code
              </label>
              {hasCoupon && (
                <div>
                  <Input placeholder="Enter coupon code" {...form.register("couponCode")} />
                  <div className="mt-1 text-xs">
                    {couponChecking && <span className="text-muted-foreground">Validating…</span>}
                    {!couponChecking && couponValid === true && (
                      <span className="text-green-600">Coupon applied</span>
                    )}
                    {!couponChecking && couponValid === false && (
                      <span className="text-red-600">Invalid coupon</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex justify-between pt-2">
          {step > 0 ? (
            <Button type="button" variant="outline" onClick={back} className="cursor-pointer">
              <ArrowLeftIcon className="w-3.5 h-3.5 mr-2" />
              Back
            </Button>
          ) : (
            <span />
          )}
          <Button type="button" onClick={next} disabled={isLoading} className="cursor-pointer">
            {isLoading ? (
              <span>Processing...</span>
            ) : step === 6 ? (
              "Finish Setup"
            ) : (
              "Next"
            )}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
