const btnWork = document.getElementById("work");
const btnBank = document.getElementById("bank");
const btnLoan = document.getElementById("loan");
const btnRepay = document.getElementById("repay");
const btnBuy = document.getElementById("buy");

const currentLoan = document.getElementById("current-loan");
const sumOfLoan = document.getElementById("sum-of-loan");
const komputersElement = document.getElementById("komputers");
const komputerPrice = document.getElementById("price");

// fetching API-list of komputers for the Store
let komputers = [];
fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => komputers = data)
    .then(komputers => addKomputersToMenu(komputers));

// Add the first komputer's data: Price, Name, Spec, Descrip, Image 
// to the first page when opening window for the first time
const addKomputersToMenu = (komputers) => {
    komputers.forEach(x => addKomputerToMenu(x));
    komputerPrice.innerText = komputers[0].price + " SEK";
    komputerFeatures.innerText = komputers[0].specs.join("\r\n");
    descripInfo.innerText = komputers[0].description;
    komputerName.innerText = komputers[0].title;
    komputerImage.src = "https://noroff-komputer-store-api.herokuapp.com/" + komputers[0].image;
}

// Add komputers to the dropdown list by creating a new element for each komputer taken from the API-list
// the dropdown list will display only the name of the komputers available
const addKomputerToMenu = (komputer) => {
    const komputerElement = document.createElement("option");
    komputerElement.value = komputer.id;
    komputerElement.appendChild(document.createTextNode(komputer.title));
    komputersElement.appendChild(komputerElement);
}

// Changing data at selected displaying areas like Name, Price, Spec, Descrip, Image
// these will be updated depending on users selection of komputer in the dropdown list
// Also handling an error case where image 5 didnt want to load from the API. by changing jpg --> png
const handleKomputerMenuChange = e => {
    const selectedKomputer = komputers[e.target.selectedIndex];
    komputerPrice.innerText = selectedKomputer.price + " SEK";
    komputerFeatures.innerText = selectedKomputer.specs.join("\r\n");
    descripInfo.innerText = selectedKomputer.description;
    komputerName.innerText = selectedKomputer.title;
    if (selectedKomputer.image == "assets/images/5.jpg") {
        const visor = "assets/images/5.png";
        komputerImage.src = "https://noroff-komputer-store-api.herokuapp.com/" + visor;
    } else {
        komputerImage.src = "https://noroff-komputer-store-api.herokuapp.com/" + selectedKomputer.image;
    }
}

// Money increment. when clicking on "Work"-btn
function increment() {
    let money = parseInt(salary.innerText);
    money += 100;
    salary.innerText = money + "kr";
}

// functionality of the "Bank"-btn.
function banking() {
    let currentMoney = parseInt(salary.innerText);
    let currentBalance = parseInt(balance.innerText);
    if (currentBalance == 0) {
        balance.innerText = currentMoney + " kr";

    } else if (currentBalance != 0 && parseInt(sumOfLoan.innerText) == 0) {
        currentBalance += currentMoney;
        balance.innerText = currentBalance + " kr";
    } else if (currentBalance != 0 && parseInt(sumOfLoan.innerText) != 0) {
        let deductedMoney = parseInt(salary.innerText) * 0.9;
        balance.innerText = currentBalance + deductedMoney + " kr";
        sumOfLoan.innerText = parseInt(sumOfLoan.innerText) + parseFloat(salary.innerText) * 0.1 + " kr";
    } else if (parseInt(sumOfLoan.innerText == 0)) {
        sumOfLoan.hidden = true;
        currentLoan.hidden = true;
        btnRepay.hidden = true;
    }
    salary.innerText = 0 + " kr";
}

// functionality of the "Get a Loan"-btn.
// all Informal-messages will be displayed with alert()
// entering Loan amount uses prompt()
function loaning() {
    if (parseInt(balance.innerText) != 0 && parseInt(sumOfLoan.innerText) == 0) {
        const loanAmount = parseInt(prompt("How much do you want to loan?"));
        const maximumLoan = parseInt(balance.innerText) * 2;
        if (0 < loanAmount != 0 && loanAmount <= parseInt(balance.innerText) * 2) {
            alert("Loan accepted!");
            currentLoan.hidden = false;
            sumOfLoan.hidden = false;
            sumOfLoan.innerText = loanAmount + " kr";
            btnRepay.hidden = false;
        } else {
            alert(`Enter positive numbers only. Maximum loan you can take is ${maximumLoan}`);
        }
    } else {
        alert("You can not take more loans");
    }
}

// functionality of the "Repay"-btn.
// all messages will be displayed with alert()
function toRepay() {
    if (parseInt(balance.innerHTML) != 0 && parseInt(sumOfLoan.innerText) != 0) {
        if (parseInt(salary.innerText) >= parseInt(sumOfLoan.innerText)) {
            let leftoverPay = parseInt(salary.innerHTML) - parseInt(sumOfLoan.innerText);
            balance.innerText = parseInt(balance.innerText) + leftoverPay + " kr";
            sumOfLoan.innerText = 0 + " kr";
            salary.innerText = 0 + " kr";
            currentLoan.hidden = true;
            sumOfLoan.hidden = true;
            btnRepay.hidden = true;
        } else if (parseInt(sumOfLoan.innerText) >= parseInt(salary.innerText) && parseInt(salary.innerText) != 0) {
            let leftoverLoan = parseInt(sumOfLoan.innerText) - parseInt(salary.innerText);
            sumOfLoan.innerText = leftoverLoan + " kr";
            salary.innerText = 0 + " kr";
        } else alert("Not enough balance in Pay");
    }
}

// functionality of the "Buy Now"-btn.
// all messages will be displayed with alert()
function toBuy() {
    if (parseInt(balance.innerText) >= parseInt(price.innerText)) {
        let komputerPrice = parseInt(price.innerText);
        alert(`You have now bought a ${komputerName.innerText} for ${komputerPrice} SEK`);
        balance.innerText = parseInt(balance.innerText) - parseInt(price.innerText);
    } else {
        alert("You dont have enough money in Bank balance");
    }
}

// list of events
btnWork.addEventListener("click", increment);
btnBank.addEventListener("click", banking);
btnLoan.addEventListener("click", loaning);
btnRepay.addEventListener("click", toRepay);
btnBuy.addEventListener("click", toBuy);
komputersElement.addEventListener("change", handleKomputerMenuChange);