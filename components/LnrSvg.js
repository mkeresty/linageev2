"use client"

import {useRouter} from 'next/navigation'

export default function LnrSvg({item, classVars, mode = undefined}) { 
 
  const router = useRouter();

  const handleClick = () => {
    if(mode == "names"){
      router.push(`/name/${item.domainBytecode}`)
    }

  }

    let color1 = ""
    let color2 = ""
    let warninghint = ""
    let gradientId = ""
    let og = ""

    if(item.normalized == true){

        color1 = "#bd8eff"
        color2 = "#69e0ff"
        warninghint = ""
        gradientId = "3"
        og = `<tspan font-weight="700"  filter="url(#eIBWfmCTQZn2-filter)">.og</tspan>`
    } else {
        color1= "#ff6062"
        color2= "#ff9766"
        warninghint = '<text style="fill: rgb(255, 255, 255); font-family: Roboto; font-size: 80px; white-space: pre;text-align:center;width:100%" text-anchor="middle" x="50%" y="30%">⚠</text>';
        gradientId = "4"
    }


    let svg =
    `   <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:bx="https://boxy-svg.com">
          <defs>
            <style type="text/css">@import url("https://fonts.googleapis.com/css?family=Lato|Open+Sans|Oswald|Raleway|Roboto|Indie+Flower|Gamja+Flower");</style>
            <linearGradient id="gradient-${gradientId}-0" gradientUnits="userSpaceOnUse" x1="252.494" y1="-200.772" x2="252.494" y2="505.543" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" xlink:href="#gradient-${gradientId}"/>
            <linearGradient id="gradient-${gradientId}" bx:pinned="true">
              <stop offset="0.35" style="stop-color: ${color1}; "/>
              <stop offset="1" style="stop-color: ${color2}; "/>
            </linearGradient>
            <linearGradient id="gradient-${gradientId}-1" gradientUnits="userSpaceOnUse" x1="252.494" y1="-2.772" x2="252.494" y2="505.543" xlink:href="#gradient-${gradientId}"/>
            <filter id="eIBWfmCTQZn2-filter" x="-150%" width="400%" y="-150%" height="400%"><feGaussianBlur id="eIBWfmCTQZn2-filter-drop-shadow-0-blur" in="SourceAlpha" stdDeviation="10,10"/><feOffset id="eIBWfmCTQZn2-filter-drop-shadow-0-offset" dx="0" dy="0" result="tmp"/><feFlood id="eIBWfmCTQZn2-filter-drop-shadow-0-flood" flood-color="#fff"/><feComposite id="eIBWfmCTQZn2-filter-drop-shadow-0-composite" operator="in" in2="tmp"/><feMerge id="eIBWfmCTQZn2-filter-drop-shadow-0-merge"><feMergeNode id="eIBWfmCTQZn2-filter-drop-shadow-0-merge-node-1"/><feMergeNode id="eIBWfmCTQZn2-filter-drop-shadow-0-merge-node-2" in="SourceGraphic"/></feMerge></filter>
          </defs>
          <rect x="-1.109" y="-2.772" width="507.206" height="508.315" style="fill: url(#gradient-${gradientId}-0); stroke: url(#gradient-${gradientId}-1);"/>
           <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="enable-background:new -25 -30 89 94" width="84" height="84" viewBox="-25 -30 89 94"><path d="M27.279 51.644a.36.36 0 0 0 .01.378c.114.198.28.198.343.198l6.57.001 24.282-42.058a6.615 6.615 0 0 0 .305-6.102c-1.108-2.433-3.597-3.94-6.271-3.94h-22.12v.007c-1.642.068-3.035 1.347-3.108 3a3.148 3.148 0 0 0 3.108 3.29v.002h2.494L5.515 53.838c-1.249 2.163-1.209 4.759.12 6.895 1.237 1.989 3.461 3.148 5.804 3.148h37.524c1.617 0 3.035-1.184 3.212-2.791a3.15 3.15 0 0 0-3.13-3.508H11.313c-.063 0-.229 0-.343-.198-.114-.198-.031-.342 0-.396L40.146 6.419h12.541c.063 0 .229 0 .343.198.114.198.031.342 0 .396L27.279 51.644z" style="fill:#fff"/></svg>
          ${warninghint}
           <text style="fill: rgb(255, 255, 255); font-family: Roboto; font-size: 70px; letter-spacing:3px;white-space: pre;text-align:center;width:100%" text-anchor="middle" x="50%" y="80%"><tspan>${item.domainUtf8.length > 10 ? item.domainUtf8.substring(0, 10) + "..." : item.domainUtf8}</tspan>${og}</text>
        </svg>
        `
    
    



return(
    <div onClick={handleClick} className={classVars} dangerouslySetInnerHTML={{__html: svg}}></div>
)


}