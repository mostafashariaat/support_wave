import { statesUrl,worksUrl,supportersUrl } from "./endpoints.js"
import { getDataFromServer, postDataToServer, selectedId, selectsItemsValue, setQueryParams, showToastify } from "./utils.js"


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

supportersCountDOM.innerHTML = `${supportersCount} نفر`;

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
    const data = {full_name:name,state,expertise:work}
    await postDataToServer(supportersUrl,data,"اطلاعات شما با موفقیت ثبت شد!")
    const supporters = await getDataFromServer(supportersUrl,10)
    const supportersResult = supporters.results;
    supporterHTML(supportersList,supportersResult);
    const supportersCount = await supporters?.count;
    supportersCountDOM.innerHTML = `${supportersCount} نفر`
})




function supporterHTML(element,data) {
    element.innerHTML = data.map(item=>{ 
        return `<div
          class="flex items-center justify-items-center font-bold text-ms sm:text-lg md:text-xl bg-primery rounded-lg text-white gap-1 mt-1"
        >
          <p
            class="border-l border-white w-full text-center py-3 overflow-hidden text-ellipsis whitespace-nowrap"
          >
            ${item.id}
          </p>
          <p
            class="border-l border-white w-full text-center py-3 overflow-hidden text-ellipsis whitespace-nowrap"
          >
           ${item.full_name}
          </p>
          <p
            class="border-l border-white w-full text-center py-3 overflow-hidden text-ellipsis whitespace-nowrap"
          >
           ${item.province.title}
          </p>
          <p
            class="border-l border-white w-full text-center py-3 overflow-hidden text-ellipsis whitespace-nowrap"
          >
            ${item.expertise.title}
          </p>
        </div>`    
    }).join("")

}


export {supporterHTML}