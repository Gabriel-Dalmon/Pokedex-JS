const express = require("express");
const dbo = require("./db/db");
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
const port = 4443;





dbo.connectToServer();

const jsonParser = bodyParser.json();

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});

/* index.js code before... */
app.post("/pokemons/list", jsonParser, (req, res) => {
  //on se connecte à la DB MongoDB
  const pageId = req.body.page
  const dbConnect = dbo.getDb();
  //premier test permettant de récupérer mes pokemons !
  dbConnect
    .collection("pokemons")
    .find().limit(20).skip((pageId-1)*20) // permet de filtrer les résultats
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

app.get("/types/listAll", (req, res) => {
  //on se connecte à la DB MongoDB
  const dbConnect = dbo.getDb();
  //premier test permettant de récupérer mes pokemons !
  dbConnect
    .collection("types")
    .find() // permet de filtrer les résultats
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
		.collection("pokemons")
		.insertOne(body);
	res.json(body);
});

app.post('/pokemon/remove', jsonParser, (req, res) => {
	const body = req.body;
	const dbConnect = dbo.getDb();
  
	console.log('Got body:', body);
  
	dbConnect
	  .collection("pokemons")
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
	  .collection("pokemons")
	  .updateOne(body["get"], {$set: body["set"]}, {upsert: (req.query.upsert==="true")})
    .then(function(result, err) {
      if (err){
        res.status(400).send(err)
      };
      res.json(result);
    });
  });


app.delete('/pokemons/delete_all', (req, res) => {
  const dbConnect = dbo.getDb();

  dbConnect.collection("pokemons").deleteMany({}).then(function(result, err) {
    if (err){
      res.status(400).send(err)
    };
    res.json(result);
  });

})


app.post('/collection/length', jsonParser, (req, res) => {
  const collection = req.body.collection
  const dbConnect = dbo.getDb();

  dbConnect.collection(collection).count().then(function(result,err) {
    if(err){
      res.status(400).send(err)
    };
    res.json(result);
  });
});

app.post("/pokedexes/list", jsonParser, (req, res) => {
  //on se connecte à la DB MongoDB
  const pageId = req.body.page
  const dbConnect = dbo.getDb();
  //premier test permettant de récupérer mes pokemons !
  dbConnect
    .collection("pokedexes")
    .find().limit(20).skip((pageId-1)*20) // permet de filtrer les résultats
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

app.post('/pokedex/add', jsonParser, (req, res) => {
  console.log(req.body)
	const body = req.body;
	const dbConnect = dbo.getDb();

	console.log('Got body:', body);

	dbConnect
		.collection("pokedexes")
		.insertOne(body).then(function(result, err) {
      if (err){
        res.status(400).send(err)
      };
      res.json(result);
    });
});

app.post('/pokedex/remove', jsonParser, (req, res) => {
	const body = req.body;
	const dbConnect = dbo.getDb();
  
	console.log('Got body:', body);
  
	dbConnect
	  .collection("pokedexes")
	  .deleteOne(body);
	res.json(body);
  });