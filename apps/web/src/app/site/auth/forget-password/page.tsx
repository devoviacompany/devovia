import { Suspense } from "react";
import { ForgetPasswordFlowLayout } from "@/components/site/auth/forget-password/forget-pass-flow-layout";

export default function ForgetPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center size-full">
      <div className="max-w-xs mx-auto size-full flex flex-col items-center mt-[200px]">
        <Suspense>
          <ForgetPasswordFlowLayout />
        </Suspense>
      </div>
    </div>
  );
}
