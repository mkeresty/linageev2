"use client";

import CardComponent from "@/components/CardComponent";
import CardWithImage from "@/components/CardWithImage";



export default function Grid({items}) {



    return(
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {items && items.map((item, index) => ( // Destructure 'title' directly
            <CardWithImage key={item.domainBytecode + index} item={item} />
            ))}
      </div>
    )
}