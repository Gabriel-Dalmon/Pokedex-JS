import axios, {isCancel, AxiosError} from 'axios';
import Pokedex from 'pokedex-promise-v2';

const P = new Pokedex();

var x = 0;

const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const pokemonByNameToJSON = ((name) => {
    P.getPokemonByName(name).then((pokemon)=> {
        const pokemonJSON = {
            name: pokemon.name.split('-').map(capitalize).join(' '),
            img: pokemon.sprites.back_default,
            types: pokemon.types.map((type) => {
                return { name: type.type.name }
            })
        };
        x++;
        console.log(x)
        console.log(pokemonJSON);
    })
})


const transferAllPokemons = () => {
    P.getPokemonsList().then((response) => {
        response.results.map((pokemon) => {
            pokemonByNameToJSON(pokemon.name);
        });
    })
    .catch((error) => {
        console.log('There was an ERROR: ', error);
    });
}

// P.getTypesList().then((response) => {
//     console.log(response);
// });

transferAllPokemons()