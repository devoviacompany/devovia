"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface CopyProps {
  content: string;
}

export default function Copy({ content }: CopyProps) {
  const [isCopied, setIsCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(content);
    setIsCopied(true);
    toast.success("Copied to clipboard", { position: "bottom-right" });

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }

  return (
    <Button
      variant="secondary"
      className="border cursor-pointer"
      size="xs"
      onClick={handleCopy}
      aria-label={isCopied ? "Copied" : "Copy"}
      title={isCopied ? "Copied" : "Copy"}
    >
      {isCopied ? (
        <CheckIcon className="w-3 h-3" />
      ) : (
        <CopyIcon className="w-3 h-3" />
      )}
    </Button>
  );
}
