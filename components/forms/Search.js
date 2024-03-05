"use client"

import { IoSearch } from "react-icons/io5";
import { useSearchParams, useRouter } from 'next/navigation'
import { lnr } from '@linagee/lnr-ethers-react';
import { useState } from "react";

export default function Search(){
    
    const [searchName, setSearchName] = useState("");
    const router = useRouter();

    const handleSearch = () =>{
        let stringName = searchName;
        if(stringName.length < 1){
            return;
        }
        if(!stringName.endsWith(".og")){
            stringName = stringName + ".og";
        }

        

        try{
            const bytes = lnr.utils.domainToBytes32(stringName)
            console.log(bytes);
            
            router.push(`/names/?search=${bytes}`)
        } 
        catch(e){
            console.log(e);
        }

    }

    return(
        <>
            <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative justify-center">
                <input onChange={(e)=>setSearchName(e.target.value)} type="search" id="search" className="block w-full p-y-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                <button onClick={handleSearch} type="submit" className=" absolute end-1 bottom-1 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2  dark:focus:ring-blue-800">
                    <IoSearch className="h-4 w-4 " />
                </button>
            </div>
        </>
    )
}