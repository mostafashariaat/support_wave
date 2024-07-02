import { voteUrl } from "./endpoints.js";
import { getDataFromServer, postDataToServer, showToastify } from "./utils.js"
import { setLocalStorage,getLocalStorage,checkLocalStorage } from "./store.js";
import { loading } from "./loading.js";
const voteNumberDOM = document.querySelector(".vote_number")
const voteBottonSrc = "public/images/green_button.png";
const voteImage = document.querySelector(".vote_button_img");


async function updateVoteNumber(element,count) {
    element.innerHTML = count.count.toLocaleString();

}

const voteNumber = await getDataFromServer(voteUrl,10);




if(checkLocalStorage("vote",1)){voteImage.src = voteBottonSrc}

updateVoteNumber(voteNumberDOM,voteNumber)

loading()







const voteButtonDOM = document.querySelector(".vote_button")

voteButtonDOM.addEventListener("click",async ()=>{
    if(checkLocalStorage("vote",1)){showToastify({text:"رای شما قبلا ثبت شده‌است!", background: "red"});return}
    // console.log(voteImage);
    voteImage.src = voteBottonSrc;
    await postDataToServer(voteUrl,{},{'Content-Type': 'application/json'},"رای شما با موفقیت ثبت شد").then(d=>setLocalStorage("vote",1))


    const voteNumber = await getDataFromServer(voteUrl);
    updateVoteNumber(voteNumberDOM,voteNumber)
})


