
it('should calculate the monthly rate correctly', function () {
  expect(calculateMonthlyPayment({amount:5000, years:5, rate:0.01})).toEqual("85.47");
  expect(calculateMonthlyPayment({amount:8000, years:12, rate:0.07})).toEqual("82.27");

});


it("should return a result with 2 decimal places", function() {
  // ..
});
(max, currNum) => {return Math.max(currNum, max)}

/// etc
