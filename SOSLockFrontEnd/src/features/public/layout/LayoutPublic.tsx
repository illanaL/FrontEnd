import React from "react";
import HeaderPublic from "../composent/HeaderPublic";
import FooterPublic from "../composent/FooterPublic";

interface LayoutPublicProps {
  children: React.ReactNode;
}

export default function LayoutPublic({ children }: LayoutPublicProps) {
  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden min-h-screen flex flex-col pb-16 md:pb-0">
      <HeaderPublic />

      <main className="grow">{children}</main>

      <FooterPublic />
    </div>
  );
}
