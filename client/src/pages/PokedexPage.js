import PokeBox from '../components/PokeBox';
import Menu from './../components/Menu';

function PokedexPage(props) {
    return <>
        <Menu />
        <h1>Pokedex</h1>

        <PokeBox name="Reshiram" img="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/643.png" type1="fire" type2="dragon" />
    </>
}


export default PokedexPage;