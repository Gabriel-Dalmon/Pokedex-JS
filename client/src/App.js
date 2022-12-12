import './App.css';
import AdminPanel from './pages/AdminPanel';
import HomePage from './pages/HomePage';
import PokemonPage from './pages/PokemonPage';
import PokedexPage from './pages/PokedexPage';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';


function App(props) {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/pokemons">
            <PokemonPage />
          </Route>
          <Route path="/pokedex">
            <PokedexPage />
          </Route>
          <Route path="/adminpanel/:pageId">
            <AdminPanel />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
