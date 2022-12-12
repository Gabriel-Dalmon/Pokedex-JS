import PokeCardsList from '../components/PokeCardsList';
import Menu from '../components/Menu';

function PokemonsPage(props) {
    return <>
        <Menu />
        <h1>Catch them all!</h1>
        <PokeCardsList type="admin" />
    </>
}

export default PokemonsPage;