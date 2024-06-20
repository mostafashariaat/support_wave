
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




export {getDataFromServer,postDataToServer,showToastify}
