"use client";

import React, {Fragment, useState} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { BsCopy } from "react-icons/bs";
import { PiSealCheck } from "react-icons/pi";


export default function CopyClipboard({forWhat, text, fallback = ""}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };


  return (
    <Fragment key={forWhat}> 
    {text ?(
    
    <CopyToClipboard onCopy={handleCopy} text={text}>
        <span className="cursor-pointer flex flex-row items-center gap-2 ">
        {text.length > 10 ? text.substring(0, 4) + "..." + text.slice(-3) : text}
      {copied ? (<PiSealCheck className="w-4 h-4 hover:scale-110 "/>):(<BsCopy className="w-4 h-4 hover:scale-110 "/>)}
      </span>
    </CopyToClipboard>
    ):(
        <span>{fallback}</span>
    )}
    </Fragment>
    
  );

  
};

