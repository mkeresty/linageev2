"use client";

import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import Grid from "@/components/Grid";
import { Pagination } from "flowbite-react";
import { useState, useEffect, use } from "react";
import { useSearchParams, useRouter } from 'next/navigation'
import Search from "@/components/forms/Search";
import { callAPI, makeQueryClient} from "@/utils/utils";
import { hydrateNames } from "@/utils/nameUtils";
import { useLnrGetAddress } from '@linagee/lnr-ethers-react';

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

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("")

  const searchParams = useSearchParams();
  const searchRequest = searchParams.get('search')

  let items = use(queryClient(`search-${searchRequest}`, () => callAPI("graph", JSON.stringify({field: 'domainUtf8', value: searchRequest, offset: 0}))));

  items = hydrateNames(items.results)


  const onPageChange = (page) => { 
    setCurrentPage(page);
  }


    return (
      <div className="flex flex-col justify-center items-center h-full p-5 mt-[60px] m-10">
        <BreadCrumbComponent paths={[{name: "Names", link: "/names"}]}/>
        <div className="flex flex-row w-full items-end justify-between ">
          <div className=" lg:w-[25rem] md:w-[20rem] opacity-75 mt-2">
            <Search />
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
  