import { RegisterFlowLayout } from "@/components/site/auth/register-flow/register-flow-layout";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center size-full">
      <div className="max-w-xs mx-auto size-full flex flex-col items-center mt-[150px]">
        <Suspense>
          <RegisterFlowLayout />
        </Suspense>
      </div>
    </div>
  );
}
