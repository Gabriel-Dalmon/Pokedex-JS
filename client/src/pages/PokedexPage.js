import DocumentsList from '../components/DocumentsList';
import Menu from './../components/Menu';

function PokedexPage(props) {
    return <>
        <Menu />
        <h1>Pokedex</h1>

        <DocumentsList collection="pokedexes" activePage={1} mode="guest" />
    </>
}


export default PokedexPage;