import { videoUrl } from "./endpoints.js";
import { loading } from "./loading.js";
import { getDataFromServer } from "./utils.js";

const data = [
  {id: 1, video: "public/videos/1.mp4",caption:"",title:""},
  {id: 2, video: "public/videos/2.mp4",caption:"",title:""},
  {id: 3, video: "public/videos/3.mp4",caption:"",title:""},
  {id: 4, video: "public/videos/4.mp4",caption:"",title:""},
  {id: 5, video: "public/videos/5.mp4",caption:"",title:""},
  {id: 6, video: "public/videos/6.mp4",caption:"",title:""}
]


loading()

const videoContainerDOM = document.querySelector(".video-list");
// const videos = await getDataFromServer(videoUrl,12);
// const videoResults = await videos.results;
// console.log(videoResults);
videoPlayerHTML(videoContainerDOM,data)
const playButtons = document.querySelectorAll(".play-btn");
playButtons.forEach(playButton=>{
  playButton.addEventListener("click",()=>{
    const id = playButton.dataset.id;
    console.log(id);
    const video = document.getElementById(`${id}`)
    video.setAttribute("controls","controls")
    video.play()   
    console.log(video);
    playButton.style.display = "none"
  })
})
const shareButtons = document.querySelectorAll(".share-btn");
shareButtons.forEach(shareButton=>{
  shareButton.addEventListener("click",()=>{
    const link = shareButton.dataset.link2;
    const title = shareButton.dataset.title;
    const caption = shareButton.dataset.caption;
    console.log(title,caption);
    navigator.share({
      title: `${title}`,
      text: `${caption}`,
      url: link  // This is replaced by override
    }).then(() => {
      console.log('Successful share');
    }).catch((error) => {
      console.log('Error sharing:', error);
    }); 
  })
})



function videoPlayerHTML(element,data){
    
    element.innerHTML = data.map((item,index)=>{
        return `<div class="relative video-item rounded-lg ${index % 2 !==0 ? "mr-20 sm:mr-auto sm:mt-10" : "ml-20 sm:ml-auto"}">
        <video id="${item.id}" playsinline preload="metadata" data-id=${item.id}>
          // <source src="${item.video}" type="video/mp4" />
          <source src="${item.video}#t=0.5" type="video/mp4" />
        </video>
        <div class="flex items-center justify-center p-5 rounded absolute play-btn cursor-pointer" style="top: 50%; left: 50%; transform: translate(-50%,-50%); z-index: 9999;" data-id=${item.id}>
          <img src="public/images/play.svg" alt="play" class="w-20" data-id=${item.id}>
        </div>    
        <div class="bg-secondry flex items-center justify-center p-2 rounded absolute share-btn cursor-pointer" style="bottom: 30px; right: 5px;  z-index: 9999;" data-link=${item.video} data-link2="https://haamii.ir/${item?.video}" data-id=${item.id} data-caption="${item.caption}" data-title=${item.title}>
          <img src="public/images/share.svg" alt="share" class="w-5" data-id=${item.id} data-link=${item.video} data-link2="https://haamii.ir/${item?.video}" data-caption="${item.caption}" data-title=${item.title}>
        </div>    
      </div>`
    }).join("")

}
