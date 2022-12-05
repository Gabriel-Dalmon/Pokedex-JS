const { MongoClient } = require("mongodb");
const connectionString = 
              "mongodb+srv://pokedexApp:ZHmInrL4Cxo1Vllq@cluster0.ldrf8ni.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
    connectToServer: function (callback) {
      client.connect(function (err, db) {
        if (err || !db) {
          return err;
        }

        dbConnection = db.db("pokedex");
        console.log("Successfully connected to MongoDB.");
      });
    },

    getDb: function () {
        return dbConnection;
    },
};
