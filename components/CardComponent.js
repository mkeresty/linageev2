"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { SiOpensea } from "react-icons/si";


export default function CardComponent({item}) {


  console.log(item)



  return (
    <React.Fragment key={item.title}>
    <CardContainer className="inter-var " >
      <CardBody
      className=" relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]  dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl p-6 shadow-lg"
      >
        <div className="flex justify-between items-center ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
          
        >
          {item.title}
        </CardItem>
        </div>


        <div className="flex justify-between items-center mt-20 ">
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl text-m font-normal dark:text-white"
          >
            <SiOpensea />
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Explore
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
    </React.Fragment>
  );
}
