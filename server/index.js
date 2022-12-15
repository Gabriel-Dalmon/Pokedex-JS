const express = require("express");
const dbo = require("./db/db");
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
const port = 4443;
var path = require('path')

const multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})

var upload = multer({ storage: storage });

const AWS = require("aws-sdk")
const fs = require("fs")

const KEY_ID = "AKIA5GI6SIB5ZWRRHAEV"
const SECRET_KEY = "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"

const BUCKET_NAME = "jsproject-poke-sprites"

const s3 = new AWS.S3({
  accessKeyId: KEY_ID,
  secretAccessKey: SECRET_KEY,
});



async function uploadFile(filename) {
  const fileContent = fs.readFileSync("uploads/" + filename);
  const params = {
    Bucket: BUCKET_NAME,
    Key: filename,
    Body: fileContent,
  }

  const imgLoc = await s3.upload(params, (err, data) => {
    if(err){
      console.log("File couldn't be uploaded",err);
      return null;
    } else{
      console.log("File Uploaded Correctly", data.Location);
      return data.Location;
    }}).promise()
  return imgLoc.Location;
}

//uploadFile('BatmanPepsi.jpg')

dbo.connectToServer();

const jsonParser = bodyParser.json();

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
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

app.post('/pokemons/update', upload.single('file'), async (req, res, next) => {
  const dbConnect = dbo.getDb();

  const reference = JSON.parse(req.body.data).get
  const newData = JSON.parse(req.body.data).set
  const types = newData.types.map((type) => {return {name:type}})
  let imgPath = reference.img
  if(req.file !== undefined){
    imgPath = await uploadFile(req.file.filename)
  }
  if (req.file === undefined || imgPath === null){
    imgPath = reference.img
  }
  
 dbConnect
   .collection("pokemons")
   .updateOne({"name":reference.name}, {$set: {"name":newData.name, "types":types, "img":imgPath}})
})

app.post('/pokemons/add', upload.single('file'), async (req, res, next) => {
  const dbConnect = dbo.getDb();

  const newData = JSON.parse(req.body.data)
  const types = newData.types.map((type) => {return {name:type}})
  let imgPath = await uploadFile(req.file.filename)


  
 dbConnect
   .collection("pokemons")
   .insertOne({"name":newData.name, "types":types, "img":imgPath})
})

app.delete('/pokemons/delete', (req, res) => {
	const name = JSON.parse(req.headers.filter);
	const dbConnect = dbo.getDb();
  
	console.log('Deleted pokemon from "pokemons":', name);
  
	dbConnect
	  .collection("pokemons")
	  .deleteOne(name);

	res.json(name);
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