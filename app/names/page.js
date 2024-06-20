"use client";

import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import Grid from "@/components/Grid";
import {Pagination} from "@nextui-org/react";
import { useState, useEffect, use } from "react";
import { useSearchParams, useRouter } from 'next/navigation'
import Search from "@/components/forms/Search";
import { callAPI, makeQueryClient} from "@/utils/utils"; 
import { hydrateNames } from "@/utils/nameUtils";
import { InfinitySpin } from "react-loader-spinner";
import { current } from "tailwindcss/colors";
// import {usePaginationHook} from "@/utils/hooks/usePaginationHook";
import PaginationComponent from "@/components/PaginationComponent";
import SearchV2 from "@/components/forms/SearchV2";
import { getBytes } from "@/utils/nameUtils";


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
          let bytes = getBytes(search)
          let respItems = await callAPI("graph", JSON.stringify({field: 'domainUtf8', value: search, offset: offset, bytes}));
          respItems = hydrateNames(respItems.results)
          setItems(respItems)
          }
          setLoadingPage(false)
  }

  useEffect(() => { 
    setLoadingPage(true)
    fetchItems(searchRequest, currentOffset, true)
    

  }, [currentOffset, searchRequest])





    return (
      <div className="flex flex-col justify-center items-center h-full  py-5 lg:p-x-5 sm:p-x-2 mt-[60px] m-10">
        <BreadCrumbComponent paths={[{name: "Names", link: "/names"}]}/>
        <div className="flex flex-row w-full items-center justify-between pt-3">
          <div className=" lg:w-[25rem] md:w-[20rem] z-100">
            <SearchV2 initialStyles={"opacity-100 border dark:border-gray-600 border-b-1"} styles={"border border-b-0 dark:border-gray-600"} initialStylesList={"h-0 opacity-100 border-0 dark:border-gray-600"} stylesList={"border border-t-0 dark:border-gray-600"}/>
          </div>


          <PaginationComponent props = {{itemLength: items.length || 0, nextOffset: items.slice(-1)[0]?.registerIndex, loadingPage, path: "names", searchRequest}}/>
          

        </div>
        
        <Grid items={items} mode={"names"}/>
        {loadingPage && ( 
                <InfinitySpin
                        visible={true}
                        width="200"
                        color="#bd8eff"
                        ariaLabel="infinity-spin-loading"
                        />

          )}
          <div className="h-[40vh]" />

      </div>
    );
  }
  