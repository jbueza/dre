return true;
var logger = require("winston"),
    should = require("should"),
    account = require("../fixtures/credentials.json"),
    Client = require("../../lib/Client");

describe("NodeJS Azure Table Storage Model Provider (?)", function() {

  var dre = new Client(account);

  describe("Properties", function() {
    it("should set the account storage name", function() {
      dre.account.should.have.property("AZURE_STORAGE_ACCOUNT", "example_account");
    });
    it("should set the account key", function() {
      dre.account.should.have.property("AZURE_STORAGE_ACCESS_KEY", "example_key");
    });
  });

  describe("Defining a model", function() {
    it("should have a model method", function() {
      dre.model.should.exist;
    });
    it("should define a model when passing a definition", function() {

    });

  });

})
