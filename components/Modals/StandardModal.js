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
import { IoIosGift } from "react-icons/io";
import { BsSendFill } from "react-icons/bs";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { RiEdit2Fill } from "react-icons/ri";
import { IoChevronBackCircleOutline } from "react-icons/io5";




export default function StandardModal({isVisible, setIsVisible, name}) {
  const [view, setView] = useState("menu")

    const width = useCurrentWidth();



    const click = target => (e) => { // <-- consume target
        setTimeout(() => {
          router.push(target); // <-- navigate after some delta
        }, 200);
      };

      const toggleVisible =()=>{
        setView("menu")
        setIsVisible(!isVisible)
      }


  
    return (
        <>
        {isVisible && (
            <>
            <div 
            onClick={()=>toggleVisible()}
            
            className="fixed w-[100%] h-[130%] cursor-pointer flex justify-center items-center bg-black opacity-30 z-[998]" 
            />

<motion.div

    className="absolute flex justify-center items-center p-5 z-[999]"
    >
<AnimatePresence>
    {isVisible && (
        <motion.div

            className="fixed w-[90%] md:w-[70%] lg:w-[50%] max-w-[600px] h-[auto] p-5 -mt-5 bg-gray-200 dark:bg-gray-800 rounded-md"
            transition={{ delay: .3 }}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
        >
          <AnimatePresence>
            {view !== "menu" && (
            <IoChevronBackCircleOutline className="w-8 h-8 top-5 left-5 hover:scale-110 hover:text-gray-500 dark:hover:text-gray-300 transition duration-100 ease-in-out rounded-md hover:cursor-pointer" onClick={()=>setView("menu")}/>

            )}
            {view == "menu" && (
              <motion.div
              transition={{ delay: .3 }}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              > 
                <div className="relative ">
                      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              Manage {name.name}
                          </h3>
                      </div>
                      <div className="p-4 md:p-5">
                          <ul className="my-4 mt-0 space-y-3">
                              <li>
                                  <a onClick={()=>setView("wrapping")} className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white hover:cursor-pointer">
                                      <IoIosGift className="w-4 h-4" />
                                      <span className="flex-1 ms-3 whitespace-nowrap">Wrapping</span>
                                      <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">wrap/unwrap</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                  <BsSendFill className="w-4 h-4" /> 
                                   <span className="flex-1 ms-3 whitespace-nowrap">Transfer</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                  <BsFillPersonVcardFill className="w-4 h-4" />
                                   <span className="flex-1 ms-3 whitespace-nowrap">Resolving</span>
                                  </a>
                              </li>
                              <li>
                                  <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                  <RiEdit2Fill className="w-4 h-4" />
                                  <span className="flex-1 ms-3 whitespace-nowrap">Set Records</span>
                                  </a>
                              </li>
                          </ul>

                      </div>
                </div>
              </motion.div>
            )}
            {view == "wrapping" && (
              <motion.div
              transition={{ delay: .3 }}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              > 
                <Wrap name={name}/>
              </motion.div>
            )}


          </AnimatePresence>
            {/* <Transfer name={name}/> */}

            {/* <Wrap name={name} /> */}

            </motion.div>
    )}
</AnimatePresence>
</motion.div>

</>
        )}
      </>
    );
  }

  