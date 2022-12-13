import Menu from './../components/Menu';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/esm/Container';
import { useState } from 'react';
import DocumentsList from '../components/DocumentsList';

function AdminPanel(props) {
    const [key, setKey] = useState('pokemons');

    return <>
        <Menu />
        <h1>Admin Board</h1>
        <Container>
                <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
            >
                <Tab eventKey="pokemons" title="Pokemons">
                    <DocumentsList collection="pokemons" activePage={1} mode="admin" />
                </Tab>
                <Tab eventKey="pokedexes" title="Pokedex">
                    <DocumentsList collection="pokedexes" activePage={1} mode="admin" />
                </Tab>
                <Tab eventKey="users" title="Users" disabled>
                </Tab>
            </Tabs>
        </Container>
    </>
}

export default AdminPanel;