import{ak as c,ab as u,al as h,H as v,am as g,an as E,h as f,g as s,L as T,P as w}from"./Dcrv35hV.js";function p(r){var t=document.createElement("template");return t.innerHTML=r,t.content}function a(r,t){var e=v;e.nodes_start===null&&(e.nodes_start=r,e.nodes_end=t)}function x(r,t){var e=(t&g)!==0,_=(t&E)!==0,n,d=!r.startsWith("<!>");return()=>{if(f)return a(s,null),s;n===void 0&&(n=p(d?r:"<!>"+r),e||(n=u(n)));var o=_||h?document.importNode(n,!0):n.cloneNode(!0);if(e){var l=u(o),i=o.lastChild;a(l,i)}else a(o,o);return o}}function L(r,t,e="svg"){var _=!r.startsWith("<!>"),n=`<${e}>${_?r:"<!>"+r}</${e}>`,d;return()=>{if(f)return a(s,null),s;if(!d){var o=p(n),l=u(o);d=u(l)}var i=d.cloneNode(!0);return a(i,i),i}}function M(r=""){if(!f){var t=c(r+"");return a(t,t),t}var e=s;return e.nodeType!==3&&(e.before(e=c()),w(e)),a(e,e),e}function P(){if(f)return a(s,null),s;var r=document.createDocumentFragment(),t=document.createComment(""),e=c();return r.append(t,e),a(t,e),r}function b(r,t){if(f){v.nodes_end=s,T();return}r!==null&&r.before(t)}const y="5";var m;typeof window<"u"&&((m=window.__svelte??(window.__svelte={})).v??(m.v=new Set)).add(y);export{b as a,a as b,P as c,M as d,L as n,x as t};
