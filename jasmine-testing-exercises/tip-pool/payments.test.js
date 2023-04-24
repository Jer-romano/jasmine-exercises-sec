describe("Payments test (w setup and teardown)", function() {
    beforeAll(function() {
        for(element of paymentTbody.children) {
            element.remove();
          }
        Object.keys(allPayments).forEach(key => delete allPayments[key]);
        paymentId = 0;
    });

 
    //submit payment info
    it("submitPaymentInfo() - should add a curPayment object to allPayments, update html and reset input values", () => {
        billAmtInput.value = "75";
        tipAmtInput.value = "25";

        submitPaymentInfo();

        let firstRow = document.getElementById('payment1');
        let secondChild = document.querySelector("#payment1 td:nth-child(2)");
        let thirdChild = document.querySelector("#payment1 td:nth-child(3)");

        expect(Array.from(paymentTbody.children).length).toEqual(1);
        expect(firstRow.firstElementChild.innerText).toEqual("$75");
        expect(secondChild.innerText).toEqual("$25");
        expect(thirdChild.innerText).toEqual("33%");
    });

    //create currPayment
    it("createCurPayment() - will return undefined with negative or empty inputs. positive billAmt is required but tip can be 0", () => {
        billAmtInput.value = "50";
        tipAmtInput.value = "10";
        let payment = createCurPayment();
        expect(payment.billAmt).toEqual("50");
        expect(payment.tipAmt).toEqual("10");

    });

    //create currPayment
    it("createCurPayment() - will return undefined with negative or empty inputs. positive billAmt is required but tip can be 0", () => {
        billAmtInput.value = "-1";
        tipAmtInput.value = "0";
        let payment = createCurPayment();
        expect(payment).toEqual(undefined);
    });
  
    //create currPayment
    it("createCurPayment() - will return undefined with negative or empty inputs. positive billAmt is required but tip can be 0", () => {
        billAmtInput.value = "100";
        tipAmtInput.value = "0";
        let payment = createCurPayment();
        expect(payment.billAmt).toEqual("100");
        expect(payment.tipAmt).toEqual("0");
    });

    //appendPaymentTable test
    it("appendPaymentTable() - Creates table row element and pass to appendTd with input value", () => {
        billAmtInput.value = "100";
        tipAmtInput.value = "20";
        let payment = createCurPayment();
        let calculatedTip = calculateTipPercent(payment.billAmt, payment.tipAmt);
        appendPaymentTable(payment);

        let firstRow = document.getElementById('payment0');
        let secondChild = document.querySelector("#payment0 td:nth-child(2)");
        let thirdChild = document.querySelector("#payment0 td:nth-child(3)");

        expect(Array.from(paymentTbody.children).length).toEqual(1);
        expect(firstRow.firstElementChild.innerText).toEqual("$" + payment.billAmt);
        expect(secondChild.innerText).toEqual("$" + payment.tipAmt);
        expect(thirdChild.innerText).toEqual(calculatedTip + "%");
     
    });
    //paymentTbody.innerHTML ~= /${payment.tipAmt}/
     //helper function
     function appendToAllPayments(bill, tip, id) {
        billAmtInput.value = bill;
        tipAmtInput.value = tip;

        let currPayment = createCurPayment();
        allPayments['payment'+ id] = currPayment;
        appendPaymentTable(currPayment);
    }
    //updateSummary Test
     it("updateSummary() - Creates table row element and passes to appendTd with calculated sum of all payment", () => {
        appendToAllPayments("50", "10", "0");
        appendToAllPayments("100", "30", "1");
        appendToAllPayments("80", "8", "2");

        updateSummary();
        expect(summaryTds[0].innerHTML).toEqual("$" + "230");
        expect(summaryTds[1].innerHTML).toEqual("$" + "48");
        expect(summaryTds[2].innerHTML).toEqual("20%");
    });

    it("appendDeleteBtn() - //creates a td with the value 'X'. When clicked, it will delete the tr it belongs to", () => {
        appendToAllPayments("100", "30", "0");
        appendToAllPayments("100", "15", "1");
        
        serverNameInput.value = "John";
        submitServerInfo();
        serverNameInput.value = "Alice";
        submitServerInfo();

        // let testTr = document.createElement("tr");
        let testInput = document.createElement("input");
        testInput.setAttribute("type", "button");
        testInput.setAttribute("value", "X");
        testInput.setAttribute("onclick", "deleteRow(this)");

        console.log(paymentTbody.childElementCount);
        let deleteBtn = paymentTbody.lastElementChild.lastElementChild.firstElementChild;

        expect(deleteBtn).toEqual(testInput);
        
        deleteRow(deleteBtn); //deletes 2nd row
        let firstRow2ndCol = document.querySelector("#server1 td:nth-child(2)");
        expect(paymentTbody.childElementCount).toEqual(1); //check that row was deleted
        expect(firstRow2ndCol.innerText).toEqual("$15.00"); //check that earnings were updated
    });

    afterEach(function() {
        for(element of paymentTbody.children) {
            element.remove();
          }
        Object.keys(allPayments).forEach(key => delete allPayments[key]);
        paymentId = 0;
    });




});