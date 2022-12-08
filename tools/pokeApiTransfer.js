import axios, {isCancel, AxiosError} from 'axios';
import Pokedex from 'pokedex-promise-v2';

const P = new Pokedex();

var x = 0;

// axios.get('http://localhost:4443/pokemon/list')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });





const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const pokemonByNameToJSON = ((name) => {
    const pokemonJSON = P.getPokemonByName(name).then((pokemon)=> {
        const pokemonJSON = {
            name: pokemon.name.split('-').map(capitalize).join(' '),
            img: pokemon.sprites.front_default,
            types: pokemon.types.map((type) => {
                return { name: type.type.name }
            })
        };
        return pokemonJSON;
    });
    return pokemonJSON;
})


const transferAllPokemons = () => {
    P.getPokemonsList().then((response) => {
        response.results.map((pokemon) => {
            pokemonByNameToJSON(pokemon.name).then((pokemonJSON) => {
                x++;
                console.log(x);
                axios.post('http://localhost:4443/pokemon/insert', pokemonJSON)
                .then(function (response) {
                    console.log("response");
                })
                .catch(function (error) {
                    console.log("error");
                });
            });
        });
    })
    .catch((error) => {
        console.log('There was an ERROR: ', "error");
    });
}

transferAllPokemons()
//transferAllTypes





// P.getTypesList().then((response) => {
//     console.log(response);
// });

