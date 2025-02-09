import React, { ReactNode } from "react";
import Image from "next/image";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className={"auth-container bg-dark-500 "}>
      <section className={"auth-form"}>
        <div className={"auth-box border-gray-950 border-2"}>
            <div className={"flex flex-row  items-center"}>
                <Image
                    src={"/images/logo.png"}
                    alt={"logo"}
                    width={55}
                    height={55}
                />
                <h1 className={"text-2xl font-semibold text-white"}>Strimz</h1>
            </div>
          <div className={"flex flex-row gap-1 w-full"}>{children}</div>
        </div>
      </section>
    </main>
  );
};
export default Layout;
