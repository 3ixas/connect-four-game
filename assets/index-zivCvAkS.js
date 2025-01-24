(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const i of c.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function r(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(n){if(n.ep)return;n.ep=!0;const c=r(n);fetch(n.href,c)}})();let u=!1;const a=document.getElementById("turn-indicator");let s="Player 1";function m(){a&&(s==="Player 1"?(a.textContent="Player 1's Turn",a.classList.add("player1-turn"),a.classList.remove("player2-turn")):(a.textContent="Player 2's Turn",a.classList.add("player2-turn"),a.classList.remove("player1-turn")))}const d=document.getElementById("restart-btn");d==null||d.addEventListener("click",()=>{console.log("Restarting the game..."),u=!1;for(let e=0;e<l.length;e++)for(let r=0;r<l[e].length;r++)l[e][r]=null;console.log("Game board array reset:",l),document.querySelectorAll(".cell").forEach(e=>{e.classList.remove("player1","player2","winning-cell")}),console.log("Visual board reset."),s="Player 1",m(),console.log("Player reset to Player 1.")});const g=document.getElementById("game-board");if(!g)throw new Error("Game board element not found");const l=Array.from({length:6},()=>Array(7).fill(null));function h(t){if(u)return;const e=t.target.closest(".cell");if(!e){console.error("Click did not hit a valid cell.");return}const r=parseInt(e.dataset.col);for(let o=l.length-1;o>=0;o--)if(l[o][r-1]===null){l[o][r-1]=s;const n=document.querySelector(`[data-row="${o+1}"][data-col="${r}"]`);if(n&&n.classList.add(s==="Player 1"?"player1":"player2"),p()){u=!0,setTimeout(()=>{f(`🏅 Victory for ${s}! What a game! 🎉`)},100);return}if(E()){u=!0,setTimeout(()=>{f("😲 It’s a draw! Who will break the tie next time? 🤔")},100);return}s=s==="Player 1"?"Player 2":"Player 1",m(),$();break}}function p(){return w()||L()||v()}function w(){for(let t=0;t<l.length;t++)for(let e=0;e<l[t].length-3;e++)if(l[t][e]!==null&&l[t][e]===l[t][e+1]&&l[t][e]===l[t][e+2]&&l[t][e]===l[t][e+3]){for(let r=0;r<4;r++){const o=document.querySelector(`[data-row="${t+1}"][data-col="${e+1+r}"]`);o==null||o.classList.add("winning-cell")}return console.log(`${l[t][e]} wins horizontally!`),!0}return!1}function L(){for(let t=0;t<l.length;t++)for(let e=0;e<l.length-3;e++)if(l[e][t]!==null&&l[e][t]===l[e+1][t]&&l[e][t]===l[e+2][t]&&l[e][t]===l[e+3][t]){for(let r=0;r<4;r++){const o=document.querySelector(`[data-row="${e+1+r}"][data-col="${t+1}"]`);o==null||o.classList.add("winning-cell")}return console.log(`${l[e][t]} wins vertically!`),!0}return!1}function v(){for(let t=0;t<l.length-3;t++)for(let e=0;e<l[t].length-3;e++)if(l[t][e]!==null&&l[t][e]===l[t+1][e+1]&&l[t][e]===l[t+2][e+2]&&l[t][e]===l[t+3][e+3]){for(let r=0;r<4;r++){const o=document.querySelector(`[data-row="${t+1+r}"][data-col="${e+1+r}"]`);o==null||o.classList.add("winning-cell")}return console.log(`${l[t][e]} wins diagonally (down-right)!`),!0}for(let t=3;t<l.length;t++)for(let e=0;e<l[t].length-3;e++)if(l[t][e]!==null&&l[t][e]===l[t-1][e+1]&&l[t][e]===l[t-2][e+2]&&l[t][e]===l[t-3][e+3]){for(let r=0;r<4;r++){const o=document.querySelector(`[data-row="${t+1-r}"][data-col="${e+1+r}"]`);o==null||o.classList.add("winning-cell")}return console.log(`${l[t][e]} wins diagonally (up-right)!`),!0}return!1}function E(){for(let t=0;t<l.length;t++)for(let e=0;e<l[t].length;e++)if(l[t][e]===null)return!1;return!0}function P(){document.querySelectorAll(".cell").forEach(e=>{e.addEventListener("click",r=>h(r))})}P();function f(t){const e=document.getElementById("result-modal"),r=document.getElementById("result-message"),o=document.getElementById("close-modal-btn");r.textContent=t,e.classList.remove("hidden"),e.classList.add("show"),o.addEventListener("click",()=>{e.classList.remove("show"),e.classList.add("hidden")})}function $(){const t=document.querySelectorAll(".cell");t.forEach(e=>e.classList.remove("hover-player1","hover-player2")),t.forEach(e=>{e.addEventListener("mouseover",r=>{const o=r.target.closest(".cell");if(!o)return;const n=o.dataset.col;document.querySelectorAll(`.cell[data-col="${n}"]`).forEach(i=>{const y=parseInt(i.dataset.row);l[y-1][parseInt(n)-1]===null&&i.classList.add(s==="Player 1"?"hover-player1":"hover-player2")})}),e.addEventListener("mouseout",()=>{document.querySelectorAll(".cell").forEach(o=>o.classList.remove("hover-player1","hover-player2"))})})}
