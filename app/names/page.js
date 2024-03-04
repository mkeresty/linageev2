"use client";

import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import Grid from "@/components/Grid";
import InputField from "@/components/forms/InputField";
import { Pagination } from "flowbite-react";
import { useState } from "react";
import { Label, TextInput } from 'flowbite-react';
import { IoSearch } from "react-icons/io5";



export default function Names() {

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
          <form>   
    <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative justify-center">

        <input type="search" id="search" className="block w-full p-y-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
        <button type="submit" className=" absolute end-1 bottom-1 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2  dark:focus:ring-blue-800">
          <IoSearch class="h-4 w-4 " />
        </button>
    </div>
</form>
          </div>
        <Pagination layout="table" showIcons currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}/>
        </div>
        
        <Grid items={itemsnew}/>
        <Pagination layout="table" showIcons currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}/>

      </div>
    );
  }
  