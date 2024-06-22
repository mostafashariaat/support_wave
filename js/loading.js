

function loading(){
    const loading = document.querySelector(".loading");
    const footer = document.querySelector("footer")
    const header = document.querySelector("header")
    const main = document.querySelector("main");
    
    header.style.visibility = "visible"
    main.style.visibility = "visible";
    loading.style.display = "none";
    footer.style.display = "flex"
}

export {loading}