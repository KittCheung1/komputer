
const btnWork = document.getElementById("work");
const btnBank = document.getElementById("bank");
const btnLoan = document.getElementById("loan");
// const btnBuy =  document.getElementById("buy");

const sumOfLoan = document.getElementById("sum-of-loan");
const moneyInBank = document.getElementById("balance");
//const komputerPrice = document.getElementById("price");
const earnedMoney = document.getElementById("salary");


function increment() {
    let money = parseInt(earnedMoney.innerText);
    money += 100;
    salary.innerText = money;
}

function banking() {
    let currentMoney = parseInt(earnedMoney.innerText);
    let currentBalance = parseInt(balance.innerText);
    if (currentBalance == 0) {
        balance.innerText = currentMoney;
        
    }
    else if (currentBalance != 0 && parseInt(sumOfLoan.innerText) == 0) {
        currentBalance += currentMoney;
        balance.innerText = currentBalance;
    }
    if (currentBalance != 0 && parseInt(sumOfLoan.innerText) != 0){
        let deductedMoney = parseInt(earnedMoney.innerText * 0.9);
        balance.innerText = currentBalance + deductedMoney;
        // sumOfLoan.innerText = sumOfLoan.innerText - parseInt(earnedMoney.innerText) * 0.1;
    }
    if (sumOfLoan.innerText == 0) {
        document.getElementById("current-loan").hidden = true;
        document.getElementById("sum-of-loan").hidden = true;
    }
    earnedMoney.innerText = 0;
}

function loaning() {
    if (parseInt(moneyInBank.innerText) !=0 && parseInt(sumOfLoan.innerText) == 0) {
        const loanAmount = Number(window.prompt("How much do you want to loan?"));
        if (loanAmount == 0 || loanAmount !== ""){
            alert("input error");
        }
        else if (loanAmount <= parseInt(balance.innerText) * 2) {
            alert("loan accepted!");
            document.getElementById("current-loan").hidden = false;
            document.getElementById("sum-of-loan").hidden = false;
            sumOfLoan.innerText = loanAmount;
        }
        else {
            alert("loan NOT accepted!");
            sumOfLoan.innerText = 0;
        }
    }
    else {
        alert("you can NOT take a loan");
    }
}





btnWork.addEventListener("click", increment);
btnBank.addEventListener("click", banking);
btnLoan.addEventListener("click", loaning);