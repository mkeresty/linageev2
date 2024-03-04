// "use client";

// import React from "react";

// export  const LinageeSvg = ({item}) => {

//   console.log(item)

//     // if(item?.normalized == true){
//     //     return(
//     //     <svg xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com" xmlnsXlink="http://www.w3.org/1999/xlink" width="500" height="500"><defs><linearGradient xlink:href="#gradient-3" id="gradient-3-0" x1="252.494" x2="252.494" y1="-200.772" y2="505.543" gradientUnits="userSpaceOnUse"/><linearGradient bx:pinned="true" id="gradient-3"><stop offset=".35" style="stop-color:#bd8eff"/><stop offset="1" style="stop-color:#69e0ff"/></linearGradient><linearGradient xlink:href="#gradient-3" id="gradient-3-1" x1="252.494" x2="252.494" y1="-2.772" y2="505.543" gradientUnits="userSpaceOnUse"/><filter id="eIBWfmCTQZn2-filter" width="400%" height="400%" x="-150%" y="-150%"><feGaussianBlur id="eIBWfmCTQZn2-filter-drop-shadow-0-blur" in="SourceAlpha" stdDeviation="10,10"/><feOffset id="eIBWfmCTQZn2-filter-drop-shadow-0-offset" dx="0" dy="0" result="tmp"/><feFlood id="eIBWfmCTQZn2-filter-drop-shadow-0-flood" flood-color="#fff"/><feComposite id="eIBWfmCTQZn2-filter-drop-shadow-0-composite" in2="tmp" operator="in"/><feMerge id="eIBWfmCTQZn2-filter-drop-shadow-0-merge"><feMergeNode id="eIBWfmCTQZn2-filter-drop-shadow-0-merge-node-1"/><feMergeNode id="eIBWfmCTQZn2-filter-drop-shadow-0-merge-node-2" in="SourceGraphic"/></feMerge></filter><style>@import url(https://fonts.googleapis.com/css?family=Lato|Open+Sans|Oswald|Raleway|Roboto|Indie+Flower|Gamja+Flower);</style></defs><path d="M-1.109-2.772h507.206v508.315H-1.109z" style="fill:url(#gradient-3-0);stroke:url(#gradient-3-1)"/><svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="84" height="84" style="enable-background:new -25-30 89 94" viewBox="-25 -30 89 94"><path d="M27.279 51.644a.36.36 0 0 0 .01.378c.114.198.28.198.343.198l6.57.001 24.282-42.058a6.615 6.615 0 0 0 .305-6.102c-1.108-2.433-3.597-3.94-6.271-3.94h-22.12v.007c-1.642.068-3.035 1.347-3.108 3a3.148 3.148 0 0 0 3.108 3.29v.002h2.494L5.515 53.838c-1.249 2.163-1.209 4.759.12 6.895 1.237 1.989 3.461 3.148 5.804 3.148h37.524c1.617 0 3.035-1.184 3.212-2.791a3.15 3.15 0 0 0-3.13-3.508H11.313c-.063 0-.229 0-.343-.198-.114-.198-.031-.342 0-.396L40.146 6.419h12.541c.063 0 .229 0 .343.198.114.198.031.342 0 .396L27.279 51.644z" style="fill:#fff"/></svg><text x="50%" y="80%" style="fill:#fff;font-family:Roboto;font-size:70px;letter-spacing:3px;white-space:pre;text-align:center;width:100%" text-anchor="middle"><tspan>{item.title}</tspan>{item.resolvable && (<tspan filter="url(#eIBWfmCTQZn2-filter)" font-weight="700">.og</tspan>)}</text></svg>
    
