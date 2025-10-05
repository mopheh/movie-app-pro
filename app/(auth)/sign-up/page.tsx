"use client"
import React from "react"
import { SignUp } from "@clerk/nextjs"

const Page = () => (
  <main
    className={
      "flex h-screen w-full flex-col items-center justify-center gap-10 bg-pattern bg-cover"
    }
  >
    <SignUp />
  </main>
)
export default Page
