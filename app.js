
const btnWork = document.getElementById("work");
const btnBank = document.getElementById("bank");
const btnLoan = document.getElementById("loan");
const btnRepay = document.getElementById("repay");

// const btnBuy =  document.getElementById("buy");

const sumOfLoan = document.getElementById("sum-of-loan");
const komputersElement = document.getElementById("komputers");
const komputerPrice = document.getElementById("price");









let komputers = [];
fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => komputers = data)
    .then(komputers => addKomputersToMenu(komputers));


const addKomputersToMenu = (komputers) => {
    komputers.forEach(x => addKomputerToMenu(x));
    komputerPrice.innerText = komputers[0].price + " SEK";
    komputerFeatures.innerText = komputers[0].specs.join("\r\n");
    descripInfo.innerText = komputers[0].description;
    komputerImage.src="https://noroff-komputer-store-api.herokuapp.com/" + komputers[0].image;
}
const addKomputerToMenu = (komputer) => {
    const komputerElement = document.createElement("option");
    komputerElement.value = komputer.id;
    komputerElement.appendChild(document.createTextNode(komputer.title));
    komputersElement.appendChild(komputerElement);
}

const handleKomputerMenuChange = e => {
    const selectedKomputer = komputers[e.target.selectedIndex];
    komputerPrice.innerText = selectedKomputer.price + " SEK";
    komputerFeatures.innerText = selectedKomputer.specs.join("\r\n");
    descripInfo.innerText = selectedKomputer.description;
    if (selectedKomputer.image == "assets/images/5.jpg") {
        const visor = "assets/images/5.png";
        komputerImage.src="https://noroff-komputer-store-api.herokuapp.com/" + visor;
    }else {
    komputerImage.src="https://noroff-komputer-store-api.herokuapp.com/" + selectedKomputer.image;
    }
}










function increment() {
    let money = parseInt(salary.innerText);
    money += 100;
    salary.innerText = money + "kr";
}

function banking() {
    let currentMoney = parseInt(salary.innerText);
    let currentBalance = parseInt(balance.innerText);
    if (currentBalance == 0) {
        balance.innerText = currentMoney + " kr";

    }
    else if (currentBalance != 0 && parseInt(sumOfLoan.innerText) == 0) {
        console.log(currentBalance);
        currentBalance += currentMoney;
        balance.innerText = currentBalance + " kr";
    }
    else if (currentBalance != 0 && parseInt(sumOfLoan.innerText) != 0) {
        let deductedMoney = parseInt(salary.innerText) * 0.9;
        balance.innerText = currentBalance + deductedMoney + " kr";
        sumOfLoan.innerText = parseInt(sumOfLoan.innerText) + parseFloat(salary.innerText) * 0.1 + " kr";
    }
    else if (parseInt(sumOfLoan.innerText == 0)) {
        document.getElementById("current-loan").hidden = true;
        sumOfLoan.hidden = true;
        btnRepay.hidden = true;
    }
    salary.innerText = 0 + " kr";
}

function loaning() {
    if (parseInt(balance.innerText) != 0 && parseInt(sumOfLoan.innerText) == 0) {
        const loanAmount = parseInt(prompt("How much do you want to loan?"));

        if (0 < loanAmount != 0 && loanAmount <= parseInt(balance.innerText) * 2) {
            alert("loan accepted!");
            document.getElementById("current-loan").hidden = false;
            sumOfLoan.hidden = false;
            sumOfLoan.innerText = loanAmount + " kr";
            btnRepay.hidden = false;
        }
        else {
            alert("input error, loan NOT accepted!");
        }
    }
    else {
        alert("you can NOT take a loan");
    }
}

function toRepay() {
    if (parseInt(balance.innerHTML) != 0 && parseInt(sumOfLoan.innerText) != 0) {
        if (parseInt(salary.innerText) >= parseInt(sumOfLoan.innerText)) {
            let leftoverPay = parseInt(salary.innerHTML) - parseInt(sumOfLoan.innerText);
            balance.innerText = parseInt(balance.innerText) + leftoverPay + " kr";
            sumOfLoan.innerText = 0 + " kr";
            salary.innerText = 0 + " kr";
            document.getElementById("current-loan").hidden = true;
            sumOfLoan.hidden = true;
            btnRepay.hidden = true;
        }
        else if (parseInt(sumOfLoan.innerText) >= parseInt(salary.innerText) && parseInt(salary.innerText) != 0) {
            let leftoverLoan = parseInt(sumOfLoan.innerText) - parseInt(salary.innerText);
            sumOfLoan.innerText = leftoverLoan + " kr";
            salary.innerText = 0 + " kr";
            console.log("hej");
        }
        else alert("not enough balance in Pay");
    }
}


btnWork.addEventListener("click", increment);
btnBank.addEventListener("click", banking);
btnLoan.addEventListener("click", loaning);
btnRepay.addEventListener("click", toRepay);
komputersElement.addEventListener("change", handleKomputerMenuChange);