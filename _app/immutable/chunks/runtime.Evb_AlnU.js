var Cn=Array.isArray,Zt=Array.prototype.indexOf,Nn=Array.from,Pn=Object.defineProperty,ct=Object.getOwnPropertyDescriptor,zt=Object.getOwnPropertyDescriptors,bn=Object.prototype,Fn=Array.prototype,Wt=Object.getPrototypeOf;const qn=()=>{};function Mn(t){return t()}function Xt(t){for(var n=0;n<t.length;n++)t[n]()}const y=2,Et=4,Z=8,at=16,m=32,z=64,nt=128,k=256,B=512,E=1024,D=2048,W=4096,P=8192,b=16384,Jt=32768,yt=65536,Ln=1<<17,Qt=1<<19,wt=1<<20,vt=Symbol("$state"),Yn=Symbol("legacy props");function Tt(t){return t===this.v}function tn(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function mt(t){return!tn(t,this.v)}function nn(t){throw new Error("https://svelte.dev/e/effect_in_teardown")}function rn(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function en(t){throw new Error("https://svelte.dev/e/effect_orphan")}function ln(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function jn(){throw new Error("https://svelte.dev/e/hydration_failed")}function Hn(t){throw new Error("https://svelte.dev/e/props_invalid_value")}function Un(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function Bn(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function sn(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}function an(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}let X=!1;function Vn(){X=!0}const Gn=1,Kn=2,$n=16,Zn=1,zn=2,Wn=4,Xn=8,Jn=16,Qn=1,tr=2,un="[",on="[!",fn="]",gt={},nr=Symbol();function ut(t,n){var r={f:0,v:t,reactions:null,equals:Tt,rv:0,wv:0};return r}function rr(t){return At(ut(t))}function _n(t,n=!1){var e;const r=ut(t);return n||(r.equals=mt),X&&f!==null&&f.l!==null&&((e=f.l).s??(e.s=[])).push(r),r}function er(t,n=!1){return At(_n(t,n))}function At(t){return o!==null&&o.f&y&&(T===null?An([t]):T.push(t)),t}function lr(t,n){return o!==null&&ft()&&o.f&(y|at)&&(T===null||!T.includes(t))&&an(),cn(t,n)}function cn(t,n){return t.equals(n)||(t.v,t.v=n,t.wv=Ut(),xt(t,D),ft()&&u!==null&&u.f&E&&!(u.f&m)&&(h!==null&&h.includes(t)?(g(u,D),tt(u)):A===null?xn([t]):A.push(t))),n}function xt(t,n){var r=t.reactions;if(r!==null)for(var e=ft(),l=r.length,s=0;s<l;s++){var a=r[s],i=a.f;i&D||!e&&a===u||(g(a,n),i&(E|k)&&(i&y?xt(a,W):tt(a)))}}function Rt(t){console.warn("https://svelte.dev/e/hydration_mismatch")}let S=!1;function sr(t){S=t}let w;function F(t){if(t===null)throw Rt(),gt;return w=t}function ar(){return F(O(w))}function ur(t){if(S){if(O(w)!==null)throw Rt(),gt;w=t}}function or(t=1){if(S){for(var n=t,r=w;n--;)r=O(r);w=r}}function ir(){for(var t=0,n=w;;){if(n.nodeType===8){var r=n.data;if(r===fn){if(t===0)return n;t-=1}else(r===un||r===on)&&(t+=1)}var e=O(n);n.remove(),n=e}}var pt,Dt,St;function fr(){if(pt===void 0){pt=window;var t=Element.prototype,n=Node.prototype;Dt=ct(n,"firstChild").get,St=ct(n,"nextSibling").get,t.__click=void 0,t.__className="",t.__attributes=null,t.__styles=null,t.__e=void 0,Text.prototype.__t=void 0}}function rt(t=""){return document.createTextNode(t)}function et(t){return Dt.call(t)}function O(t){return St.call(t)}function _r(t,n){if(!S)return et(t);var r=et(w);if(r===null)r=w.appendChild(rt());else if(n&&r.nodeType!==3){var e=rt();return r==null||r.before(e),F(e),e}return F(r),r}function cr(t,n){if(!S){var r=et(t);return r instanceof Comment&&r.data===""?O(r):r}return w}function vr(t,n=1,r=!1){let e=S?w:t;for(var l;n--;)l=e,e=O(e);if(!S)return e;var s=e==null?void 0:e.nodeType;if(r&&s!==3){var a=rt();return e===null?l==null||l.after(a):e.before(a),F(a),a}return F(e),e}function pr(t){t.textContent=""}function vn(t){var n=y|D;u===null?n|=k:u.f|=wt;var r=o!==null&&o.f&y?o:null;const e={children:null,ctx:f,deps:null,equals:Tt,f:n,fn:t,reactions:null,rv:0,v:null,wv:0,parent:r??u};return r!==null&&(r.children??(r.children=[])).push(e),e}function hr(t){const n=vn(t);return n.equals=mt,n}function It(t){var n=t.children;if(n!==null){t.children=null;for(var r=0;r<n.length;r+=1){var e=n[r];e.f&y?ot(e):I(e)}}}function pn(t){for(var n=t.parent;n!==null;){if(!(n.f&y))return n;n=n.parent}return null}function kt(t){var n,r=u;K(pn(t));try{It(t),n=Bt(t)}finally{K(r)}return n}function Ot(t){var n=kt(t),r=(R||t.f&k)&&t.deps!==null?W:E;g(t,r),t.equals(n)||(t.v=n,t.wv=Ut())}function ot(t){It(t),L(t,0),g(t,b),t.v=t.children=t.deps=t.ctx=t.reactions=null}function Ct(t){u===null&&o===null&&en(),o!==null&&o.f&k&&rn(),it&&nn()}function hn(t,n){var r=n.last;r===null?n.last=n.first=t:(r.next=t,t.prev=r,n.last=t)}function Y(t,n,r,e=!0){var l=(t&z)!==0,s=u,a={ctx:f,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:t|D,first:null,fn:n,last:null,next:null,parent:l?null:s,prev:null,teardown:null,transitions:null,wv:0};if(r){var i=C;try{ht(!0),Q(a),a.f|=Jt}catch(c){throw I(a),c}finally{ht(i)}}else n!==null&&tt(a);var _=r&&a.deps===null&&a.first===null&&a.nodes_start===null&&a.teardown===null&&(a.f&wt)===0;if(!_&&!l&&e&&(s!==null&&hn(a,s),o!==null&&o.f&y)){var p=o;(p.children??(p.children=[])).push(a)}return a}function dr(t){Ct();var n=u!==null&&(u.f&m)!==0&&f!==null&&!f.m;if(n){var r=f;(r.e??(r.e=[])).push({fn:t,effect:u,reaction:o})}else{var e=Nt(t);return e}}function Er(t){return Ct(),dn(t)}function yr(t){const n=Y(z,t,!0);return(r={})=>new Promise(e=>{r.outro?wn(n,()=>{I(n),e(void 0)}):(I(n),e(void 0))})}function Nt(t){return Y(Et,t,!1)}function dn(t){return Y(Z,t,!0)}function wr(t){return En(t)}function En(t,n=0){return Y(Z|at|n,t,!0)}function Tr(t,n=!0){return Y(Z|m,t,!0,n)}function Pt(t){var n=t.teardown;if(n!==null){const r=it,e=o;dt(!0),G(null);try{n.call(null)}finally{dt(r),G(e)}}}function bt(t){var n=t.deriveds;if(n!==null){t.deriveds=null;for(var r=0;r<n.length;r+=1)ot(n[r])}}function Ft(t,n=!1){var r=t.first;for(t.first=t.last=null;r!==null;){var e=r.next;I(r,n),r=e}}function yn(t){for(var n=t.first;n!==null;){var r=n.next;n.f&m||I(n),n=r}}function I(t,n=!0){var r=!1;if((n||t.f&Qt)&&t.nodes_start!==null){for(var e=t.nodes_start,l=t.nodes_end;e!==null;){var s=e===l?null:O(e);e.remove(),e=s}r=!0}Ft(t,n&&!r),bt(t),L(t,0),g(t,b);var a=t.transitions;if(a!==null)for(const _ of a)_.stop();Pt(t);var i=t.parent;i!==null&&i.first!==null&&qt(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.fn=t.nodes_start=t.nodes_end=null}function qt(t){var n=t.parent,r=t.prev,e=t.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),n!==null&&(n.first===t&&(n.first=e),n.last===t&&(n.last=r))}function wn(t,n){var r=[];Mt(t,r,!0),Tn(r,()=>{I(t),n&&n()})}function Tn(t,n){var r=t.length;if(r>0){var e=()=>--r||n();for(var l of t)l.out(e)}else n()}function Mt(t,n,r){if(!(t.f&P)){if(t.f^=P,t.transitions!==null)for(const a of t.transitions)(a.is_global||r)&&n.push(a);for(var e=t.first;e!==null;){var l=e.next,s=(e.f&yt)!==0||(e.f&m)!==0;Mt(e,n,s?r:!1),e=l}}}function mr(t){Lt(t,!0)}function Lt(t,n){if(t.f&P){j(t)&&Q(t),t.f^=P;for(var r=t.first;r!==null;){var e=r.next,l=(r.f&yt)!==0||(r.f&m)!==0;Lt(r,l?n:!1),r=e}if(t.transitions!==null)for(const s of t.transitions)(s.is_global||n)&&s.in()}}let V=!1,lt=[];function Yt(){V=!1;const t=lt.slice();lt=[],Xt(t)}function gr(t){V||(V=!0,queueMicrotask(Yt)),lt.push(t)}function mn(){V&&Yt()}const jt=0,gn=1;let H=!1,U=jt,q=!1,M=null,C=!1,it=!1;function ht(t){C=t}function dt(t){it=t}let x=[],N=0;let o=null;function G(t){o=t}let u=null;function K(t){u=t}let T=null;function An(t){T=t}let h=null,d=0,A=null;function xn(t){A=t}let Ht=1,$=0,R=!1,f=null;function Ut(){return++Ht}function ft(){return!X||f!==null&&f.l===null}function j(t){var p;var n=t.f;if(n&D)return!0;if(n&W){var r=t.deps,e=(n&k)!==0;if(r!==null){var l,s,a=(n&B)!==0,i=e&&u!==null&&!R,_=r.length;if(a||i){for(l=0;l<_;l++)s=r[l],(a||!((p=s==null?void 0:s.reactions)!=null&&p.includes(t)))&&(s.reactions??(s.reactions=[])).push(t);a&&(t.f^=B)}for(l=0;l<_;l++)if(s=r[l],j(s)&&Ot(s),s.wv>t.wv)return!0}(!e||u!==null&&!R)&&g(t,E)}return!1}function Rn(t,n){for(var r=n;r!==null;){if(r.f&nt)try{r.fn(t);return}catch{r.f^=nt}r=r.parent}throw H=!1,t}function Dn(t){return(t.f&b)===0&&(t.parent===null||(t.parent.f&nt)===0)}function J(t,n,r,e){if(H){if(r===null&&(H=!1),Dn(n))throw t;return}r!==null&&(H=!0);{Rn(t,n);return}}function Bt(t){var _t;var n=h,r=d,e=A,l=o,s=R,a=T,i=f,_=t.f;h=null,d=0,A=null,o=_&(m|z)?null:t,R=!C&&(_&k)!==0,T=null,f=t.ctx,$++;try{var p=(0,t.fn)(),c=t.deps;if(h!==null){var v;if(L(t,d),c!==null&&d>0)for(c.length=d+h.length,v=0;v<h.length;v++)c[d+v]=h[v];else t.deps=c=h;if(!R)for(v=d;v<c.length;v++)((_t=c[v]).reactions??(_t.reactions=[])).push(t)}else c!==null&&d<c.length&&(L(t,d),c.length=d);return l!==null&&$++,p}finally{h=n,d=r,A=e,o=l,R=s,T=a,f=i}}function Sn(t,n){let r=n.reactions;if(r!==null){var e=Zt.call(r,t);if(e!==-1){var l=r.length-1;l===0?r=n.reactions=null:(r[e]=r[l],r.pop())}}r===null&&n.f&y&&(h===null||!h.includes(n))&&(g(n,W),n.f&(k|B)||(n.f^=B),L(n,0))}function L(t,n){var r=t.deps;if(r!==null)for(var e=n;e<r.length;e++)Sn(t,r[e])}function Q(t){var n=t.f;if(!(n&b)){g(t,E);var r=u,e=f;u=t;try{n&at?yn(t):Ft(t),bt(t),Pt(t);var l=Bt(t);t.teardown=typeof l=="function"?l:null,t.wv=Ht;var s=t.deps,a}catch(i){J(i,t,r,e||t.ctx)}finally{u=r}}}function Vt(){if(N>1e3){N=0;try{ln()}catch(t){if(M!==null)J(t,M,null);else throw t}}N++}function Gt(t){var n=t.length;if(n!==0){Vt();var r=C;C=!0;try{for(var e=0;e<n;e++){var l=t[e];l.f&E||(l.f^=E);var s=[];Kt(l,s),In(s)}}finally{C=r}}}function In(t){var n=t.length;if(n!==0)for(var r=0;r<n;r++){var e=t[r];if(!(e.f&(b|P)))try{j(e)&&(Q(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?qt(e):e.fn=null))}catch(l){J(l,e,null,e.ctx)}}}function kn(){if(q=!1,N>1001)return;const t=x;x=[],Gt(t),q||(N=0,M=null)}function tt(t){U===jt&&(q||(q=!0,queueMicrotask(kn))),M=t;for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(r&(z|m)){if(!(r&E))return;n.f^=E}}x.push(n)}function Kt(t,n){var r=t.first,e=[];t:for(;r!==null;){var l=r.f,s=(l&m)!==0,a=s&&(l&E)!==0,i=r.next;if(!a&&!(l&P))if(l&Z){if(s)r.f^=E;else try{j(r)&&Q(r)}catch(v){J(v,r,null,r.ctx)}var _=r.first;if(_!==null){r=_;continue}}else l&Et&&e.push(r);if(i===null){let v=r.parent;for(;v!==null;){if(t===v)break t;var p=v.next;if(p!==null){r=p;continue t}v=v.parent}}r=i}for(var c=0;c<e.length;c++)_=e[c],n.push(_),Kt(_,n)}function $t(t){var n=U,r=x;try{Vt();const l=[];U=gn,x=l,q=!1,Gt(r);var e=t==null?void 0:t();return mn(),(x.length>0||l.length>0)&&$t(),N=0,M=null,e}finally{U=n,x=r}}async function Ar(){await Promise.resolve(),$t()}function xr(t){var c;var n=t.f,r=(n&y)!==0;if(r&&n&b){var e=kt(t);return ot(t),e}if(o!==null){T!==null&&T.includes(t)&&sn();var l=o.deps;t.rv<$&&(t.rv=$,h===null&&l!==null&&l[d]===t?d++:h===null?h=[t]:h.push(t),A!==null&&u!==null&&u.f&E&&!(u.f&m)&&A.includes(t)&&(g(u,D),tt(u)))}else if(r&&t.deps===null)for(var s=t,a=s.parent,i=s;a!==null;)if(a.f&y){var _=a;i=_,a=_.parent}else{var p=a;(c=p.deriveds)!=null&&c.includes(i)||(p.deriveds??(p.deriveds=[])).push(i);break}return r&&(s=t,j(s)&&Ot(s)),t.v}function Rr(t){const n=o;try{return o=null,t()}finally{o=n}}const On=-7169;function g(t,n){t.f=t.f&On|n}function Dr(t,n=!1,r){f={p:f,c:null,e:null,m:!1,s:t,x:null,l:null},X&&!n&&(f.l={s:null,u:null,r1:[],r2:ut(!1)})}function Sr(t){const n=f;if(n!==null){const a=n.e;if(a!==null){var r=u,e=o;n.e=null;try{for(var l=0;l<a.length;l++){var s=a[l];K(s.effect),G(s.reaction),Nt(s.fn)}}finally{K(r),G(e)}}f=n.p,n.m=!0}return{}}function Ir(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(vt in t)st(t);else if(!Array.isArray(t))for(let n in t){const r=t[n];typeof r=="object"&&r&&vt in r&&st(r)}}}function st(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t),t instanceof Date&&t.getTime();for(let e in t)try{st(t[e],n)}catch{}const r=Wt(t);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=zt(r);for(let l in e){const s=e[l].get;if(s)try{s.call(t)}catch{}}}}}export{mr as $,G as A,K as B,Cn as C,o as D,yt as E,u as F,rt as G,Qt as H,un as I,O as J,sr as K,F as L,et as M,fr as N,gt as O,ar as P,fn as Q,Rt as R,jn as S,pr as T,Nn as U,yr as V,Qn as W,tr as X,on as Y,ir as Z,P as _,Rr as a,wn as a0,cn as a1,Mt as a2,Tn as a3,_n as a4,ut as a5,Kn as a6,Gn as a7,$n as a8,Wt as a9,Ar as aA,rr as aB,tn as aC,zt as aa,lr as ab,er as ac,vt as ad,bn as ae,Fn as af,Un as ag,ct as ah,nr as ai,Bn as aj,Nt as ak,dn as al,gr as am,Hn as an,Ln as ao,Wn as ap,mt as aq,m as ar,z as as,Zn as at,zn as au,Xn as av,Yn as aw,hr as ax,Jn as ay,$t as az,En as b,f as c,Tr as d,Vn as e,qn as f,I as g,S as h,w as i,cr as j,Sr as k,X as l,Er as m,or as n,xr as o,Dr as p,Mn as q,Xt as r,Ir as s,vn as t,dr as u,wr as v,_r as w,ur as x,vr as y,Pn as z};
