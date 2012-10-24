var logger = require("winston"),
    should = require("should"),
    account = require("../fixtures/credentials.json"),
    Model = require("../../lib/Model");

describe("Model", function() {

  describe("Constructor Specifications", function() {
    it("should return false if there's no model definition", function() {
      (function() {
        var model = new Model();
      }).should.
      throw ("Invalid model constructor definition");
    });

    it("should return false if there's no account information", function() {
      (function() {
        var model = new Model({});
      }).should.
      throw ("Invalid account information upon model instantiation");
    });

    it("should set the account information", function() {
      new Model({
        Name: "jbizzle"
      }, account)._account.should.exist;
    });

    it("should set the table name it is doing operations on", function() {
      new Model({
        Name: "jbizzle",
        _tableName: "Users"
      }, account)._tableName.should.exist;
    });

    it("should set a reference to the table service", function() {
      new Model({
        Name: "jbizzle"
      }, account)._tableService.should.exist;
    });

    it("should return itself", function() {
      new Model({
        Name: "jbizzle"
      }, account).should.exist;
    });
  });

  describe("Saving an entity", function() {

  });

  describe("Removing an entity", function() {

  });

  describe("Retrieving an entity", function() {

  });

  describe("Retrieving a list of entities", function() {

    var model = new Model({
      Name: "Jim Johnson"
    }, account);

    it("should have a find method", function() {
      model.find.should.exist;
    });

    it("should throw an error if invalid parameters", function() {
      (function() {
        model.find();
      }).should.
      throw ("Invalid arguments");
    });
    
    it("should throw an error if no callback is passed", function() {
      (function() {
        model.find({});
      }).should.
      throw ("Invalid arguments");
    });
    
    it("should throw an error if callback is not a function", function() {
      (function() {
        model.find({}, true);
      }).should.
      throw ("Invalid callback");
    });
    

  });
})
