var Jt=t=>{throw TypeError(t)};var Oe=(t,e,n)=>e.has(t)||Jt("Cannot "+n);var A=(t,e,n)=>(Oe(t,e,"read from private field"),n?n.call(t):e.get(t)),P=(t,e,n)=>e.has(t)?Jt("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n);import{aN as M,b as Ne,aO as je,r as $e,ar as C,g as O,A as N,as as De}from"./D4frfRg2.js";import{o as Xt}from"./CxcJMqRD.js";function Be(t,e,n){if(t==null)return e(void 0),n&&n(void 0),M;const r=Ne(()=>t.subscribe(e,n));return r.unsubscribe?()=>r.unsubscribe():r}const q=[];function Fe(t,e){return{subscribe:At(t,e).subscribe}}function At(t,e=M){let n=null;const r=new Set;function a(o){if(je(t,o)&&(t=o,n)){const c=!q.length;for(const l of r)l[1](),q.push(l,t);if(c){for(let l=0;l<q.length;l+=2)q[l][0](q[l+1]);q.length=0}}}function s(o){a(o(t))}function i(o,c=M){const l=[o,c];return r.add(l),r.size===1&&(n=e(a,s)||M),o(t),()=>{r.delete(l),r.size===0&&n&&(n(),n=null)}}return{set:a,update:s,subscribe:i}}function Hn(t,e,n){const r=!Array.isArray(t),a=r?[t]:t;if(!a.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const s=e.length<2;return Fe(n,(i,o)=>{let c=!1;const l=[];let p=0,u=M;const y=()=>{if(p)return;u();const m=e(r?l[0]:l,i,o);s?i(m):u=typeof m=="function"?m:M},f=a.map((m,d)=>Be(m,h=>{l[d]=h,p&=~(1<<d),c&&y()},()=>{p|=1<<d}));return c=!0,y(),function(){$e(f),u(),c=!1}})}new URL("sveltekit-internal://");function Ve(t,e){return t==="/"||e==="ignore"?t:e==="never"?t.endsWith("/")?t.slice(0,-1):t:e==="always"&&!t.endsWith("/")?t+"/":t}function qe(t){return t.split("%25").map(decodeURI).join("%25")}function Ge(t){for(const e in t)t[e]=decodeURIComponent(t[e]);return t}function Lt({href:t}){return t.split("#")[0]}function Me(t,e,n,r=!1){const a=new URL(t);Object.defineProperty(a,"searchParams",{value:new Proxy(a.searchParams,{get(i,o){if(o==="get"||o==="getAll"||o==="has")return l=>(n(l),i[o](l));e();const c=Reflect.get(i,o);return typeof c=="function"?c.bind(i):c}}),enumerable:!0,configurable:!0});const s=["href","pathname","search","toString","toJSON"];r&&s.push("hash");for(const i of s)Object.defineProperty(a,i,{get(){return e(),t[i]},enumerable:!0,configurable:!0});return a}function He(...t){let e=5381;for(const n of t)if(typeof n=="string"){let r=n.length;for(;r;)e=e*33^n.charCodeAt(--r)}else if(ArrayBuffer.isView(n)){const r=new Uint8Array(n.buffer,n.byteOffset,n.byteLength);let a=r.length;for(;a;)e=e*33^r[--a]}else throw new TypeError("value must be a string or TypedArray");return(e>>>0).toString(36)}function Ke(t){const e=atob(t),n=new Uint8Array(e.length);for(let r=0;r<e.length;r++)n[r]=e.charCodeAt(r);return n.buffer}const We=window.fetch;window.fetch=(t,e)=>((t instanceof Request?t.method:(e==null?void 0:e.method)||"GET")!=="GET"&&z.delete(jt(t)),We(t,e));const z=new Map;function Ye(t,e){const n=jt(t,e),r=document.querySelector(n);if(r!=null&&r.textContent){let{body:a,...s}=JSON.parse(r.textContent);const i=r.getAttribute("data-ttl");return i&&z.set(n,{body:a,init:s,ttl:1e3*Number(i)}),r.getAttribute("data-b64")!==null&&(a=Ke(a)),Promise.resolve(new Response(a,s))}return window.fetch(t,e)}function ze(t,e,n){if(z.size>0){const r=jt(t,n),a=z.get(r);if(a){if(performance.now()<a.ttl&&["default","force-cache","only-if-cached",void 0].includes(n==null?void 0:n.cache))return new Response(a.body,a.init);z.delete(r)}}return window.fetch(e,n)}function jt(t,e){let r=`script[data-sveltekit-fetched][data-url=${JSON.stringify(t instanceof Request?t.url:t)}]`;if(e!=null&&e.headers||e!=null&&e.body){const a=[];e.headers&&a.push([...new Headers(e.headers)].join(",")),e.body&&(typeof e.body=="string"||ArrayBuffer.isView(e.body))&&a.push(e.body),r+=`[data-hash="${He(...a)}"]`}return r}const Je=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function Xe(t){const e=[];return{pattern:t==="/"?/^\/$/:new RegExp(`^${Qe(t).map(r=>{const a=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(r);if(a)return e.push({name:a[1],matcher:a[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const s=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(r);if(s)return e.push({name:s[1],matcher:s[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!r)return;const i=r.split(/\[(.+?)\](?!\])/);return"/"+i.map((c,l)=>{if(l%2){if(c.startsWith("x+"))return Tt(String.fromCharCode(parseInt(c.slice(2),16)));if(c.startsWith("u+"))return Tt(String.fromCharCode(...c.slice(2).split("-").map(d=>parseInt(d,16))));const p=Je.exec(c),[,u,y,f,m]=p;return e.push({name:f,matcher:m,optional:!!u,rest:!!y,chained:y?l===1&&i[0]==="":!1}),y?"(.*?)":u?"([^/]*)?":"([^/]+?)"}return Tt(c)}).join("")}).join("")}/?$`),params:e}}function Ze(t){return!/^\([^)]+\)$/.test(t)}function Qe(t){return t.slice(1).split("/").filter(Ze)}function tn(t,e,n){const r={},a=t.slice(1),s=a.filter(o=>o!==void 0);let i=0;for(let o=0;o<e.length;o+=1){const c=e[o];let l=a[o-i];if(c.chained&&c.rest&&i&&(l=a.slice(o-i,o+1).filter(p=>p).join("/"),i=0),l===void 0){c.rest&&(r[c.name]="");continue}if(!c.matcher||n[c.matcher](l)){r[c.name]=l;const p=e[o+1],u=a[o+1];p&&!p.rest&&p.optional&&u&&c.chained&&(i=0),!p&&!u&&Object.keys(r).length===s.length&&(i=0);continue}if(c.optional&&c.chained){i++;continue}return}if(!i)return r}function Tt(t){return t.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function en({nodes:t,server_loads:e,dictionary:n,matchers:r}){const a=new Set(e);return Object.entries(n).map(([o,[c,l,p]])=>{const{pattern:u,params:y}=Xe(o),f={id:o,exec:m=>{const d=u.exec(m);if(d)return tn(d,y,r)},errors:[1,...p||[]].map(m=>t[m]),layouts:[0,...l||[]].map(i),leaf:s(c)};return f.errors.length=f.layouts.length=Math.max(f.errors.length,f.layouts.length),f});function s(o){const c=o<0;return c&&(o=~o),[c,t[o]]}function i(o){return o===void 0?o:[a.has(o),t[o]]}}function de(t,e=JSON.parse){try{return e(sessionStorage[t])}catch{}}function Zt(t,e,n=JSON.stringify){const r=n(e);try{sessionStorage[t]=r}catch{}}var ie;const x=((ie=globalThis.__sveltekit_17q4ad)==null?void 0:ie.base)??"/sudoku-1024";var ce;const nn=((ce=globalThis.__sveltekit_17q4ad)==null?void 0:ce.assets)??x,rn="1742091013468",he="sveltekit:snapshot",pe="sveltekit:scroll",ge="sveltekit:states",an="sveltekit:pageurl",H="sveltekit:history",Z="sveltekit:navigation",B={tap:1,hover:2,viewport:3,eager:4,off:-1,false:-1},dt=location.origin;function me(t){if(t instanceof URL)return t;let e=document.baseURI;if(!e){const n=document.getElementsByTagName("base");e=n.length?n[0].href:document.URL}return new URL(t,e)}function $t(){return{x:pageXOffset,y:pageYOffset}}function G(t,e){return t.getAttribute(`data-sveltekit-${e}`)}const Qt={...B,"":B.hover};function ye(t){let e=t.assignedSlot??t.parentNode;return(e==null?void 0:e.nodeType)===11&&(e=e.host),e}function we(t,e){for(;t&&t!==e;){if(t.nodeName.toUpperCase()==="A"&&t.hasAttribute("href"))return t;t=ye(t)}}function Ct(t,e,n){let r;try{if(r=new URL(t instanceof SVGAElement?t.href.baseVal:t.href,document.baseURI),n&&r.hash.match(/^#[^/]/)){const o=location.hash.split("#")[1]||"/";r.hash=`#${o}${r.hash}`}}catch{}const a=t instanceof SVGAElement?t.target.baseVal:t.target,s=!r||!!a||kt(r,e,n)||(t.getAttribute("rel")||"").split(/\s+/).includes("external"),i=(r==null?void 0:r.origin)===dt&&t.hasAttribute("download");return{url:r,external:s,target:a,download:i}}function pt(t){let e=null,n=null,r=null,a=null,s=null,i=null,o=t;for(;o&&o!==document.documentElement;)r===null&&(r=G(o,"preload-code")),a===null&&(a=G(o,"preload-data")),e===null&&(e=G(o,"keepfocus")),n===null&&(n=G(o,"noscroll")),s===null&&(s=G(o,"reload")),i===null&&(i=G(o,"replacestate")),o=ye(o);function c(l){switch(l){case"":case"true":return!0;case"off":case"false":return!1;default:return}}return{preload_code:Qt[r??"off"],preload_data:Qt[a??"off"],keepfocus:c(e),noscroll:c(n),reload:c(s),replace_state:c(i)}}function te(t){const e=At(t);let n=!0;function r(){n=!0,e.update(i=>i)}function a(i){n=!1,e.set(i)}function s(i){let o;return e.subscribe(c=>{(o===void 0||n&&c!==o)&&i(o=c)})}return{notify:r,set:a,subscribe:s}}const _e={v:()=>{}};function on(){const{set:t,subscribe:e}=At(!1);let n;async function r(){clearTimeout(n);try{const a=await fetch(`${nn}/app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(!a.ok)return!1;const i=(await a.json()).version!==rn;return i&&(t(!0),_e.v(),clearTimeout(n)),i}catch{return!1}}return{subscribe:e,check:r}}function kt(t,e,n){return t.origin!==dt||!t.pathname.startsWith(e)?!0:n?!(t.pathname===e+"/"||t.pathname===e+"/index.html"||t.protocol==="file:"&&t.pathname.replace(/\/[^/]+\.html?$/,"")===e):!1}function Kn(t){}function ee(t){const e=cn(t),n=new ArrayBuffer(e.length),r=new DataView(n);for(let a=0;a<n.byteLength;a++)r.setUint8(a,e.charCodeAt(a));return n}const sn="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function cn(t){t.length%4===0&&(t=t.replace(/==?$/,""));let e="",n=0,r=0;for(let a=0;a<t.length;a++)n<<=6,n|=sn.indexOf(t[a]),r+=6,r===24&&(e+=String.fromCharCode((n&16711680)>>16),e+=String.fromCharCode((n&65280)>>8),e+=String.fromCharCode(n&255),n=r=0);return r===12?(n>>=4,e+=String.fromCharCode(n)):r===18&&(n>>=2,e+=String.fromCharCode((n&65280)>>8),e+=String.fromCharCode(n&255)),e}const ln=-1,fn=-2,un=-3,dn=-4,hn=-5,pn=-6;function gn(t,e){if(typeof t=="number")return a(t,!0);if(!Array.isArray(t)||t.length===0)throw new Error("Invalid input");const n=t,r=Array(n.length);function a(s,i=!1){if(s===ln)return;if(s===un)return NaN;if(s===dn)return 1/0;if(s===hn)return-1/0;if(s===pn)return-0;if(i)throw new Error("Invalid input");if(s in r)return r[s];const o=n[s];if(!o||typeof o!="object")r[s]=o;else if(Array.isArray(o))if(typeof o[0]=="string"){const c=o[0],l=e==null?void 0:e[c];if(l)return r[s]=l(a(o[1]));switch(c){case"Date":r[s]=new Date(o[1]);break;case"Set":const p=new Set;r[s]=p;for(let f=1;f<o.length;f+=1)p.add(a(o[f]));break;case"Map":const u=new Map;r[s]=u;for(let f=1;f<o.length;f+=2)u.set(a(o[f]),a(o[f+1]));break;case"RegExp":r[s]=new RegExp(o[1],o[2]);break;case"Object":r[s]=Object(o[1]);break;case"BigInt":r[s]=BigInt(o[1]);break;case"null":const y=Object.create(null);r[s]=y;for(let f=1;f<o.length;f+=2)y[o[f]]=a(o[f+1]);break;case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":case"BigInt64Array":case"BigUint64Array":{const f=globalThis[c],m=o[1],d=ee(m),h=new f(d);r[s]=h;break}case"ArrayBuffer":{const f=o[1],m=ee(f);r[s]=m;break}default:throw new Error(`Unknown type ${c}`)}}else{const c=new Array(o.length);r[s]=c;for(let l=0;l<o.length;l+=1){const p=o[l];p!==fn&&(c[l]=a(p))}}else{const c={};r[s]=c;for(const l in o){const p=o[l];c[l]=a(p)}}return r[s]}return a(0)}const ve=new Set(["load","prerender","csr","ssr","trailingSlash","config"]);[...ve];const mn=new Set([...ve]);[...mn];function yn(t){return t.filter(e=>e!=null)}class St{constructor(e,n){this.status=e,typeof n=="string"?this.body={message:n}:n?this.body=n:this.body={message:`Error: ${e}`}}toString(){return JSON.stringify(this.body)}}class Dt{constructor(e,n){this.status=e,this.location=n}}class Bt extends Error{constructor(e,n,r){super(r),this.status=e,this.text=n}}const wn="x-sveltekit-invalidated",_n="x-sveltekit-trailing-slash";function gt(t){return t instanceof St||t instanceof Bt?t.status:500}function vn(t){return t instanceof Bt?t.text:"Internal Error"}let U,Q,xt;const bn=Xt.toString().includes("$$")||/function \w+\(\) \{\}/.test(Xt.toString());var nt,rt,at,ot,st,it,ct,lt,le,ft,fe,ut,ue;bn?(U={data:{},form:null,error:null,params:{},route:{id:null},state:{},status:-1,url:new URL("https://example.com")},Q={current:null},xt={current:!1}):(U=new(le=class{constructor(){P(this,nt,C({}));P(this,rt,C(null));P(this,at,C(null));P(this,ot,C({}));P(this,st,C({id:null}));P(this,it,C({}));P(this,ct,C(-1));P(this,lt,C(new URL("https://example.com")))}get data(){return O(A(this,nt))}set data(e){N(A(this,nt),e)}get form(){return O(A(this,rt))}set form(e){N(A(this,rt),e)}get error(){return O(A(this,at))}set error(e){N(A(this,at),e)}get params(){return O(A(this,ot))}set params(e){N(A(this,ot),e)}get route(){return O(A(this,st))}set route(e){N(A(this,st),e)}get state(){return O(A(this,it))}set state(e){N(A(this,it),e)}get status(){return O(A(this,ct))}set status(e){N(A(this,ct),e)}get url(){return O(A(this,lt))}set url(e){N(A(this,lt),e)}},nt=new WeakMap,rt=new WeakMap,at=new WeakMap,ot=new WeakMap,st=new WeakMap,it=new WeakMap,ct=new WeakMap,lt=new WeakMap,le),Q=new(fe=class{constructor(){P(this,ft,C(null))}get current(){return O(A(this,ft))}set current(e){N(A(this,ft),e)}},ft=new WeakMap,fe),xt=new(ue=class{constructor(){P(this,ut,C(!1))}get current(){return O(A(this,ut))}set current(e){N(A(this,ut),e)}},ut=new WeakMap,ue),_e.v=()=>xt.current=!0);function An(t){Object.assign(U,t)}const kn="/__data.json",Sn=".html__data.json";function En(t){return t.endsWith(".html")?t.replace(/\.html$/,Sn):t.replace(/\/$/,"")+kn}const Rn=new Set(["icon","shortcut icon","apple-touch-icon"]),V=de(pe)??{},tt=de(he)??{},$={url:te({}),page:te({}),navigating:At(null),updated:on()};function Ft(t){V[t]=$t()}function In(t,e){let n=t+1;for(;V[n];)delete V[n],n+=1;for(n=e+1;tt[n];)delete tt[n],n+=1}function W(t){return location.href=t.href,new Promise(()=>{})}async function be(){if("serviceWorker"in navigator){const t=await navigator.serviceWorker.getRegistration(x||"/");t&&await t.update()}}function ne(){}let Vt,Ot,mt,j,Nt,k;const yt=[],wt=[];let L=null;const Ae=new Set,Un=new Set,J=new Set;let v={branch:[],error:null,url:null},qt=!1,_t=!1,re=!0,et=!1,Y=!1,ke=!1,Gt=!1,Se,R,T,F;const X=new Set;async function Jn(t,e,n){var a,s,i,o;document.URL!==location.href&&(location.href=location.href),k=t,await((s=(a=t.hooks).init)==null?void 0:s.call(a)),Vt=en(t),j=document.documentElement,Nt=e,Ot=t.nodes[0],mt=t.nodes[1],Ot(),mt(),R=(i=history.state)==null?void 0:i[H],T=(o=history.state)==null?void 0:o[Z],R||(R=T=Date.now(),history.replaceState({...history.state,[H]:R,[Z]:T},""));const r=V[R];r&&(history.scrollRestoration="manual",scrollTo(r.x,r.y)),n?await Bn(Nt,n):await jn(k.hash?Vn(new URL(location.href)):location.href,{replaceState:!0}),Dn()}function Ln(){yt.length=0,Gt=!1}function Ee(t){wt.some(e=>e==null?void 0:e.snapshot)&&(tt[t]=wt.map(e=>{var n;return(n=e==null?void 0:e.snapshot)==null?void 0:n.capture()}))}function Re(t){var e;(e=tt[t])==null||e.forEach((n,r)=>{var a,s;(s=(a=wt[r])==null?void 0:a.snapshot)==null||s.restore(n)})}function ae(){Ft(R),Zt(pe,V),Ee(T),Zt(he,tt)}async function Mt(t,e,n,r){return ht({type:"goto",url:me(t),keepfocus:e.keepFocus,noscroll:e.noScroll,replace_state:e.replaceState,state:e.state,redirect_count:n,nav_token:r,accept:()=>{e.invalidateAll&&(Gt=!0),e.invalidate&&e.invalidate.forEach($n)}})}async function Tn(t){if(t.id!==(L==null?void 0:L.id)){const e={};X.add(e),L={id:t.id,token:e,promise:Ue({...t,preload:e}).then(n=>(X.delete(e),n.type==="loaded"&&n.state.error&&(L=null),n))}}return L.promise}async function Pt(t){var n;const e=(n=await Rt(t,!1))==null?void 0:n.route;e&&await Promise.all([...e.layouts,e.leaf].map(r=>r==null?void 0:r[1]()))}function Ie(t,e,n){var s;v=t.state;const r=document.querySelector("style[data-sveltekit]");r&&r.remove(),Object.assign(U,t.props.page),Se=new k.root({target:e,props:{...t.props,stores:$,components:wt},hydrate:n,sync:!1}),Re(T);const a={from:null,to:{params:v.params,route:{id:((s=v.route)==null?void 0:s.id)??null},url:new URL(location.href)},willUnload:!1,type:"enter",complete:Promise.resolve()};J.forEach(i=>i(a)),_t=!0}function vt({url:t,params:e,branch:n,status:r,error:a,route:s,form:i}){let o="never";if(x&&(t.pathname===x||t.pathname===x+"/"))o="always";else for(const f of n)(f==null?void 0:f.slash)!==void 0&&(o=f.slash);t.pathname=Ve(t.pathname,o),t.search=t.search;const c={type:"loaded",state:{url:t,params:e,branch:n,error:a,route:s},props:{constructors:yn(n).map(f=>f.node.component),page:Wt(U)}};i!==void 0&&(c.props.form=i);let l={},p=!U,u=0;for(let f=0;f<Math.max(n.length,v.branch.length);f+=1){const m=n[f],d=v.branch[f];(m==null?void 0:m.data)!==(d==null?void 0:d.data)&&(p=!0),m&&(l={...l,...m.data},p&&(c.props[`data_${u}`]=l),u+=1)}return(!v.url||t.href!==v.url.href||v.error!==a||i!==void 0&&i!==U.form||p)&&(c.props.page={error:a,params:e,route:{id:(s==null?void 0:s.id)??null},state:{},status:r,url:new URL(t),form:i??null,data:p?l:U.data}),c}async function Ht({loader:t,parent:e,url:n,params:r,route:a,server_data_node:s}){var p,u,y;let i=null,o=!0;const c={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1,search_params:new Set},l=await t();if((p=l.universal)!=null&&p.load){let f=function(...d){for(const h of d){const{href:w}=new URL(h,n);c.dependencies.add(w)}};const m={route:new Proxy(a,{get:(d,h)=>(o&&(c.route=!0),d[h])}),params:new Proxy(r,{get:(d,h)=>(o&&c.params.add(h),d[h])}),data:(s==null?void 0:s.data)??null,url:Me(n,()=>{o&&(c.url=!0)},d=>{o&&c.search_params.add(d)},k.hash),async fetch(d,h){let w;d instanceof Request?(w=d.url,h={body:d.method==="GET"||d.method==="HEAD"?void 0:await d.blob(),cache:d.cache,credentials:d.credentials,headers:[...d.headers].length?d.headers:void 0,integrity:d.integrity,keepalive:d.keepalive,method:d.method,mode:d.mode,redirect:d.redirect,referrer:d.referrer,referrerPolicy:d.referrerPolicy,signal:d.signal,...h}):w=d;const S=new URL(w,n);return o&&f(S.href),S.origin===n.origin&&(w=S.href.slice(n.origin.length)),_t?ze(w,S.href,h):Ye(w,h)},setHeaders:()=>{},depends:f,parent(){return o&&(c.parent=!0),e()},untrack(d){o=!1;try{return d()}finally{o=!0}}};i=await l.universal.load.call(null,m)??null}return{node:l,loader:t,server:s,universal:(u=l.universal)!=null&&u.load?{type:"data",data:i,uses:c}:null,data:i??(s==null?void 0:s.data)??null,slash:((y=l.universal)==null?void 0:y.trailingSlash)??(s==null?void 0:s.slash)}}function oe(t,e,n,r,a,s){if(Gt)return!0;if(!a)return!1;if(a.parent&&t||a.route&&e||a.url&&n)return!0;for(const i of a.search_params)if(r.has(i))return!0;for(const i of a.params)if(s[i]!==v.params[i])return!0;for(const i of a.dependencies)if(yt.some(o=>o(new URL(i))))return!0;return!1}function Kt(t,e){return(t==null?void 0:t.type)==="data"?t:(t==null?void 0:t.type)==="skip"?e??null:null}function xn(t,e){if(!t)return new Set(e.searchParams.keys());const n=new Set([...t.searchParams.keys(),...e.searchParams.keys()]);for(const r of n){const a=t.searchParams.getAll(r),s=e.searchParams.getAll(r);a.every(i=>s.includes(i))&&s.every(i=>a.includes(i))&&n.delete(r)}return n}function se({error:t,url:e,route:n,params:r}){return{type:"loaded",state:{error:t,url:e,route:n,params:r,branch:[]},props:{page:Wt(U),constructors:[]}}}async function Ue({id:t,invalidating:e,url:n,params:r,route:a,preload:s}){if((L==null?void 0:L.id)===t)return X.delete(L.token),L.promise;const{errors:i,layouts:o,leaf:c}=a,l=[...o,c];i.forEach(g=>g==null?void 0:g().catch(()=>{})),l.forEach(g=>g==null?void 0:g[1]().catch(()=>{}));let p=null;const u=v.url?t!==bt(v.url):!1,y=v.route?a.id!==v.route.id:!1,f=xn(v.url,n);let m=!1;const d=l.map((g,_)=>{var D;const b=v.branch[_],E=!!(g!=null&&g[0])&&((b==null?void 0:b.loader)!==g[1]||oe(m,y,u,f,(D=b.server)==null?void 0:D.uses,r));return E&&(m=!0),E});if(d.some(Boolean)){try{p=await xe(n,d)}catch(g){const _=await K(g,{url:n,params:r,route:{id:t}});return X.has(s)?se({error:_,url:n,params:r,route:a}):Et({status:gt(g),error:_,url:n,route:a})}if(p.type==="redirect")return p}const h=p==null?void 0:p.nodes;let w=!1;const S=l.map(async(g,_)=>{var It;if(!g)return;const b=v.branch[_],E=h==null?void 0:h[_];if((!E||E.type==="skip")&&g[1]===(b==null?void 0:b.loader)&&!oe(w,y,u,f,(It=b.universal)==null?void 0:It.uses,r))return b;if(w=!0,(E==null?void 0:E.type)==="error")throw E;return Ht({loader:g[1],url:n,params:r,route:a,parent:async()=>{var zt;const Yt={};for(let Ut=0;Ut<_;Ut+=1)Object.assign(Yt,(zt=await S[Ut])==null?void 0:zt.data);return Yt},server_data_node:Kt(E===void 0&&g[0]?{type:"skip"}:E??null,g[0]?b==null?void 0:b.server:void 0)})});for(const g of S)g.catch(()=>{});const I=[];for(let g=0;g<l.length;g+=1)if(l[g])try{I.push(await S[g])}catch(_){if(_ instanceof Dt)return{type:"redirect",location:_.location};if(X.has(s))return se({error:await K(_,{params:r,url:n,route:{id:a.id}}),url:n,params:r,route:a});let b=gt(_),E;if(h!=null&&h.includes(_))b=_.status??b,E=_.error;else if(_ instanceof St)E=_.body;else{if(await $.updated.check())return await be(),await W(n);E=await K(_,{params:r,url:n,route:{id:a.id}})}const D=await Pn(g,I,i);return D?vt({url:n,params:r,branch:I.slice(0,D.idx).concat(D.node),status:b,error:E,route:a}):await Te(n,{id:a.id},E,b)}else I.push(void 0);return vt({url:n,params:r,branch:I,status:200,error:null,route:a,form:e?void 0:null})}async function Pn(t,e,n){for(;t--;)if(n[t]){let r=t;for(;!e[r];)r-=1;try{return{idx:r+1,node:{node:await n[t](),loader:n[t],data:{},server:null,universal:null}}}catch{continue}}}async function Et({status:t,error:e,url:n,route:r}){const a={};let s=null;if(k.server_loads[0]===0)try{const o=await xe(n,[!0]);if(o.type!=="data"||o.nodes[0]&&o.nodes[0].type!=="data")throw 0;s=o.nodes[0]??null}catch{(n.origin!==dt||n.pathname!==location.pathname||qt)&&await W(n)}try{const o=await Ht({loader:Ot,url:n,params:a,route:r,parent:()=>Promise.resolve({}),server_data_node:Kt(s)}),c={node:await mt(),loader:mt,universal:null,server:null,data:null};return vt({url:n,params:a,branch:[o,c],status:t,error:e,route:null})}catch(o){if(o instanceof Dt)return Mt(new URL(o.location,location.href),{},0);throw o}}async function Cn(t){let e;try{if(e=await k.hooks.reroute({url:new URL(t)})??t,typeof e=="string"){const n=new URL(t);k.hash?n.hash=e:n.pathname=e,e=n}}catch{return}return e}async function Rt(t,e){if(t&&!kt(t,x,k.hash)){const n=await Cn(t);if(!n)return;const r=On(n);for(const a of Vt){const s=a.exec(r);if(s)return{id:bt(t),invalidating:e,route:a,params:Ge(s),url:t}}}}function On(t){return qe(k.hash?t.hash.replace(/^#/,"").replace(/[?#].+/,""):t.pathname.slice(x.length))||"/"}function bt(t){return(k.hash?t.hash.replace(/^#/,""):t.pathname)+t.search}function Le({url:t,type:e,intent:n,delta:r}){let a=!1;const s=Ce(v,n,t,e);r!==void 0&&(s.navigation.delta=r);const i={...s.navigation,cancel:()=>{a=!0,s.reject(new Error("navigation cancelled"))}};return et||Ae.forEach(o=>o(i)),a?null:s}async function ht({type:t,url:e,popped:n,keepfocus:r,noscroll:a,replace_state:s,state:i={},redirect_count:o=0,nav_token:c={},accept:l=ne,block:p=ne}){const u=F;F=c;const y=await Rt(e,!1),f=Le({url:e,type:t,delta:n==null?void 0:n.delta,intent:y});if(!f){p(),F===c&&(F=u);return}const m=R,d=T;l(),et=!0,_t&&$.navigating.set(Q.current=f.navigation);let h=y&&await Ue(y);if(!h){if(kt(e,x,k.hash))return await W(e);h=await Te(e,{id:null},await K(new Bt(404,"Not Found",`Not found: ${e.pathname}`),{url:e,params:{},route:{id:null}}),404)}if(e=(y==null?void 0:y.url)||e,F!==c)return f.reject(new Error("navigation aborted")),!1;if(h.type==="redirect")if(o>=20)h=await Et({status:500,error:await K(new Error("Redirect loop"),{url:e,params:{},route:{id:null}}),url:e,route:{id:null}});else return await Mt(new URL(h.location,e).href,{},o+1,c),!1;else h.props.page.status>=400&&await $.updated.check()&&(await be(),await W(e));if(Ln(),Ft(m),Ee(d),h.props.page.url.pathname!==e.pathname&&(e.pathname=h.props.page.url.pathname),i=n?n.state:i,!n){const g=s?0:1,_={[H]:R+=g,[Z]:T+=g,[ge]:i};(s?history.replaceState:history.pushState).call(history,_,"",e),s||In(R,T)}if(L=null,h.props.page.state=i,_t){v=h.state,h.props.page&&(h.props.page.url=e);const g=(await Promise.all(Array.from(Un,_=>_(f.navigation)))).filter(_=>typeof _=="function");if(g.length>0){let _=function(){g.forEach(b=>{J.delete(b)})};g.push(_),g.forEach(b=>{J.add(b)})}Se.$set(h.props),An(h.props.page),ke=!0}else Ie(h,Nt,!1);const{activeElement:w}=document;await De();const S=n?n.scroll:a?$t():null;if(re){const g=e.hash&&document.getElementById(decodeURIComponent(k.hash?e.hash.split("#")[2]??"":e.hash.slice(1)));S?scrollTo(S.x,S.y):g?g.scrollIntoView():scrollTo(0,0)}const I=document.activeElement!==w&&document.activeElement!==document.body;!r&&!I&&Fn(),re=!0,h.props.page&&Object.assign(U,h.props.page),et=!1,t==="popstate"&&Re(T),f.fulfil(void 0),J.forEach(g=>g(f.navigation)),$.navigating.set(Q.current=null)}async function Te(t,e,n,r){return t.origin===dt&&t.pathname===location.pathname&&!qt?await Et({status:r,error:n,url:t,route:e}):await W(t)}function Nn(){let t,e,n;j.addEventListener("mousemove",o=>{const c=o.target;clearTimeout(t),t=setTimeout(()=>{s(c,B.hover)},20)});function r(o){o.defaultPrevented||s(o.composedPath()[0],B.tap)}j.addEventListener("mousedown",r),j.addEventListener("touchstart",r,{passive:!0});const a=new IntersectionObserver(o=>{for(const c of o)c.isIntersecting&&(Pt(new URL(c.target.href)),a.unobserve(c.target))},{threshold:0});async function s(o,c){const l=we(o,j),p=l===e&&c>=n;if(!l||p)return;const{url:u,external:y,download:f}=Ct(l,x,k.hash);if(y||f)return;const m=pt(l),d=u&&bt(v.url)===bt(u);if(!(m.reload||d))if(c<=m.preload_data){e=l,n=B.tap;const h=await Rt(u,!1);if(!h)return;Tn(h)}else c<=m.preload_code&&(e=l,n=c,Pt(u))}function i(){a.disconnect();for(const o of j.querySelectorAll("a")){const{url:c,external:l,download:p}=Ct(o,x,k.hash);if(l||p)continue;const u=pt(o);u.reload||(u.preload_code===B.viewport&&a.observe(o),u.preload_code===B.eager&&Pt(c))}}J.add(i),i()}function K(t,e){if(t instanceof St)return t.body;const n=gt(t),r=vn(t);return k.hooks.handleError({error:t,event:e,status:n,message:r})??{message:r}}function jn(t,e={}){return t=new URL(me(t)),t.origin!==dt?Promise.reject(new Error("goto: invalid URL")):Mt(t,e,0)}function $n(t){if(typeof t=="function")yt.push(t);else{const{href:e}=new URL(t,location.href);yt.push(n=>n.href===e)}}function Dn(){var e;history.scrollRestoration="manual",addEventListener("beforeunload",n=>{let r=!1;if(ae(),!et){const a=Ce(v,void 0,null,"leave"),s={...a.navigation,cancel:()=>{r=!0,a.reject(new Error("navigation cancelled"))}};Ae.forEach(i=>i(s))}r?(n.preventDefault(),n.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&ae()}),(e=navigator.connection)!=null&&e.saveData||Nn(),j.addEventListener("click",async n=>{if(n.button||n.which!==1||n.metaKey||n.ctrlKey||n.shiftKey||n.altKey||n.defaultPrevented)return;const r=we(n.composedPath()[0],j);if(!r)return;const{url:a,external:s,target:i,download:o}=Ct(r,x,k.hash);if(!a)return;if(i==="_parent"||i==="_top"){if(window.parent!==window)return}else if(i&&i!=="_self")return;const c=pt(r);if(!(r instanceof SVGAElement)&&a.protocol!==location.protocol&&!(a.protocol==="https:"||a.protocol==="http:")||o)return;const[p,u]=(k.hash?a.hash.replace(/^#/,""):a.href).split("#"),y=p===Lt(location);if(s||c.reload&&(!y||!u)){Le({url:a,type:"link"})?et=!0:n.preventDefault();return}if(u!==void 0&&y){const[,f]=v.url.href.split("#");if(f===u){if(n.preventDefault(),u===""||u==="top"&&r.ownerDocument.getElementById("top")===null)window.scrollTo({top:0});else{const m=r.ownerDocument.getElementById(decodeURIComponent(u));m&&(m.scrollIntoView(),m.focus())}return}if(Y=!0,Ft(R),t(a),!c.replace_state)return;Y=!1}n.preventDefault(),await new Promise(f=>{requestAnimationFrame(()=>{setTimeout(f,0)}),setTimeout(f,100)}),await ht({type:"link",url:a,keepfocus:c.keepfocus,noscroll:c.noscroll,replace_state:c.replace_state??a.href===location.href})}),j.addEventListener("submit",n=>{if(n.defaultPrevented)return;const r=HTMLFormElement.prototype.cloneNode.call(n.target),a=n.submitter;if(((a==null?void 0:a.formTarget)||r.target)==="_blank"||((a==null?void 0:a.formMethod)||r.method)!=="get")return;const o=new URL((a==null?void 0:a.hasAttribute("formaction"))&&(a==null?void 0:a.formAction)||r.action);if(kt(o,x,!1))return;const c=n.target,l=pt(c);if(l.reload)return;n.preventDefault(),n.stopPropagation();const p=new FormData(c),u=a==null?void 0:a.getAttribute("name");u&&p.append(u,(a==null?void 0:a.getAttribute("value"))??""),o.search=new URLSearchParams(p).toString(),ht({type:"form",url:o,keepfocus:l.keepfocus,noscroll:l.noscroll,replace_state:l.replace_state??o.href===location.href})}),addEventListener("popstate",async n=>{var r;if((r=n.state)!=null&&r[H]){const a=n.state[H];if(F={},a===R)return;const s=V[a],i=n.state[ge]??{},o=new URL(n.state[an]??location.href),c=n.state[Z],l=v.url?Lt(location)===Lt(v.url):!1;if(c===T&&(ke||l)){i!==U.state&&(U.state=i),t(o),V[R]=$t(),s&&scrollTo(s.x,s.y),R=a;return}const u=a-R;await ht({type:"popstate",url:o,popped:{state:i,scroll:s,delta:u},accept:()=>{R=a,T=c},block:()=>{history.go(-u)},nav_token:F})}else if(!Y){const a=new URL(location.href);t(a),k.hash&&location.reload()}}),addEventListener("hashchange",()=>{Y&&(Y=!1,history.replaceState({...history.state,[H]:++R,[Z]:T},"",location.href))});for(const n of document.querySelectorAll("link"))Rn.has(n.rel)&&(n.href=n.href);addEventListener("pageshow",n=>{n.persisted&&$.navigating.set(Q.current=null)});function t(n){v.url=U.url=n,$.page.set(Wt(U)),$.page.notify()}}async function Bn(t,{status:e=200,error:n,node_ids:r,params:a,route:s,server_route:i,data:o,form:c}){qt=!0;const l=new URL(location.href);let p;({params:a={},route:s={id:null}}=await Rt(l,!1)||{}),p=Vt.find(({id:f})=>f===s.id);let u,y=!0;try{const f=r.map(async(d,h)=>{const w=o[h];return w!=null&&w.uses&&(w.uses=Pe(w.uses)),Ht({loader:k.nodes[d],url:l,params:a,route:s,parent:async()=>{const S={};for(let I=0;I<h;I+=1)Object.assign(S,(await f[I]).data);return S},server_data_node:Kt(w)})}),m=await Promise.all(f);if(p){const d=p.layouts;for(let h=0;h<d.length;h++)d[h]||m.splice(h,0,void 0)}u=vt({url:l,params:a,branch:m,status:e,error:n,form:c,route:p??null})}catch(f){if(f instanceof Dt){await W(new URL(f.location,location.href));return}u=await Et({status:gt(f),error:await K(f,{url:l,params:a,route:s}),url:l,route:s}),t.textContent="",y=!1}u.props.page&&(u.props.page.state={}),Ie(u,t,y)}async function xe(t,e){var s;const n=new URL(t);n.pathname=En(t.pathname),t.pathname.endsWith("/")&&n.searchParams.append(_n,"1"),n.searchParams.append(wn,e.map(i=>i?"1":"0").join(""));const r=window.fetch,a=await r(n.href,{});if(!a.ok){let i;throw(s=a.headers.get("content-type"))!=null&&s.includes("application/json")?i=await a.json():a.status===404?i="Not Found":a.status===500&&(i="Internal Error"),new St(a.status,i)}return new Promise(async i=>{var y;const o=new Map,c=a.body.getReader(),l=new TextDecoder;function p(f){return gn(f,{...k.decoders,Promise:m=>new Promise((d,h)=>{o.set(m,{fulfil:d,reject:h})})})}let u="";for(;;){const{done:f,value:m}=await c.read();if(f&&!u)break;for(u+=!m&&u?`
`:l.decode(m,{stream:!0});;){const d=u.indexOf(`
`);if(d===-1)break;const h=JSON.parse(u.slice(0,d));if(u=u.slice(d+1),h.type==="redirect")return i(h);if(h.type==="data")(y=h.nodes)==null||y.forEach(w=>{(w==null?void 0:w.type)==="data"&&(w.uses=Pe(w.uses),w.data=p(w.data))}),i(h);else if(h.type==="chunk"){const{id:w,data:S,error:I}=h,g=o.get(w);o.delete(w),I?g.reject(p(I)):g.fulfil(p(S))}}}})}function Pe(t){return{dependencies:new Set((t==null?void 0:t.dependencies)??[]),params:new Set((t==null?void 0:t.params)??[]),parent:!!(t!=null&&t.parent),route:!!(t!=null&&t.route),url:!!(t!=null&&t.url),search_params:new Set((t==null?void 0:t.search_params)??[])}}function Fn(){const t=document.querySelector("[autofocus]");if(t)t.focus();else{const e=document.body,n=e.getAttribute("tabindex");e.tabIndex=-1,e.focus({preventScroll:!0,focusVisible:!1}),n!==null?e.setAttribute("tabindex",n):e.removeAttribute("tabindex");const r=getSelection();if(r&&r.type!=="None"){const a=[];for(let s=0;s<r.rangeCount;s+=1)a.push(r.getRangeAt(s));setTimeout(()=>{if(r.rangeCount===a.length){for(let s=0;s<r.rangeCount;s+=1){const i=a[s],o=r.getRangeAt(s);if(i.commonAncestorContainer!==o.commonAncestorContainer||i.startContainer!==o.startContainer||i.endContainer!==o.endContainer||i.startOffset!==o.startOffset||i.endOffset!==o.endOffset)return}r.removeAllRanges()}})}}}function Ce(t,e,n,r){var c,l;let a,s;const i=new Promise((p,u)=>{a=p,s=u});return i.catch(()=>{}),{navigation:{from:{params:t.params,route:{id:((c=t.route)==null?void 0:c.id)??null},url:t.url},to:n&&{params:(e==null?void 0:e.params)??null,route:{id:((l=e==null?void 0:e.route)==null?void 0:l.id)??null},url:n},willUnload:!e,type:r,complete:i},fulfil:a,reject:s}}function Wt(t){return{data:t.data,error:t.error,form:t.form,params:t.params,route:t.route,state:t.state,status:t.status,url:t.url}}function Vn(t){const e=new URL(t);return e.hash=decodeURIComponent(t.hash),e}export{Dt as R,Jn as a,x as b,Hn as d,jn as g,Kn as l,U as p,$ as s,At as w};
