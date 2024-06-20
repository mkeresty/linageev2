"use client";

import { useState } from "react";
import LnrSvg from "@/components/LnrSvg";
import { InfinitySpin } from "react-loader-spinner";
import { callLnrClass, checkValid, checkOwner } from "@/utils/nameUtils";
import { FaPlusCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { getCurrentSigner} from "@/utils/etherutils";
import { useWeb3ModalProvider } from '@web3modal/ethers5/react'
import { toast } from 'react-hot-toast';


export default function Reserve(){

    const [isVisible, setIsVisible] = useState(false)
    const [reqName, setReqName] = useState("name")
    const [valid, setValid] = useState(true)
    const [loading, setLoading] = useState(false)

    const { walletProvider } = useWeb3ModalProvider();

    const handleInput = (nameInput) =>{
      setReqName(nameInput)
      let validCheck = checkValid(nameInput + ".og")
      setValid(validCheck)

    }

    const check = async()=>{
      const {address, signer} = await getCurrentSigner(walletProvider)

      let isOwned = await checkOwner(signer, reqName + ".og")
      if(isOwned){
        toast.error("Name is owned")
      } else{
        toast.success("Name is available")
      }
      return(isOwned)
    }

    const mint = async()=>{
      const {address, signer} = await getCurrentSigner(walletProvider)

      if(!valid){
        return toast.error("Name is not normalized")
      }
      let isOwned = await checkOwner(signer, reqName + ".og")
      if(isOwned == false){
        await callLnrClass(signer,"reserve", reqName + ".og")
      } 
    }
    



    return(
        <div className="flex flex-col justify-center items-center min-h-[70vh] pb-5 lg:px-5 sm:px-2 mt-[80px] m-10">

<section className="py-4 px-4 bg-white md:py-10 md:w-[400px] dark:bg-gray-900 antialiased rounded-md ">

        <div className="max-w-[100%] justify-center items-center ">
            <div className="w-[100%] h-[100%] flex flex-col justify-center items-center">
            <LnrSvg item={{normalized: valid, domainUtf8: reqName}} classVars={"w-full max-w-[400px] h-auto object-cover overflow-hidden rounded-xl group-hover/card:shadow-xl"} />
            </div>
        </div>

            <div className="p-4 md:p-5 my-4 mt-0 space-y-3  relative items-center justify-center">
                <label className="mb-2 text-sm font-medium text-gray-900  dark:text-white">Reserve</label>
                    <input 
                    onChange={(e)=>handleInput(e.target.value)} value={reqName} type="text"  className="block mt-1 w-full p-4 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Record key" required />

                    <div className="inline-flex rounded-md shadow-sm end-7 bottom-7 absolute" role="group">
                        <button onClick={()=>check()} type="button" className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white `}>
                            <FaSearch className="w-4 h-4" />
                        </button>
                        <button disabled={valid !== true} onClick={()=>mint()} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border   border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                            <FaPlusCircle className="w-4 h-4" />
                        </button>
                    </div>
                </div>

  </section>




        </div>
    )



}