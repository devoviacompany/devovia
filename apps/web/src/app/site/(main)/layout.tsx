import { Footer } from "@/components/site/navigation/footer";
import { Navbar } from "@/components/site/navigation/navbar";
// import { Banner } from "@/components/site/navigation/banner";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function LandingLayout({ children }: Props) {
  return (
    <div>
      {/* <Banner title={"Version 2.0 is now available!"} description={"Read the full release notes"} linkText={"here"} linkUrl={"#"} defaultVisible={true} /> */}
      <Navbar />
      {/* <main className="mx-auto w-full relative">{children}</main> */}
      {children}
      <Footer />
    </div>
  );
}
