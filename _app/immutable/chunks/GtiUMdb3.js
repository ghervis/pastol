import{x as b,z as g}from"./a19LureZ.js";import{s as d}from"./7VQJUBCG.js";const o=[];function k(t,r=b){let e=null;const i=new Set;function u(n){if(g(t,n)&&(t=n,e)){const a=!o.length;for(const s of i)s[1](),o.push(s,t);if(a){for(let s=0;s<o.length;s+=2)o[s][0](o[s+1]);o.length=0}}}function c(n){u(n(t))}function _(n,a=b){const s=[n,a];return i.add(s),i.size===1&&(e=r(u,c)||b),n(t),()=>{i.delete(s),i.size===0&&e&&(e(),e=null)}}return{set:u,update:c,subscribe:_}}function q(t){let r;return d(t,e=>r=e)(),r}var f;const p=((f=globalThis.__sveltekit_1d7davn)==null?void 0:f.base)??"/sveltekit-gh-pages";var l;const z=((l=globalThis.__sveltekit_1d7davn)==null?void 0:l.assets)??p;export{z as a,p as b,q as g,k as w};
