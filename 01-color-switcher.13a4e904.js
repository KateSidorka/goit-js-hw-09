const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=document.querySelector("body");let o=null;function a(){const t=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;n.style.backgroundColor=t}t.addEventListener("click",(function(){t.disabled=!0,o=setInterval(a,1e3)})),e.addEventListener("click",(function(){t.disabled=!1,clearInterval(o)}));
//# sourceMappingURL=01-color-switcher.13a4e904.js.map
