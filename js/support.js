import { statesUrl,worksUrl,supportersUrl } from "./endpoints.js"
import { getDataFromServer, paginateSize, postDataToServer, selectedId, selectsItemsValue, setQueryParams, showToastify } from "./utils.js"

// const x = setQueryParams(supportersUrl,{page:1,count:2})
// console.log(x);
const supportersCountDOM = document.querySelector(".supporters_count")
const supportersList = document.querySelector(".supporter-list")
const paginationDOM = document.querySelector(".pagination-container")
const supporters = await getDataFromServer(supportersUrl,10)
const supportersResult = supporters.results;
const supportersCount = await supporters?.count;

// const x = createPagintion(30,10,3)
// console.log(x);
supporterHTML(supportersList,supportersResult);

function pagination(page){
    const paginatedArray = createPagintion(supportersCount,paginateSize,page?page:1)
    paginationHTML(paginationDOM,paginatedArray,page)
}

pagination(1)









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
          class="h-8 aspect-square flex justify-center items-center rounded border-2 border-secondry hover:border-secondry-hover text-white bg-secondry hover:bg-secondry-hover cursor-pointer transition-all duration-300 font-bold text-xl ${page===active_page?"active_paginate": ""} pageination-number " data-id="${page}" >
          ${page}
        </div>`
    }).join("")
   
    const paginationNumber = document.querySelectorAll('.pageination-number')
    paginationNumber.forEach(number=>{
        number.addEventListener('click',async()=>{
            // console.log('yes');
            const page = Number(number.dataset.id);
            const newSupporterUrl = setQueryParams(supportersUrl,{page:page,page_size:paginateSize})
            const supporters = await getDataFromServer(newSupporterUrl)
            const results = supporters.results;
            supporterHTML(supportersList,results);
            pagination(page)
        })
    })    
}





function supporterHTML(element,data) {
    console.log('log');
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