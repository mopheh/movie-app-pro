"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const links: { name: string; link: string }[] = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Series",
      link: "/series",
    },
    {
      name: "Films",
      link: "/films",
    },
    {
      name: "New & Popular",
      link: "/new",
    },
  ];
  return (
    <header className={"flex justify-between py-2 items-center"}>
      <div className={"flex gap-6"}>
        <Link href="/" className={"flex flex-row items-center"}>
          <Image src={"/images/logo.png"} alt={"logo"} width={55} height={55} />
          <h1 className={"text-2xl font-semibold text-white"}>Strimz</h1>
        </Link>
        <ul className={"flex gap-8 items-center flex-row"}>
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={`${link.link}`}
                className={cn(
                  "text-sm font-poppins font-normal cursor-pointer capitalize",
                  pathname === link.link
                    ? "text-white  font-medium"
                    : "text-gray-300",
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={"flex gap-6 items-center"}>
        <Link
          href={`/showing`}
          className={cn(
            "text-sm font-poppins font-normal cursor-pointer capitalize",
            pathname === "/showing" ? "text-[#10E305]" : "text-gray-300",
          )}
        >
          Showing now
        </Link>
        <div className={"flex gap-3 items-center cursor-pointer"}>
          <div
            className={
              "bg-primary rounded-full font-anton text-sm w-[32px] h-[32px] text-dark-300 flex items-center justify-center font-light tracking-wide"
            }
          >
            AO
          </div>
          <h3 className={"font-nunito-sans  text-white"}>Adejare</h3>
          <Image
            src={"/icons/logout.png"}
            alt={"logout"}
            width={22}
            height={22}
          />
        </div>
      </div>
    </header>
  );
};
export default Header;
