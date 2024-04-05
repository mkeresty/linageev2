"use client"

import {Tabs, Tab} from "@nextui-org/react";
import { useState } from "react";

let tabs = [
  { id: "names", label: "Names" },
  { id: "nfts", label: "Nfts" },

];

const spanVariants = {
    inactive: { opacity: 0 },
    active: { opacity: 1, transition: { duration: 0.3 } }, // Adjust opacity and transition
  };

export default function AnimatedTabs(props) {

    const {selected, onSelectionChange} = props

    

      return (
            <Tabs  variant={"light"} aria-label="Tabs"
            selectedKey={selected}
            onSelectionChange={onSelectionChange}
            classNames={{
                next: "hover:!bg-gradient-to-b  hover:!from-[#bd8eff] hover:!to-[#69e0ff]  hover:text-white ",
                prev: "hover:!bg-gradient-to-b  hover:!from-[#bd8eff] hover:!to-[#69e0ff]  hover:text-white ",
                item: "hover:!bg-gradient-to-b text-white  hover:!from-[#bd8eff] hover:!to-[#69e0ff]  hover:text-white ",
                cursor:
                  "text-white bg-gradient-to-b !shadow-md dark:!shadow-blue-500/[0.5] from-[#bd8eff] to-[#69e0ff] text-white font-bold hover:!border-0 ",
              }}>
                {tabs.map((tab) => (
                  <Tab key={tab.id} title={tab.label}>
                  </Tab>
                ))
                }
            </Tabs>
      );
    }
    