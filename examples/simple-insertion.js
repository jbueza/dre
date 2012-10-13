var account = require("../test/fixtures/secret.json");
var Client = require("../lib/Client");

var dre = new Client(account);

var Person = dre.model("People", dre.Schema({
  FirstName: "string",
  LastName: "string",
  FavoriteAnimal: "string"
}));

var person = new Person();

person.save({
  PartitionKey: "dcb83fa0-15c4-463f-99b7-2ce365878b20",
  RowKey: "58f92ada-2aa9-48f8-9429-4580e0f91b81",
  FirstName: "Jaime",
  LastName: "Bueza"
}, function(err, entity, response) {
  console.log(entity);
});