//     //     )
//     // } else if(item?.normalized == false){
//     //     return(
//     //         <svg xmlns="http://www.w3.org/2000/svg" xmlns:bx="https://boxy-svg.com" xmlnsXlink="http://www.w3.org/1999/xlink" width="500" height="500"><defs><linearGradient xlink:href="#gradient-3" id="gradient-3-0" x1="252.494" x2="252.494" y1="-200.772" y2="505.543" gradientUnits="userSpaceOnUse"/><linearGradient bx:pinned="true" id="gradient-3"><stop offset=".35" style="stop-color:#ff6062"/><stop offset="1" style="stop-color:#ff9766"/></linearGradient><linearGradient xlink:href="#gradient-3" id="gradient-3-1" x1="252.494" x2="252.494" y1="-2.772" y2="505.543" gradientUnits="userSpaceOnUse"/><style>@import url(https://fonts.googleapis.com/css?family=Lato|Open+Sans|Oswald|Raleway|Roboto|Indie+Flower|Gamja+Flower);</style></defs><path d="M-1.109-2.772h507.206v508.315H-1.109z" style="fill:url(#gradient-3-0);stroke:url(#gradient-3-1)"/><svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="84" height="84" style="enable-background:new -25-30 89 94" viewBox="-25 -30 89 94"><path d="M27.279 51.644a.36.36 0 0 0 .01.378c.114.198.28.198.343.198l6.57.001 24.282-42.058a6.615 6.615 0 0 0 .305-6.102c-1.108-2.433-3.597-3.94-6.271-3.94h-22.12v.007c-1.642.068-3.035 1.347-3.108 3a3.148 3.148 0 0 0 3.108 3.29v.002h2.494L5.515 53.838c-1.249 2.163-1.209 4.759.12 6.895 1.237 1.989 3.461 3.148 5.804 3.148h37.524c1.617 0 3.035-1.184 3.212-2.791a3.15 3.15 0 0 0-3.13-3.508H11.313c-.063 0-.229 0-.343-.198-.114-.198-.031-.342 0-.396L40.146 6.419h12.541c.063 0 .229 0 .343.198.114.198.031.342 0 .396L27.279 51.644z" style="fill:#fff"/></svg><text x="50%" y="30%" style="fill:#fff;font-family:Roboto;font-size:80px;white-space:pre;text-align:center;width:100%" text-anchor="middle">⚠</text><text x="50%" y="80%" style="fill:#fff;font-family:Roboto;font-size:70px;letter-spacing:3px;white-space:pre;text-align:center;width:100%" text-anchor="middle">{item.title}</text></svg>
//     // )}

//     // return(
//     //     <React.Component>
//     //     <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlnsBx="https://boxy-svg.com" xmlnsXlink="http://www.w3.org/1999/xlink">
//     //     <defs>
//     //     <linearGradient id="c" x1="252.49" x2="252.49" y1="-200.77" y2="505.54" gradientUnits="userSpaceOnUse" xlink:href="#a"/>
//     //     <linearGradient id="a" bx:pinned="true">
//     //     <stop stop-color="#bd8eff" offset=".35"/>
//     //     <stop stop-color="#69e0ff" offset="1"/>
//     //     </linearGradient>
//     //     <linearGradient id="b" x1="252.49" x2="252.49" y1="-2.772" y2="505.54" gradientUnits="userSpaceOnUse" xlink:href="#a"/>
//     //     <filter id="d" x="-150%" y="-150%" width="400%" height="400%">
//     //     <feGaussianBlur in="SourceAlpha" stdDeviation="10,10"/>
//     //     <feOffset dx="0" dy="0" result="tmp"/>
//     //     <feFlood flood-color="#fff"/>
//     //     <feComposite in2="tmp" operator="in"/>
//     //     <feMerge>
//     //     <feMergeNode/>
//     //     <feMergeNode in="SourceGraphic"/>
//     //     </feMerge>
//     //     </filter>
//     //     <style>@import url(https://fonts.googleapis.com/css?family=Lato|Open+Sans|Oswald|Raleway|Roboto|Indie+Flower|Gamja+Flower);</style>
//     //     </defs>
//     //     <path d="m-1.109-2.772h507.21v508.32h-507.21z" fill="url(#c)" stroke="url(#b)"/>
//     //     <svg width="84" height="84" enable-background="new -25-30 89 94" viewBox="-25 -30 89 94" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg"><path d="M27.279 51.644a.36.36 0 0 0 .01.378c.114.198.28.198.343.198l6.57.001 24.282-42.058a6.615 6.615 0 0 0 .305-6.102c-1.108-2.433-3.597-3.94-6.271-3.94h-22.12v.007c-1.642.068-3.035 1.347-3.108 3a3.148 3.148 0 0 0 3.108 3.29v.002h2.494L5.515 53.838c-1.249 2.163-1.209 4.759.12 6.895 1.237 1.989 3.461 3.148 5.804 3.148h37.524c1.617 0 3.035-1.184 3.212-2.791a3.15 3.15 0 0 0-3.13-3.508H11.313c-.063 0-.229 0-.343-.198-.114-.198-.031-.342 0-.396L40.146 6.419h12.541c.063 0 .229 0 .343.198.114.198.031.342 0 .396L27.279 51.644z" fill="#fff"/></svg>
//     //     <text x="50%" y="80%" fill="#fff" font-family="Roboto" font-size="70px" letter-spacing="3px" text-align="center" text-anchor="middle" style="white-space:pre;width:100%"><tspan>844</tspan><tspan filter="url(#d)" font-weight="700">.og</tspan></text>
//     //     </svg>
//     //     </ React.Component>
//     // )

