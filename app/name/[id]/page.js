"use client";

import { useState } from "react";
import { useLnrName } from "@/utils/hooks/useLnr";
import LnrSvg from "@/components/LnrSvg";
import { IoIosGift } from "react-icons/io";
import { FaBoxOpen } from "react-icons/fa";
import { PiSealCheckFill } from "react-icons/pi";
import { LuBadgeX } from "react-icons/lu";
import { LuSpellCheck } from "react-icons/lu";
import { IoIosWarning } from "react-icons/io";
import CopyClipboard from "@/components/CopyClipboard";
import { InfinitySpin } from "react-loader-spinner";
import { IoIosMore } from "react-icons/io";
import StandardModal from "@/components/Modals/StandardModal";
import { TbProgressBolt } from "react-icons/tb";



export default function Name({params}){

    const [isVisible, setIsVisible] = useState(false)

    const res = useLnrName(params.id)


    return(
        <div className="flex flex-col justify-center items-center min-h-[70vh] pb-5 lg:p-x-5 sm:p-x-2 mt-[60px] m-10">
        
        <StandardModal isVisible={isVisible} setIsVisible={setIsVisible} name={res}/>

        {res.loading && ( 
                <InfinitySpin
                        visible={true}
                        width="200"
                        color="#bd8eff"
                        ariaLabel="infinity-spin-loading"
                        />

          )}

{!res.loading && !res.error &&(

<section className="py-4 px-4 bg-white md:py-10 dark:bg-gray-900 antialiased rounded-md shadow-lg">
<div className="h-6 w-[100%] top-0 flex items-center justify-end ">
<IoIosMore 
onClick={()=>setIsVisible(!isVisible)}
className="w-4 h-4 text-gray-500 dark:text-white hover:scale-110 hover:text-gray-500 dark:hover:text-gray-300 transition duration-100 ease-in-out rounded-md hover:cursor-pointer" 
/>
</div>
    <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">

        <div className="max-w-[100%] justify-center items-center ">
            <div className="w-[100%] h-[100%] flex flex-col justify-center items-center">
        {!res.loading && res.domainBytecode && res.domainUtf8 && (
            <LnrSvg item={res} classVars={"w-full max-w-[400px] h-auto object-cover overflow-hidden rounded-xl group-hover/card:shadow-xl"} />

            )}
            </div>
        </div>
        

        <div className="mt-6 sm:mt-8 lg:mt-0"> 

          <h1
            className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
          >
            {res.domainUtf8 || undefined}
          </h1>
          <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <div className="flex items-center gap-4">
                {/* Wrapped Status */}
                {(res.wrapped == "wrapped" || res.wrapped == true) && (
                    <span className="flex flex-row items-center gap-1 ">
                    <IoIosGift className="w-4 h-4" />
                    Wrapped
                    </span>
                    )}
                {(res.wrapped == "unwrapped" || res.wrapped == false) && (
                    <span className="flex flex-row items-center gap-1">
                    <FaBoxOpen className="w-4 h-4" />
                    Unwrapped
                    </span>
                    )}
                {(res.wrapped == "In progress") && (
                    <span className="flex flex-row items-center gap-1">
                    <TbProgressBolt className="w-4 h-4" />
                    Wrapping in progress
                    </span>
                    )}
                {/* Normalized */}
                {res.normalized && (
                    <span className="flex flex-row items-center gap-1">
                    <LuSpellCheck className="w-4 h-4 text-green-500" />
                    Normalized
                    </span>
                    )}
                {!res.normalized == undefined && (
                    <span className="flex flex-row items-center gap-1">
                    <IoIosWarning className="w-4 h-4 text-red-500" />
                    Not Normalized
                    </span>
                    )}

                {/* Primary Status */}
                {res.primary && (
                    <span className="flex flex-row items-center gap-1">
                    <PiSealCheckFill className="w-4 h-4" />
                    Primary set
                    </span>
                    )}
                {res.primary == undefined && (
                    <span className="flex flex-row items-center gap-1">
                    <LuBadgeX className="w-4 h-4" />
                    Primary not set
                    </span>
                    )}
                
                
              
              </div>

            </div>
          </div>



          <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />



          <p className="text-xl font-semibold text-gray-900 dark:text-white">About</p>

          <div className="space-y-4 xs:w-full sm:w-[300px] md:w-[400px]">
            <div className="space-y-2">
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Owner</dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">
                    
                    <CopyClipboard forWhat={"owner"} text={res.owner} />
                </dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Primary</dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">
                <CopyClipboard forWhat={"primary"} text={res.primary} fallback={"Not set"}/>
                </dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Controller</dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">
                <CopyClipboard forWhat={"controller"} text={res.controller} fallback={"Not set"}/>
                </dd>
              </dl>
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Bytecode</dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">
                <CopyClipboard forWhat={"Bytecode"} text={res.domainBytecode} fallback={"Invalid"}/>
                </dd>
              </dl>

              {res.tokenId && (
              <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Token Id</dt>
              <dd className="text-base font-medium text-gray-900 dark:text-white">
              <CopyClipboard forWhat={"tokenid"} text={res.tokenId} fallback={""}/>
              </dd>
            </dl>
              )}
            </div>

          </div>
          
        </div>
      </div>
    </div>
  </section>
)}



        </div>
    )



}