!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=document.body,a=null;t.disabled=!1,t.addEventListener("click",(function(){t.disabled=!0,a=setInterval((function(){var t;t="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0)),n.style.backgroundColor=t}),1e3)})),e.addEventListener("click",(function(){t.disabled=!1,clearInterval(a)}))}();
//# sourceMappingURL=01-color-switcher.f609f983.js.map