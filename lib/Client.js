var logger = require("winston"),
    Model = require("./Model");


Client = function Constructor(account) {
  logger.info("Client instantiated");
  this.account = account;
  return this;
};

/*
 * Defines a model based on a schema
 */
Client.prototype.model = function(name, definition) {
  if (!name || !typeof name == 'string') throw new Error("Invalid model name");
  if (!definition || !typeof definition == 'object') throw new Error("Invalid definition of model");

  var self = this;
  definition._tableName = name;
  self._definition = definition;
  self._schema = self.structure;

  return function(definition) {
    return new Model(self._definition, self.account);
  };
};

/*
 * Defines schema and applies validation rules
 */
Client.prototype.Schema = function(structure) {
  
  this.structure = structure;
  return structure;
};

module.exports = Client;
