// async function  getDataFromServer(url) {
//     await fetch(url)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok ' + response.statusText);
//             }
//             console.log(response.json());
//             return response.json(); // assuming the response is JSON
//         })
//         .then(data => {
//             console.log(data); // process the JSON data
//         })
//         .catch(error => {
//             console.error('There was a problem with the fetch operation:', error);
//         });
// }

// // Example usage:
// getDataFromServer('https://api.example.com/data');