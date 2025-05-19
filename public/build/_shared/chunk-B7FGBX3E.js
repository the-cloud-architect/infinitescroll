import{a as k}from"/build/_shared/chunk-2Z2BTQU4.js";import{d as w}from"/build/_shared/chunk-ZT4QWOFN.js";var i=w(k());var P=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),T=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,u,o)=>o?o.toUpperCase():u.toLowerCase()),n=t=>{let e=T(t);return e.charAt(0).toUpperCase()+e.slice(1)},s=(...t)=>t.filter((e,u,o)=>Boolean(e)&&e.trim()!==""&&o.indexOf(e)===u).join(" ").trim(),A=t=>{for(let e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};var r=w(k());var B={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};var F=(0,r.forwardRef)(({color:t="currentColor",size:e=24,strokeWidth:u=2,absoluteStrokeWidth:o,className:c="",children:d,iconNode:D,...g},M)=>(0,r.createElement)("svg",{ref:M,...B,width:e,height:e,stroke:t,strokeWidth:o?Number(u)*24/Number(e):u,className:s("lucide",c),...!d&&!A(g)&&{"aria-hidden":"true"},...g},[...D.map(([R,q])=>(0,r.createElement)(R,q)),...Array.isArray(d)?d:[d]]));var a=(t,e)=>{let u=(0,i.forwardRef)(({className:o,...c},d)=>(0,i.createElement)(F,{ref:d,iconNode:e,className:s(`lucide-${P(n(t))}`,`lucide-${t}`,o),...c}));return u.displayName=n(t),u};var y=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],p=a("arrow-left",y);var b=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],L=a("plus",b);var U=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],m=a("send",U);var O=[["path",{d:"M12 13v8",key:"1l5pq0"}],["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"m8 17 4-4 4 4",key:"1quai1"}]],l=a("cloud-upload",O);var H=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]],f=a("house",H);var v=[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]],I=a("message-square",v);var G=[["path",{d:"M17 14V2",key:"8ymqnk"}],["path",{d:"M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z",key:"m61m77"}]],x=a("thumbs-down",G);var V=[["path",{d:"M7 10v12",key:"1qc93n"}],["path",{d:"M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",key:"emmmcr"}]],C=a("thumbs-up",V);var W=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],S=a("user",W);var E=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],h=a("x",E);export{p as a,l as b,f as c,I as d,L as e,m as f,x as g,C as h,S as i,h as j};
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/defaultAttributes.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/Icon.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/createLucideIcon.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/arrow-left.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/plus.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/send.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/cloud-upload.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/house.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/message-square.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/thumbs-down.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/thumbs-up.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/user.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/icons/x.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.511.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
