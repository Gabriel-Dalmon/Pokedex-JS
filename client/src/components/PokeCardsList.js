import { useEffect, useState } from "react";
import { getAll, addToPokedex } from "../api/pokemons";
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    useEffect(() => {
        async function fetchData(){
            const pokemonsGet = await getAll();
            setPokemons(pokemonsGet);
        }
        fetchData();
    },[]);
    
    return <div className="pokemon-list">
                <Container>
                    <Row>
                    {
                        pokemons.map((pokemon,key) =>{
                            return <Col sm={3}>
                                <div key={key} className="bloc-pokemon"  style={{margin: '1rem'}} >
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
                        <div className="pagination" style={{display:"flex",justifyContent:"center"}}>
                            <Pagination>
                            <Pagination.First />
                            <Pagination.Prev />
                            <Pagination.Item>{1}</Pagination.Item>
                            <Pagination.Ellipsis />

                            <Pagination.Item>{10}</Pagination.Item>
                            <Pagination.Item>{11}</Pagination.Item>
                            <Pagination.Item active>{12}</Pagination.Item>
                            <Pagination.Item>{13}</Pagination.Item>
                            <Pagination.Item disabled>{14}</Pagination.Item>

                            <Pagination.Ellipsis />
                            <Pagination.Item>{20}</Pagination.Item>
                            <Pagination.Next />
                            <Pagination.Last />
                            </Pagination>
                        </div>
                    </Container>
                </Container>

            </div>;
}




export default PokeCardsList;