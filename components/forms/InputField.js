
'use client';

import { Label, TextInput } from 'flowbite-react';
import { IoSearch } from "react-icons/io5";


export default function InputField() {
  return (
    <div className="max-w-sm opacity-75">
      <div className="my-4 block">
      </div>
      <TextInput withShadow={"on"} id="domain" type="text" rightIcon={IoSearch} placeholder="name.og"/>
    </div>
  );
}