//     return(
//         <svg
//         xmlns="http://www.w3.org/2000/svg"
//         xmlnsBx="https://boxy-svg.com"
//         xmlnsXlink="http://www.w3.org/1999/xlink"
//         width="500"
//         height="500"
//       >
//         <defs>
//           <linearGradient
//             id="gradient-3-0"
//             x1="252.494"
//             x2="252.494"
//             y1="-200.772"
//             y2="505.543"
//             gradientUnits="userSpaceOnUse"
//             xlinkHref="#gradient-3"
//           ></linearGradient>
//           <linearGradient id="gradient-3" bxPinned="true">
//             <stop offset="0.35" stopColor="#bd8eff"></stop>
//             <stop offset="1" stopColor="#69e0ff"></stop>
//           </linearGradient>
//           <linearGradient
//             id="gradient-3-1"
//             x1="252.494"
//             x2="252.494"
//             y1="-2.772"
//             y2="505.543"
//             gradientUnits="userSpaceOnUse"
//             xlinkHref="#gradient-3"
//           ></linearGradient>
//           <filter
//             id="eIBWfmCTQZn2-filter"
//             width="400%"
//             height="400%"
//             x="-150%"
//             y="-150%"
//           >
//             <feGaussianBlur
//               id="eIBWfmCTQZn2-filter-drop-shadow-0-blur"
//               in="SourceAlpha"
//               stdDeviation="10,10"
//             ></feGaussianBlur>
//             <feOffset
//               id="eIBWfmCTQZn2-filter-drop-shadow-0-offset"
//               dx="0"
//               dy="0"
//               result="tmp"
//             ></feOffset>
//             <feFlood
//               id="eIBWfmCTQZn2-filter-drop-shadow-0-flood"
//               floodColor="#fff"
//             ></feFlood>
//             <feComposite
//               id="eIBWfmCTQZn2-filter-drop-shadow-0-composite"
//               in2="tmp"
//               operator="in"
//             ></feComposite>
//             <feMerge id="eIBWfmCTQZn2-filter-drop-shadow-0-merge">
//               <feMergeNode id="eIBWfmCTQZn2-filter-drop-shadow-0-merge-node-1"></feMergeNode>
//               <feMergeNode
//                 id="eIBWfmCTQZn2-filter-drop-shadow-0-merge-node-2"
//                 in="SourceGraphic"
//               ></feMergeNode>
//             </feMerge>
//           </filter>
//           <style>
//             @import
//             url(https://fonts.googleapis.com/css?family=Lato|Open+Sans|Oswald|Raleway|Roboto|Indie+Flower|Gamja+Flower);
//           </style>
//         </defs>
//         <path
//           fill="url(#gradient-3-0)"
//           stroke="url(#gradient-3-1)"
//           d="M-1.109-2.772h507.206v508.315H-1.109z"
//         ></path>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="84"
//           height="84"
//           enableBackground="new -25-30 89 94"
//           viewBox="-25 -30 89 94"
//         >
//           <path
//             fill="#fff"
//             d="M27.279 51.644a.36.36 0 00.01.378c.114.198.28.198.343.198l6.57.001 24.282-42.058a6.615 6.615 0 00.305-6.102c-1.108-2.433-3.597-3.94-6.271-3.94h-22.12v.007c-1.642.068-3.035 1.347-3.108 3a3.148 3.148 0 003.108 3.29v.002h2.494L5.515 53.838c-1.249 2.163-1.209 4.759.12 6.895 1.237 1.989 3.461 3.148 5.804 3.148h37.524c1.617 0 3.035-1.184 3.212-2.791a3.15 3.15 0 00-3.13-3.508H11.313c-.063 0-.229 0-.343-.198-.114-.198-.031-.342 0-.396L40.146 6.419h12.541c.063 0 .229 0 .343.198.114.198.031.342 0 .396L27.279 51.644z"
//           ></path>
//         </svg>
//         <text
//           x="50%"
//           y="80%"
//           style={{
//             whiteSpace: "pre",
//             WebkitTextAlign: "center",
//             textAlign: "center",
//             width: "100%",
//           }}
//           fill="#fff"
//           fontFamily="Roboto"
//           fontSize="70"
//           letterSpacing="3"
//           textAnchor="middle"
//         >
//           <tspan>844</tspan>
//           {item?.resolvable && (
//           <tspan filter="url(#eIBWfmCTQZn2-filter)" fontWeight="700">
//             .og
//           </tspan>
//           )}
//         </text>
//       </svg>
//     )

// }