# Node Azure Tables Made Easy

  A NodeJS library for a fast, easy way of access Windows Azure Table Storage.
  
## Getting Started

```
npm install dre
```

### Boilerplate
```javascript 
var Client = require("../lib/Client");

var dre = new Client({
  "AZURE_STORAGE_ACCOUNT": "example_account",
  "AZURE_STORAGE_ACCESS_KEY": "example_key"
});

var Person = dre.model("People", dre.Schema({
  FirstName: "string",
  LastName: "string",
  FavoriteAnimal: "string"
}));
```

### Inserting entities

```javascript
var person = new Person();

person.save({
  PartitionKey: "dcb83fa0-15c4-463f-99b7-2ce365878b20",
  RowKey: "58f92ada-2aa9-48f8-9429-4580e0f91b81",
  FirstName: "Jaime",
  LastName: "Bueza"
}, function(err, entity) {
  console.log("Saved you! ", entity);
});
```

### Retrieving an entity

```javascript
person.findOne({
  PartitionKey: "dcb83fa0-15c4-463f-99b7-2ce365878b20",
  RowKey: "58f92ada-2aa9-48f8-9429-4580e0f91b81"
}, function(err, entity) {
  console.log("Found you! ", entity);
});
```


### Retrieving a set of entities

  
## Roadmap

* Round 1
  * Retrieving, saving, updating, removing entities
* Round 2
  * Schemas, auto-validation
* Round 3

## License 

(The MIT License)

Copyright (c) 2012 Jaime Bueza &lt;jbueza@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.