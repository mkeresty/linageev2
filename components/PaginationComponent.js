"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { SiOpensea } from "react-icons/si";
import { IoArrowRedoSharp } from "react-icons/io5";
import LnrSvg from "@/components/LnrSvg";
import {Pagination} from "@nextui-org/react";
import { useSearchParams, useRouter } from 'next/navigation'
import next from "next";
import { parse } from "@ethersproject/transactions";




export default function PaginationComponent({props}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentOffset = searchParams.get('offset') || 0;

    const {itemLength, nextOffset, loading, path, searchRequest} = props

    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState([{p: 1, offset: 0}]);


    const handlePageChange = (targetPage) => {
      //setCurrentPage(targetPage);
      console.log("targetPage ", targetPage, " pages ", pages)
      let tOffset = findOffsetByPage(targetPage, pages);
      //setTargetOffset(tOffset);
      router.push(`/${path}?search=${searchRequest}&offset=${tOffset}`)


  };

  function updatePages (offset, nextOffset) {
    let maxOffset = Math.max(...pages.map(page => page.offset));

    if(offset == 0){
      setPages([{p: 1, offset: 0}, {p: 2, offset: nextOffset}])
      setCurrentPage(1)
      return
    }

    else if(offset < maxOffset){ 
      let pageNum = findPageByOffset(offset)
      setCurrentPage(pageNum)
      return
    }

    else if( offset == maxOffset){
      let prevPages = pages
      let pageNum = findPageByOffset(offset)
      setPages([...prevPages, {p: pageNum + 1, offset: nextOffset}])
      setCurrentPage(pageNum)
      return
    }

    else if(offset > maxOffset){ 
      let prevPages = pages
      let pageNum = findPageByOffset(offset)
      setPages([...prevPages, {p: pageNum, offset: offset}, {p: pageNum + 1, offset: nextOffset}])
      setCurrentPage(pageNum)
      return
    }


  };

    function findPageByOffset(targetOffset) {
      for (let i = 0; i < pages.length; i++) {
          if (pages[i].offset === targetOffset) {
              return pages[i].p;
          }
      }
      return currentPage + 1;
  }
  
    function findOffsetByPage(targetPage, pages) {
      for (let i = 0; i < pages.length; i++) {
          if (pages[i].p === targetPage) {
              return pages[i].offset;
          }
      }
      return 0;
    }


    function manager(offset, nextOffset){
      let maxOffset = Math.max(...pages.map(page => page.offset));

      if(!nextOffset && itemLength === 0){
        return //router.push(`/names?search=${searchRequest}&offset=0`)
      }

      updatePages(offset, nextOffset)



    }

    useEffect(() => {
      // Initial setup
      if(!loading &&!(parseInt(currentOffset) == nextOffset) && nextOffset > parseInt(currentOffset)){


        manager(parseInt(currentOffset), nextOffset);
      }

      // Additional logic for conditional updates
      // ...
    }, [currentOffset, nextOffset, loading]); // Assuming these are relevant prop values





  return (
    <Pagination 
    showShadow 
    showControls 
    variant="light"
    size={"sm"} 
    page={currentPage} 
    total={pages.length} 
    onChange={handlePageChange}
    className=""
    classNames={{
      next: "hover:!bg-gradient-to-b  hover:!from-[#bd8eff] hover:!to-[#69e0ff] hover:!opacity-30 hover:text-white hover:!scale-110",
      prev: "hover:!bg-gradient-to-b  hover:!from-[#bd8eff] hover:!to-[#69e0ff] hover:!opacity-30 hover:text-white hover:!scale-110",
      item: "hover:!bg-gradient-to-b  hover:!from-[#bd8eff] hover:!to-[#69e0ff] hover:!opacity-30 hover:text-white hover:!scale-110",
      cursor:
        "bg-gradient-to-b !shadow-md dark:!shadow-blue-500/[0.5] from-[#bd8eff] to-[#69e0ff] text-white font-bold hover:!scale-110 hover:!border-0 ",
    }}
  />
  );





}
