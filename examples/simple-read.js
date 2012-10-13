var account = require("../test/fixtures/secret.json");
var Client = require("../lib/Client");

var dre = new Client(account);

var Person = dre.model("People", dre.Schema({
  _tableName: "People",
  FirstName: "string",
  LastName: "string",
  FavoriteAnimal: "string"
}));


var person = new Person();

person.findOne({
  FirstName: "Jaime"
}, function(err, entity, response) {
  console.log("Found you! ", entity);
});
