import{a3 as l,a4 as u,a5 as h,G as m,a6 as E,a7 as g,o as f,p as o,K as T,O as w}from"./Dc_OS3HN.js";function p(r){var t=document.createElement("template");return t.innerHTML=r,t.content}function a(r,t){var e=m;e.nodes_start===null&&(e.nodes_start=r,e.nodes_end=t)}function x(r,t){var e=(t&E)!==0,_=(t&g)!==0,n,d=!r.startsWith("<!>");return()=>{if(f)return a(o,null),o;n===void 0&&(n=p(d?r:"<!>"+r),e||(n=u(n)));var s=_||h?document.importNode(n,!0):n.cloneNode(!0);if(e){var c=u(s),i=s.lastChild;a(c,i)}else a(s,s);return s}}function M(r,t,e="svg"){var _=!r.startsWith("<!>"),n=`<${e}>${_?r:"<!>"+r}</${e}>`,d;return()=>{if(f)return a(o,null),o;if(!d){var s=p(n),c=u(s);d=u(c)}var i=d.cloneNode(!0);return a(i,i),i}}function L(r=""){if(!f){var t=l(r+"");return a(t,t),t}var e=o;return e.nodeType!==3&&(e.before(e=l()),w(e)),a(e,e),e}function O(){if(f)return a(o,null),o;var r=document.createDocumentFragment(),t=document.createComment(""),e=l();return r.append(t,e),a(t,e),r}function P(r,t){if(f){m.nodes_end=o,T();return}r!==null&&r.before(t)}const y="5";var v;typeof window<"u"&&((v=window.__svelte??(window.__svelte={})).v??(v.v=new Set)).add(y);export{P as a,a as b,O as c,L as d,M as n,x as t};
