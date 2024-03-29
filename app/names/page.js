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
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([]);


  //const { PaginationComponent, targetOffset } = usePaginationHook({props: {itemLength: items.length || 0, nextOffset: items.slice(-1)[0]?.registerIndex || 0, initial: true}})


  async function fetchItems(search, offset, initial = false){ 
        if(search && search.length > 0){
          let respItems = await callAPI("graph", JSON.stringify({field: 'domainUtf8', value: search, offset: offset}));
          respItems = hydrateNames(respItems.results)
          setItems(respItems)
          console.log("items ", respItems)

          }
  }

  useEffect(() => { 
    setLoading(true)
    fetchItems(searchRequest, currentOffset, true)
    setLoading(false)

  }, [currentOffset, searchRequest])


  // const [pages, setPages ] = useState([{p: 1, offset: 0}])
  // const [currentPage, setCurrentPage] = useState(1)

  // async function fetchItems(search, offset, initial = false){

  //   if(search && search.length > 0){
  //     let respItems = await callAPI("graph", JSON.stringify({field: 'domainUtf8', value: search, offset: offset}));
  //     respItems = hydrateNames(respItems.results)
  //     setItems(respItems)
  //     console.log("items ", respItems)
  //     if(respItems.length > 0 && initial === true && parseInt(offset) > 0){
  //       console.log(" initial is not page 1")
  //       updatePages(respItems.slice(-1)[0].registerIndex || 0, initial, [{p: 1, offset: 0}, {p: 2, offset: parseInt(offset)}])
  //     } 
  //     if(respItems.length > 0 && initial === true && parseInt(offset) == 0){
  //       console.log(" initial is page 1")
  //       updatePages(respItems.slice(-1)[0].registerIndex || 0, initial, [{p: 1, offset: 0}])
  //     } 
  //     else if (respItems.length > 0 ){
  //       console.log(" standard page")
  //       updatePages(respItems.slice(-1)[0].registerIndex || 0)

  //     }
  
  //   }
  // }

  // useEffect(() => { 
  //   fetchItems(searchRequest, currentOffset, true)

  // }, [])

//   function updatePages(offset, initial = false, pagesArg = undefined) {
//     console.log("pagesArg entering update ", pagesArg, "pagesss ", pages)
    

//     let maxOffset = Math.max(...pages.map(page => page.offset));
//     console.log("max offset ", maxOffset, "pages ", pages, "offset ", offset)

//       if (offset > maxOffset ) {
//         let prevPages = pages
//         setPages([...prevPages, {p: prevPages.slice(-1)[0].p + 1, offset: offset}])
//       }
//       if (offset > maxOffset && initial === true, pagesArg) {
//         console.log("prev pages ", pagesArg)
//         setPages([...pagesArg, {p: pagesArg.slice(-1)[0].p + 1, offset: offset}])

        
//         console.log("set current  page ", currentPage)
//       }
//       if(parseInt(currentOffset) == 0){
//         console.log("srtting restart")
//         setCurrentPage(1)
//       }
//       if(initial === true && parseInt(currentOffset) > 0){
        
//         setCurrentPage(2)
  
//       }

//   }



//   function findPageByOffset(targetOffset) {
//     for (let i = 0; i < pages.length; i++) {
//       console.log(pages[i])
//         if (pages[i].offset === targetOffset) {
//             return pages[i].p;
//         }
//     }
//     return currentPage + 1;
// }

// function findOffsetByPage(targetPage) {
//   for (let i = 0; i < pages.length; i++) {
//       if (pages[i].p === targetPage) {
//           return pages[i].offset;
//       }
//   }
//   return 0;
// }


// useEffect(() => { console.log("pages ", pages)}, [pages])




//   const handlePageChange = (p) => { 
//     console.log("target page ", p)  

//     if(p < currentPage){
//       setCurrentPage(p)
//       let targetOffset = pages.filter(page => page.p === p)[0].offset || 0
//       router.push(`/names?search=${searchRequest}&offset=${targetOffset}`)
//       //router.push("/names", {query: {search: searchRequest, offset: items.slice(-1)[0].registerIndex || 0}})
//       //window.location.reload();
//       if(p === 1){
//         fetchItems(searchRequest, targetOffset, true)
//       } else{
//         fetchItems(searchRequest, targetOffset)
//       }
  

//     } else{
//       const targetOffset = findOffsetByPage(p)

//       console.log("looking for offset ", targetOffset)

//       setCurrentPage(p)
//       updatePages(targetOffset)
  
//       router.push(`/names?search=${searchRequest}&offset=${targetOffset}`)

//       if(p === 1){
//         fetchItems(searchRequest, targetOffset, true)
//       } else{
//         fetchItems(searchRequest, targetOffset)
//       }
//     }


//   }


    return (
      <div className="flex flex-col justify-center items-center h-full p-5 mt-[60px] m-10">
        <BreadCrumbComponent paths={[{name: "Names", link: "/names"}]}/>
        <div className="flex flex-row w-full items-end justify-between ">
          <div className=" lg:w-[25rem] md:w-[20rem] opacity-75 mt-2">
            <Search />
          </div>

        {/* <Pagination 
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
          /> */}
          {/* {PaginationComponent()} */}
          <PaginationComponent props = {{itemLength: items.length || 0, nextOffset: items.slice(-1)[0]?.registerIndex, loading, path: "names", searchRequest}}/>
          

        </div>
        
        <Grid items={items}/>
        {/* {items && items?.length > 0 && (
        <Pagination />
          )} */}
      </div>
    );
  }
  