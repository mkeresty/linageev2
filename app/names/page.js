"use client";

import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import Grid from "@/components/Grid";
import { Pagination } from "flowbite-react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from 'next/navigation'
import Search from "@/components/forms/Search";


export default function Names() {

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const searchParams = useSearchParams();
  const search = searchParams.get('search')

  useEffect(() => {
    if(search){
      console.log("searching for: ");
      console.log(search);
    }
  }, [search]);

  const onPageChange = (page) => { 
    setCurrentPage(page);
  }


const itemsnew = [
    {
      title: "Bad",
      normalized: false,
      resolvable: false,
      link: "/",
      thumbnail:
        "linagee/warning.svg",
    },
    {
      title: "437",
      normalized: true,
      resolvable: true,
      link: "/",
      thumbnail:
        "linagee/437.og.svg",
    },
    {
      title: "wizard",
      normalized: true,
      resolvable: true,
      link: "/",
      thumbnail:
        "/linagee/wizard.og.svg",
    },
    {
      title: "0972",
      normalized: true,
      resolvable: true,
      link: "/",
      thumbnail:
        "/linagee/0972.og.svg",
    },
  
    {
      title: "b",
      normalized: true,
      resolvable: true,
      link: "/",
      thumbnail:
        "/linagee/b.og.svg",
    },
    {
      title: "account",
      normalized: true,
      resolvable: true,
      link: "/",
      thumbnail:
        "/linagee/account.og.svg",
    },
    {
      title: "feel",
      normalized: true,
      resolvable: true,
      link: "/",
      thumbnail:
        "/linagee/feel.og.svg",
    },
  
    {
      title: "jess",
      normalized: true,
      resolvable: true,
      link: "/",
      thumbnail:
        "linagee/jess.og.svg",
    },
    {
      title: "robot",
      normalized: true,
      resolvable: true,
      link: "/",
      thumbnail:
        "/linagee/robot.og.svg",
    },
    {
      title: "vacation",
      normalized: true,
      resolvable: true,
      link: "/",
      thumbnail:
        "/linagee/vacation.og.svg",
    },
    {
      title: "844",
      normalized: true,
      resolvable: true,
      link: "/",
      thumbnail:
        "/linagee/844.og.svg",
    },
    {
      title: "ai",
      normalized: true,
      resolvable: true,
      link: "/",
      thumbnail:
        "/linagee/ai.og.svg",
    },
  
    {
      title: "advertising",
      normalized: true,
      resolvable: true,
      link: "/",
      thumbnail:
        "/linagee/advertising.og.svg",
    },
    {
      title: "pfp",
      normalized: true,
      resolvable: true,
      link: "/",
      thumbnail:
        "/linagee/pfp.og.svg",
    },
    {
      title: "the",
      normalized: true,
      resolvable: true,
      link: "/",
      thumbnail:
        "/linagee/the.og.svg",
    },
    {
      title: "bobby",
      normalized: true,
      resolvable: true,
      link: "/",
      thumbnail:
        "/linagee/bobby.og.svg",
    },
  ];
  


    return (
      <div className="flex flex-col justify-center items-center h-full p-5 mt-[60px] m-10">
        <BreadCrumbComponent paths={[{name: "Names", link: "/names"}]}/>
        <div className="flex flex-row w-full items-end justify-between ">
          <div className=" lg:w-[25rem] md:w-[20rem] opacity-75">
            <Search />
          </div>
        <Pagination layout="table" showIcons currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}/>
        </div>
        
        <Grid items={itemsnew}/>
        <Pagination layout="table" showIcons currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}/>

      </div>
    );
  }
  