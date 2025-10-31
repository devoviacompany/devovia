import { PropsWithChildren } from "react";

export function Typography({ children }: PropsWithChildren) {
  return (
    <div
      className="
        prose prose-zinc dark:prose-invert
        w-full max-w-[75ch] sm:max-w-[80ch]
        mx-auto pt-2
        prose-headings:scroll-m-20
        prose-code:font-normal prose-code:font-mono
        dark:prose-code:bg-stone-900/25 prose-code:bg-stone-50
        prose-pre:bg-background
        prose-code:text-sm prose-code:leading-6
        dark:prose-code:text-white prose-code:text-stone-800
        prose-code:p-[0.085rem] prose-code:px-1.5 prose-code:rounded-md prose-code:border
        prose-code:before:content-none prose-code:after:content-none
        prose-code:overflow-x-auto
        prose-img:rounded-md prose-img:border prose-img:my-3
        prose-h2:mt-8 prose-h2:mb-4
      "
    >
      {children}
    </div>
  );
}
