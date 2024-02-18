import{a as M,S as P,i as n}from"./assets/vendor-64b55ca9.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function l(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=l(e);fetch(e.href,s)}})();async function g(r,t){const l="https://pixabay.com",o="/api",e="/?key=42307654-d98cffd477e66adb5fa77b8c6",s=`&q=${r}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${t}`,i=l+o+e+s;return(await M.get(i)).data}const f=document.querySelector(".gallery");function h(r){const t=r.hits.map(({webformatURL:o,largeImageURL:e,tags:s,likes:i,views:p,comments:w,downloads:E})=>`<li class="gallery-item">
    <a class="gallery-link" href="${e}">
      <img
        class="gallery-image"
        src="${o}"
        alt="${s}"
      />
      <div class="descriptions-container">
       <div class="img-description">
      <p class="img-description-title">Likes</p>
      <p class="img-description-content">${i}</p>
    </div>
    <div class="img-description">
      <p class="img-description-title">Views</p>
      <p class="img-description-content">${p}</p>
    </div>
    <div class="img-description">
      <p class="img-description-title">Comments</p>
      <p class="img-description-content">${w}</p>
    </div>
    <div class="img-description">
      <p class="img-description-title">Downloads</p>
      <p class="img-description-content">${E}</p>
    </div>
    </div>
    </a>
  </li>`).join("");f.insertAdjacentHTML("beforeend",t),new P(".gallery a",{captions:!0,captionDelay:250,captionsData:"alt"}).refresh()}const $=document.querySelector(".form"),y=document.querySelector(".loader-container"),m=document.querySelector(".load-more-btn"),q=document.querySelector(".gallery");let c,L,d;const a={backgroundColor:"red",messageColor:"white",messageSize:"14",position:"topRight",timeout:3e3};$.addEventListener("submit",O);m.addEventListener("click",B);async function O(r){if(r.preventDefault(),b(),f.innerHTML="",d=r.target.elements.input.value.trim(),c=1,d===""){n.show({...a,message:"Fill out the search form!"});return}try{v();const t=await g(d,c);if(L=Math.ceil(t.totalHits/15),t.totalHits===0){u(),n.show({...a,message:"Sorry, there are no images matching your search query. Please try again!"});return}else h(t),u()}catch(t){n.error({...a,title:"Error",message:t})}S(),r.target.reset()}async function B(){c+=1,v();try{const t=await g(d,c);h(t)}catch(t){n.error({...a,title:"Error",message:t})}u(),S();const r=q.firstElementChild.getBoundingClientRect().height;scrollBy({behavior:"smooth",top:r*2})}function v(){y.classList.remove("is-hidden")}function u(){y.classList.add("is-hidden")}function C(){m.classList.remove("hidden")}function b(){m.classList.add("hidden")}function S(){c>=L?(b(),n.show({...a,message:"We're sorry, but you've reached the end of search results."})):C()}
//# sourceMappingURL=commonHelpers.js.map
