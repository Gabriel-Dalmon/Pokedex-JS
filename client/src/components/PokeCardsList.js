import { useEffect, useState } from "react";
import { getAll } from "../api/pokemons";

function PokeCardsList(props) {
    const [ pokemons, setPokemons ] = useState([]);

    useEffect(async () => {
        const pokemonsGet = await getAll();
        setPokemons(pokemonsGet);
    },[]);

    return <div className="pokemon-list">
        <div class="flex">
        {
            pokemons.map((pokemon,key) =>{
            return <div key={key} className="bloc-pokemon">
                <img className="avatar" src={pokemon.img} alt="alt"/>
                <h2>{pokemon.name}</h2>
            </div>
            })
        }
        </div>
    </div>;
}




export default PokeCardsList;