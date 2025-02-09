"use client";
import React from "react";
import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validate";

const Page = () => (
  <AuthForm
    type={"SIGN_UP"}
    schema={signUpSchema}
    defaultValues={{ fullName: "", email: "", password: "" }}
    onSubmit={() => {}}
  />
);
export default Page;
