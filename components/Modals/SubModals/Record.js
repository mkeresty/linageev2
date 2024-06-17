"use client"

import { useState } from "react"

export default function Record({name}){

    const [toAddress, setToAddress] = useState()

    const handleTransfer =()=>{

    }

    return(
        <>
        <form formNoValidate required={false} noValidate aria-hidden="true" onSubmit={handleTransfer} className="w-full focus:outline-none focus:ring-0" >
            <div>
                <label for="address" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white font-extralight">Transfer <span className="font-bold">{name.domainUtf8}</span></label>
                <input type="text"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0x123" required />
            </div>
        <button type="button" className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Transfer</button>

        </form>
        
        </>
    )
}