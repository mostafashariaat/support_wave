import { statesUrl,worksUrl,supportersUrl } from "./endpoints.js"
import { getDataFromServer, paginateSize, postDataToServer, selectedId, supporterHTML,selectsItemsValue, setQueryParams, showToastify } from "./utils.js"
import { loading } from "./loading.js"
import { checkLocalStorage, setLocalStorage } from "./store.js"

const supportersListDOM = document.querySelector(".supporter-list")
const paginationDOM = document.querySelector(".pagination-container")
const supporters = await getDataFromServer(supportersUrl,20)
const supportersResult = supporters.results;
const supportersCount = await supporters?.count;
const supportersCountDOM = document.querySelector(".supporters_count")
supportersCountDOM.innerHTML = `${supportersCount.toLocaleString()} نفر`;


loading()

const worksDOM = document.querySelector(".supports-filter")


// const worksFilter = await getDataFromServer(worksUrl,20)
// const worksFilterResult = worksFilter.results;
// worksHTML(worksDOM,worksFilterResult) 





supporterHTML(supportersListDOM,supportersResult);

function pagination(page){
    const paginatedArray = createPagintion(supportersCount,20,page?page:1)
    paginationHTML(paginationDOM,paginatedArray,page)
}

pagination(1)


const supportButton = document.querySelector(".support_button")
const supportersList = document.querySelector(".supporter-list")
const nameDOM = document.querySelector("#name")
const stateDOM = document.querySelector("#state")
const workDOM = document.querySelector("#work")
$(".state").select2()



loading()

async function getList(url,element){
    const data = await getDataFromServer(url)
    const dataResult = await data.results;
    selectsItemsValue(element,dataResult);
}


getList(statesUrl,stateDOM,".state");

getList(worksUrl,workDOM,".work");





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
    if(checkLocalStorage("support",1)){showToastify({text: "شما قبلا حمایت کرده‌اید! ", background: "red"});return; }
    await postDataToServer(supportersUrl,data,"اطلاعات شما با موفقیت ثبت شد!").then(r=>setLocalStorage("support",1))
    const supporters = await getDataFromServer(supportersUrl,10)
    const supportersResult = supporters.results;
    supporterHTML(supportersList,supportersResult);
    const supportersCount = await supporters?.count;
    supportersCountDOM.innerHTML = `${supportersCount.toLocaleString()} نفر`
})








function createPagintion(count,paginate_size,page=1){
    const pages = Math.ceil(count/paginate_size);
    const paginateSize = new Set()
    paginateSize.add(1)
    paginateSize.add(pages)
    let paginatedArray;
    if(page===1){
        paginateSize.add(2)
        paginatedArray =  Array.from(paginateSize).sort((a,b)=>a-b)
    }
    else if(page===pages){
        paginateSize.add(pages-1)
        paginatedArray =  Array.from(paginateSize).sort((a,b)=>a-b)
    }
    else{
        paginateSize.add(page-1)
        paginateSize.add(page)
        paginateSize.add(page+1)
        paginatedArray = Array.from(paginateSize).sort((a,b)=>a-b)
    }

    return createPriodsPaginated(paginatedArray,pages)    
}

function createPriodsPaginated(paginatedArray,pages){
    if(pages - paginatedArray[paginatedArray.length-2]>1 && paginatedArray[1] - 1 > 1){
        paginatedArray.splice(paginatedArray[0],0,"...")
        paginatedArray.splice(paginatedArray.length-1,0,"...")
    }
    if(pages - paginatedArray[paginatedArray.length-2]>1)paginatedArray.splice(paginatedArray.length-1,0,"...")
    if(paginatedArray[1] - 1 > 1) paginatedArray.splice(paginatedArray[0],0,"...")
    

    return paginatedArray

}


function paginationHTML(element,pages,active_page=1){
    element.innerHTML = pages.map(page=>{
        if(page ==="...") return `<p class="font-bold text-2xl">...</p>`
        return `<div
          class="h-8 aspect-square flex justify-center items-center rounded border-2 border-secondry hover:border-secondry-hover text-white bg-secondry hover:bg-secondry-hover cursor-pointer transition-all duration-300 font-bold text-xl px-[20px] ${page===active_page?"active_paginate": ""} pageination-number " data-id="${page}" >
          ${page}
        </div>`
    }).join("")
   
    const paginationNumber = document.querySelectorAll('.pageination-number')
    paginationNumber.forEach(number=>{
        number.addEventListener('click',async()=>{
            // console.log('yes');
            const page = Number(number.dataset.id);
            const newSupporterUrl = setQueryParams(supportersUrl,{page:page,page_size:20})
            const supporters = await getDataFromServer(newSupporterUrl)
            const results = supporters.results;
            supporterHTML(supportersList,results);
            pagination(page)
        })
    })    
}


// function worksHTML(element,data) {
//     element.innerHTML = data.map(item=>{
//         return `<div
//                 class="flex cursor-pointer transition-all duration-300 w-full justify-center items-center text-center aspect-square bg-secondry align-item-center border-2 border-secondry rounded-3xl hover:bg-secondry-hover hover:border-secondry-hover p-2 text-white align-center  active_icon">
//                 <p class="text-xl font-bold">${item.title}</p>
//                 </div>
// `
//     }).join("")
    
// }

