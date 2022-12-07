import {
    Link
  } from "react-router-dom";

function Menu(){
    return <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/pokedex">Pokedex</Link></li>
            <li><Link to="/adminpanel">Admin Panel</Link></li>
        </ul>
    </nav>
}

export default Menu;