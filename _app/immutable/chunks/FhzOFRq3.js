import{n as c,j as g}from"./DPk8Er0_.js";import{s as p}from"./DVDaktzf.js";const o=[];function w(e,r=c){let t=null;const i=new Set;function u(n){if(g(e,n)&&(e=n,t)){const b=!o.length;for(const s of i)s[1](),o.push(s,e);if(b){for(let s=0;s<o.length;s+=2)o[s][0](o[s+1]);o.length=0}}}function l(n){u(n(e))}function _(n,b=c){const s=[n,b];return i.add(s),i.size===1&&(t=r(u,l)||c),n(e),()=>{i.delete(s),i.size===0&&t&&(t(),t=null)}}return{set:u,update:l,subscribe:_}}function k(e){let r;return p(e,t=>r=t)(),r}var a;const h=((a=globalThis.__sveltekit_5w27le)==null?void 0:a.base)??"/sveltekit-gh-pages";var f;const q=((f=globalThis.__sveltekit_5w27le)==null?void 0:f.assets)??h;export{q as a,h as b,k as g,w};
