var Model = require("./Model");



API = function Constructor() {

};



API.prototype.define = function(name, definition) {
  if (!name || !typeof name == 'string') throw new Error("Invalid model name");
  if (!definition || !typeof definition == 'object') throw new Error("Invalid definition of model");
  
  
  return new Model(definition);

};
