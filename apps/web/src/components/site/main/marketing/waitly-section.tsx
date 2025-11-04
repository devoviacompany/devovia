"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import Countdown from "../waitlist/countdown";
import Form from "../waitlist/form";
import People from "../waitlist/people";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\/+^])/g, "\\$1") + "=([^;]*)",
    ),
  );
  return match ? decodeURIComponent(match[1]!) : null;
}

export default function Waitly() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [isSuccess, setIsSuccess] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const joined = getCookie("waitlist_joined");
    if (joined === "1") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSuccess(true);
    }
  }, []);

  const handleSuccessChange = useCallback((success: boolean) => {
    setIsSuccess(success);
    if (success) {
      // Trigger refresh of people component to show new user
      setRefreshKey((prev) => prev + 1);
    }
  }, []);

  return (
    <div className="pt-10 lg:pt-10 min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <div className="flex flex-col items-center justify-center gap-6 mb-6">
        {/* <Logo /> */}
        <div className="flex items-center gap-4 rounded-full border border-border px-4 py-1 relative">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <p className="uppercase text-sm font-medium">available in {year}</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 max-w-2xl">
        <h2 className="text-4xl font-bold text-foreground">
          {isSuccess ? "You're on the waitlist" : "Get early Access"}
        </h2>
        <p className="text-base text-muted-foreground text-center max-w-md">
          {isSuccess
            ? "You've successfully secured your spot.We'll hit you up the moment it's your turn to dive in"
            : "Join the waitlist to get free trial for 3 months + 20% off on our products."}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 w-full max-w-md">
        {!isSuccess && <Form onSuccessChange={handleSuccessChange} />}
      </div>
      <div className="flex items-center justify-center gap-2">
        <People key={refreshKey} />
      </div>
      <Countdown />
    </div>
  );
}
