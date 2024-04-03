"use client";

import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import Grid from "@/components/Grid";
import { Pagination } from "flowbite-react";
import { useState, useEffect, use } from "react";
import { useSearchParams, useRouter } from 'next/navigation'
import Search from "@/components/forms/Search";
import { callAPI, makeQueryClient} from "@/utils/utils";
import { hydrateNames } from "@/utils/nameUtils";
import { useLnrGetAddress, useLnrGetPrimaryName } from '@linagee/lnr-ethers-react';
import PaginationComponent from "@/components/PaginationComponent";


const queryClient = makeQueryClient();

export default function Profile() {

  const searchParams = useSearchParams();
  const searchRequest = searchParams.get('address')
  const currentOffset = searchParams.get('offset') || 0;

  const mode = searchParams.get('mode') || "names";
  const cursor = searchParams.get('cursor') || "";

  const [loadingPage, setLoadingPage] = useState(false)
  const [items, setItems] = useState([]);
  const [nfts, setNfts] = useState([]);




  // let items = use(queryClient(`search-${searchRequest}`, () => callAPI("graph", JSON.stringify({field: 'owner', value: searchRequest, offset: 0}))));

  // items = hydrateNames(items.results)


  const { name, error, hasError, loading } = useLnrGetPrimaryName(searchRequest);

  const onPageChange = (page) => { 
    setCurrentPage(page);
  }


  async function fetchItems(search, offset, initial = false){ 
    if(search && search.length > 0 && mode == "names"){
      let respItems = await callAPI("graph", JSON.stringify({field: 'owner', value: search, offset: offset}));
      respItems = hydrateNames(respItems.results)
      setItems(respItems)
      console.log("items names", respItems)

      }
    else if(search && search.length > 0 && mode == "nfts"){
      let respItems = await callAPI("nfts", JSON.stringify({field: 'owner', value: search, cursor: cursor}));
      if(respItems){
        console.log("nfts", respItems)
        setItems(respItems.results)
      }
      }
}

    useEffect(() => { 
    setLoadingPage(true)
    fetchItems(searchRequest, currentOffset, true)
    setLoadingPage(false)

    }, [currentOffset, searchRequest])



    return (
      <div className="flex flex-col justify-center items-center h-full p-5 mt-[60px] m-10">
        <BreadCrumbComponent paths={[{name: "Profile", link: "/names"}]}/>
        <div className="flex flex-row w-full items-end justify-between ">
          <div className="flex flex-col gap-y-2 mt-3">
          <h2 className="text-2xl font-bold">{name}.og</h2>
          <h3 className="text-md font-light">{(searchRequest && searchRequest.length > 4) ? searchRequest.slice(0,4) +"..."+searchRequest.slice(-4) : ""}</h3>

          </div>

          {items && items?.search?.length > 0 && (
          <PaginationComponent props = {{itemLength: items.length || 0, nextOffset: items.slice(-1)[0]?.registerIndex, loadingPage, path: "names", searchRequest}}/>
          )}

        </div>

         <Grid items={items} nfts={nfts} mode={mode}/>

        
        

      </div>
    );
  }
  