"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, LogInIcon } from "lucide-react";

export default function OAuthCallbackPage() {
  // const params = useSearchParams();
  const params = useParams();
  const router = useRouter();

  const status = params?.status;
  const provider = params?.provider?.toString();

  const rawProvider = provider?.split("?")[0];
  const providerName = rawProvider
    ? rawProvider.charAt(0).toUpperCase() + rawProvider.slice(1).toLowerCase()
    : null;

  useEffect(() => {
    if (status === "failure") {
      toast.error(
        `${
          providerName ? `${providerName} login` : "OAuth login"
        } failed. Please try again.`
      );
    }
  }, [status, providerName]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-3xl font-bold">OAuth Login Failed</h1>

        <p className="text-muted-foreground text-sm">
          {providerName
            ? `Something went wrong while logging in with ${providerName}.`
            : "Something went wrong during OAuth login."}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
          <Button
            variant="default"
            onClick={() => router.push("/auth/login")}
            className="flex items-center gap-2"
          >
            <LogInIcon className="w-4 h-4" />
            Back to Login
          </Button>

          <Link href="/" className="w-full sm:w-auto">
            <Button
              type="button"
              variant="ghost"
              className="w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
