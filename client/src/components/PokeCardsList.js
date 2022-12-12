import { useEffect, useState } from "react";
import { getAllOnPage, addToPokedex } from "../api/pokemons";
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListPagination from "./ListPagination";

import { useParams } from "react-router-dom";

const typeList = [
    "normal",
    "grass",
    "fire",
    "water",
    "electric",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dark",
    "dragon",
    "steel",
    "fairy",
]

function PokeCardsList(props) {
    const [ pokemons, setPokemons ] = useState([]);
    let activePage = parseInt(useParams().pageId);


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
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
                            console.log(pokemon.name)
                            return <Col sm={3}>
                                <div className="bloc-pokemon"  style={{margin: '1rem'}} >
                                    <Card bg='dark' text='white' style={{width: '15rem'}} className="text-center">
                                            <Card.Header>
                                                <Nav justify variant="pills" defaultActiveKey="#first" className="justify-content-center">
                                                    <Nav.Item>
                                                        <Nav.Link href="#first">Card</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link href="#disabled" disabled>
                                                        Detail
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                            </Card.Header>
                                            <div><Card.Img variant="top" src={pokemon.img} /></div>
                                            <Card.Body>
                                                <Card.Title>{pokemon.name}</Card.Title>
                                                <Card.Text className="types">{pokemon.types.map((type, key) => {
                                                    let typeClass=type.name
                                                    if (!typeList.includes(type.name)) {
                                                        typeClass="other"
                                                    }

                                                    return <span className={"type "+typeClass}>{capitalizeFirstLetter(type.name)}</span>
                                                })}</Card.Text>
                                                {
                                                    () => {
                                                        console.log(props.type)
                                                        if (props.type==="pokemons"){
                                                            return <Button variant="primary" onClick={() => addToPokedex(pokemon)}>Add To Pokedex</Button>
                                                        }
                                                    }
                                                }
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </Col>
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