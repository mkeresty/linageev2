"use client";

import { useLnrName } from "@/utils/hooks/useLnr";
import LnrSvg from "@/components/LnrSvg";

export default function Name({params}){

    const res = useLnrName(params.id)
    console.log("name", res)

    return(
        <div className="flex flex-col justify-center items-center h-full py-5 lg:p-x-5 sm:p-x-2 mt-[60px] m-10">
            {res.domainBytecode && res.domainUtf8 && (
                <>
                
            <LnrSvg item={res} classVars={"w-[30%] h-auto object-cover overflow-hidden rounded-xl group-hover/card:shadow-xl"} />
            <ul>
            {Object.keys(res).map((key) => (
                <li key={key}>
                {key}: {res[key]}
                </li>
            ))}
            </ul>

            </>
            
            )}




        </div>
    )



}