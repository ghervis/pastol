import{x as b,z as g}from"./DaurGDXm.js";import{s as p}from"./S2fL8UUD.js";const i=[];function m(t,r=b){let e=null;const n=new Set;function c(o){if(g(t,o)&&(t=o,e)){const u=!i.length;for(const s of n)s[1](),i.push(s,t);if(u){for(let s=0;s<i.length;s+=2)i[s][0](i[s+1]);i.length=0}}}function a(o){c(o(t))}function _(o,u=b){const s=[o,u];return n.add(s),n.size===1&&(e=r(c,a)||b),o(t),()=>{n.delete(s),n.size===0&&e&&(e(),e=null)}}return{set:c,update:a,subscribe:_}}function k(t){let r;return p(t,e=>r=e)(),r}var f;const h=((f=globalThis.__sveltekit_1wc1wr6)==null?void 0:f.base)??"/sveltekit-gh-pages";var l;const q=((l=globalThis.__sveltekit_1wc1wr6)==null?void 0:l.assets)??h;export{q as a,h as b,k as g,m as w};
