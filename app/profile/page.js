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



const queryClient = makeQueryClient();

export default function Profile() {

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("")

  const searchParams = useSearchParams();
  const searchRequest = searchParams.get('address')

  let items = use(queryClient(`search-${searchRequest}`, () => callAPI("graph", JSON.stringify({field: 'owner', value: searchRequest, offset: 0}))));

  items = hydrateNames(items.results)


  const { name, error, hasError, loading } = useLnrGetPrimaryName(searchRequest);

  const onPageChange = (page) => { 
    setCurrentPage(page);
  }


    return (
      <div className="flex flex-col justify-center items-center h-full p-5 mt-[60px] m-10">
        <BreadCrumbComponent paths={[{name: "Profile", link: "/names"}]}/>
        <div className="flex flex-row w-full items-end justify-between ">
          <div className="flex flex-col gap-y-2 mt-3">
          <h2 className="text-2xl font-bold">{name}.og</h2>
          <h3 className="text-md font-light">{searchRequest}</h3>

          </div>

          {items && items?.search?.length > 0 && (
        <Pagination layout="table" showIcons currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}/>
          )}

        </div>
        
        <Grid items={items}/>
        {items && items?.search?.length > 0 && (
        <Pagination layout="table" showIcons currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}/>
          )}
      </div>
    );
  }
  