
const btnWork = document.getElementById("work");
const btnBank = document.getElementById("bank");
const btnLoan = document.getElementById("loan");
const btnBuy =  document.getElementById("buy")

//const moneyInBank = document.getElementById("balance");
const komputerPrice = document.getElementById("price");
const earnedMoney = document.getElementById("salary");


function increment() {
    let money = parseInt(earnedMoney.innerText);
    money += 100;
    salary.innerText = money;
}

function banking() {
    let currentMoney = parseInt( earnedMoney.innerText);
    let currentBalance = parseInt(balance.innerText);
    if(currentBalance != 0){
        currentBalance += currentMoney;
        balance.innerText = currentBalance;
    }
    else{
        balance.innerText = currentMoney;
    }
    earnedMoney.innerText = 0;
}

function loaning(){
    const loanAmount = Number(window.prompt("How much do you want to loan?"));
    if (loanAmount <= parseInt(balance.innerText) * 2) {
        alert("loan accepted!");
        document.getElementById("current-loan").hidden = false;
        document.getElementById("sum-of-loan").hidden = false;
    }
    else{
        alert("loan NOT accepted!");
    }
}




btnWork.addEventListener("click", increment);
btnBank.addEventListener("click", banking);
btnLoan.addEventListener("click", loaning);