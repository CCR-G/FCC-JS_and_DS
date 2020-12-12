/*
--JavaScript Algorithms and Data Structures Projects: Cash Checker--
Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.
Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.
Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.
*/

// Manages form and displays result
var cidStatus = document.getElementById("cidStatus");

const currencyName = [
  "Penny",
  "Nickel",
  "Dime",
  "Quarter",
  "One",
  "Five",
  "Ten",
  "Twenty",
  "One hundred",
];

document.querySelector("form").addEventListener("submit", function (e) {
  const purchasePrice = document.getElementById("purchase-price").value;
  const payment = document.getElementById("payment").value;

  const cashInDrawer = [];
  const userInputCid = document.getElementsByClassName("cashInDrawer");

  // Creating the cashInDrawer 2D array needed for the checkCashRegister function
  for (let i = 0; i < currencyName.length; i++) {
    let currencyInCid = userInputCid[i].value;
    if (currencyInCid == "") currencyInCid = 0;

    const currentCurrency = [];
    currentCurrency.push(currencyName[i]);
    currentCurrency.push(currencyInCid);

    cashInDrawer.push(currentCurrency);
  }

  // Retrieving the result and displaying the status
  const cashRegister = checkCashRegister(purchasePrice, payment, cashInDrawer);
  cidStatus.textContent = cashRegister.status;

  // List for the change
  const cashList = document.getElementById("cashList");
  if (cashList) cashList.remove();
  let givenChange = document.createElement("ul");
  givenChange.id = "cashList";
  for (const element of cashRegister.change) {
    if (element[1] > 0) {
      let listCurrencyElt = document.createElement("li");
      listCurrencyElt.innerHTML = element[0] + ": " + element[1] + " $";
      givenChange.appendChild(listCurrencyElt);
    }
  }

  if (givenChange.innerHTML !== "") {
    givenChange.classList.add("col-sm-6", "col-sm-push-3");
    document.getElementById("cidResult").appendChild(givenChange);
  }

  e.preventDefault(); // We don't send the input anywhere
});

function checkCashRegister(price, cash, cid) {
  let change = cash - price;
  const initialChange = change;

  let currencyArray = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];

  let status = "";
  let givenChange = [];
  let cidTotal = 0;

  for (const currency in cid) {
    let currencyUnit = cid[currency][0];
    let currencyAmount = cid[currency][1];
    cidTotal += currencyAmount;
  }

  //Total cash in cid is NOT ENOUGH
  if (cidTotal < change) {
    status = "INSUFFICIENT_FUNDS";
    change = givenChange;
  }

  //Total cash in cid EQUAL due change
  else if (cidTotal == change) {
    status = "CLOSED";
    change = givenChange = cid;
    //Just the count, we give everything
  }

  //Total cash in cid is SUPERIOR to due change
  else {
    let totalGivenChange = 0;
    status = "OPEN";

    // While we have currency notes and coins to check for, and while we still have change to give…
    let i = 8; //currencyArray item starting from bigger
    while (i >= 0 && change > 0) {
      // If the current checken currency is superior to due change
      // or if the current checken currency is not in cid
      if (currencyArray[i] > change || cid[i][1] == 0) {
        i--;
      } else {
        let x = 0;

        while (
          currencyArray[i] * x + currencyArray[i] <= change.toFixed(2) &&
          currencyArray[i] * x + currencyArray[i] <= cid[i][1]
        ) {
          x++;
        }

        let givenCurrency = currencyArray[i] * x;
        givenChange.push([cid[i][0], givenCurrency]);

        change -= givenCurrency;
        totalGivenChange += givenCurrency;

        i--;
      }
    }

    // If total given change is not enough
    if (totalGivenChange < initialChange) {
      status = "INSUFFICIENT_FUNDS";
      givenChange = totalGivenChange = [];
    }
  }

  return {
    change: givenChange,
    status: status,
  };
}
