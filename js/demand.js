import { statesUrl,worksUrl,supportersUrl,demandUrl } from "./endpoints.js"
import {  postDataToServer, showToastify, toEnglishDigits } from "./utils.js"

const demandButton = document.querySelector(".send_demand")
const nameDOM = document.querySelector("#name")
const phoneNumberDOM = document.querySelector("#phone_number")
const genderDOM = document.querySelectorAll(`input[name="gender"]`)
const demnadMessageDOM = document.querySelector("#message")

demandButton.addEventListener("click",async()=>{
    const full_name = nameDOM.value;
    const phone_number = toEnglishDigits(phoneNumberDOM.value);
    const gender = Array.from([...genderDOM].find(r => r.checked).value)[0];
    const demand = demnadMessageDOM.value;
    const iranianPhonePattern = /^(?:\+98|0098|0)?9\d{9}$/;



    if(!full_name || !phone_number || !gender || !demand){
        const toast = {text:"لطفا تمام اطلاعات را تکمیل کنید ",background: "red"}
        showToastify(toast);
        return 
    }
    if(!iranianPhonePattern.test(phone_number)){
        const toast = {text:"شماره تلفن وارد شده اشتباه است!",background: "red"}
        showToastify(toast);
        return 
    }
    const data = {full_name,phone_number,gender,demand}
    await postDataToServer(demandUrl,data,"مطالبه شما با موفقیت ثبت شد !").then(r=>restartDemandForm())
   
})


function restartDemandForm(){
    nameDOM.value = ""
    phoneNumberDOM.value = ""
    demnadMessageDOM.value = ""
}

