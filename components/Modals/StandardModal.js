"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getCurrentSigner} from "@/utils/etherutils";
import Transfer from "@/components/Modals/SubModals/Transfer"
import Wrap from "@/components/Modals/SubModals/Wrap"
import Resolve from "@/components/Modals/SubModals/Resolve"
import Record from "@/components/Modals/SubModals/Record"

import { IoIosGift } from "react-icons/io";
import { BsSendFill } from "react-icons/bs";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { RiEdit2Fill } from "react-icons/ri";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useWeb3ModalProvider } from '@web3modal/ethers5/react'




export default function StandardModal({isVisible, setIsVisible, name}) {
  const { walletProvider } = useWeb3ModalProvider();

  const [view, setView] = useState("menu")
  const [load, setLoading] = useState(false)
  const [auth, setAuth] = useState("")
  const [isDisabled, setIsDisabled] = useState({"menu": true, "wrapping": true, "transfer": true, "resolve": true, "record": false})

  const views = [
                {viewName: "menu", viewTitle: "Menu", viewIcon: undefined, viewMore: undefined},
                {viewName: "wrapping", viewTitle: "Wrapping", viewIcon: <IoIosGift className="w-4 h-4" />, viewMore: "wrap/unwrap"},
                {viewName: "transfer", viewTitle: "Transfer", viewIcon: <BsSendFill className="w-4 h-4" />, viewMore: undefined},
                {viewName: "resolve", viewTitle: "Resolving", viewIcon: <BsFillPersonVcardFill className="w-4 h-4" />, viewMore: undefined},
                {viewName: "record", viewTitle: "Records", viewIcon: <RiEdit2Fill className="w-4 h-4" />, viewMore: undefined},
                ]

      const toggleVisible =()=>{
        setView("menu")
        setIsVisible(!isVisible)
      }



    const handleViews = async() =>{
      setLoading(true)
      const {address, signer} = await getCurrentSigner(walletProvider)
      let validCheck = name.valid == true ? true : false
      if(address == name.controller && address!== name.owner){
        setIsDisabled({"menu": true, "wrapping": true, "transfer": true, "resolve": false, "record": false})
        setAuth("controller")
      }
      if(address == name.owner){
        setIsDisabled({"menu": true, "wrapping": false, "transfer": false, "resolve": !validCheck, "record": !validCheck})
        setAuth("owner")
      }

      else{
        setIsDisabled({"menu": true, "wrapping": true, "transfer": true, "resolve": !validCheck, "record": !validCheck})
        setAuth("")
      }

      setLoading(false)
      return
  }

  useEffect(()=>{
      if(name && name.name){
          handleViews()
      }

  },[name])




  
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
            className="fixed w-[90%] md:w-[70%] lg:w-[50%] max-w-[600px] h-[auto] p-5 -mt-5 bg-gray-200 dark:bg-gray-800 rounded-md shadow-lg"
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
                                        <button disabled={isDisabled[item.viewName]} onClick={()=>setView(item.viewName)} className={`w-full flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 group dark:bg-gray-600  dark:text-white disabled:opacity-50  ${isDisabled[item.viewName] ? " ":"hover:bg-gray-100 dark:hover:bg-gray-500 hover:cursor-pointer"}`}>
                                            {item.viewIcon}
                                            <span className="ml-2 whitespace-nowrap">{item.viewTitle}</span>
                                            {item.viewMore && (<span className="absolute flex flex-end items-center justify-center px-2 py-0.5 ms-3 right-0 mr-8 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">{item.viewMore}</span>)}
                                        </button>
                                    </li>
                                ))}
                                </ul>
                            </div>
                      </div>
                    </motion.div>
                  )}
                  {view == "wrapping" && (<Wrap name={name}/>)}
                  {view == "transfer" && (<Transfer name={name}/>)}
                  {view == "resolve" && (<Resolve name={name} auth={auth}/>)}
                  {view == "record" && (<Record name={name} auth={auth}/>)}


                  </motion.div>
            )}
        </AnimatePresence>
        </motion.div>

        </>
        )}
      </>
    );
  }

  