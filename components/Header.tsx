import React from 'react'
import Link from "next/link";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";

const Header = () => {
    const pathname = usePathname()
    const links: {name: string, link:string}[] = [ {
        name: "Home",
        link: "/",
    }, {
        name: "Series",
        link: "/series",
    }, {
        name: "Films",
        link: "/films",
    }, {
        name: "New & Popular",
        link: "/new",
    } ]
    return (
        <header className={"flex justify-between"}>
            <div className={"flex gap-3"}>
                <Link href='/' className={'flex flex-row'}>
                    <Image
                        src={"/images/logo.png"}
                        alt={"logo"}
                        width={55}
                        height={55}
                    />
                    <h1 className={"text-2xl font-semibold text-white"}>Strimz</h1>
                </Link>
                <ul className={"flex gap-3 items-center flex-row"}>
                    {links.map((link) => (
                        <li key={link.name}>
                            <Link href={`/${link.link}`} className={cn("text-sm font-nunito-sans font-medium cursor-pointer capitalize", pathname === link.link ? "text-green-600":'text-gray-500')}>
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    )
}
export default Header
