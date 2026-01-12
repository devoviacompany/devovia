"use client";

import { cn } from "@/utils/functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail, Lock, Shield } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");

    // Fake users map (admin + developer)
    const users = [
      {
        email: "admin@example.com",
        password: "admin123",
        role: "admin" as const,
      },
      {
        email: "dev@example.com",
        password: "dev123",
        role: "developer" as const,
      },
    ];

    const matched = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!matched) {
      setError("Invalid email or password. Use admin@example.com / admin123 or dev@example.com / dev123.");
      return;
    }

    // Store the intended role for the 2FA step
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("pendingRole", matched.role);
    }

    setError(null);
    router.push("/auth/2fa");
  };

  return (
    <Card className="w-full max-w-md mx-auto border-0 shadow-lg bg-white/95 backdrop-blur-sm">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-primary/10">
            <Shield className="w-8 h-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">Admin Portal</CardTitle>
        <CardDescription className="text-gray-600">
          Restricted access. Authorized personnel only.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className={cn("space-y-6", className)}
          {...props}
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@example.com"
                  required
                  className="pl-10 h-12 text-gray-900 border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                  className="pl-10 pr-10 h-12 text-gray-900 border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full h-12 text-base font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Sign in
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
