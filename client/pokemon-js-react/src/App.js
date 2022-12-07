import logo from './logo.svg';
import './App.css';
import './pages/AdminBoard';
import './pages/HomePage';
import './pages/PokedexPage';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/"> //ici on met l'URL dans le navigateur
            <HomePage /> //ici on donne la page à afficher en fonction de cette URL
          </Route>
          <Route path="/pokedex">
            <PokedexPage />
          </Route>
          <Route path="/adminpanel">
            <AdminBoard />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
