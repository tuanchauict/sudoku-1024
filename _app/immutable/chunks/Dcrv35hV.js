var Fn=Array.isArray,Jt=Array.prototype.indexOf,Mn=Array.from,Ln=Object.defineProperty,pt=Object.getOwnPropertyDescriptor,Wt=Object.getOwnPropertyDescriptors,qn=Object.prototype,Yn=Array.prototype,Xt=Object.getPrototypeOf;const Hn=()=>{};function jn(t){return t()}function gt(t){for(var n=0;n<t.length;n++)t[n]()}const y=2,mt=4,J=8,ot=16,D=32,P=64,B=128,E=256,U=512,v=1024,I=2048,C=4096,b=8192,W=16384,Qt=32768,Tt=65536,Bn=1<<17,tn=1<<19,At=1<<20,ht=Symbol("$state"),Un=Symbol("legacy props");function xt(t){return t===this.v}function nn(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function Dt(t){return!nn(t,this.v)}function rn(t){throw new Error("https://svelte.dev/e/effect_in_teardown")}function en(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function an(t){throw new Error("https://svelte.dev/e/effect_orphan")}function ln(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function Vn(){throw new Error("https://svelte.dev/e/hydration_failed")}function Gn(t){throw new Error("https://svelte.dev/e/props_invalid_value")}function Kn(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function Zn(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function sn(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}function un(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}let X=!1;function $n(){X=!0}const zn=1,Jn=2,Wn=4,Xn=8,Qn=16,tr=1,nr=2,rr=4,er=8,ar=16,lr=1,sr=2,on="[",fn="[!",_n="]",Rt={},ur=Symbol();function It(t){console.warn("https://svelte.dev/e/hydration_mismatch")}function cn(t){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}let o=null;function dt(t){o=t}function or(t){return kt().get(t)}function fr(t,n){return kt().set(t,n),n}function ir(t,n=!1,r){o={p:o,c:null,e:null,m:!1,s:t,x:null,l:null},X&&!n&&(o.l={s:null,u:null,r1:[],r2:ft(!1)})}function _r(t){const n=o;if(n!==null){const s=n.e;if(s!==null){var r=f,e=u;n.e=null;try{for(var l=0;l<s.length;l++){var a=s[l];Z(a.effect),K(a.reaction),Lt(a.fn)}}finally{Z(r),K(e)}}o=n.p,n.m=!0}return{}}function Q(){return!X||o!==null&&o.l===null}function kt(t){return o===null&&cn(),o.c??(o.c=new Map(vn(o)||void 0))}function vn(t){let n=t.p;for(;n!==null;){const r=n.c;if(r!==null)return r;n=n.p}return null}function ft(t,n){var r={f:0,v:t,reactions:null,equals:xt,rv:0,wv:0};return r}function cr(t){return Ot(ft(t))}function pn(t,n=!1){var e;const r=ft(t);return n||(r.equals=Dt),X&&o!==null&&o.l!==null&&((e=o.l).s??(e.s=[])).push(r),r}function vr(t,n=!1){return Ot(pn(t,n))}function Ot(t){return u!==null&&!w&&(u.f&y)!==0&&(A===null?Dn([t]):A.push(t)),t}function pr(t,n){return it(t,zt(()=>et(t))),n}function it(t,n){return u!==null&&!w&&Q()&&(u.f&(y|ot))!==0&&(A===null||!A.includes(t))&&un(),hn(t,n)}function hn(t,n){return t.equals(n)||(t.v,t.v=n,t.wv=Gt(),St(t,I),Q()&&f!==null&&(f.f&v)!==0&&(f.f&(D|P))===0&&(x===null?Rn([t]):x.push(t))),n}function hr(t,n=1){var r=et(t),e=n===1?r++:r--;return it(t,r),e}function St(t,n){var r=t.reactions;if(r!==null)for(var e=Q(),l=r.length,a=0;a<l;a++){var s=r[a],i=s.f;(i&I)===0&&(!e&&s===f||(m(s,n),(i&(v|E))!==0&&((i&y)!==0?St(s,C):rt(s))))}}let O=!1;function dr(t){O=t}let g;function q(t){if(t===null)throw It(),Rt;return g=t}function Er(){return q(N(g))}function wr(t){if(O){if(N(g)!==null)throw It(),Rt;g=t}}function yr(t=1){if(O){for(var n=t,r=g;n--;)r=N(r);g=r}}function gr(){for(var t=0,n=g;;){if(n.nodeType===8){var r=n.data;if(r===_n){if(t===0)return n;t-=1}else(r===on||r===fn)&&(t+=1)}var e=N(n);n.remove(),n=e}}var Et,dn,Ct,Nt;function mr(){if(Et===void 0){Et=window,dn=/Firefox/.test(navigator.userAgent);var t=Element.prototype,n=Node.prototype;Ct=pt(n,"firstChild").get,Nt=pt(n,"nextSibling").get,t.__click=void 0,t.__className=void 0,t.__attributes=null,t.__style=void 0,t.__e=void 0,Text.prototype.__t=void 0}}function at(t=""){return document.createTextNode(t)}function lt(t){return Ct.call(t)}function N(t){return Nt.call(t)}function Tr(t,n){if(!O)return lt(t);var r=lt(g);if(r===null)r=g.appendChild(at());else if(n&&r.nodeType!==3){var e=at();return r==null||r.before(e),q(e),e}return q(r),r}function Ar(t,n){if(!O){var r=lt(t);return r instanceof Comment&&r.data===""?N(r):r}return g}function xr(t,n=1,r=!1){let e=O?g:t;for(var l;n--;)l=e,e=N(e);if(!O)return e;var a=e==null?void 0:e.nodeType;if(r&&a!==3){var s=at();return e===null?l==null||l.after(s):e.before(s),q(s),s}return q(e),e}function Dr(t){t.textContent=""}function bt(t){var n=y|I,r=u!==null&&(u.f&y)!==0?u:null;return f===null||r!==null&&(r.f&E)!==0?n|=E:f.f|=At,{ctx:o,deps:null,effects:null,equals:xt,f:n,fn:t,reactions:null,rv:0,v:null,wv:0,parent:r??f}}function Rr(t){const n=bt(t);return n.equals=Dt,n}function Pt(t){var n=t.effects;if(n!==null){t.effects=null;for(var r=0;r<n.length;r+=1)S(n[r])}}function En(t){for(var n=t.parent;n!==null;){if((n.f&y)===0)return n;n=n.parent}return null}function wn(t){var n,r=f;Z(En(t));try{Pt(t),n=Zt(t)}finally{Z(r)}return n}function Ft(t){var n=wn(t),r=(R||(t.f&E)!==0)&&t.deps!==null?C:v;m(t,r),t.equals(n)||(t.v=n,t.wv=Gt())}function Mt(t){f===null&&u===null&&an(),u!==null&&(u.f&E)!==0&&f===null&&en(),ct&&rn()}function yn(t,n){var r=n.last;r===null?n.last=n.first=t:(r.next=t,t.prev=r,n.last=t)}function F(t,n,r,e=!0){var l=f,a={ctx:o,deps:null,nodes_start:null,nodes_end:null,f:t|I,first:null,fn:n,last:null,next:null,parent:l,prev:null,teardown:null,transitions:null,wv:0};if(r)try{nt(a),a.f|=Qt}catch(_){throw S(a),_}else n!==null&&rt(a);var s=r&&a.deps===null&&a.first===null&&a.nodes_start===null&&a.teardown===null&&(a.f&(At|B))===0;if(!s&&e&&(l!==null&&yn(a,l),u!==null&&(u.f&y)!==0)){var i=u;(i.effects??(i.effects=[])).push(a)}return a}function Ir(t){const n=F(J,null,!1);return m(n,v),n.teardown=t,n}function kr(t){Mt();var n=f!==null&&(f.f&D)!==0&&o!==null&&!o.m;if(n){var r=o;(r.e??(r.e=[])).push({fn:t,effect:f,reaction:u})}else{var e=Lt(t);return e}}function Or(t){return Mt(),_t(t)}function Sr(t){const n=F(P,t,!0);return(r={})=>new Promise(e=>{r.outro?Tn(n,()=>{S(n),e(void 0)}):(S(n),e(void 0))})}function Lt(t){return F(mt,t,!1)}function Cr(t,n){var r=o,e={effect:null,ran:!1};r.l.r1.push(e),e.effect=_t(()=>{t(),!e.ran&&(e.ran=!0,it(r.l.r2,!0),zt(n))})}function Nr(){var t=o;_t(()=>{if(et(t.l.r2)){for(var n of t.l.r1){var r=n.effect;(r.f&v)!==0&&m(r,C),M(r)&&nt(r),n.ran=!1}t.l.r2.v=!1}})}function _t(t){return F(J,t,!0)}function br(t,n=[],r=bt){const e=n.map(r);return gn(()=>t(...e.map(et)))}function gn(t,n=0){return F(J|ot|n,t,!0)}function Pr(t,n=!0){return F(J|D,t,!0,n)}function qt(t){var n=t.teardown;if(n!==null){const r=ct,e=u;yt(!0),K(null);try{n.call(null)}finally{yt(r),K(e)}}}function Yt(t,n=!1){var r=t.first;for(t.first=t.last=null;r!==null;){var e=r.next;(r.f&P)!==0?r.parent=null:S(r,n),r=e}}function mn(t){for(var n=t.first;n!==null;){var r=n.next;(n.f&D)===0&&S(n),n=r}}function S(t,n=!0){var r=!1;if((n||(t.f&tn)!==0)&&t.nodes_start!==null){for(var e=t.nodes_start,l=t.nodes_end;e!==null;){var a=e===l?null:N(e);e.remove(),e=a}r=!0}Yt(t,n&&!r),z(t,0),m(t,W);var s=t.transitions;if(s!==null)for(const _ of s)_.stop();qt(t);var i=t.parent;i!==null&&i.first!==null&&Ht(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.fn=t.nodes_start=t.nodes_end=null}function Ht(t){var n=t.parent,r=t.prev,e=t.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),n!==null&&(n.first===t&&(n.first=e),n.last===t&&(n.last=r))}function Tn(t,n){var r=[];jt(t,r,!0),An(r,()=>{S(t),n&&n()})}function An(t,n){var r=t.length;if(r>0){var e=()=>--r||n();for(var l of t)l.out(e)}else n()}function jt(t,n,r){if((t.f&b)===0){if(t.f^=b,t.transitions!==null)for(const s of t.transitions)(s.is_global||r)&&n.push(s);for(var e=t.first;e!==null;){var l=e.next,a=(e.f&Tt)!==0||(e.f&D)!==0;jt(e,n,a?r:!1),e=l}}}function Fr(t){Bt(t,!0)}function Bt(t,n){if((t.f&b)!==0){t.f^=b,(t.f&v)===0&&(t.f^=v),M(t)&&(m(t,I),rt(t));for(var r=t.first;r!==null;){var e=r.next,l=(r.f&Tt)!==0||(r.f&D)!==0;Bt(r,l?n:!1),r=e}if(t.transitions!==null)for(const a of t.transitions)(a.is_global||n)&&a.in()}}let Y=[],st=[];function Ut(){var t=Y;Y=[],gt(t)}function xn(){var t=st;st=[],gt(t)}function Mr(t){Y.length===0&&queueMicrotask(Ut),Y.push(t)}function wt(){Y.length>0&&Ut(),st.length>0&&xn()}let j=!1,V=!1,G=null,k=!1,ct=!1;function yt(t){ct=t}let L=[];let u=null,w=!1;function K(t){u=t}let f=null;function Z(t){f=t}let A=null;function Dn(t){A=t}let c=null,d=0,x=null;function Rn(t){x=t}let Vt=1,$=0,R=!1;function Gt(){return++Vt}function M(t){var p;var n=t.f;if((n&I)!==0)return!0;if((n&C)!==0){var r=t.deps,e=(n&E)!==0;if(r!==null){var l,a,s=(n&U)!==0,i=e&&f!==null&&!R,_=r.length;if(s||i){var T=t,H=T.parent;for(l=0;l<_;l++)a=r[l],(s||!((p=a==null?void 0:a.reactions)!=null&&p.includes(T)))&&(a.reactions??(a.reactions=[])).push(T);s&&(T.f^=U),i&&H!==null&&(H.f&E)===0&&(T.f^=E)}for(l=0;l<_;l++)if(a=r[l],M(a)&&Ft(a),a.wv>t.wv)return!0}(!e||f!==null&&!R)&&m(t,v)}return!1}function In(t,n){for(var r=n;r!==null;){if((r.f&B)!==0)try{r.fn(t);return}catch{r.f^=B}r=r.parent}throw j=!1,t}function kn(t){return(t.f&W)===0&&(t.parent===null||(t.parent.f&B)===0)}function tt(t,n,r,e){if(j){if(r===null&&(j=!1),kn(n))throw t;return}r!==null&&(j=!0);{In(t,n);return}}function Kt(t,n,r=!0){var e=t.reactions;if(e!==null)for(var l=0;l<e.length;l++){var a=e[l];(a.f&y)!==0?Kt(a,n,!1):n===a&&(r?m(a,I):(a.f&v)!==0&&m(a,C),rt(a))}}function Zt(t){var vt;var n=c,r=d,e=x,l=u,a=R,s=A,i=o,_=w,T=t.f;c=null,d=0,x=null,R=(T&E)!==0&&(w||!k||u===null),u=(T&(D|P))===0?t:null,A=null,dt(t.ctx),w=!1,$++;try{var H=(0,t.fn)(),p=t.deps;if(c!==null){var h;if(z(t,d),p!==null&&d>0)for(p.length=d+c.length,h=0;h<c.length;h++)p[d+h]=c[h];else t.deps=p=c;if(!R)for(h=d;h<p.length;h++)((vt=p[h]).reactions??(vt.reactions=[])).push(t)}else p!==null&&d<p.length&&(z(t,d),p.length=d);if(Q()&&x!==null&&!w&&p!==null&&(t.f&(y|C|I))===0)for(h=0;h<x.length;h++)Kt(x[h],t);return l!==null&&$++,H}finally{c=n,d=r,x=e,u=l,R=a,A=s,dt(i),w=_}}function On(t,n){let r=n.reactions;if(r!==null){var e=Jt.call(r,t);if(e!==-1){var l=r.length-1;l===0?r=n.reactions=null:(r[e]=r[l],r.pop())}}r===null&&(n.f&y)!==0&&(c===null||!c.includes(n))&&(m(n,C),(n.f&(E|U))===0&&(n.f^=U),Pt(n),z(n,0))}function z(t,n){var r=t.deps;if(r!==null)for(var e=n;e<r.length;e++)On(t,r[e])}function nt(t){var n=t.f;if((n&W)===0){m(t,v);var r=f,e=o,l=k;f=t,k=!0;try{(n&ot)!==0?mn(t):Yt(t),qt(t);var a=Zt(t);t.teardown=typeof a=="function"?a:null,t.wv=Vt;var s=t.deps,i}catch(_){tt(_,t,r,e||t.ctx)}finally{k=l,f=r}}}function Sn(){try{ln()}catch(t){if(G!==null)tt(t,G,null);else throw t}}function $t(){var t=k;try{var n=0;for(k=!0;L.length>0;){n++>1e3&&Sn();var r=L,e=r.length;L=[];for(var l=0;l<e;l++){var a=Nn(r[l]);Cn(a)}}}finally{V=!1,k=t,G=null}}function Cn(t){var n=t.length;if(n!==0)for(var r=0;r<n;r++){var e=t[r];if((e.f&(W|b))===0)try{M(e)&&(nt(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?Ht(e):e.fn=null))}catch(l){tt(l,e,null,e.ctx)}}}function rt(t){V||(V=!0,queueMicrotask($t));for(var n=G=t;n.parent!==null;){n=n.parent;var r=n.f;if((r&(P|D))!==0){if((r&v)===0)return;n.f^=v}}L.push(n)}function Nn(t){for(var n=[],r=t;r!==null;){var e=r.f,l=(e&(D|P))!==0,a=l&&(e&v)!==0;if(!a&&(e&b)===0){if((e&mt)!==0)n.push(r);else if(l)r.f^=v;else{var s=u;try{u=r,M(r)&&nt(r)}catch(T){tt(T,r,null,r.ctx)}finally{u=s}}var i=r.first;if(i!==null){r=i;continue}}var _=r.parent;for(r=r.next;r===null&&_!==null;)r=_.next,_=_.parent}return n}function bn(t){var n;for(wt();L.length>0;)V=!0,$t(),wt();return n}async function Lr(){await Promise.resolve(),bn()}function et(t){var n=t.f,r=(n&y)!==0;if(u!==null&&!w){A!==null&&A.includes(t)&&sn();var e=u.deps;t.rv<$&&(t.rv=$,c===null&&e!==null&&e[d]===t?d++:c===null?c=[t]:(!R||!c.includes(t))&&c.push(t))}else if(r&&t.deps===null&&t.effects===null){var l=t,a=l.parent;a!==null&&(a.f&E)===0&&(l.f^=E)}return r&&(l=t,M(l)&&Ft(l)),t.v}function zt(t){var n=w;try{return w=!0,t()}finally{w=n}}const Pn=-7169;function m(t,n){t.f=t.f&Pn|n}function qr(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(ht in t)ut(t);else if(!Array.isArray(t))for(let n in t){const r=t[n];typeof r=="object"&&r&&ht in r&&ut(r)}}}function ut(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t),t instanceof Date&&t.getTime();for(let e in t)try{ut(t[e],n)}catch{}const r=Xt(t);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=Wt(r);for(let l in e){const a=e[l].get;if(a)try{a.call(t)}catch{}}}}}export{Un as $,qn as A,Yn as B,ft as C,Zn as D,Tt as E,it as F,pt as G,f as H,Kn as I,Xt as J,Fn as K,Er as L,on as M,fn as N,gr as O,q as P,dr as Q,Fr as R,ht as S,Tn as T,ur as U,Gn as V,Bn as W,Rr as X,rr as Y,Dt as Z,er as _,X as a,nr as a0,tr as a1,pn as a2,ar as a3,Ir as a4,K as a5,Z as a6,u as a7,Mr as a8,Ln as a9,cr as aA,Lr as aB,fr as aC,or as aD,Cr as aE,vr as aF,Nr as aG,hr as aH,Et as aI,pr as aJ,nn as aK,mr as aa,lt as ab,N as ac,Rt as ad,_n as ae,It as af,Vn as ag,Dr as ah,Mn as ai,Sr as aj,at as ak,dn as al,lr as am,sr as an,Wn as ao,b as ap,zn as aq,hn as ar,Jn as as,Xn as at,jt as au,An as av,Qn as aw,Lt as ax,_t as ay,bn as az,zt as b,o as c,gn as d,Pr as e,S as f,g,O as h,Ar as i,Or as j,jn as k,cn as l,et as m,Hn as n,qr as o,bt as p,$n as q,gt as r,ir as s,br as t,kr as u,_r as v,Tr as w,wr as x,xr as y,yr as z};
