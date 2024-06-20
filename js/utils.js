
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
    $(element).trigger("chosen:updated");
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
    $(element).chosen();
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

async function  getDataFromServer(url) {
    const ajax = await fetch(url)
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

async function postDataToServer(url, data={},message="",background="#f0f0f0") {
    const ajax = await fetch(url, {
        method: 'POST', // Specify the method
        headers: {
            'Content-Type': 'application/json' // Specify that we're sending JSON
        },
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




export {getDataFromServer,postDataToServer,showToastify,selectsItemsValue,selectedId}
