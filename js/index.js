import { statesUrl,worksUrl,supportersUrl } from "./endpoints.js"
import { loading } from "./loading.js"
import { checkLocalStorage, setLocalStorage } from "./store.js"
import { getDataFromServer, postDataToServer, selectedId, selectsItemsValue, setQueryParams, showToastify,supporterHTML } from "./utils.js"
// import {supporterHTML} from "./support.js"

const supportButton = document.querySelector(".support_button")
const supportersList = document.querySelector(".supporter-list")
const nameDOM = document.querySelector("#name")
const stateDOM = document.querySelector("#state")
const workDOM = document.querySelector("#work")
const supportersCountDOM = document.querySelector(".supporters_count")
$(".state").select2()
// // $(".work").select2()




async function getList(url,element){
    const data = await getDataFromServer(url)
    const dataResult = await data.results;
    selectsItemsValue(element,dataResult);
}


getList(statesUrl,stateDOM,".state");

getList(worksUrl,workDOM,".work");





const supporters = await getDataFromServer(supportersUrl,10)
const supportersResult = supporters.results;
const supportersCount = await supporters?.total_count;

supportersCountDOM.innerHTML = `${supportersCount.toLocaleString()} نفر`;

loading()

supporterHTML(supportersList,supportersResult);



supportButton.addEventListener("click",async()=>{
    const name = nameDOM.value;
    const state = selectedId("#state")[0];
    const work = selectedId("#work")[0];

    if(!name || !state || !work){
        const toast = {text:"لطفا تمام اطلاعات را تکمیل کنید ",background: "red"}
        showToastify(toast);
        return 
    }
    const data = {full_name:name,province:state,expertise:work}
    // if(checkLocalStorage("support",1)){showToastify({text: "شما قبلا حمایت کرده‌اید! ", background: "red"});return; }
    await postDataToServer(supportersUrl,data,"اطلاعات شما با موفقیت ثبت شد!").then(r=>setLocalStorage("support",1))
    const supporters = await getDataFromServer(supportersUrl,10)
    const supportersResult = supporters.results;
    supporterHTML(supportersList,supportersResult);
    const supportersCount = await supporters?.count;
    supportersCountDOM.innerHTML = `${supportersCount} نفر`
})




