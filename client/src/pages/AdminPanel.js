import PokeCard from '../components/PokeCard';
import Menu from './../components/Menu';

function AdminPanel(props) {
    return <>
        <Menu />
        <h1>Admin Board</h1>
        <PokeCard />
    </>
}

export default AdminPanel;