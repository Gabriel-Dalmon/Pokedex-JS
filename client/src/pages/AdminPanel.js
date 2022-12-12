import PokeCardsList from '../components/PokeCardsList';
import Menu from './../components/Menu';

function AdminPanel(props) {
    return <>
        <Menu />
        <h1>Admin Board</h1>
        <PokeCardsList type="admin" />
    </>
}

export default AdminPanel;