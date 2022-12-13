import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {addToPokedex } from "../api/pokemons";
import { useState } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

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

function substractArrays (edits,references) {
    references.map((reference) => {
        if(reference in edits){
            x=0
        }
    })
    return edits
}

function DocumentCard(props) {
    const document = props.document;
    const [editName, setEditName] = useState(document.name);
    const [editTypes, setEditTypes] = useState(document.types);
    const [editFile, setEditFile] = useState(null);
    const [freeTypes, setFreeTypes] = useState(props.types)//substractArrays(props.types, editTypes)

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    if(props.mode === "admin") {


        function removeType(typeKey) {
            let types = editTypes.slice();
            types.splice(typeKey, 1)
            setEditTypes(types)
        }

        function addType(typeKey) {
            let types = editTypes.slice();
            types.splice(typeKey, 1)
            setEditTypes(types)
        }

        return <Card bg='dark' text='white' style={{width: '100%',margin: '1rem 0'}} className="text-center bloc-document">
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
                    <Form>
                        <div><Card.Img variant="top" src={document.img !== null ? document.img: "https://cdn.discordapp.com/attachments/463818480186163200/1052176999680069692/img_573410.png"} /></div>
                        <label for="fileInput">Change Image</label>
                        <input
                            id="fileInput"
                            type="file"
                            value={editFile}
                            onChange={(e) => setEditFile(e.target.files[0])}
                            style={{display:"none"}}
                        />
                        <Card.Body>
                            <Form.Group><Form.Control plaintext style={{textAlign:"center", color:"white", fontSize:"1.25rem"}} placeholder="Name" onChange={(e) => setEditName(e.target.value)} value={editName}></Form.Control></Form.Group>

                            <Card.Text className="types">{editTypes.map((type, key) => {
                                let typeClass=type.name
                                if (!typeList.includes(type.name)) {
                                    typeClass="other"
                                }
                                return <>
                                    <input type="hidden" name={"type" + key}></input>
                                    <span className={"type "+typeClass}>{capitalizeFirstLetter(type.name)}<CloseButton onClick={() => removeType(key)}/></span>
                                    </>
                            })}</Card.Text>
                                <DropdownButton title="+">{freeTypes.map((type, key) => {
                                        let typeClass=type.name
                                        if (!typeList.includes(type.name)) {
                                            typeClass="other"
                                        }
                                        return <>
                                            <Dropdown.Item className={"type "+typeClass} onClick={() => addType(key)}>{capitalizeFirstLetter(type.name)}</Dropdown.Item>
                                            </>
                                    })}
                                </DropdownButton>
                            <Button variant="primary" onClick={() => addToPokedex(document)}>Save</Button>
                        </Card.Body>
                    </Form>
                </Card>
    }
    return <Card bg='dark' text='white' style={{width: '100%',margin: '1rem 0'}} className="text-center bloc-document">
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
                <div><Card.Img variant="top" src={document.img !== null ?document.img: "https://cdn.discordapp.com/attachments/463818480186163200/1052176999680069692/img_573410.png"} /></div>
                <Card.Body>
                    <Card.Title>{document.name}</Card.Title>
                    <Card.Text className="types">{document.types.map((type, key) => {
                        let typeClass=type.name
                        if (!typeList.includes(type.name)) {
                            typeClass="other"
                        }
                        return <span className={"type "+typeClass}>{capitalizeFirstLetter(type.name)}</span>
                    })}</Card.Text>
                    <Button variant="primary" onClick={() => addToPokedex(document)}>Add To Pokedex</Button>
                </Card.Body>
            </Card>
}

export default DocumentCard;