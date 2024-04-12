"use client";

import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import Grid from "@/components/Grid";
import { Pagination } from "flowbite-react";
import { useState, useEffect, useContext, use } from "react";
import { useSearchParams, useRouter } from 'next/navigation'
import Search from "@/components/forms/Search";
import { callAPI, makeQueryClient} from "@/utils/utils";
import { callLnrClass, hydrateNames, resolveOrReturnOld } from "@/utils/nameUtils";
import PaginationComponent from "@/components/PaginationComponent";
import { FaCircleCheck } from "react-icons/fa6";
import AnimatedTabs from "@/components/AnimatedTabs";
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers5/react'
import LNR from "@/utils/lnrethers"
import { ethers } from 'ethers';
import { call } from "viem/actions";
import { useLnrCall } from "@/utils/hooks/useLnr";



const queryClient = makeQueryClient();

export default function Profile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchRequest = searchParams.get('search')
  const currentOffset = searchParams.get('offset') || 0;

  const mode = searchParams.get('mode') || "names";

  const [loadingPage, setLoadingPage] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [items, setItems] = useState([]);
  const [next, setNext] = useState(undefined);
  const [ogAddress, setOgAddress] = useState(undefined);
  const [ogName, setOgName] = useState(undefined);
  const [nameOld, setName] = useState(undefined)

  // const { walletProvider } = useWeb3ModalProvider();

  const { data: name, loading, error } = useLnrCall("lookupAddress", searchRequest);


  // const testLnr = async () => {
        
  //       let ethersProvider = new ethers.providers.Web3Provider(walletProvider)
  //       let ethersSigner = await ethersProvider.getSigner()
  //       let lnr = undefined

  //       try{
  //       if(ethersSigner){
  //         lnr = new LNR(ethers, ethersSigner);
            
  //       } else if(ethersProvider) {
  //         lnr = new LNR(ethers, ethersProvider);
  //       }
  //       else{
  //         console.log("no provider")
  //       }

  //       let name = await lnr.lookupAddress(searchRequest)
  //       if(name){
  //         setName(name)
  //       }

  //       let x = await callLnrClass(ethersProvider, "lookupAddress", searchRequest)
  //       console.log("x", x)

  //     } catch(e){
  //       console.log("error", e)
  //     }

    
  // }

  // useEffect(() => {
  //   testLnr()
  // }, [])

  



  



  // TODO: Add error handling and loading

  // useEffect(() => {
  //   console.log("lnr ,", LnrConfig)
  //   //resolveOrReturn(searchRequest)
  // }, [searchRequest]);


//   async function resolveOrReturn(nameAddress){
//     if(ethers.utils.isAddress(nameAddress) == true){
//         setOgAddress(nameAddress)
//         let { name, error, hasError, loading } = useLnrGetPrimaryName(nameAddress);
//         setOgName(name)
//     }
//     else{
//         if(!nameAddress.endsWith(".og")){
//           nameAddress = nameAddress + ".og"
//         }
//         const { address, error, hasError, loading } = useLnrGetAddress(nameAddress);
//           if(ethers.utils.isAddress(address)){
//               setOgAddress(address)
//               setOgName(nameAddress)
//           }
// };
// }


  async function fetchItems(search, offset = 0){ 
    console.log("fetching items", search, offset)
    if(search && search.length > 0 && mode == "names"){
      let respItems = await callAPI("graph", JSON.stringify({field: 'owner', value: search, offset: offset}));
      respItems = hydrateNames(respItems.results)
      setItems(respItems)
      console.log("items names", respItems)

      }
    else if(search && search.length > 0 && mode == "nfts"){
      let respItems = await callAPI("nfts", JSON.stringify({field: 'owner', value: search, cursor: next}));
      if(respItems && respItems.results && respItems.results.nfts){
        console.log("items nfts", respItems)
        setItems([...items, ...respItems.results.nfts])
        if(respItems.results.next){
          setNext(respItems.results.next)
        } else {
          setNext(undefined)
        }
      } else{
        //setItems([])
        //setNext(undefined)
      }
      }
}

    useEffect(() => { 
      setLoadingPage(true)
      fetchItems(searchRequest, currentOffset)
      setLoadingPage(false)
    
      //resolveOrReturnOld(walletProvider, searchRequest)

    }, [currentOffset, searchRequest, mode])

    const fetchMore = () => {
      setLoadingMore(true)
      fetchItems(searchRequest, currentOffset)
      setLoadingMore(false)

      
    }

    const [selected, setSelected] = useState(mode);
    const handleSelection = (index) => {
      console.log("selected", index)
      setItems([])
      setSelected(index)
      router.push(`profile?search=${searchRequest}&mode=${index}`)
    }



    return (
      <div className="flex flex-col justify-center items-center h-full py-5 lg:p-x-5 sm:p-x-2 mt-[60px] m-10">
        <BreadCrumbComponent paths={[{name: "Profile", link: "/names"}]}/>
        <div className="flex flex-row w-full items-end justify-between ">
          <div className="flex flex-col gap-y-2 mt-3">
          <h2 className="text-2xl font-bold">{name}</h2>
          <h3 className="text-md font-light">{(ogAddress && ogAddress.length > 4) ? ogAddress.slice(0,4) +"..."+ogAddress.slice(-4) : ""}</h3>

          </div>

          {mode == "names"  && (
          <PaginationComponent props = {{itemLength: items.length || 0, nextOffset: items.slice(-1)[0]?.registerIndex, loadingPage, path: "profile", ogAddress}}/>
          )}

        </div>

        <AnimatedTabs selected={selected} onSelectionChange={handleSelection}/>

         <Grid items={items} mode={mode}/>

         {next && mode == "nfts" && (
              <button type="button" class="py-2.5 px-5 me-2 mb-2 flex flex-row items-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={fetchMore}>
                {loadingMore &&     
                <svg aria-hidden="true" class="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg> }
            Load More</button>
         )
                }
         {(!next && mode == "nfts") || (items.length == 0) && !loadingPage && !loadingMore && (
         <div className="flex flex-row w-full items-center justify-center mt-5">
          <FaCircleCheck className="mr-3"/> All items loaded
          </div>
        )
        }
        {(loadingPage || loadingMore) && (
         <div className="flex flex-row w-full items-center justify-center">
          <svg aria-hidden="true" class="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>  Loading
          </div>
        )
        }

      </div>
    )
  }
  