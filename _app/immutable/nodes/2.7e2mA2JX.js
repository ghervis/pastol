import{a as M,t as I}from"../chunks/disclose-version.S1kCZ-Cr.js";import"../chunks/legacy.D--63ij_.js";import{o as _,A as J,X as Z,z as le,i as ie,F as H,D as oe,M as re,Y as $,a8 as ce,a9 as G,Q as O,p as N,au as L,aa as ee,j as te,ab as de,B as P,av as ue,aw as ve,ax as fe,m as pe,U as he,I as ye,ap as me,a1 as V,ay as ge,az as be,aA as _e,P as xe,a7 as Ee,aB as ke,aC as we,q as F,t as Y,w as k,x,v as U,y as g,g as R,a3 as X,s as Ae,aD as Se}from"../chunks/runtime.D09zjjJH.js";import{e as De,d as Ne,s as j,a as Te}from"../chunks/render.CqtgyHK9.js";import{i as Me}from"../chunks/lifecycle.BM-ASm-L.js";import{b as T}from"../chunks/paths.Czq16Po6.js";import{o as Ie}from"../chunks/index-client.D2Dz3pBh.js";function Ce(a){_&&J(a)!==null&&Z(a)}function Le(a,e,t,n){for(var l=[],i=e.length,c=0;c<i;c++)ve(e[c].e,l,!0);var h=i>0&&l.length===0&&t!==null;if(h){var p=t.parentNode;Z(p),p.append(t),n.clear(),w(a,e[0].prev,e[i-1].next)}fe(l,()=>{for(var u=0;u<i;u++){var r=e[u];h||(n.delete(r.k),w(a,r.prev,r.next)),pe(r.e,!h)}})}function Re(a,e,t,n,l,i=null){var c=a,h={flags:e,items:new Map,first:null};{var p=a;c=_?H(J(p)):p.appendChild(le())}_&&oe();var u=null,r=!1;ie(()=>{var s=t(),o=re(s)?s:s==null?[]:$(s),d=o.length;if(r&&d===0)return;r=d===0;let v=!1;if(_){var y=c.data===ce;y!==(d===0)&&(c=G(),H(c),O(!1),v=!0)}if(_){for(var S=null,b,f=0;f<d;f++){if(N.nodeType===8&&N.data===he){c=N,v=!0,O(!1);break}var m=o[f],C=n(m,f);b=ae(N,h,S,null,m,C,f,l,e),h.items.set(C,b),S=b}d>0&&H(G())}if(!_){var D=ye;Be(o,h,c,l,e,(D.f&L)!==0,n)}i!==null&&(d===0?u?ee(u):u=te(()=>i(c)):u!==null&&de(u,()=>{u=null})),v&&O(!0),t()}),_&&(c=N)}function Be(a,e,t,n,l,i,c,h){var p=a.length,u=e.items,r=e.first,s=r,o,d=null,v=[],y=[],S,b,f,m;for(m=0;m<p;m+=1){if(S=a[m],b=c(S,m),f=u.get(b),f===void 0){var C=s?s.e.nodes_start:t;d=ae(C,e,d,d===null?e.first:d.next,S,b,m,n,l),u.set(b,d),v=[],y=[],s=d.next;continue}if(qe(f,S,m),f.e.f&L&&ee(f.e),f!==s){if(o!==void 0&&o.has(f)){if(v.length<y.length){var D=y[0],E;d=D.prev;var z=v[0],B=v[v.length-1];for(E=0;E<v.length;E+=1)K(v[E],D,t);for(E=0;E<y.length;E+=1)o.delete(y[E]);w(e,z.prev,B.next),w(e,d,z),w(e,B,D),s=D,d=B,m-=1,v=[],y=[]}else o.delete(f),K(f,s,t),w(e,f.prev,f.next),w(e,f,d===null?e.first:d.next),w(e,d,f),d=f;continue}for(v=[],y=[];s!==null&&s.k!==b;)(i||!(s.e.f&L))&&(o??(o=new Set)).add(s),y.push(s),s=s.next;if(s===null)continue;f=s}v.push(f),d=f,s=f.next}if(s!==null||o!==void 0){for(var q=o===void 0?[]:$(o);s!==null;)(i||!(s.e.f&L))&&q.push(s),s=s.next;var se=q.length;if(se>0){var ne=p===0?t:null;Le(e,q,ne,u)}}P.first=e.first&&e.first.e,P.last=d&&d.e}function qe(a,e,t,n){ue(a.v,e),a.i=t}function ae(a,e,t,n,l,i,c,h,p,u){var r=(p&be)!==0,s=(p&_e)===0,o=r?s?me(l):V(l):l,d=p&ge?V(c):c,v={i:d,v:o,k:i,a:null,e:null,prev:t,next:n};try{return v.e=te(()=>h(a,o,d),_),v.e.prev=t&&t.e,v.e.next=n&&n.e,t===null?e.first=v:(t.next=v,t.e.next=v.e),n!==null&&(n.prev=v,n.e.prev=v.e),v}finally{}}function K(a,e,t){for(var n=a.next?a.next.e.nodes_start:t,l=e?e.e.nodes_start:t,i=a.e.nodes_start;i!==n;){var c=xe(i);l.before(i),i=c}}function w(a,e,t){e===null?a.first=t:(e.next=t,e.e.next=t&&t.e),t!==null&&(t.prev=e,t.e.prev=e&&e.e)}function He(a,e){var t=a.__attributes??(a.__attributes={});t.value===(t.value=e??void 0)||a.value===e&&(e!==0||a.nodeName!=="PROGRESS")||(a.value=e)}function A(a,e,t,n){var l=a.__attributes??(a.__attributes={});_&&(l[e]=a.getAttribute(e),e==="src"||e==="srcset"||e==="href"&&a.nodeName==="LINK")||l[e]!==(l[e]=t)&&(e==="style"&&"__styles"in a&&(a.__styles={}),e==="loading"&&(a[we]=t),t==null?a.removeAttribute(e):typeof t!="string"&&Oe(a).includes(e)?a[e]=t:a.setAttribute(e,t))}var Q=new Map;function Oe(a){var e=Q.get(a.nodeName);if(e)return e;Q.set(a.nodeName,e=[]);for(var t,n=a,l=Element.prototype;l!==n;){t=ke(n);for(var i in t)t[i].set&&e.push(i);n=Ee(n)}return e}var Ue=I('<dialog id="add" class="svelte-1h19tpp"><form class="svelte-1h19tpp"><h1 class="tl-text svelte-1h19tpp">Add Custom Notification</h1> <button type="button" id="close" class="svelte-1h19tpp"><span class="material-symbols-outlined">close</span></button> <label for="time" class="svelte-1h19tpp">Time</label> <input type="time" id="time" required class="svelte-1h19tpp"> <input type="radio" id="specific-date" name="fav_language" value="specific-date" checked style="display: none;" class="svelte-1h19tpp"> <input type="radio" id="repeat-days" name="fav_language" value="repeat-days" style="display: none;" class="svelte-1h19tpp"> <label for="specific-date" class="svelte-1h19tpp">Specific Date</label> <label for="repeat-days" class="svelte-1h19tpp">Repeat Days</label> <input type="date" id="date" required class="svelte-1h19tpp"> <input type="checkbox" id="monday" name="monday" value="monday" style="display: none;" class="svelte-1h19tpp"> <label for="monday" class="svelte-1h19tpp">Mon</label> <input type="checkbox" id="tuesday" name="tuesday" value="tuesday" style="display: none;" class="svelte-1h19tpp"> <label for="tuesday" class="svelte-1h19tpp">Tue</label> <input type="checkbox" id="wednesday" name="wednesday" value="wednesday" style="display: none;" class="svelte-1h19tpp"> <label for="wednesday" class="svelte-1h19tpp">Wed</label> <input type="checkbox" id="thursday" name="thursday" value="thursday" style="display: none;" class="svelte-1h19tpp"> <label for="thursday" class="svelte-1h19tpp">Thu</label> <input type="checkbox" id="friday" name="friday" value="friday" style="display: none;" class="svelte-1h19tpp"> <label for="friday" class="svelte-1h19tpp">Fri</label> <input type="checkbox" id="saturday" name="saturday" value="saturday" style="display: none;" class="svelte-1h19tpp"> <label for="saturday" class="svelte-1h19tpp">Sat</label> <input type="checkbox" id="sunday" name="sunday" value="sunday" checked style="display: none;" class="svelte-1h19tpp"> <label for="sunday" class="svelte-1h19tpp">Sun</label> <label for="text" class="svelte-1h19tpp">Message</label> <textarea id="message" placeholder="Spoken message" rows="2" class="svelte-1h19tpp"></textarea> <button type="submit" class="hover-glow hover-lighten svelte-1h19tpp">Add</button></form></dialog>');function Fe(a,e){F(e,!0),Ie(()=>{const l=document.getElementById("add"),i=document.getElementById("open"),c=document.getElementById("close"),h=()=>{const p=new Date,[u,r,s]=p.toLocaleDateString().split("/");document.querySelector("#date").value=`${s}-${u.padStart(2,"0")}-${r.padStart(2,"0")}`,document.querySelector("#time").value=p.toTimeString().substring(0,5),l.showModal()};i.addEventListener("click",h),c.addEventListener("click",()=>l.close()),l.addEventListener("close",()=>i.focus()),l.querySelector("form").addEventListener("submit",p=>{p.preventDefault(),l.close()})});var t=Ue(),n=k(t);x(t),De("submit",n,function(...l){var i;(i=e.addCustomNotification)==null||i.apply(this,l)}),M(a,t),Y()}var Ye=(a,e)=>e.toggleEnable(e.notification),ze=I('<article class="notification-item svelte-oo2mo2"><div class="time-header svelte-oo2mo2"><label class="hover-lighten svelte-oo2mo2"><input type="checkbox" id="" style="display: none;"> <span class="time-enabled material-symbols-outlined svelte-oo2mo2"> </span> <span class="time-text tl-text svelte-oo2mo2"> </span></label> <button class="time-voice-preview hover-glow hover-lighten svelte-oo2mo2"><span class="material-symbols-outlined" title="Hear a sound preview of this notification">record_voice_over</span></button> <button class="delete-time hover-glow hover-lighten svelte-oo2mo2"><span class="material-symbols-outlined">delete</span></button></div> <div class="custom-message svelte-oo2mo2"><textarea id="" placeholder="placeholder" title="Message that would be spoken for this notification" rows="2" class="svelte-oo2mo2"></textarea></div></article>');function Ge(a,e){F(e,!0);var t=ze(),n=k(t),l=k(n);U(()=>A(l,"title",e.notification.enabled?`Disable this ${e.notification.getDisplayedSource()} notification`:`Enable this ${e.notification.getDisplayedSource()} notification`));var i=k(l);i.__change=[Ye,e];var c=g(i,2),h=k(c,!0);x(c);var p=g(c,2),u=k(p,!0);x(p),x(l);var r=g(l,4);U(()=>A(r,"title",`Delete this ${e.notification.getDisplayedSource()} notification`)),x(n);var s=g(n,2),o=k(s);Ce(o),x(s),x(t),U(()=>{A(t,"data-enabled",e.notification.enabled),j(h,e.notification.source==="custom"?"alarm":"event"),j(u,e.notification.time),He(o,e.notification.text)}),M(a,t),Y()}Ne(["change"]);var Pe=I('<section class="notifications-container svelte-oazb90"></section>');function Ve(a,e){var t=Pe();Re(t,21,()=>e.notifications,n=>n.id,(n,l)=>{Ge(n,{get notification(){return R(l)},get toggleEnable(){return e.toggleEnable}})}),x(t),M(a,t)}class W{getDisplayedSource(){switch(this.source){case"calendar":return"Google Calendar Event";case"custom":return"Custom";default:return"Unknown"}}}var Xe=I('<link rel="icon" type="image/svg"> <link rel="stylesheet"> <link rel="stylesheet"> <link rel="stylesheet"> <link rel="stylesheet">',1),je=I('<main class="svelte-xaji4t"><section class="controls svelte-xaji4t"><h1 class="tl-text svelte-xaji4t">Pastol</h1> <div class="add-and-settings svelte-xaji4t"><button id="open" class="add-button hover-lighten svelte-xaji4t"><span>Add</span> <span class="material-symbols-outlined">add</span></button> <button class="settings-button hover-lighten svelte-xaji4t"><span>Settings</span> <span class="material-symbols-outlined">settings</span></button></div></section> <!> <!></main>');function tt(a,e){F(e,!1);let t=Se([]);function n(u,r,s){const o=new W;o.id=crypto.randomUUID(),o.time=r,o.text=u,o.repeatType="daily",o.enabled=!0,o.source=s,X(t,[...R(t),o])}function l(u){X(t,R(t).map(r=>r.id===u.id?Object.assign(new W,r,{enabled:!r.enabled}):r))}function i(u){u.preventDefault();const r=u.target;console.log("htmlFormElement",r);const s=r.message.value;r.date.value;const o=r.time.value;n(s,o,"custom")}n("notif1","10:00 AM","calendar"),n("notif2","10:00 AM","calendar"),n("notif3","10:00 AM","calendar"),n("notif4","10:00 AM","calendar"),n("notif5","10:00 AM","calendar"),Me();var c=je();Te(u=>{var r=Xe(),s=Ae(r);A(s,"href",`${T??""}/favicon.ico`);var o=g(s,2);A(o,"href",`${T??""}/reset.css`);var d=g(o,2);A(d,"href",`${T??""}/colors.css`);var v=g(d,2);A(v,"href",`${T??""}/font.css`);var y=g(v,2);A(y,"href",`${T??""}/common.css`),M(u,r)});var h=g(k(c),2);Ve(h,{get notifications(){return R(t)},toggleEnable:l});var p=g(h,2);Fe(p,{addCustomNotification:i}),x(c),M(a,c),Y()}export{tt as component};
