"use client"

import { useState } from "react"
import { toast } from 'react-hot-toast';
import { useWeb3ModalProvider } from '@web3modal/ethers5/react'
import { getCurrentSigner} from "@/utils/etherutils";
import { motion} from "framer-motion";
import { callLnrClass } from "@/utils/nameUtils";


export default function Resolve({name, auth}){

    const { walletProvider } = useWeb3ModalProvider();

    const [loading, setLoading] = useState(true)

    const [primary, setPrimary] = useState("")
    const [controller, setController] = useState("")


    async function handleResolve(action){
        setLoading(true)

        try{
            const {address, signer} = await getCurrentSigner(walletProvider)
            let args

            if(action == "unsetPrimary"){
                args = [undefined]
            }

            if(action == "setPrimary"){
                args = [name.name]
            }

            if(action == "unsetController"){
                args = [name.name]
            }

            if(action == "setController"){
                args = [name.name, address]
            }

            let data = await callLnrClass(signer, action, ...args)

            if(data == "Transaction Failed"){
                toast.error(data)
            }

            if(data == "Transaction Successful"){
                toast.success(data)

            }

            setLoading(false)

        } catch(e){
            return(setLoading(false))

        }
    }




    return(


        <motion.div
        transition={{ delay: .3 }}
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        key={"resolve"}
        > 
        <div className="relative ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {name.name}
                </h3>
            </div>
            <div className="p-2 md:p-5 my-2 mt-0 space-y-3">
                <div className="relative">
                <label for="search" className="mb-2 text-sm font-medium text-gray-900  dark:text-white">Primary</label>

                    <input disabled={name.primary !== undefined || auth !== "owner" || auth !== "controller"}  onChange={(e)=>setPrimary(e.target.value)} value={primary} type="text"  className="block w-full p-4 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={name.primary || "Not set"} required />
                    {name.primary ? (
                    <button disabled={auth !== "owner" || auth !== "controller"} onClick={()=>handleResolve("unsetPrimary")} type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Unset</button>
                    ):(
                        <button disabled={auth !== "owner" || auth !== "controller"} onClick={()=>handleResolve("setPrimary")} type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Set</button>

                    )}
                </div>
            </div>
            <div className="p-3 md:p-5 my-2 mt-0 space-y-3">
                <div className="relative">
                <label for="search" className="mb-2 text-sm font-medium text-gray-900  dark:text-white">Controller</label>

                    <input disabled={name.controller !== undefined|| auth !== "owner" } onChange={(e)=>setController(e.target.value)} value={controller} type="text"  className="block w-full p-4 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={name.controller || "Not set"} required />
                    {name.controller ? (
                    <button disabled={auth !== "owner" } onClick={()=>handleResolve("unsetController")} type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Unset</button>
                    ):(
                        <button disabled={auth !== "owner" } onClick={()=>handleResolve("setController")} type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Set</button>

                    )}               
                     </div>
            </div>

        </div>
  </motion.div>

    )
}