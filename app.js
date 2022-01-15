
const btnWork = document.getElementById("work");
const btnBank = document.getElementById("bank");
const btnLoan = document.getElementById("loan");
const btnRepay = document.getElementById("repay");
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
        let deductedMoney = parseFloat(earnedMoney.innerText * 0.9);
        balance.innerText = currentBalance + deductedMoney;
        sumOfLoan.innerText = parseInt(sumOfLoan.innerText) + parseFloat(earnedMoney.innerText) * 0.1;
    }
    if (sumOfLoan.innerText == 0) {
        document.getElementById("current-loan").hidden = true;
        sumOfLoan.hidden = true;
        btnRepay.hidden = true;
    }
    earnedMoney.innerText = 0;
}

function loaning() {
    if (parseInt(moneyInBank.innerText) !=0 && parseInt(sumOfLoan.innerText) == 0) {
        const loanAmount = parseInt(prompt("How much do you want to loan?"));
        
        if (loanAmount != 0 && loanAmount <= parseInt(balance.innerText) * 2){
            alert("loan accepted!");
            document.getElementById("current-loan").hidden = false;
            sumOfLoan.hidden = false;
            sumOfLoan.innerText = loanAmount;
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

function toRepay(){
    if(parseInt(moneyInBank.innerText) >= parseInt(sumOfLoan.innerText)){
        let deductLoan = parseInt(moneyInBank.innerText) - parseInt(sumOfLoan.innerText);
        moneyInBank.innerText = deductLoan;
        sumOfLoan.innerText = 0;
        console.log(deductLoan);
        document.getElementById("current-loan").hidden = true;
        sumOfLoan.hidden = true;
        btnRepay.hidden = true;
    }
    else alert("not enough balance");
}



btnWork.addEventListener("click", increment);
btnBank.addEventListener("click", banking);
btnLoan.addEventListener("click", loaning);
btnRepay.addEventListener("click", toRepay);