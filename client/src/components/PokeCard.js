import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {addToPokedex } from "../api/pokemons";

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

function PokeCard(props) {
    const pokemon = props.pokemon

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return <Card bg='dark' text='white' style={{width: '100%',margin: '1rem 0'}} className="text-center bloc-pokemon">
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
                <div><Card.Img variant="top" src={pokemon.img !== null ?pokemon.img: "https://cdn.discordapp.com/attachments/463818480186163200/1052176999680069692/img_573410.png"} /></div>
                <Card.Body>
                    <Form><Form.Group><Form.Control plaintext style={{textAlign:"center", color:"white", fontSize:"1.25rem"}} placeholder="Name" value={pokemon.name}></Form.Control></Form.Group>
                    <Card.Title>{pokemon.name}</Card.Title>
                    <Form.Select style={{width:"4rem", color:"white", background:"rgba(0, 0, 0, 0)"}} aria-label="Select Type">
                        <option>+</option>
                        <option value="1">Bug</option>
                        <option value="2">Fire</option>
                        <option value="3">Fly</option>
                    </Form.Select>
                    <Card.Text className="types">{pokemon.types.map((type, key) => {
                        let typeClass=type.name
                        if (!typeList.includes(type.name)) {
                            typeClass="other"
                        }
                        return <span className={"type "+typeClass}>{capitalizeFirstLetter(type.name)}</span>
                    })}</Card.Text>
                    <Button variant="primary" onClick={() => addToPokedex(pokemon)}>Add To Pokedex</Button>
                    </Form>
                </Card.Body>
            </Card>
}



export default PokeCard;