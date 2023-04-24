describe("Helper functions tests ", function() {

    beforeAll(function() {
        for(element of paymentTbody.children) {
            element.remove();
          }
        for(element of serverTbody.children) {
            element.remove();
        }
        Object.keys(allPayments).forEach(key => delete allPayments[key]);
        Object.keys(allServers).forEach(key => delete allPayments[key]);
        paymentId = 0;
        serverId = 0;
    });

    it("sumPaymentTotal() - accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allPayments objects", () => {
        appendToAllPayments("50", "10", "0");
        appendToAllPayments("100", "10", "1");
        appendToAllPayments("80", "0", "2");

        expect(sumPaymentTotal("billAmt")).toEqual(230);
        expect(sumPaymentTotal("tipAmt")).toEqual(20);
        expect(sumPaymentTotal("tipPercent")).toEqual(30);
    });
        //helper function
        function appendToAllPayments(bill, tip, id) {
            billAmtInput.value = bill;
            tipAmtInput.value = tip;

            let currPayment = createCurPayment();
            allPayments['payment'+ id] = currPayment;
            appendPaymentTable(currPayment);
        }

    it("calculateTipPercent() - converts the bill and tip amount into a tip percent", () => {
        expect(calculateTipPercent(100, 20)).toEqual(20);
        expect(calculateTipPercent(50, 40)).toEqual(80);
        expect(calculateTipPercent(50, 0)).toEqual(0);
        expect(calculateTipPercent(189, 37)).toEqual(20);
        expect(calculateTipPercent(190, 37)).toEqual(19);
        expect(calculateTipPercent(50, 100)).toEqual(200);
    })

    it("appendTd() - expects a table row element, appends a newly created td element from the value", () => {
        let testTr = document.createElement("tr");
        appendTd(testTr, "50");
        expect(testTr.firstElementChild.tagName).toEqual("TD");
        expect(testTr.firstElementChild.innerText).toEqual("50");
    });

    it("appendDeleteBtn() - //creates a td with the value 'X'. When clicked, it will delete the tr it belongs to", () => {
        appendToAllPayments("100", "30", "0");
        
        serverNameInput.value = "John";
        submitServerInfo();
        serverNameInput.value = "Alice";
        submitServerInfo();

        // let testTr = document.createElement("tr");
        let testInput = document.createElement("input");
        testInput.setAttribute("type", "button");
        testInput.setAttribute("value", "X");
        testInput.setAttribute("onclick", "deleteRow(this)");

        let deleteBtn = serverTbody.lastElementChild.lastElementChild.firstElementChild;

        expect(deleteBtn).toEqual(testInput);
        
        deleteRow(deleteBtn); //deletes 2nd row
        let firstRow2ndCol = document.querySelector("#server1 td:nth-child(2)");
        expect(serverTbody.childElementCount).toEqual(1); //check that row was deleted
        expect(firstRow2ndCol.innerText).toEqual("$30.00"); //check that earnings were updated
    });

    afterEach(function() {
        for(element of paymentTbody.children) {
            element.remove();
          }
        for(element of serverTbody.children) {
            element.remove();
        }
        Object.keys(allPayments).forEach(key => delete allPayments[key]);
        Object.keys(allServers).forEach(key => delete allPayments[key]);
        paymentId = 0;
        serverId = 0;
    });

    afterAll(function() {
        Object.keys(allPayments).forEach(key => delete allPayments[key]);
    });

});