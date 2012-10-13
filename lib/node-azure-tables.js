var logger = require("winston"),
    Model = require("./Model");


Client = function Constructor(account) {
  logger.info("Client instantiated");
};


Client.prototype.define = function(name, definition) {
  if (!name || !typeof name == 'string') throw new Error("Invalid model name");
  if (!definition || !typeof definition == 'object') throw new Error("Invalid definition of model");

  definition._tableName = name;
  
  return new Model(definition, account);

};


module.exports = Client;
