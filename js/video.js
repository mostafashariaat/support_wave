import { videoUrl } from "./endpoints.js";
import { loading } from "./loading.js";
import { getDataFromServer } from "./utils.js";




loading()

const videoContainerDOM = document.querySelector(".video-list");
const videos = await getDataFromServer(videoUrl,12);
const videoResults = await videos.results;
console.log(videoResults);
videoPlayerHTML(videoContainerDOM,videoResults)


function videoPlayerHTML(element,data){
    
    element.innerHTML = data.map((item,index)=>{
        return `<div class="relative ${index % 2 ===0 ? "mt-10" : ""}">
        <video id="player" class="rounded-lg" playsinline preload="metadata" data-id=${item.id}>
          <source src="${item.video}" type="video/wmv" />
        </video>
        <div class="flex items-center justify-center p-5 rounded absolute play-btn cursor-pointer" style="top: 50%; left: 50%; transform: translate(-50%,-50%); z-index: 9999;">
          <img src="public/images/play.svg" alt="play" class="w-20" data-id=${item.id}>
        </div>    
        <div class="bg-secondry flex items-center justify-center p-2 rounded absolute share-btn cursor-pointer" style="bottom: 30px; right: 5px;  z-index: 9999;">
          <img src="public/images/share.svg" alt="share" class="w-5" data-id=${item.id} data-link=${item.video}>
        </div>    
      </div>`
    })

}
