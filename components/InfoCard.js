"use client";

import { useEffect, useState } from "react";





export default function InfoCard({item, isFlipped}) {
    const [metadata, setMetadata] = useState()


    async function getMetadata(){
        if(item && item.metadata_url && isFlipped && !metadata){
            console.log("gettingggg")

            try{
                let metadata = await fetch(item.metadata_url)
                metadata = await metadata.json()
                console.log("metadata", metadata)
                setMetadata(metadata)
            } catch(e){
                //console.log("error", e)
            }
            
    }
}

    useEffect(() => { 
        getMetadata()
    },[item, isFlipped])


    return(
        <div className='w-full h-full overflow-x-hidden p-2 flex flex-col'>
            {metadata && metadata.attributes && (
                <h2 className="font-light mb-1 text-md">Traits</h2>
            )}
            {metadata && metadata.attributes && metadata.attributes.map((item, index) => ( // Destructure 'title' directly
            <div key={index} className='flex flex-col justify-between'>

                <p className="font-extralight text-xs opacity-75">{item.trait_type}</p>
                <p className="text-sm font-extralight ml-3 mt-1 mb-2">{item.value}</p>
                </div>
                ))}
                {item.description && (
                    <div className='flex flex-col mb-1 mt-2'>
                        <h2 className="font-light">Description</h2>
                        <p className="text-sm font-extralight">{item.description}</p>
                    </div>
                )}

      </div>
    )
}