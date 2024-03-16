"use client";

import React, { use, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdMenu , IoIosClose} from "react-icons/io";
import { useRouter } from "next/navigation";
import ThemeChanger from "@/components/ThemeChanger";
import { useCurrentWidth } from "@/utils/hooks/useCurrentWidth";
import Hamburger from 'hamburger-react'


const links = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Mint", path: "/mint" },
  { id: 3, name: "Profile", path: "/profile" },
  { id: 4, name: "About", path: "/about" },
  { id: 5, name: "Connect", path: "/connect" },
];

export default function NavbarExpandable() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const width = useCurrentWidth();

    const click = target => (e) => { // <-- consume target
        setTimeout(() => {
          router.push(target); // <-- navigate after some delta
        }, 200);
      };


      useEffect(() => { 
        if (width >= 768) {
          setIsOpen(false);
        }
      }, [width]);
    
  
    return (
        <>

      <motion.div
        layout
        data-isOpen={isOpen}
        className={`${isOpen ? "rounded-b-[50px] shadow-lg" : "h-[50px] rounded-b-2xl "}  bg-white dark:bg-gray-800 w-full flex justify-between mx-auto overflow-hidden fixed  z-40` }
        onClick={() => setIsOpen(!isOpen)}
      >

        {isOpen && ( 
            <motion.ul
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: .3 }}
                className={`w-full h-full flex flex-col justify-center items-center mb-2 mt-[60px]`}
                onClick={() => setIsOpen(!isOpen)} 
            >
                {links.map((link) => (
                <motion.li
                    layout
                    key={link.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={click(link.path)}
                    className={` hover:cursor-pointer w-full p-2 font-light text-center border-b border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white`}

                >
                    {link.name}
                </motion.li>
                ))}
            </motion.ul>
            
        )}
      </motion.div>
      <div className="w-full flex justify-between mx-auto p-4 h-[50px] fixed  z-50">
    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse ">
    <img src="/lnr_icon_color.svg" className="mr-3 h-6 sm:h-9" alt="Linagee Logo" />
        <span className="self-center whitespace-nowrap text-xl font-thin font-semibold text-black dark:text-white">Linagee</span>

    </a>

    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-light flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 ">
        {links.map((link) => (
            <li key={link.id} href={link.path}>{link.name}</li>
        ))}
      </ul>
    </div>
    <div className="flex flex-row gap-x-2 items-center justify-center">
    <ThemeChanger />
    {width < 768 && (<Hamburger size={20} toggled={isOpen} toggle={setIsOpen} className={`block hover:cursor-pointer md:hidden `}/>)}
    {/* <Hamburger size={20} toggled={isOpen} toggle={setIsOpen} className={`block hover:cursor-pointer md:hidden `}/> */}
    {/* {!isOpen && (<IoMdMenu onClick={() => setIsOpen(!isOpen)} size={30} className={`block hover:cursor-pointer md:hidden `}/>)}
    {isOpen && (<IoIosClose onClick={() => setIsOpen(!isOpen)} size={30} className={`block hover:cursor-pointer md:hidden `}/>)}
   */}
  </div>
  </div>
      </>
    );
  }

  