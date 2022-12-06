const express = require("express");
const dbo = require("./db/db");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = 4443;
const Pokemon = require('pokemon.js');
Pokemon.setLanguage('japanese');

dbo.connectToServer();

const jsonParser = bodyParser.json();

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});

/* index.js code before... */
app.get("/pokemon/list", function (req, res) {
  //on se connecte à la DB MongoDB
  const dbConnect = dbo.getDb();
  //premier test permettant de récupérer mes pokemons !
  dbConnect
    .collection("Pokemon")
    .find({}) // permet de filtrer les résultats
    /*.limit(50) // pourrait permettre de limiter le nombre de résultats */
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching pokemons!");
      } else {
        res.json(result);
      }
    });
    /*
    Bref lisez la doc, 
    il y a plein de manières de faire ce qu'on veut :) 
    */
    
});

app.post('/pokemon/insert', jsonParser, (req, res) => {
	const body = req.body;
	const dbConnect = dbo.getDb();

	console.log('Got body:', body);

	dbConnect
		.collection("Pokemon")
		.insertOne(body);
	res.json(body);
});

app.post('/pokemon/remove', jsonParser, (req, res) => {
	const body = req.body;
	const dbConnect = dbo.getDb();
  
	console.log('Got body:', body);
  
	dbConnect
	  .collection("Pokemon")
	  .deleteOne(body);
	res.json(body);
  });

app.post('/pokemon/update', jsonParser, (req, res) => {
	const body = req.body;
	const dbConnect = dbo.getDb();
  
  /*let get;
  if (body["get"].id){
    var ObjectID = require("mongodb-legacy").ObjectId;
    get = {"_id":ObjectID(body["get"].id)};
  } else {
    get = body["get"];
  };*/
  
	dbConnect
	  .collection("Pokemon")
	  .updateOne(body["get"], {$set: body["set"]}, {upsert: (req.query.upsert==="true")})
    .then(function(result, err) {
      if (err){
        res.status(400).send(err)
      };
      res.json(result);
    });
  });