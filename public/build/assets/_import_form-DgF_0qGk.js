import{W as g,j as e,A as l,y as o}from"./app-BNDjhMuB.js";import{I as i}from"./InputError-DyL1GXD6.js";import{A as j,a as f,b as D,c as A,d as N,e as I,f as b,g as y}from"./alert-dialog-DoAyoDaK.js";import{B as n}from"./button-CCRufjy2.js";import{I as m}from"./input-CvkLJe1c.js";import{L as F}from"./label-lpIPan_A.js";import{U as v}from"./index-CfjhtM0k.js";import"./index-4OSEfcuy.js";import"./index-CWQ7p_Ha.js";const w=({doc_type:a,importOpen:d,setImportOpen:c})=>{const{data:x,setData:p,post:h,processing:t,errors:r}=g({xlsx:null,doc_type:a,type:""});function u(s){s.preventDefault(),x.xlsx===null&&l.error("Tolong Pilih File XLSX Yang Akan Diimport."),l.loading("Mengimport dokumen..."),h(route("documents.import"),{forceFormData:!0,onSuccess:()=>{o.reload()},onFinish:()=>{o.reload()}})}return e.jsxs(j,{open:d,onOpenChange:s=>c(s),children:[e.jsx(f,{asChild:!0,children:e.jsxs(n,{variant:"secondary",children:[e.jsx(v,{className:"w-5 h-5"}),"Import"]})}),e.jsxs(D,{children:[e.jsxs(A,{children:[e.jsx(N,{children:"Import Documents (xlsx)"}),e.jsxs(I,{children:["Import Dokumen Menggunakan Template Yang Telah Disediakan."," ",e.jsx("a",{href:route("documents.download_template"),className:"text-blue-500",children:"Unduh Template"})]})]}),e.jsxs("form",{onSubmit:u,children:[e.jsxs("div",{className:"mt-4",children:[e.jsxs("div",{className:"mt-4",children:[e.jsx(F,{className:"mb-1",htmlFor:"xlsx",children:"Pilih File XLSX"}),e.jsx(m,{id:"xlsx",name:"xlsx",type:"file",className:"file:text-foreground",accept:".xlsx",onChange:s=>{s.target.files&&p("xlsx",s.target.files[0])}}),e.jsx(i,{message:r.xlsx,className:"mt-2"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(m,{id:"doc_type",name:"doc_type",type:"hidden",value:a,className:"hidden"}),e.jsx(i,{message:r.doc_type,className:"mt-2"})]})]}),e.jsxs(b,{className:"mt-4",children:[e.jsx(y,{disabled:t,children:"Batal"}),e.jsx(n,{type:"submit",disabled:t,children:"Import"})]})]})]})]})};export{w as ImportForm};
