"use client";
import React from "react";
import { SignIn } from "@clerk/clerk-react";

const Page = () => (
  <main
    className={
      "flex h-screen w-full flex-col items-center justify-center gap-10 bg-pattern bg-cover"
    }
  >
    <SignIn />
  </main>
);
export default Page;
