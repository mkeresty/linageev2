"use client"

import BreadCrumbComponent from "@/components/BreadCrumbComponent";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {useEffect, useState } from "react"


export default function About(){

    const [content, setContent] = useState("");

    useEffect(() => {
      fetch("about.md")
        .then((res) => res.text())
        .then((text) => setContent(text));
    }, []);


    return(
        <div className="flex flex-col justify-center items-center h-full  py-5 lg:p-x-5 sm:p-x-2 mt-[60px] m-10">
        <BreadCrumbComponent paths={[{name: "About", link: "/about"}]}/>
          <h2 className="text-2xl font-bold">About</h2>

            <div className="mt-10 flex flex-col w-auto h-auto bg-white dark:bg-gray-800 shadow-lg rounded-md p-4 prose">
                <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose dark:prose:text-white dark:prose-headings:text-white prose-a:text-blue-600 dark:prose-invert">
                {content}
                </ReactMarkdown>

            </div>


        </div>
    )
}