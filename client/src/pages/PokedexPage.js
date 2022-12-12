import PokeBox from '../components/PokeBox';
import PokeCardsList from '../components/PokeCardsList';
import Menu from './../components/Menu';

function PokedexPage(props) {
    return <>
        <Menu />
        <h1>Pokedex</h1>

        <PokeCardsList type="pokedex" />
    </>
}


export default PokedexPage;