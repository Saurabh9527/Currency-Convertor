const base_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/"
                // "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr.json 

const dropdowns=document.querySelectorAll('.dropdown select');  
//& or const dropdown = document.querySelector('.dropdown');
//&const selects = dropdown.querySelectorAll('select');
// for (const code in countryList) {
//     console.log(code , countryList[code]);
// }

const btn=document.querySelector("form button");
const fromCurrency=document.querySelector(".from select")
const toCurrency=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption=document.createElement('option');
        newOption.innerText=currCode;
        newOption.value=currCode;
        //console.log(currCode);
        if(select.name === "from" && currCode === "USD"){
            newOption.selected="selected"
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected="selected"
        }
        select.append(newOption);
    }

    select.addEventListener('change' , (evt)=>{
        // console.log(evt.target);
        updateFlag(evt.target);
    })
}

const updateFlag= (element)=>{
        // console.log(element);  //& evt.target
        let currCode=element.value;  // &extract currency code  INR USD ...
        let countryCode=countryList[currCode];  //& IN , EU , CU....
        let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
        let img=element.parentElement.querySelector("img");  //&Select the parent <div> element(i.e -> select-container) of the dropdown and then find the <img> element within it
        img.src=newSrc;       
}

btn.addEventListener("click", (e)=>{
    e.preventDefault();
    UpdateExchangeRate();
})

let UpdateExchangeRate=async ()=>{
    let amount=document.querySelector(".amount input");
    let amountValue=amount.value;
    // console.log(amountValue);
    if(amountValue === "" || amountValue < 1 || isNaN(amountValue)){
        amountValue=1;
        amount.value=1;
    }

    // console.log(fromCurrency.value , toCurrency.value);
    const URL=`${base_url}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`;
    let  response=await fetch(URL);
    let data=await response.json()
    // console.log(data);
    let rate=data[toCurrency.value.toLowerCase()];
    // console.log(rate);
    let finalAmount= amountValue * rate;

    msg.innerText=`${amountValue} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;   //& ex:- 1USD = 80INR
}


window.addEventListener("load" , ()=>{
    UpdateExchangeRate();
})









// let fromSelect = document.querySelector('select[name="from"]');
// let toSelect = document.querySelector('select[name="to"]');

// fromSelect.querySelector('option[value="USD"]').selected = true;
// toSelect.querySelector('option[value="INR"]').selected = true;
