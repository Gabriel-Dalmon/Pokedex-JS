import Menu from './../components/Menu';
import {
    Link
  } from "react-router-dom";
function HomePage(props) {
    return <>
        <Menu />
        <img src="https://th.bing.com/th/id/OIP.pP8u4JOiKUrg7_TpugJ9NAHaEo?pid=ImgDet&rs=1"/>
        <h1>Homepage</h1>
        <h3>Bienvenue</h3>
        <p>Capturez des pokemon et enregistrez les dans votre pokedex, le pokedex vous donnent toutes les infos nécessaires sur les pokemons tel que leurs noms, leur types, ainsi qu'une photo d'eux</p>
        <h3>POKEMON</h3>
        <p>accèdez à la page "<Link to="/pokemons">pokemons</Link>" et attrappez les tous afin de completer votre pokedex</p>
        <h3>POKEDEX</h3>
        <p>accedez à la page "<Link to="/pokedex">pokedex</Link>" afin de voir tous les pokemon que vous avez découvert et enregistrer dans votre pokedex</p>

    </>
}

export default HomePage;
