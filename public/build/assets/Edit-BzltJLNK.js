import{r as a,j as e,Y as n}from"./app-BNDjhMuB.js";import{A as p}from"./AuthenticatedLayout-dr0awWZy.js";import{DocumentForm as c}from"./_form-DRbGPxl3.js";import"./button-CCRufjy2.js";import"./index-CfjhtM0k.js";import"./index-4OSEfcuy.js";import"./index-BKwPXhZW.js";import"./InputError-DyL1GXD6.js";import"./popover-BxgEQXH-.js";import"./input-CvkLJe1c.js";import"./label-lpIPan_A.js";import"./index-CWQ7p_Ha.js";function k({auth:r,document:t,instances:i}){const[s,m]=a.useState("central");return a.useEffect(()=>{const o=new URL(window.location.href).searchParams.get("type");o&&m(o)},[s]),e.jsxs(p,{user:r.user,header:e.jsx("div",{className:"flex items-center justify-between gap-2",children:e.jsxs("h2",{className:"text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200",children:['Ubah Berkas "',t.from,'"']})}),children:[e.jsx(n,{title:`Ubah Berkas "${t.from}"`}),e.jsx("div",{className:"px-8 mx-auto max-w-[1728px]",children:e.jsx(c,{userId:r.user.id,docType:s,document:t,instances:i})})]})}export{k as default};