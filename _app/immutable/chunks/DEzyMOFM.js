import{x as a,z as g}from"./a19LureZ.js";import{s as p}from"./7VQJUBCG.js";const o=[];function m(t,r=a){let e=null;const i=new Set;function c(n){if(g(t,n)&&(t=n,e)){const u=!o.length;for(const s of i)s[1](),o.push(s,t);if(u){for(let s=0;s<o.length;s+=2)o[s][0](o[s+1]);o.length=0}}}function b(n){c(n(t))}function _(n,u=a){const s=[n,u];return i.add(s),i.size===1&&(e=r(c,b)||a),n(t),()=>{i.delete(s),i.size===0&&e&&(e(),e=null)}}return{set:c,update:b,subscribe:_}}function q(t){let r;return p(t,e=>r=e)(),r}var f;const h=((f=globalThis.__sveltekit_1srncak)==null?void 0:f.base)??"/sveltekit-gh-pages";var l;const z=((l=globalThis.__sveltekit_1srncak)==null?void 0:l.assets)??h;export{z as a,h as b,q as g,m as w};
