import { useEffect, useState } from "react";
import { getAllOnPage} from "../api/pokemons";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListPagination from "./ListPagination";

import { useParams } from "react-router-dom";
import PokeCard from "./PokeCard";



function PokeCardsList(props) {
    const [ pokemons, setPokemons ] = useState([]);
    let activePage = parseInt(useParams().pageId);

    useEffect(() => {
        async function fetchData(){
            const pokemonsGet = await getAllOnPage(activePage);
            setPokemons(pokemonsGet);
        }
        fetchData();
    },[activePage]);
    
    return <div className="pokemon-list">
                <Container>
                    <Row>
                    {
                        pokemons.map((pokemon) =>{
                            return <Col sm={3}><PokeCard pokemon={pokemon}/></Col>
                        })
                    }
                    </Row>
                    <Container>
                        <ListPagination collection="pokemons" activePage={activePage} />
                    </Container>
                </Container>

            </div>;
}




export default PokeCardsList;