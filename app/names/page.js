"use client";

import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import Grid from "@/components/Grid";
import {Pagination} from "flowbite-react";
import { useState, useEffect, use } from "react";
import { useSearchParams, useRouter } from 'next/navigation'
import Search from "@/components/forms/Search";
import { callAPI, makeQueryClient} from "@/utils/utils";
import { hydrateNames } from "@/utils/nameUtils";
import { useLnrGetAddress } from '@linagee/lnr-ethers-react';
import { current } from "tailwindcss/colors";

const itemsnew = [
  {
    domainUtf8: "Bad",
    normalized: false,
    valid: false,
    link: "/",
    thumbnail:
      "linagee/warning.svg",
  },
  {
    domainUtf8: "437",
    normalized: true,
    valid: true,
    link: "/",
    thumbnail:
      "linagee/437.og.svg",
  },
  {
    domainUtf8: "wizard",
    normalized: true,
    valid: true,
    link: "/",
    thumbnail:
      "/linagee/wizard.og.svg",
  },
  {
    domainUtf8: "0972",
    normalized: true,
    valid: true,
    link: "/",
    thumbnail:
      "/linagee/0972.og.svg",
  },

  {
    domainUtf8: "b",
    normalized: true,
    valid: true,
    link: "/",
    thumbnail:
      "/linagee/b.og.svg",
  },
  {
    domainUtf8: "account",
    normalized: true,
    valid: true,
    link: "/",
    thumbnail:
      "/linagee/account.og.svg",
  },
  {
    domainUtf8: "feel",
    normalized: true,
    valid: true,
    link: "/",
    thumbnail:
      "/linagee/feel.og.svg",
  },

  {
    domainUtf8: "jess",
    normalized: true,
    valid: true,
    link: "/",
    thumbnail:
      "linagee/jess.og.svg",
  },
  {
    domainUtf8: "robot",
    normalized: true,
    valid: true,
    link: "/",
    thumbnail:
      "/linagee/robot.og.svg",
  },
  {
    domainUtf8: "vacation",
    normalized: true,
    valid: true,
    link: "/",
    thumbnail:
      "/linagee/vacation.og.svg",
  },
  {
    domainUtf8: "844",
    normalized: true,
    valid: true,
    link: "/",
    thumbnail:
      "/linagee/844.og.svg",
  },
  {
    domainUtf8: "ai",
    normalized: true,
    valid: true,
    link: "/",
    thumbnail:
      "/linagee/ai.og.svg",
  },

  {
    domainUtf8: "advertising",
    normalized: true,
    valid: true,
    link: "/",
    thumbnail:
      "/linagee/advertising.og.svg",
  },
  {
    domainUtf8: "pfp",
    normalized: true,
    valid: true,
    link: "/",
    thumbnail:
      "/linagee/pfp.og.svg",
  },
  {
    domainUtf8: "the",
    normalized: true,
    valid: true,
    link: "/",
    thumbnail:
      "/linagee/the.og.svg",
  },
  {
    domainUtf8: "bobby",
    normalized: true,
    valid: true,
    link: "/",
    thumbnail:
      "/linagee/bobby.og.svg",
  },
];

const queryClient = makeQueryClient();

export default function Names() {

  const router = useRouter();
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("")

  const searchParams = useSearchParams();
  const searchRequest = searchParams.get('search')
  console.log("offset ", searchParams.get('offset'))
  const currentOffset = searchParams.get('offset') || 0;
  
  const [items, setItems] = useState([]);


  const [pages, setPages ] = useState([{p: 1, offset: 0}])
  const [currentPage, setCurrentPage] = useState(1)

  async function fetchItems(search, offset){
    if(search && search.length > 0){
      let respItems = await callAPI("graph", JSON.stringify({field: 'domainUtf8', value: search, offset: offset}));
      respItems = hydrateNames(respItems.results)
      setItems(respItems)
      console.log("items ", respItems)
      if(respItems.length > 0){
        updatePages(respItems.slice(-1)[0].registerIndex || 0)

      }
  
    }
  }

  useEffect(() => { 
    fetchItems(searchRequest, currentOffset)

  }, [])

  function updatePages(offset) {
    let maxOffset = Math.max(...pages.map(page => page.offset));

      if (offset > maxOffset) {
        let prevPages = pages
        setPages([...prevPages, {p: prevPages.slice(-1)[0].p + 1, offset: offset}])
      }

  }

  useEffect(() => {
    console.log("pages ", pages)
  }, [pages]);

  function findPageByOffset(targetOffset) {
    for (let i = 0; i < pages.length; i++) {
      console.log(pages[i])
        if (pages[i].offset === targetOffset) {
            return pages[i].p;
        }
    }
    return currentPage + 1;
}

function findOffsetByPage(targetPage) {
  for (let i = 0; i < pages.length; i++) {
      if (pages[i].p === targetPage) {
          return pages[i].offset;
      }
  }
  return 0;
}





  const handlePageChange = (p) => { 
    console.log("target page ", p)  

    if(p < currentPage){
      setCurrentPage(p)
      let targetOffset = pages.filter(page => page.p === p)[0].offset || 0
      router.push(`/names?search=${searchRequest}&offset=${targetOffset}`)
      //router.push("/names", {query: {search: searchRequest, offset: items.slice(-1)[0].registerIndex || 0}})
      //window.location.reload();
  
      fetchItems(searchRequest, targetOffset)

    } else{
      const targetOffset = findOffsetByPage(p)

      console.log("looking for offset ", targetOffset)

      setCurrentPage(p)
      updatePages(targetOffset)
  
      router.push(`/names?search=${searchRequest}&offset=${targetOffset}`)

      fetchItems(searchRequest, targetOffset)
    }


  }


    return (
      <div className="flex flex-col justify-center items-center h-full p-5 mt-[60px] m-10">
        <BreadCrumbComponent paths={[{name: "Names", link: "/names"}]}/>
        <div className="flex flex-row w-full items-end justify-between ">
          <div className=" lg:w-[25rem] md:w-[20rem] opacity-75 mt-2">
            <Search />
          </div>

        <Pagination currentPage={currentPage} totalPages={pages.length} onPageChange={handlePageChange}/>
          

        </div>
        
        <Grid items={items}/>
        {/* {items && items?.length > 0 && (
        <Pagination />
          )} */}
      </div>
    );
  }
  