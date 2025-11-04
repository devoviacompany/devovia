"use client";

import { useEffect, useState } from "react";
import RegisterForm from "@/components/site/auth/register-flow/forms/register-form";
import VerifyEmailForm from "@/components/site/auth/register-flow/forms/verify-email-form";
import SetupForm from "@/components/site/auth/register-flow/forms/setup-form";

export function RegisterFlowLayout() {
  // 1 = Register, 2 = Verify Email, 3 = Welcome
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = sessionStorage.getItem("verifyEmail");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (storedEmail) setEmail(storedEmail);
      const storedStep = sessionStorage.getItem("registerStep");
      if (storedStep === "2") setStep(2);
      if (storedStep === "3") setStep(3);
    }
  }, []);

  return (
    <>
      {step === 1 && (
        <RegisterForm
          onSuccess={({ email: e, name: n }) => {
            setEmail(e);
            setFullName(n!);
            setStep(2);
            if (typeof window !== "undefined") sessionStorage.setItem("registerStep", "2");
          }}
        />
      )}

      {step === 2 && (
        <VerifyEmailForm
          email={email}
          onSuccess={() => {
            setStep(3);
            if (typeof window !== "undefined") sessionStorage.setItem("registerStep", "3");
          }}
        />
      )}

      {step === 3 && (
        <SetupForm fullName={fullName} />
      )}
    </>
  );
}
