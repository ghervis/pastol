import{x as c,z as p}from"./BBepsgLA.js";import{s as g}from"./C-FkFWT-.js";const i=[];function m(t,r=c){let e=null;const n=new Set;function u(o){if(p(t,o)&&(t=o,e)){const b=!i.length;for(const s of n)s[1](),i.push(s,t);if(b){for(let s=0;s<i.length;s+=2)i[s][0](i[s+1]);i.length=0}}}function a(o){u(o(t))}function _(o,b=c){const s=[o,b];return n.add(s),n.size===1&&(e=r(u,a)||c),o(t),()=>{n.delete(s),n.size===0&&e&&(e(),e=null)}}return{set:u,update:a,subscribe:_}}function k(t){let r;return g(t,e=>r=e)(),r}var f;const h=((f=globalThis.__sveltekit_p1qys4)==null?void 0:f.base)??"/sveltekit-gh-pages";var l;const z=((l=globalThis.__sveltekit_p1qys4)==null?void 0:l.assets)??h;export{z as a,h as b,k as g,m as w};
