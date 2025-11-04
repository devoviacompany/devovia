"use client";

import ForgetPasswordForm from "@/components/site/auth/forget-password/forms/forget-password-form";
import OtpCodeForm from "@/components/site/auth/forget-password/forms/otp-code-form";
import ChangePasswordForm from "@/components/site/auth/forget-password/forms/change-password-form";
import { useEffect, useState } from "react";

export function ForgetPasswordFlowLayout() {
  // 1 = Forget Password, 2 = OTP Code, 3 = Change Password
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState<string>("");

  // Hydrate email from session storage if it exists (supports refresh without losing context)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = sessionStorage.getItem("resetEmail");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (storedEmail) setEmail(storedEmail);
      const storedStep = sessionStorage.getItem("fpStep");
      // If user had reached OTP previously and refreshes, keep them on OTP
      if (storedStep === "2" && storedEmail) setStep(2);
      // If user had reached Change Password and refreshes, reset to first step for security
      if (storedStep === "3") {
        setStep(1);
        // Optional: we could clear the storedStep to enforce restart
        sessionStorage.removeItem("fpStep");
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("resetEmail", email);
      sessionStorage.setItem("fpStep", step.toString());
    }
  }, [email, step]);

  return (
    <>
      {step === 1 && (
        <ForgetPasswordForm
          onSuccess={({ email: e }) => {
            setEmail(e);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <OtpCodeForm
          email={email}
          onSuccess={() => {
            setStep(3);
          }}
        />
      )}

      {step === 3 && <ChangePasswordForm />}
    </>
  );
}