var logger = require("winston"),
    request = require("request");

Model = function Constructor(options) {
  if (!options) {
    throw new Error("")
  }
  logger.inf("Model instantiated");
  this.options = options;
  return this;
};

Model.prototype.findOne(query, callback) {
  if (!callback || typeof callback != 'function') {
    logger.error("Invalid callback");
    throw new Error("Invalid callback");
  }
  
};



module.exports = Model;
