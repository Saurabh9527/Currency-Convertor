const base_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/"
 
const dropdowns=document.querySelectorAll('.dropdown select');  
const btn=document.querySelector("form button");
const fromCurrency=document.querySelector(".from select")
const toCurrency=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption=document.createElement('option');
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected="selected"
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected="selected"
        }
        select.append(newOption);
    }

    select.addEventListener('change' , (evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag= (element)=>{
        let currCode=element.value;  
        let countryCode=countryList[currCode]; 
        let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
        let img=element.parentElement.querySelector("img");  
        img.src=newSrc;       
}

btn.addEventListener("click", (e)=>{
    e.preventDefault();
    UpdateExchangeRate();
})

let UpdateExchangeRate=async ()=>{
    let amount=document.querySelector(".amount input");
    let amountValue=amount.value;
    if(amountValue === "" || amountValue < 1 || isNaN(amountValue)){
        amountValue=1;
        amount.value=1;
    }

    const URL=`${base_url}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`;
    let  response=await fetch(URL);
    let data=await response.json()
    let rate=data[toCurrency.value.toLowerCase()];
    let finalAmount= amountValue * rate;

    msg.innerText=`${amountValue} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;   
}


window.addEventListener("load" , ()=>{
    UpdateExchangeRate();
})




