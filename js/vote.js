import { voteUrl } from "./endpoints.js";
import { getDataFromServer, postDataToServer } from "./utils.js"
const voteNumberDOM = document.querySelector(".vote_number")



async function updateVoteNumber(element,count) {
    element.innerHTML = count.count.toLocaleString();

}

const voteNumber = await getDataFromServer(voteUrl);
updateVoteNumber(voteNumberDOM,voteNumber)






const voteButtonDOM = document.querySelector(".vote_button")

voteButtonDOM.addEventListener("click",async ()=>{
    postDataToServer(voteUrl,{},"رای شما با موفقیت ثبت شد")
    const voteNumber = await getDataFromServer(voteUrl);
    updateVoteNumber(voteNumberDOM,voteNumber)
})


