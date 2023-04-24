
// accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allPayments objects
function sumPaymentTotal(type) {
  let total = 0;

  for (let key in allPayments) {
    let payment = allPayments[key];

    total += Number(payment[type]);
  }

  return total;
}

// converts the bill and tip amount into a tip percent
function calculateTipPercent(billAmt, tipAmt) {
  return Math.round(100 / (billAmt / tipAmt));
}

// expects a table row element, appends a newly created td element from the value
function appendTd(tr, value) {
  let newTd = document.createElement('td');
  newTd.innerText = value;

  tr.append(newTd);
}
// <---- Custom code ---->
//creates a td with the value "X". When clicked, it will delete the tr it belongs to
function appendDeleteBtn(tr) {
  let xBox = document.createElement("td");
  let input = document.createElement("input");
  input.setAttribute("type", "button");
  input.setAttribute("value", "X");
  input.setAttribute("onclick", "deleteRow(this)");
  xBox.append(input);

  tr.append(xBox);
}


function deleteRow(btn) {
  let row = btn.parentNode.parentNode;
  let name = row.firstElementChild.innerText;
  delete allServers[row.id]; //the row either has the same id as the server or the payment
  delete allPayments[row.id]; //making it easy to delete the server/payment from it's respective obj.                         
  row.parentNode.removeChild(row); //actually delete row
  updateServerTable() //adjust the earnings to reflect that one server has been removed
}