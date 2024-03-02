"use client";

import Link from "next/link";
import React from "react";
import {usePathname} from "next/navigation";

function NavLink({href, exact, children}) {
    const pathname = usePathname();
    const isActive = exact ? pathname === href : pathname?.startsWith(href);
    const linkColor = isActive ? "text-yellow-400" : "text-slate-500 dark:text-slate-300";
    // const backgroundColor = isActive ? "bg-blue-200" : "transparent";

    return (
            <Link href={href} className={`${linkColor} flex items-center`}>
                {children}
            </Link>
    );
}
export default NavLink;