import PokeCardsList from '../components/PokeCardsList';
import Menu from './../components/Menu';

function PokemonPage(props) {
    return <>
        <Menu />
        <h1>Pokemons: Catch Them All!</h1>

        <PokeCardsList type="pokemons" />
    </>
}


export default PokemonPage;