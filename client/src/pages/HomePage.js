import Menu from './../components/Menu';
import {
    Link
  } from "react-router-dom";
function HomePage(props) {
    return <>
        <Menu />
        <div class="home">
            <img src="https://th.bing.com/th/id/OIP.pP8u4JOiKUrg7_TpugJ9NAHaEo?pid=ImgDet&rs=1" alt="Pokemon logo"/>
            <p class="img-p">Super Cheap<br/>Edition</p>
            <h1>Homepage</h1>
            <h2>Bienvenue</h2>
            <p>Capturez des pokemon et enregistrez les dans votre pokedex, le pokedex vous donnent toutes les infos nécessaires sur les pokemons tel que leurs noms, leur types, ainsi qu'une photo d'eux</p>
            <h2>POKEMON</h2>
            <p>accèdez à la page "<Link to="/pokemons">pokemons</Link>" et attrappez les tous afin de completer votre pokedex</p>
            <h2>POKEDEX</h2>
            <p>accedez à la page "<Link to="/pokedex">pokedex</Link>" afin de voir tous les pokemon que vous avez découvert et enregistrer dans votre pokedex</p>
        </div>
    </>
}

export default HomePage;
