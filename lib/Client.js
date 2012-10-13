var logger = require("winston"),
    Schema = require("./Schema"),
    Model = require("./Model");


Client = function Constructor(account) {
  logger.info("Client instantiated");
  this.account = account;
  return this;
};


Client.prototype.define = function(name, definition) {
  if (!name || !typeof name == 'string') throw new Error("Invalid model name");
  if (!definition || !typeof definition == 'object') throw new Error("Invalid definition of model");

  definition._tableName = name;

  return new Model(definition, this.account);
};

Client.prototype.model = function(name, definition) {
  
  return
};

Client.findOne = function(query, callback) {

};

/*
 * Defines schema and applies validation rules
 */
Client.Schema = function(structure) {
  
  return structure;
};

module.exports = Client;
