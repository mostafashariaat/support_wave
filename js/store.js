const setLocalStorage = (key,value)=>{
    localStorage.setItem(key,value);
}


const getLocalStorage = (key)=>{
    localStorage.getItem(key)
}


const checkLocalStorage = (key,value)=>{
    const item = localStorage.getItem(key)
    if(!item)return false
    return item === value.toString()
}


export {setLocalStorage,getLocalStorage,checkLocalStorage};