import{S as N,A as Z,B as $,C as y,D as j,m,U as g,F as R,G as D,H as V,I as z,J,K as Q,d as W,h as q,L as X,E as k,M as x,N as p,O as ee,P as ae,Q as M,R as U,e as C,T as F,g as re,V as ne,W as te,p as G,X as fe,Y as ie,Z as se,b as H,_ as ue,$ as le,a as ve,a0 as _e,a1 as de,a2 as ce,a3 as be}from"./Dcrv35hV.js";function E(f,c=null,P){if(typeof f!="object"||f===null||N in f)return f;const u=J(f);if(u!==Z&&u!==$)return f;var t=new Map,v=Q(f),b=y(0);v&&t.set("length",y(f.length));var o;return new Proxy(f,{defineProperty(i,e,a){(!("value"in a)||a.configurable===!1||a.enumerable===!1||a.writable===!1)&&z();var n=t.get(e);return n===void 0?(n=y(a.value),t.set(e,n)):R(n,E(a.value,o)),!0},deleteProperty(i,e){var a=t.get(e);if(a===void 0)e in i&&t.set(e,y(g));else{if(v&&typeof e=="string"){var n=t.get("length"),r=Number(e);Number.isInteger(r)&&r<n.v&&R(n,r)}R(a,g),K(b)}return!0},get(i,e,a){var _;if(e===N)return f;var n=t.get(e),r=e in i;if(n===void 0&&(!r||(_=D(i,e))!=null&&_.writable)&&(n=y(E(r?i[e]:g,o)),t.set(e,n)),n!==void 0){var s=m(n);return s===g?void 0:s}return Reflect.get(i,e,a)},getOwnPropertyDescriptor(i,e){var a=Reflect.getOwnPropertyDescriptor(i,e);if(a&&"value"in a){var n=t.get(e);n&&(a.value=m(n))}else if(a===void 0){var r=t.get(e),s=r==null?void 0:r.v;if(r!==void 0&&s!==g)return{enumerable:!0,configurable:!0,value:s,writable:!0}}return a},has(i,e){var s;if(e===N)return!0;var a=t.get(e),n=a!==void 0&&a.v!==g||Reflect.has(i,e);if(a!==void 0||V!==null&&(!n||(s=D(i,e))!=null&&s.writable)){a===void 0&&(a=y(n?E(i[e],o):g),t.set(e,a));var r=m(a);if(r===g)return!1}return n},set(i,e,a,n){var S;var r=t.get(e),s=e in i;if(v&&e==="length")for(var _=a;_<r.v;_+=1){var I=t.get(_+"");I!==void 0?R(I,g):_ in i&&(I=y(g),t.set(_+"",I))}r===void 0?(!s||(S=D(i,e))!=null&&S.writable)&&(r=y(void 0),R(r,E(a,o)),t.set(e,r)):(s=r.v!==g,R(r,E(a,o)));var d=Reflect.getOwnPropertyDescriptor(i,e);if(d!=null&&d.set&&d.set.call(n,a),!s){if(v&&typeof e=="string"){var T=t.get("length"),h=Number(e);Number.isInteger(h)&&h>=T.v&&R(T,h+1)}K(b)}return!0},ownKeys(i){m(b);var e=Reflect.ownKeys(i).filter(r=>{var s=t.get(r);return s===void 0||s.v!==g});for(var[a,n]of t)n.v!==g&&!(a in i)&&e.push(a);return e},setPrototypeOf(){j()}})}function K(f,c=1){R(f,f.v+c)}function Pe(f,c,[P,u]=[0,0]){q&&P===0&&X();var t=f,v=null,b=null,o=g,i=P>0?k:0,e=!1;const a=(r,s=!0)=>{e=!0,n(s,r)},n=(r,s)=>{if(o===(o=r))return;let _=!1;if(q&&u!==-1){if(P===0){const d=t.data;d===x?u=0:d===p?u=1/0:(u=parseInt(d.substring(1)),u!==u&&(u=o?1/0:-1))}const I=u>P;!!o===I&&(t=ee(),ae(t),M(!1),_=!0,u=-1)}o?(v?U(v):s&&(v=C(()=>s(t))),b&&F(b,()=>{b=null})):(b?U(b):s&&(b=C(()=>s(t,[P+1,u]))),v&&F(v,()=>{v=null})),_&&M(!0)};W(()=>{e=!1,c(a),e||n(null,null)},i),q&&(t=re)}let w=!1;function ge(f){var c=w;try{return w=!1,[f(),w]}finally{w=c}}function Ie(f,c,P,u){var B;var t=(P&de)!==0,v=!ve||(P&_e)!==0,b=(P&ue)!==0,o=(P&be)!==0,i=!1,e;b?[e,i]=ge(()=>f[c]):e=f[c];var a=N in f||le in f,n=b&&(((B=D(f,c))==null?void 0:B.set)??(a&&c in f&&(l=>f[c]=l)))||void 0,r=u,s=!0,_=!1,I=()=>(_=!0,s&&(s=!1,o?r=H(u):r=u),r);e===void 0&&u!==void 0&&(n&&v&&ne(),e=I(),n&&n(e));var d;if(v)d=()=>{var l=f[c];return l===void 0?I():(s=!0,_=!1,l)};else{var T=(t?G:fe)(()=>f[c]);T.f|=te,d=()=>{var l=m(T);return l!==void 0&&(r=void 0),l===void 0?r:l}}if((P&ie)===0)return d;if(n){var h=f.$$legacy;return function(l,A){return arguments.length>0?((!v||!A||h||i)&&n(A?d():l),l):d()}}var S=!1,L=ce(e),O=G(()=>{var l=d(),A=m(L);return S?(S=!1,A):L.v=l});return t||(O.equals=se),function(l,A){if(arguments.length>0){const Y=A?m(O):v&&b?E(l):l;return O.equals(Y)||(S=!0,R(L,Y),_&&r!==void 0&&(r=Y),H(()=>m(O))),l}return m(O)}}export{E as a,Pe as i,Ie as p};
