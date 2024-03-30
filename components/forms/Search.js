"use client"

import { IoSearch } from "react-icons/io5";
import { useSearchParams, useRouter } from 'next/navigation'
import { lnr } from '@linagee/lnr-ethers-react';
import { use, useState, useEffect } from "react";
import { ethers }from 'ethers';
import dictionary from "@/utils/dictionary";
import Trie from "@/utils/trie";

export default function Search(){
    
    const [searchName, setSearchName] = useState("");
    const [prefix, setPrefix] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const router = useRouter();

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
            // console.log(bytes);
            console.log("searching for ", stringName)
            
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
      setSearchName(e.target.value);
      var value = e.target.value;
      setPrefix(value);
      var words = value.split(" ");
      var trie_prefix = words[words.length - 1].toLowerCase();
      var found_words = myTrie.find(trie_prefix).sort((a, b) => {
        return a.length - b.length;
      });
      console.log("found words ", found_words)
      var first_word = found_words[0];
      if (
        found_words.length !== 0 &&
        value !== "" &&
        value[value.length - 1] !== " "
      ) {
        if (first_word != null) {
          var remainder = first_word.slice(trie_prefix.length);
          handleSuggestions(value + remainder, found_words);
        }
      } else {
        handleSuggestions(value, found_words);
      }
    };

    function handleSuggestions(word, arr) {
        // Check if the word is already in the array
        if (!arr.includes(word)) {
          // If not, prepend the word to the array
          arr.unshift(word);
        }
        // Limit the array to 5 elements using slice
        setSuggestions(arr.slice(-5));
      }


    return(
        <>
            <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative justify-center">
                <form onSubmit={handleSearch}>
                <input onChange={(e)=>onChange(e)}  type="search" id="search" className="block w-full p-y-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 opacity-75" placeholder="Search" required />
                <button onClick={handleSearch} type="submit" className=" absolute end-1 bottom-1 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2  dark:focus:ring-blue-800">
                    <IoSearch className="h-4 w-4 " />
                </button>
                </form>
            </div>
        </>
    )
}