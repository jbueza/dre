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
    
    it("should return itself", function() {
      
    })
  });

  describe("Saving an entity", function() {

  });

  describe("Removing an entity", function() {

  });
})
