"use client";

import Image from "next/image";
import React, {useState} from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { SiOpensea } from "react-icons/si";
import { IoArrowRedoSharp } from "react-icons/io5";
import LnrSvg from "@/components/LnrSvg";


export default function CardWithImage({item, mode}) {
  const [hasError, setHasError] = useState(false);
  let name = item.name || item?.collection + item?.identifier;

  return (
    <CardContainer className="inter-var sm:w-[17rem] px-3 w-full h-full">
    <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-blue-500/[0.3] dark:bg-gray-800 dark:border-white/[0.2] border-black/[0.1]  h-auto rounded-xl  p-6 border  hover:cursor-pointer">
      <CardItem
        translateZ="50"
        className="text-xl font-bold text-neutral-600 dark:text-white"
      >
          {mode == "names" ? (
            <>
            {item.domainUtf8.length > 12 ? item.domainUtf8.substring(0, 10) + "..." : item.domainUtf8}
            </>
          ) : (
            <>
            {name.length > 12 ? name.substring(0, 10) + "..." : name}
            </>
          )}

        
      </CardItem>

      <CardItem translateZ="100" className="w-full mt-4">
        {/* <Image
          src={item.thumbnail}
          height="1000"
          width="1000"
          className="w-full h-auto object-cover rounded-xl group-hover/card:shadow-xl"
          alt="thumbnail"
        /> */}
        {mode == "names" ? (
        <LnrSvg item={item} classVars={"w-full h-auto object-cover overflow-hidden rounded-xl group-hover/card:shadow-xl"} />

        ) : (
          <img
            src={item.image_url}
            onError={e => {
              e.currentTarget.src = "/error.svg"
              setHasError(true)
              console.log("error", e.currentTarget.src)
            }}
            height="1000"
            width="1000"
            className={`${hasError == true ? "p-10": ""} w-full h-auto min-h-[198px] object-cover rounded-xl group-hover/card:shadow-xl `}
            alt="thumbnail"
          />
        )
        }
      </CardItem>
      <div className="flex justify-between items-center mt-5">
        <CardItem
          translateZ={20}
          as="button"
          className="px-2 rounded-xl text-lg  text-neutral-600 font-normal dark:text-white"
        >
          <SiOpensea />
        </CardItem>
        <CardItem
          translateZ={20}
          as="button"
          className="px-2 rounded-xl text-lg  text-neutral-600 font-normal dark:text-white"
        >
          <IoArrowRedoSharp />
        </CardItem>
      </div>
    </CardBody>
  </CardContainer>
  );
}
