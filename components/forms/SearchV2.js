"use client";

import React, { use, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdMenu , IoIosClose} from "react-icons/io";
import { useRouter } from "next/navigation";
import ThemeChanger from "@/components/ThemeChanger";
import { useCurrentWidth } from "@/utils/hooks/useCurrentWidth";
import Hamburger from 'hamburger-react'
import { IoSearch } from "react-icons/io5";
import { ethers }from 'ethers';
import dictionary from "@/utils/dictionary";
import Trie from "@/utils/trie";


const names = [ "bob", "joe", "sue", "jane"];

export default function SearchV2(props = {styles: "", initialStyles: "opacity-75 ", stylesList : "", initialStylesList: "h-0 opacity-75"}) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const width = useCurrentWidth();



    const [searchName, setSearchName] = useState("");
    const [prefix, setPrefix] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleSearch = (e) =>{
        e.preventDefault();
        let stringName = searchName;
        if(ethers.utils.isAddress(stringName) === true){
            router.push(`/profile?address=${stringName}`)
            return
        }
        if(stringName.length < 1){
            return;
        }
        if(stringName.endsWith(".og")){
            stringName = stringName.slice(0, -3);
        }

        try{
            // const bytes = lnr.utils.domainToBytes32(stringName)
            
            router.push(`/names/?search=${stringName}`)
            return
        } 
        catch(e){
            console.log(e);
        }

    }

    var myTrie = new Trie();

    (async()=>{
      // const dictionary = await getWords();
      const words = dictionary.commonWords;
      for (let i = 0; i < words.length; i++) {
          const word = words[i];
          myTrie.insert(word)
      }
    })();

    
  
    const onChange = (e) => {
      setSearchName(e);
      var value = e
      setPrefix(value);
      var words = value.split(" ");
      var trie_prefix = words[words.length - 1].toLowerCase();
      var found_words = myTrie.find(trie_prefix).sort((a, b) => {
        return a.length - b.length;
      });
      var first_word = found_words[0];
      if (
        found_words.length !== 0 &&
        value !== "" &&
        value[value.length - 1] !== " "
      ) {
        if (first_word != null) {
          var remainder = first_word.slice(trie_prefix.length);
          //handleSuggestions(value + remainder, found_words);
          handleSuggestions(value, found_words);
        }
      } else {
        setSuggestions([]);
        //handleSuggestions(value, found_words);
      }
      
      
    };

    function handleSuggestions(word, arr) {
        // Check if the word is already in the array
        if (!arr.includes(word)) {
          // If not, prepend the word to the array
          arr.unshift(word);
        }
        // Limit the array to 5 elements using slice
        setSuggestions(arr.slice(0, 5));
      }






      useEffect(() => { 
        if (width >= 768) {
          setIsOpen(false);
        }
      }, [width]);



      useEffect(() => {
        if(suggestions.length > 0){
            setIsOpen(true);
        }
        else if (suggestions.length === 0){
            setIsOpen(false);
        }

      }, [suggestions])
    
  
    return (
        <div className="w-full relative flex overflow-x-clip z-[300]">
            <div className={`${isOpen ? "rounded-b-none" : props.initialStyles} ${props.styles} transition ease-in-out delay-30 duration-50 w-full  flex flex-row items-center bg-white dark:bg-gray-800 rounded-xl pl-1 h-[50px] z-40`}>
                    <form formnovalidate required={false} novalidate aria-hidden="true" onSubmit={handleSearch} className="w-full focus:outline-none focus:ring-0" >
                        <label htmlFor="search" className=" text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <input onChange={(e)=>onChange(e.target.value)} value={searchName} autoComplete="off"  type="search" id="search" className={"w-full p-y-2 bg-transparent border border-none focus:outline-none focus:ring-0 text-sm text-gray-900 rounded-lg focus:outline-none focus:ring-0 dark:placeholder-gray-400 dark:text-white z-40"} placeholder="Search"  />
                        <button onSubmit={handleSearch} type="submit" className="absolute right-0 mt-[2px] focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-4 py-2">
                            <IoSearch className="h-4 w-4 hover:scale-110 ease-in-out duration-100" />
                        </button>
                    </form>
            </div>


<motion.div
        layout
        data-isopen={isOpen}
        className={`${isOpen ? "shadow-lg mt-2" : props.initialStylesList} ${props.stylesList}  rounded-b-xl bg-white dark:bg-gray-800 w-full flex flex-col mx-auto overflow-hidden absolute mt-[49px]` }
        onClick={() => setIsOpen(!isOpen)}
      >

        {isOpen && ( 
            <motion.ul
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: .3 }}
                className={`w-full h-full flex flex-col justify-center items-center mb-2 `}
                onClick={() => setIsOpen(!isOpen)} 
            >
                {suggestions && suggestions.map((name) => (
                <motion.li
                    layout
                    key={name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={()=>setSearchName(name)}
                    className={` hover:cursor-pointer w-full p-2 font-light text-left text-sm indent-2.5 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white`}
                >
                    {name}
                </motion.li>
                ))}
            </motion.ul>
            
        )}
      </motion.div>



      </div>
    );
  }

  