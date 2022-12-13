import Menu from '../components/Menu';
import DocumentsList from '../components/DocumentsList';

function PokemonsPage(props) {
    return <>
        <Menu />
        <h1>Catch them all!</h1>
        <DocumentsList collection="pokemons" activePage={1} mode="guest" />
    </>
}

export default PokemonsPage;