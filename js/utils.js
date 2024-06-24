
const paginateSize = 10;
export {paginateSize}
function showToastify({text,background="#038b8b"}){
    Toastify({
        text,
        duration:6000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background,
        },
        onClick: function(){} // Callback after click
      }).showToast();
    
}

function setQueryParams(url, params) {
  let parser = new URL(url);
  for (let key in params) {
      if (params.hasOwnProperty(key)) {
          parser.searchParams.set(key, params[key]);
      }
  }
  return parser.toString();
}




function selectedId(className) {
  const selectedOptions = $(className).find(":selected");
  return selectedOptions
    .map(function () {
      return $(this).attr("id");
    })
    .get();
}


function selectsItemsValue(element, data, ids = []) {
  // console.log(element,data);
    if (!element || !data) return;
    if (!data?._id) {
      selectsItemsValueHTML(element, data, ids);
    } else {
      element.innerHTML = optionHTML(data);
      // console.log(element, data);
    }
    // $(element).trigger("chosen:updated");
  }
  
  function selectsItemsValueHTML(element, data, ids = []) {
    if (!element || !data) return;
    element.innerHTML = data
      ?.map((item) => {
        let selected = false;
        if (ids?.includes(item?.id)) selected = true;
        return optionHTML(item, selected);
      })
      .join("");
    // $(element).chosen();
  }


  function optionHTML(item, selected = false) {
    if (!item) return;
    return `<option class="options option-edit" ${
      selected ? "selected" : ""
    } id=${item?.id} 
    data-id=${item?.id}>
    ${item?.title}
    </option>`;
  }

async function  getDataFromServer(url,page_size=50) {
    const newUrl = url.includes("page_size") ? url : `${url}?page_size=${page_size}`
    const ajax = await fetch(newUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // assuming the response is JSON
        })
        .then(data => {
            // showToastify("fdjsfkdsjfkl")
            return data;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
        return ajax;
}





async function postDataToServer(url, data={},header={'Content-Type': 'application/json'},message="",background="#f0f0f0") {
    const ajax = await fetch(url, {
        method: 'POST', // Specify the method
        headers: header,
        // redirect: "follow",
        body: JSON.stringify(data) // Convert the data object to a JSON string
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Assuming the response is JSON
    })
    .then(data => {
        showToastify({text:message})
        return data // Process the JSON data returned from the server
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
    return ajax;
}



function supporterHTML(element,data) {
  // console.log('log');
  element.innerHTML = data.map(item=>{ 
      return `<div
        class="flex items-center justify-items-center font-bold text-ms sm:text-lg md:text-xl bg-primery rounded-lg text-white gap-1 mt-1"
      >
        <p
          class="border-l border-white w-full text-center py-3 overflow-hidden text-ellipsis whitespace-nowrap hidden md:block"
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

function toEnglishDigits(num) {

  const id = {
    '۰': '0',
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9',
  }
  return num ? num.toString().replace(/[^0-9.]/g, function (w) {
    return id[w] || w
  }) : null
}


export {getDataFromServer,postDataToServer,showToastify,selectsItemsValue,selectedId,setQueryParams,supporterHTML,toEnglishDigits}
