import './App.css';
import AdminPanel from './pages/AdminPanel';
import HomePage from './pages/HomePage';
import PokedexPage from './pages/PokedexPage';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App(props) {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/pokedex">
            <PokedexPage />
          </Route>
          <Route path="/adminpanel">
            <AdminPanel />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
