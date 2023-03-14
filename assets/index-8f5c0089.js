import{r as d,p as j,a as p,u as C,c as F,d as L,j as h,F as I,e as a,G as k,T as z,A as E,I as M,f as P,C as R,S as W,R as x,g as y,h as H,i as O,k as T,M as $,l as A,m as V}from"./vendor-31518fed.js";import{e as v,a as G,v as N}from"./esbuild-13695101.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(e){if(e.ep)return;e.ep=!0;const n=s(e);fetch(e.href,n)}})();function q(t){const[o,s]=d.useState("");return d.useEffect(()=>{U(t,s)},[t]),o}const D=_(async()=>{try{await v.initialize({wasmURL:G})}catch{}});async function U(t,o){const{files:s,entrypoint:r}=K(t);try{let e={entryPoints:[r]};const n=s.get("/config.json");n!==void 0&&(e={...e,...j(n)}),e={...e,bundle:!0,logLevel:"silent",packages:"external",plugins:[{name:"vfs",setup:i=>{i.onResolve({filter:/.*/},c=>{const u=p.posix.normalize(p.posix.join(c.resolveDir,c.path));let f;if(s.has(u))f=u;else for(const w of S){const g=`${u}${w}`;if(s.has(g)){f=g;break}}if(f!==void 0)return{path:f}}),i.onLoad({filter:/.*/},c=>{const u=s.get(c.path);if(u!==void 0)return{contents:u,loader:B(c.path)}})}}]},await D();const l=await v.build(e);o(l.outputFiles[0].text)}catch(e){o(`${e}`)}}const S=[".tsx",".ts",".mts",".cts",".jsx",".js",".mjs",".cjs"];function B(t){switch(p.posix.extname(t)){case".js":case".mjs":case".cjs":return"js";case".jsx":return"jsx";case".ts":case".mts":case".cts":return"ts";case".tsx":return"tsx";case".json":return"json";default:return}}const b="/index.tsx",m=/^\s*\/\/\s*@filename:\s*(.+)$/gim;function K(t){if(m.lastIndex=0,!m.test(t))return{files:new Map([[b,t]]),entrypoint:b};const o=t.split(/\r?\n/g);let s,r=[];const e=new Map;function n(){s&&e.set(s,r.join(`
`))}for(const i of o){m.lastIndex=0;const c=m.exec(i);if(c){n(),s=p.posix.resolve("/",c[1]),r=[];continue}s&&r.push(i)}n();let l=s;for(const i of S){const c=`/index${i}`;if(e.has(c)){l=c;break}}return{files:e,entrypoint:l}}function _(t){let o;return()=>o??(o=t())}function J(){const[t,o]=d.useState(window.location.hash),s=r=>{const e=r.startsWith("#")?r:`#${r}`;window.location.hash=e,o(e)};return C("hashchange",()=>{const r=window.location.hash;t!==r&&o(t)}),d.useEffect(()=>{o(window.location.hash)},[]),[t,s]}const Q=`
// @filename: config.json
{
  "entryPoints": ["/index.tsx"],
  "format": "esm"
}

// @filename: index.tsx
import { add } from "./adder";
import logToFile from "./logToFile";

export function App() {
  return (<p>Hello, world! {add(1, 2)}</p>);
}

export function log() {
  logToFile("woo")
}

// @filename: adder.ts
export function add(a: number, b: number) {
  return a + b;
}

// @filename: logToFile.js
const fs = require("fs");

module.exports = (message) => {
  fs.appendFileSync("/log.txt", message);
}
`.trim();function X(){const{colorScheme:t,toggleColorScheme:o}=F(),[s,r]=J(),e=d.useMemo(()=>{if(s.startsWith("#"))try{return atob(s.slice(1))}catch{}return Q},[s]),[n]=L(e,200),l=q(n);return h(I,{children:[a("div",{style:{position:"absolute",top:0,right:0,margin:"1rem",zIndex:1},children:h(k,{children:[h(z,{component:"a",href:"https://esbuild.github.io/",target:"_blank",children:["esbuild v",N]}),a(E,{variant:"outline",onClick:()=>o(),size:"lg",sx:i=>({backgroundColor:i.colorScheme==="dark"?i.colors.dark[6]:i.colors.gray[0],color:i.colorScheme==="dark"?i.colors.yellow[4]:i.colors.blue[6]}),children:t==="dark"?a(M,{size:18}):a(P,{size:18})})]})}),a(R,{fluid:!0,p:0,children:h(W,{cols:2,p:0,spacing:0,breakpoints:[{minWidth:800,cols:2},{maxWidth:800,cols:1,spacing:"sm"}],children:[a(x,{theme:t,autoFocus:!0,height:"100vh",value:e,onChange:i=>r("#"+btoa(i)),extensions:[y({jsx:!0,typescript:!0})]}),a(x,{theme:t,readOnly:!0,height:"100vh",value:l,extensions:[y()]})]})})]})}function Y(){const t=H(),[o,s]=O({key:"mantine-color-scheme",defaultValue:t,getInitialValueInEffect:!0});return a(T,{colorScheme:o,toggleColorScheme:e=>s(e||(o==="dark"?"light":"dark")),children:a($,{withGlobalStyles:!0,withNormalizeCSS:!0,theme:{colorScheme:o},children:a(X,{})})})}A.createRoot(document.querySelector("#root")).render(a(V.StrictMode,{children:a(Y,{})}));
