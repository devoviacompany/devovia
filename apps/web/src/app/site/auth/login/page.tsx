import { LoginForm } from "@/components/site/auth/login-form";
import { Suspense } from "react";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center size-full">
      <div className="max-w-xs mx-auto size-full flex flex-col items-center mt-[200px]">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
