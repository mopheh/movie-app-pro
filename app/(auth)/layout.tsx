import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className={"auth-container bg-dark-500"}>
      <section className={"auth-form"}>
        <div className={"auth-box"}>
          <div className={"flex flex-row gap-1 w-full"}>{children}</div>
        </div>
      </section>
    </main>
  );
};
export default Layout;
