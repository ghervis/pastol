import{a as L,t as R}from"../chunks/disclose-version.BlDaYLnJ.js";import"../chunks/legacy.DDloKFG3.js";import{h as y,M as Q,T as X,G as ae,b as te,L as H,P as ie,C as ne,U as Z,Y as re,Z as Y,K as S,i as A,Q as se,_ as I,$ as z,d as W,a0 as le,F as G,a1 as oe,a2 as fe,a3 as ce,g as ve,D as ue,a4 as de,a5 as K,a6 as _e,a7 as he,a8 as pe,J as ge,a9 as be,aa as ye,p as me,w as N,y as T,x,n as we,v as Ee,k as xe,o as C,ab as V,j as ke,ac as Ne}from"../chunks/runtime.Evb_AlnU.js";import{d as Te,s as Ae,h as qe}from"../chunks/render.S23bdNaK.js";import{b as U}from"../chunks/paths.GfTjEeGR.js";function Ie(t){y&&Q(t)!==null&&X(t)}function Ce(t,e,a,i){for(var n=[],o=e.length,r=0;r<o;r++)fe(e[r].e,n,!0);var v=o>0&&n.length===0&&a!==null;if(v){var d=a.parentNode;X(d),d.append(a),i.clear(),w(t,e[0].prev,e[o-1].next)}ce(n,()=>{for(var u=0;u<o;u++){var _=e[u];v||(i.delete(_.k),w(t,_.prev,_.next)),ve(_.e,!v)}})}function Le(t,e,a,i,n,o=null){var r=t,v={flags:e,items:new Map,first:null};{var d=t;r=y?H(Q(d)):d.appendChild(ae())}y&&ie();var u=null,_=!1;te(()=>{var s=a(),h=ne(s)?s:s==null?[]:Z(s),l=h.length;if(_&&l===0)return;_=l===0;let f=!1;if(y){var g=r.data===re;g!==(l===0)&&(r=Y(),H(r),S(!1),f=!0)}if(y){for(var E=null,b,c=0;c<l;c++){if(A.nodeType===8&&A.data===se){r=A,f=!0,S(!1);break}var p=h[c],q=i(p,c);b=j(A,v,E,null,p,q,c,n,e),v.items.set(q,b),E=b}l>0&&H(Y())}if(!y){var k=ue;Re(h,v,r,n,e,(k.f&I)!==0,i)}o!==null&&(l===0?u?z(u):u=W(()=>o(r)):u!==null&&le(u,()=>{u=null})),f&&S(!0),a()}),y&&(r=A)}function Re(t,e,a,i,n,o,r,v){var d=t.length,u=e.items,_=e.first,s=_,h,l=null,f=[],g=[],E,b,c,p;for(p=0;p<d;p+=1){if(E=t[p],b=r(E,p),c=u.get(b),c===void 0){var q=s?s.e.nodes_start:a;l=j(q,e,l,l===null?e.first:l.next,E,b,p,i,n),u.set(b,l),f=[],g=[],s=l.next;continue}if(De(c,E,p),c.e.f&I&&z(c.e),c!==s){if(h!==void 0&&h.has(c)){if(f.length<g.length){var k=g[0],m;l=k.prev;var P=f[0],D=f[f.length-1];for(m=0;m<f.length;m+=1)B(f[m],k,a);for(m=0;m<g.length;m+=1)h.delete(g[m]);w(e,P.prev,D.next),w(e,l,P),w(e,D,k),s=k,l=D,p-=1,f=[],g=[]}else h.delete(c),B(c,s,a),w(e,c.prev,c.next),w(e,c,l===null?e.first:l.next),w(e,l,c),l=c;continue}for(f=[],g=[];s!==null&&s.k!==b;)(o||!(s.e.f&I))&&(h??(h=new Set)).add(s),g.push(s),s=s.next;if(s===null)continue;c=s}f.push(c),l=c,s=c.next}if(s!==null||h!==void 0){for(var M=h===void 0?[]:Z(h);s!==null;)(o||!(s.e.f&I))&&M.push(s),s=s.next;var $=M.length;if($>0){var ee=d===0?a:null;Ce(e,M,ee,u)}}G.first=e.first&&e.first.e,G.last=l&&l.e}function De(t,e,a,i){oe(t.v,e),t.i=a}function j(t,e,a,i,n,o,r,v,d,u){var _=(d&he)!==0,s=(d&pe)===0,h=_?s?de(n):K(n):n,l=d&_e?K(r):r,f={i:l,v:h,k:o,a:null,e:null,prev:a,next:i};try{return f.e=W(()=>v(t,h,l),y),f.e.prev=a&&a.e,f.e.next=i&&i.e,a===null?e.first=f:(a.next=f,a.e.next=f.e),i!==null&&(i.prev=f,i.e.prev=f.e),f}finally{}}function B(t,e,a){for(var i=t.next?t.next.e.nodes_start:a,n=e?e.e.nodes_start:a,o=t.e.nodes_start;o!==i;){var r=ge(o);n.before(o),o=r}}function w(t,e,a){e===null?t.first=a:(e.next=a,e.e.next=a&&a.e),a!==null&&(a.prev=e,a.e.prev=e&&e.e)}function Me(t,e){var a=t.__attributes??(t.__attributes={});a.value===(a.value=e??void 0)||t.value===e&&(e!==0||t.nodeName!=="PROGRESS")||(t.value=e)}function O(t,e,a,i){var n=t.__attributes??(t.__attributes={});y&&(n[e]=t.getAttribute(e),t.nodeName==="LINK")||n[e]!==(n[e]=a)&&(a==null?t.removeAttribute(e):typeof a!="string"&&He(t).includes(e)?t[e]=a:t.setAttribute(e,a))}var F=new Map;function He(t){var e=F.get(t.nodeName);if(e)return e;F.set(t.nodeName,e=[]);for(var a,i=t,n=Element.prototype;n!==i;){a=ye(i);for(var o in a)a[o].set&&e.push(o);i=be(i)}return e}function J(t,e,a){if(a){if(t.classList.contains(e))return;t.classList.add(e)}else{if(!t.classList.contains(e))return;t.classList.remove(e)}}var Se=(t,e)=>e.toggleEnable(e.notification),Ue=R(`<article class="notification-item svelte-wnb9qy"><div class="time-header svelte-wnb9qy"><label class="time-header-label svelte-wnb9qy" title="Check this if you want to get notifications every "><input type="checkbox" id="" style="display: none;"> <span class="time-enabled material-symbols-outlined svelte-wnb9qy">alarm</span> <span class="time-header-label-text"> </span></label> <button class="time-voice-preview svelte-wnb9qy"><span class="material-symbols-outlined" title="Hear a preview for this notification's message">record_voice_over</span></button> <button class="delete-time svelte-wnb9qy" title="Delete this time"><span class="material-symbols-outlined">close</span></button></div> <div class="custom-message svelte-wnb9qy"><textarea id="" placeholder="placeholder" title="wat" rows="2" class="svelte-wnb9qy"></textarea></div></article>`);function Oe(t,e){me(e,!0);var a=Ue(),i=N(a),n=N(i),o=N(n);o.__change=[Se,e];var r=T(o,2),v=T(r,2),d=N(v,!0);x(v),x(n),we(4),x(i);var u=T(i,2),_=N(u);Ie(_),x(u),x(a),Ee(()=>{J(r,"is-time-enabled",e.notification.enabled),J(r,"is-time-disabled",!e.notification.enabled),Ae(d,e.notification.time),Me(_,e.notification.text)}),L(t,a),xe()}Te(["change"]);var Pe=R('<section class="notifications-container svelte-ja9qka"></section>');function Ye(t,e){var a=Pe();Le(a,21,()=>e.notifications,i=>i.id,(i,n)=>{Oe(i,{get notification(){return C(n)},get toggleEnable(){return e.toggleEnable}})}),x(a),L(t,a)}var Ge=R('<link rel="icon" type="image/svg"> <link rel="stylesheet"> <link rel="stylesheet">',1),Ke=R('<main class="svelte-q7er2q"><h1>Pastol</h1> <!></main>');function Xe(t){let e=Ne([]);function a(r){V(e,[...C(e),{id:crypto.randomUUID(),time:"2021-09-01T12:00:00",text:r,repeatType:"daily",enabled:!0}])}function i(r){V(e,C(e).map(v=>v.id===r.id?{...v,enabled:!v.enabled}:v))}a("notif1"),a("notif2"),a("notif3"),a("notif4"),a("notif5");var n=Ke();qe(r=>{var v=Ge(),d=ke(v);O(d,"href",`${U??""}/favicon.ico`);var u=T(d,2);O(u,"href",`${U??""}/reset.css`);var _=T(u,2);O(_,"href",`${U??""}/colors.css`),L(r,v)});var o=T(N(n),2);Ye(o,{get notifications(){return C(e)},toggleEnable:i}),x(n),L(t,n)}export{Xe as component};
