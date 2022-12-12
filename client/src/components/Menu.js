import {
    Link
  } from "react-router-dom";
import "../App.css";

function Menu(){
    return <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/pokemons">Pokemons</Link></li>
            <li><Link to="/pokedex">Pokedex</Link></li>
            <li><Link to="/adminpanel/1">Admin Panel</Link></li>
        </ul>
    </nav>
}

export default Menu;