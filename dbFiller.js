import { response } from 'express';
import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();

P.getPokemonsList().then((response) => {
    console.log(response.results[10].name)
    pokemon =  P.getPokemonByName(Metapod);
    console.log(pokemon);
    const pokemonJSON = {
      name: pokemon.name,
      img: pokemon.sprites.back_default,
      type: pokemon.types
    };
    console.log(pokemonJSON);
  })
  .catch((error) => {
    console.log('There was an ERROR: ', error);
  });




  app.get("/types/list", function (req, res) {
    const dbConnect = dbo.getDb();
    dbConnect
      .collection("types")
      .find({})
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching pokemons!");
        } else {
          res.json(result);
        }
      });
  });
  
  app.post('/types/upsert', jsonParser, (req,res) => {
    const body = req.body;
    const dbConnect = dbo.getDb();
    dbConnect
      .collection("types")
      .updateOne({"name": { $eq: body["get"].name}}, {$set:{...body["set"]}}, {upsert:true})
      .then(function callBack(result, err) {
        if(err){
          res.status(400).send('Error');
        }
        res.json(result);
      });
  });
  
  app.delete('/type/delete', jsonParser, (req, res) =>{
    const body = req.body;
    const dbConnect = dbo.getDb();
  
    dbConnect
      .collection("types")
      .deleteOne({"_id": dbo.getObjectId(body["get"].id)})
      .then(function callBack(result, err) {
        if(err){
          res.status(400).send('Error');
        }
        res.send('Type deleted')
      });
  });


// P.getTypesList().then((response) => {
//   console.log(response.results);
// })
// .catch((error) => {
//   console.log('There was an ERROR: ', error);
// });