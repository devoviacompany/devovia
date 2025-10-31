"use client";

import { DocSearch } from "@docsearch/react";
import "@docsearch/css";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type AlgoliaProps = {
  appId: string;
  indexName: string;
  apiKey: string;
};

export default function AlgoliaSearch(props: AlgoliaProps) {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    // Safe on client only
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent));
  }, []);

  const openDocSearch = useCallback(() => {
    const btn = document.querySelector<HTMLButtonElement>(".DocSearch-Button");
    btn?.click();
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openDocSearch();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openDocSearch, isMac]);

  return (
    <div className="sm:w-64 w-full flex items-center gap-2">
      {/* Custom trigger (shadcn-styled) */}
      <Button
        type="button"
        variant="outline"
        onClick={openDocSearch}
        className="w-full justify-start h-10 rounded-[10px] border bg-muted/55 hover:bg-background hover:text-foreground text-foreground cursor-pointer"
      >
        <Search className="w-4 h-4 opacity-80 mr-2" />
        <span className="opacity-90">Search</span>
        <span className="mx-2 opacity-40">—</span>
        <span className="ml-auto flex items-center gap-1 text-xs opacity-80">
          <kbd className="px-1.5 py-0.5 rounded-md border bg-background">{isMac ? "Cmd" : "Ctrl"}</kbd>
          <kbd className="px-1.5 py-0.5 rounded-md border bg-background">K</kbd>
        </span>
      </Button>

      {/* Hidden DocSearch (kept mounted so we can open its modal) */}
      <div className="sr-only absolute -left-[9999px]">
        <DocSearch {...props} maxResultsPerGroup={5} placeholder="Search" />
      </div>
    </div>
  );
}
