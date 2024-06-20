"use client";

import Image from "next/image";
import React, {useState, useRef, useEffect, Suspense} from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { SiOpensea } from "react-icons/si";
import { IoArrowRedoSharp } from "react-icons/io5";
import LnrSvg from "@/components/LnrSvg";
import FlipCard, { FrontCard, BackCard } from "@/components/FlipCard";
import InfoCard from "@/components/InfoCard";
import {useRouter} from "next/navigation"
import LNR from "@/utils/lnrethers";


export default function CardWithImage({item, mode}) {
  console.log("item ", item)
  const router = useRouter();
  const [hasError, setHasError] = useState(false);
  let name = item.name || item?.collection + item?.identifier;

  let img_url = item?.contract == LNR.WRAPPER_ADDRESS ? `http://api.linagee.vision:8080/image/${item?.identifier}` : item.image_url

  let metadata_url = item?.contract == LNR.WRAPPER_ADDRESS ? `http://api.linagee.vision:8080/${item?.identifier}` : item.metadata_url


  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    
   }

   const routeName = () =>{
    if(mode == "names"){
      router.push(`/name/${item.domainBytecode}`)
    }
   }


  return (
    <CardContainer className="inter-var sm:w-[17rem] px-3 w-full h-full">
    <CardBody routeName={routeName} className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-blue-500/[0.3] dark:bg-gray-800 dark:border-white/[0.2] border-black/[0.1]  h-auto rounded-xl  p-6 border  hover:cursor-pointer">
      <CardItem
        translateZ="50"
        className="text-lg font-bold text-neutral-600 dark:text-white"

      >
          {mode == "names" ? (
            <>
            {item.domainUtf8 && item.domainUtf8.length > 15 ? item.domainUtf8.substring(0, 15) + "..." : item.domainUtf8}
            </>
          ) : (
            <>
            {name.length > 15 ? name.substring(0, 15) + "..." : name}
            </>
          )}

        
      </CardItem>

      <FlipCard>

        

      <CardItem  translateZ="100" className="w-full mt-4 ">
      <FrontCard isCardFlipped={isFlipped}>

        {mode == "names" ? (
        <LnrSvg item={item} classVars={"w-full h-auto object-cover overflow-hidden rounded-xl group-hover/card:shadow-xl"} mode={mode}/>

        ) : (
          <img
            id="thumbnail"
            src={img_url}
            onClick={handleFlip}
            onError={e => {
              e.currentTarget.src = "/error.svg"
              setHasError(true)
              console.log("error", e.currentTarget.src)
            }}
            height="1000"
            width="1000"
            className={`${hasError == true ? "p-10": ""} w-full h-auto h-[198px] object-cover rounded-xl group-hover/card:shadow-xl `}
            alt="thumbnail"
          />
        )
        }
        </FrontCard>
      
      <BackCard isCardFlipped={isFlipped}>

        <div onClick={handleFlip} className={`bg-gray-50 dark:bg-gray-800 w-full max-w-[198px] h-[198px] dark:border-white/[0.2] border-black/[0.1] border overflow-auto object-cover rounded-xl group-hover/card:shadow-xl flex flex-col items-center justify-center `}>
            <Suspense fallback={<p>Loading...</p>}>
            <InfoCard item={item} metadata_url={metadata_url} isFlipped={isFlipped}/>
            </Suspense>
            
          </div>
      </BackCard>
      </CardItem>


      </FlipCard>
      <div className="flex justify-between items-center mt-5">


        <CardItem
          translateZ={20}
          as="button"
          className="px-2 rounded-xl text-lg  text-neutral-600 font-normal dark:text-white"
        >
          {mode == "names" &&(
          <IoArrowRedoSharp onClick={handleFlip} />
          )}
        </CardItem>
        <CardItem
          translateZ={20}
          as="button"
          className="px-2 rounded-xl text-lg  text-neutral-600 font-normal dark:text-white"
        >
          {item.opensea_url && (
            <a target="_blank" href={item.opensea_url}>
              <SiOpensea />

            </a>
          )}
          
        </CardItem>
      </div>
    </CardBody>
  </CardContainer>
  );
}
