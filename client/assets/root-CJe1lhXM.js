import{r as i,j as t}from"./jsx-runtime-56DGgGmo.js";import{l as f,n as y,o as x,p as g,_ as S,O as w,S as l,M as j,L as k}from"./components-Ciyp1X6x.js";/**
 * @remix-run/react v2.12.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let a="positions";function M({getKey:e,...c}){let{isSpaMode:p}=f(),r=y(),u=x();g({getKey:e,storageKey:a});let h=i.useMemo(()=>{if(!e)return null;let s=e(r,u);return s!==r.key?s:null},[]);if(p)return null;let m=((s,d)=>{if(!window.history.state||!window.history.state.key){let o=Math.random().toString(32).slice(2);window.history.replaceState({key:o},"")}try{let n=JSON.parse(sessionStorage.getItem(s)||"{}")[d||window.history.state.key];typeof n=="number"&&window.scrollTo(0,n)}catch(o){console.error(o),sessionStorage.removeItem(s)}}).toString();return i.createElement("script",S({},c,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${m})(${JSON.stringify(a)}, ${JSON.stringify(h)})`}}))}const I=()=>[{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"}];function R({children:e}){return t.jsxs("html",{lang:"en",children:[t.jsxs("head",{children:[t.jsx("meta",{charSet:"utf-8"}),t.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),t.jsx(j,{}),t.jsx(k,{})]}),t.jsxs("body",{children:[e,t.jsx(M,{}),t.jsx(l,{})]})]})}function _(){return t.jsxs(t.Fragment,{children:[t.jsx(w,{}),t.jsx(l,{})]})}export{R as Layout,_ as default,I as links};
