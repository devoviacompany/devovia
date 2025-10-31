import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Navbar } from "@/components/global/navbar";
import Providers from "@/providers/providers";
import NextTopLoader from "nextjs-toploader";
import { cairo } from "@/utils/constants";
import { generateMetadata } from "@/utils/functions";
import { cn } from "@/lib/utils";

export const metadata = generateMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body
        className={cn(
          "overflow-x-hidden antialiased",
          cairo.variable,
        )}
        suppressHydrationWarning
      >
        <Providers>
          <NextTopLoader showSpinner={false} color="black" />
          <ThemeProvider>
            <Navbar />
            <main className="mx-auto w-full max-w-[1300px] px-4 sm:px-6 lg:px-8 h-auto scroll-smooth">
              {children}
            </main>
            {/* <Footer /> */}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
