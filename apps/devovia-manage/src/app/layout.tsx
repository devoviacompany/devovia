import "@/style/globals.css";
import { cn, generateMetadata } from "@/utils/functions";
import Providers from "@/providers/providers";
import { ThemeProvider } from "@/providers/theme-provider";
import NextTopLoader from "nextjs-toploader";

export const metadata = generateMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "overflow-x-hidden antialiased",
        )}
      >
        <Providers>
          <NextTopLoader showSpinner={false} color="black" />
          <ThemeProvider>{children}</ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
