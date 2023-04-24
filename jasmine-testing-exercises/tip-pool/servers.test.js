describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
    allPayments = {};
  });

  beforeAll(function() {
    for(element of serverTbody.children) {
      element.remove();
    }
    for(element of paymentTbody.children) {
      element.remove();
    }
    serverId = 0;
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
    expect(serverNameInput.value).toEqual('');
  });

  //test for updateServerTable(), which gets run automatically in submitServerInfo();
  it('Should Create table row element and pass to appendTd function with input value', function() {
    submitServerInfo();
    let firstRow = document.querySelector("#server1");
    let firstRow2ndChild = document.querySelector("#server1 td:nth-child(2)");

    expect(Array.from(serverTbody.children).length).toEqual(1);
    expect(firstRow.firstElementChild.innerText).toEqual("Alice");
    expect(firstRow2ndChild.innerText).toEqual("$0.00");
  });

  afterEach(function() {
   // teardown logic
    for(element of serverTbody.children) {
      element.remove();
    }
    for(element of paymentTbody.children) {
      element.remove();
    }
    delete allServers['server' + serverId];
    serverId = 0;
  });
});
