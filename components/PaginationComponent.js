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




export default function PaginationComponent({props}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchRequest = searchParams.get('search') || '';
    const currentOffset = searchParams.get('offset') || 0;

    const {itemLength, nextOffset, initial = false, loading} = props

    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState([{p: 1, offset: 0}]);
    const [targetOffset, setTargetOffset] = useState(0);


    const handlePageChange = (targetPage) => {
      //setCurrentPage(targetPage);
      console.log("targetPage ", targetPage)
      let tOffset = findOffsetByPage(targetPage, pages);
      console.log("tOffset ", tOffset)
      //setTargetOffset(tOffset);
      router.push(`/names?search=${searchRequest}&offset=${tOffset}`)


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


      if(initial === true && parseInt(offset) == 0){
        setPages([{p: 1, offset: 0}, {p: 2, offset: nextOffset}])
        setCurrentPage(1)
      }
      else if (initial === true && parseInt(offset) > 0 && pages.length === 1){
        setPages([{p: 1, offset: 0}, {p: 2, offset: offset}, {p: 3, offset: nextOffset}])
        setCurrentPage(2)
      }
    //   else if (parseInt(offset) > 0 && pages.length > 1){
    //     let prevPages = pages
    //     setPages([...prevPages, {p: 2, offset: offset}, {p: 3, offset: nextOffset}])
    //     setCurrentPage(2)
    //   }
    //   else {
    //     console.log("setting pages")
    //     const pageNum = findPageByOffset(offset)
    //     let prevPages = pages
    //     setPages([...prevPages, {p: pageNum, offset: nextOffset}])
    //     setCurrentPage(pageNum)
    //   }

    }

    useEffect(() => {
      // Initial setup
      if(!loading){

        console.log("props ", props)

        manager(parseInt(currentOffset), nextOffset);
      }

      // Additional logic for conditional updates
      // ...
    }, [currentOffset, nextOffset, loading]); // Assuming these are relevant prop values

    useEffect(() => {
      // Initial setup
      console.log("pages ", pages)
    
      // Additional logic for conditional updates
      // ...
    }, [pages]); // Assuming these are relevant prop values





  return (
    <Pagination 
    showShadow 
    showControls 
    size={"sm"} 
    page={currentPage} 
    total={pages.length} 
    onChange={handlePageChange}
    classNames={{
      item: "shadown-sm",
      cursor:
        "bg-gradient-to-b shadow-sm from-[#bd8eff] to-[#69e0ff] text-white font-bold",
    }}
  />
  );





}
