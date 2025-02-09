import React, { ReactNode } from "react";
import Header from "@/components/Header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="root-container">
      <div
        className={
          "bg-navbar absolute w-full bg-cover bg-no-repeat px-5 xs:px-10 md:px-16 bg-top"
        }
      >
        <div className={"mx-auto  w-full"}>
          <Header />
        </div>
      </div>
      <div>{children}</div>
    </main>
  );
};
export default Layout;
