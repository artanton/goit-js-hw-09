const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");document.body.classList.add("custom-background");const o=document.querySelector(".custom-background");let s;t.addEventListener("click",(function(){s=setInterval((()=>{const t=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;o.style.backgroundColor=t}),1e3),t.disabled=!0,e.disabled=!1})),e.addEventListener("click",(function(){clearTimeout(s),t.disabled=!1,e.disabled=!0})),t.style.position="absolute",t.style.top="50%",t.style.left="50%",t.style.transform="translate(-100%, -50%)",e.style.position="absolute",e.style.top="50%",e.style.left="50%",e.style.transform="translate(100%, -50%)";
//# sourceMappingURL=01-color-switcher.0b8f5193.js.map
