!function(){const t="data-tab-link",e="data-tab-content",a="tab-active";function c(c){const o=c.querySelectorAll("[data-tab-cover]");for(let c in o){if(!o.hasOwnProperty(c))continue;const l=o[c],n=l.querySelector("[data-tab-link].tab-active")||l.querySelector("[data-tab-content].tab-active")||l.querySelector("[data-tab-link]"),r=n.getAttribute(t)||n.getAttribute(e);l.querySelectorAll("[data-tab-link]").forEach((function(e){e.closest("[data-tab-cover]")==l&&(e.getAttribute(t)!=r?e.classList.remove(a):e.classList.add(a))})),l.querySelectorAll("[data-tab-content]").forEach((function(t){t.closest("[data-tab-cover]")==l&&(t.getAttribute(e)!=r?t.classList.remove(a):t.classList.add(a))}));const i=l.querySelector("[data-tab-plate]");if(!i||i.closest("[data-tab-cover]")!=l)continue;const s=l.querySelector('[data-tab-link="'+r+'"]');i.style.left=s.offsetLeft+"px",i.style.width=s.getBoundingClientRect().width+"px"}}function o(){const a=document.querySelectorAll("[data-tab-cover]");for(let c in a){if(!a.hasOwnProperty(c))continue;const o=a[c],l=o.querySelector("[data-tab-link].tab-active")||o.querySelector("[data-tab-content].tab-active")||o.querySelector("[data-tab-link]"),n=l.getAttribute(t)||l.getAttribute(e),r=o.querySelector("[data-tab-plate]");if(!r||r.closest("[data-tab-cover]")!=o)continue;const i=o.querySelector('[data-tab-link="'+n+'"]');r.style.left=i.offsetLeft+"px",r.style.width=i.getBoundingClientRect().width+"px"}}c(document),document.addEventListener("click",(function(e){const c=e.target.closest("[data-tab-link]");c&&function(e){const c=e.getAttribute(t),o=e.closest("[data-tab-cover]"),l=[...o.querySelectorAll('[data-tab-link="'+c+'"]')],n=[...o.querySelectorAll('[data-tab-content="'+c+'"]')],r=[...o.querySelectorAll("[data-tab-link].tab-active")],i=[...o.querySelectorAll("[data-tab-content].tab-active")];r&&r.filter((t=>t.closest("[data-tab-cover]")==o)).map((t=>t.classList.remove(a))),i&&i.filter((t=>t.closest("[data-tab-cover]")==o)).map((t=>t.classList.remove(a))),l&&l.filter((t=>t.closest("[data-tab-cover]")==o)).map((t=>t.classList.add(a))),n&&n.filter((t=>t.closest("[data-tab-cover]")==o)).map((t=>t.classList.add(a)));const s=o.querySelector("[data-tab-plate]");if(!s||s.closest("[data-tab-cover]")!=o)return;const d=l[0];s.style.left=d.offsetLeft+"px",s.style.width=d.getBoundingClientRect().width+"px"}(c)})),window.addEventListener("resize",(()=>setTimeout(o,250))),window.Tab={init:c}}();