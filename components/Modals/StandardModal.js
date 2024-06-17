"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrentWidth } from "@/utils/hooks/useCurrentWidth";
import Transfer from "@/components/Modals/SubModals/Transfer"
import Wrap from "@/components/Modals/SubModals/Wrap"
import Resolve from "@/components/Modals/SubModals/Resolve"
import Record from "@/components/Modals/SubModals/Record"

import { IoIosGift } from "react-icons/io";
import { BsSendFill } from "react-icons/bs";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { RiEdit2Fill } from "react-icons/ri";
import { IoChevronBackCircleOutline } from "react-icons/io5";




export default function StandardModal({isVisible, setIsVisible, name}) {
  const [view, setView] = useState("menu")

  const views = [
                {viewName: "menu", viewTitle: "Menu", viewIcon: undefined, viewMore: undefined},
                {viewName: "wrapping", viewTitle: "Wrapping", viewIcon: <IoIosGift className="w-4 h-4" />, viewMore: "wrap/unwrap"},
                {viewName: "transfer", viewTitle: "Transfer", viewIcon: <BsSendFill className="w-4 h-4" />, viewMore: undefined},
                {viewName: "resolve", viewTitle: "Resolving", viewIcon: <BsFillPersonVcardFill className="w-4 h-4" />, viewMore: undefined},
                {viewName: "record", viewTitle: "Set records", viewIcon: <RiEdit2Fill className="w-4 h-4" />, viewMore: undefined},
                ]

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
<AnimatePresence key={"outer-prez"}>
    {isVisible && (
        <motion.div
            className="fixed w-[90%] md:w-[70%] lg:w-[50%] max-w-[600px] h-[auto] p-5 -mt-5 bg-gray-200 dark:bg-gray-800 rounded-md"
            transition={{ delay: .3 }}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            key={"main"}       
            >
                  {view !== "menu" && (
                  <IoChevronBackCircleOutline className="w-8 h-8 top-5 left-5 hover:scale-110 text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-300 transition duration-100 ease-in-out rounded-md hover:cursor-pointer" onClick={()=>setView("menu")}/>
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
                                    {name.name}
                                </h3>
                            </div>
                            <div className="p-4 md:p-5">
                                <ul className="my-4 mt-0 space-y-3">
                                {views.slice(1).map((item, index) => ( 
                                      <li key={"menu-"+item.viewName}>
                                        <a onClick={()=>setView(item.viewName)} className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white hover:cursor-pointer">
                                            {item.viewIcon}
                                            <span className="flex-1 ms-3 whitespace-nowrap">{item.viewTitle}</span>
                                            {item.viewMore && (<span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">{item.viewMore}</span>)}
                                        </a>
                                    </li>
                                ))}
                                </ul>
                            </div>
                      </div>
                    </motion.div>
                  )}
                  {view == "wrapping" && (<Wrap name={name}/>)}
                  {view == "transfer" && (<Transfer name={name}/>)}
                  {view == "resolve" && (<Resolve name={name}/>)}
                  {view == "record" && (<Record name={name}/>)}


                  </motion.div>
            )}
        </AnimatePresence>
        </motion.div>

        </>
        )}
      </>
    );
  }

  