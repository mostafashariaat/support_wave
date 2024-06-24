import { videoUrl } from "./endpoints.js";
import { loading } from "./loading.js";
import { postDataToServer, showToastify } from "./utils.js";

loading()
const titleDOM = document.querySelector("#title")
const captionDOM = document.querySelector("#caption")
const fileDOM = document.querySelector("#file")
const sendFileButton = document.querySelector(".send_file")
const form = document.querySelector("form")
const vidoeItem = document.querySelector(".video-item")
const video = document.querySelector(".video-item video")
form.addEventListener("submit",async(e)=>{
    e.preventDefault()
    

    const file = fileDOM.files[0]
    const title = titleDOM.value;
    const caption = captionDOM.value;

    if(!caption || !title || !file){showToastify(toast);return}


    const formData = new FormData(form);
const requestOptions = {
  method: "POST",
  body: formData,
  redirect: "follow"
};

  
  fetch(videoUrl, requestOptions)
    .then((response) => {if(response.ok)showToastify({text:"ویدئو شما با موفقیت ارسال شد."}); restartForm()})
    .catch((error) => {showToastify({text:"ارسال شما با خطا مواجه شد "})});



    // formData.append("title",title)
    // formData.append("caption",caption)
    // console.log(formData);
    // const toast = {text:"لطفا تمام اطلاعات را تکمیل کنید ",background: "red"}
    // await postDataToServer(videoUrl,formData).then(r=>{if(r.ok)showToastify({text:"ویدئو شما با موفقیت ارسال شد."})})
})



fileDOM.addEventListener("change",()=>{
    // console.log('yes');
    const fileDOM = document.querySelector("#file")
    // console.log('yes');
    const file = fileDOM.files[0];
    if(!isVideo(file.name)){
        const toast = {text: "لطفا یک ویدئو بارگذاری کنید", background: "red"}
        showToastify(toast)
        return;
    }
    const url = URL.createObjectURL(file);
    // console.log(url);
    vidoeItem.classList.remove("hidden");
    // video.classList.remove("hidden")
    video.src = url;
    video.play()
    
})


function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
  }


  function isVideo(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'm4v':
      case 'avi':
      case 'mpg':
      case 'mp4':
        // etc
        return true;
    }
    return false;
  }





function restartForm(){
    // video.pause()
    vidoeItem.classList.add("hidden")
    titleDOM.value = "";
    captionDOM.value = "";
    fileDOM.value = ""
}





