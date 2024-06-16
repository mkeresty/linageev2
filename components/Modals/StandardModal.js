"use client";

import React, { use, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import ThemeChanger from "@/components/ThemeChanger";
import { useCurrentWidth } from "@/utils/hooks/useCurrentWidth";
import Hamburger from 'hamburger-react'
// import { useWeb3Modal } from '@web3modal/ethers5/react'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { FaWallet, FaUser  } from "react-icons/fa";
//import { useWeb3ModalAccount } from '@web3modal/ethers5/react'
import Transfer from "@/components/Modals/SubModals/Transfer"
import Wrap from "@/components/Modals/SubModals/Wrap"

import { useAccount } from 'wagmi'


export default function StandardModal({isVisible, setIsVisible, name}) {

    const width = useCurrentWidth();



    const click = target => (e) => { // <-- consume target
        setTimeout(() => {
          router.push(target); // <-- navigate after some delta
        }, 200);
      };


  
    return (
        <>
        {isVisible && (
            <>
            <div 
            onClick={()=>setIsVisible(!isVisible)}
            
            className="fixed w-[100%] h-[130%] cursor-pointer flex justify-center items-center bg-black opacity-30 z-[998]" 
            />

<motion.div

    className="absolute flex justify-center items-center p-5 z-[999]"
    >
<AnimatePresence>
    {isVisible && (
        <motion.div

            className="fixed w-[90%] md:w-[70%] lg:w-[50%] max-w-[600px] h-[auto] p-5 bg-gray-200 dark:bg-gray-800 rounded-md"
            transition={{ delay: .3 }}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
        >
            {/* <Transfer name={name}/> */}

            <Wrap name={name} />
            </motion.div>
    )}
</AnimatePresence>
</motion.div>

</>
        )}
      </>
    );
  }

  