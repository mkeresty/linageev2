
'use client';

import Link from 'next/link';
import { Navbar } from 'flowbite-react';
import ThemeChanger from "@/components/ThemeChanger";

function Header() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} href="https://linagee.vision">
        <img src="/lnr_icon_color.svg" className="mr-3 h-6 sm:h-9" alt="Linagee Logo" />
        <span className="self-center whitespace-nowrap text-xl font-thin font-semibold text-black dark:text-white">Linagee</span>

      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} href="/mint">
          Mint
        </Navbar.Link>
        <Navbar.Link href="/profile">Profile</Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Connect</Navbar.Link>
      </Navbar.Collapse>
      <div className={"pr-3 hidden lg:flex"}>
                        <ThemeChanger/>
                    </div>
    </Navbar>
  );
}

export default Header;