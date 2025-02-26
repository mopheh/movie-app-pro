"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ArrowRightIcon } from "lucide-react";
import { useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";

const Header = () => {
  const { user, isSignedIn } = useUser();
  const { signOut } = useAuth();
  if (isSignedIn) {
    console.log(user);
  }
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
      link: "/movie",
    },
    {
      name: "New & Popular",
      link: "/new",
    },
  ];
  return (
    <header className={"flex justify-between py-2 items-center relative z-50"}>
      <div className={"flex gap-6"}>
        <Link href="/" className={"flex flex-row items-center"}>
          <img src={"/images/logo.png"} alt={"logo"} width={55} height={55} />
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
          {isSignedIn ? (
            <>
              <div
                className={
                  "rounded-full font-bebas-neue text-sm bg-contain w-[40px] h-[40px] text-dark-300 flex items-center justify-center font-light tracking-wide "
                }
                style={{ backgroundImage: `url(${user?.imageUrl})` }}
              />
              <h3 className={"font-nunito-sans  text-white"}>
                {" "}
                {user?.firstName}{" "}
              </h3>
              <img
                src={"/icons/logout.png"}
                alt={"logout"}
                width={22}
                height={22}
                onClick={() => signOut()}
              />
            </>
          ) : (
            <Link
              href="/sign-in"
              className={
                " flex items-center gap-2 text-xs font-poppins rounded-full text-center px-5 py-2  text-white bg-black bg-opacity-30 hover:bg-dark-100"
              }
            >
              Log in <ArrowRightIcon />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
