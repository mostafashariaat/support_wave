import { statesUrl,worksUrl,supportersUrl } from "./endpoints.js"
import { getDataFromServer, postDataToServer, selectedId, selectsItemsValue, showToastify } from "./utils.js"


const supportButton = document.querySelector(".support_button")

const nameDOM = document.querySelector("#name")
const stateDOM = document.querySelector("#state")
const workDOM = document.querySelector("#work")
const supportersCountDOM = document.querySelector(".supporters_count")
$(".state").select2()
$(".work").select2()


async function getList(){
    const states = await getDataFromServer(statesUrl)
    const works = await getDataFromServer(worksUrl)
    const stateResult = await states.results;
    const workResult = await works.results;
    selectsItemsValue(stateDOM,stateResult);
    $(".state").select2()
    selectsItemsValue(workDOM,workResult);
    $(".work").select2()
}

getList();


const supporters = await getDataFromServer(supportersUrl)
const supportersCount = await supporters?.count;

supportersCountDOM.innerHTML = `${supportersCount} نفر`


supportButton.addEventListener("click",async()=>{
    const name = nameDOM.value;
    const state = selectedId("#state")[0]
    const work = selectedId("#work")[0]

    if(!name || !state || !work){
        const toast = {text:"لطفا تمام اطلاعات را تکمیل کنید ",background: "red"}
        showToastify(toast)
        return 
    }
    const data = {full_name:name,state,expertise:work}
    await postDataToServer(supportersUrl,data,"اطلاعات شما با موفقیت ثبت شد!")
    const supporters = await getDataFromServer(supportersUrl)
    const supportersCount = await supporters?.count;
    supportersCountDOM.innerHTML = `${supportersCount} نفر`
})