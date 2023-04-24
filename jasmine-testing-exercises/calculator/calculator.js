window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  let inputs = getCurrentUIValues();
  let payment = calculateMonthlyPayment(inputs);
  updateMonthly(payment);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment. The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  let monthlyRate = values.rate / 12;
  let monthlyPayment = (values.amount * (monthlyRate))/
                        (1-(1+monthlyRate)**(-values.years*12));
  return monthlyPayment.toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  let paymentValue = document.getElementById("monthly-payment");
  paymentValue.innerText = "$" + monthly;
}



// const cat = {
//   name: "Bubs",
//   eat: function() {
//     console.log(this);
//     return `${this.name} chows down`;
//   },
//   meow: () => {
//     console.log(this);
//     return `${this.name} says hello`;
//   }
// }

// let newCat = cat;
// console.log(newCat.eat());
// console.log(newCat.meow());