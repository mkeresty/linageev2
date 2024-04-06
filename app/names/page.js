"use client";

import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import Grid from "@/components/Grid";
import {Pagination} from "@nextui-org/react";
import { useState, useEffect, use } from "react";
import { useSearchParams, useRouter } from 'next/navigation'
import Search from "@/components/forms/Search";
import { callAPI, makeQueryClient} from "@/utils/utils";
import { hydrateNames } from "@/utils/nameUtils";
import { useLnrGetAddress } from '@linagee/lnr-ethers-react';
import { current } from "tailwindcss/colors";
// import {usePaginationHook} from "@/utils/hooks/usePaginationHook";
import PaginationComponent from "@/components/PaginationComponent";
import SearchV2 from "@/components/forms/SearchV2";

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
  const currentOffset = searchParams.get('offset') || 0;
  const [loadingPage, setLoadingPage] = useState(false)
  const [items, setItems] = useState([]);




  async function fetchItems(search, offset, initial = false){ 
        if(search && search.length > 0){
          let respItems = await callAPI("graph", JSON.stringify({field: 'domainUtf8', value: search, offset: offset}));
          respItems = hydrateNames(respItems.results)
          setItems(respItems)
          console.log("items ", respItems)

          }
  }

  useEffect(() => { 
    setLoadingPage(true)
    fetchItems(searchRequest, currentOffset, true)
    setLoadingPage(false)

  }, [currentOffset, searchRequest])





    return (
      <div className="flex flex-col justify-center items-center h-full py-5 lg:p-x-5 sm:p-x-2 mt-[60px] m-10">
        <BreadCrumbComponent paths={[{name: "Names", link: "/names"}]}/>
        <div className="flex flex-row w-full items-center justify-between pt-3">
          <div className=" lg:w-[25rem] md:w-[20rem] z-100">
            <SearchV2 initialStyles={"opacity-100 border dark:border-gray-600 border-b-1"} styles={"border border-b-0 dark:border-gray-600"} initialStylesList={"h-0 opacity-100 border-0 dark:border-gray-600"} stylesList={"border border-t-0 dark:border-gray-600"}/>
          </div>


          <PaginationComponent props = {{itemLength: items.length || 0, nextOffset: items.slice(-1)[0]?.registerIndex, loadingPage, path: "names", searchRequest}}/>
          

        </div>
        
        <Grid items={items} mode={"names"}/>

      </div>
    );
  }
  