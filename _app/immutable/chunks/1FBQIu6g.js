import{x as c,z as g}from"./a19LureZ.js";import{s as p}from"./7VQJUBCG.js";const o=[];function k(t,r=c){let e=null;const n=new Set;function u(i){if(g(t,i)&&(t=i,e)){const b=!o.length;for(const s of n)s[1](),o.push(s,t);if(b){for(let s=0;s<o.length;s+=2)o[s][0](o[s+1]);o.length=0}}}function a(i){u(i(t))}function _(i,b=c){const s=[i,b];return n.add(s),n.size===1&&(e=r(u,a)||c),i(t),()=>{n.delete(s),n.size===0&&e&&(e(),e=null)}}return{set:u,update:a,subscribe:_}}function q(t){let r;return p(t,e=>r=e)(),r}var f;const h=((f=globalThis.__sveltekit_1uvi577)==null?void 0:f.base)??"/sveltekit-gh-pages";var l;const z=((l=globalThis.__sveltekit_1uvi577)==null?void 0:l.assets)??h;export{z as a,h as b,q as g,k as w};
