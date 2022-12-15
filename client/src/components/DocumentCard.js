import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {addToPokedex, deletePokemon, removeFromPokedex, updateDocument } from "../api/pokemons";
import { useState, useEffect } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const typeList = [
    "Normal",
    "Grass",
    "Fire",
    "Water",
    "Electric",
    "Ice",
    "Fighting",
    "Poison",
    "Ground",
    "Flying",
    "Psychic",
    "Bug",
    "Rock",
    "Ghost",
    "Dark",
    "Dragon",
    "Steel",
    "Fairy",
]

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getNamesFromObjects(objectList){
    const namesOnlyList = objectList.map((object) => {
        return capitalizeFirstLetter(object.name)
    });
    return namesOnlyList;
}

function DocumentCard(props) {
    const document = props.document;
    const collection = props.collection;
    const [editName, setEditName] = useState(document.name);
    const [editTypes, setEditTypes] = useState(getNamesFromObjects(document.types));
    const [editFile, setEditFile] = useState(null);

    const [freeTypes, setFreeTypes] = useState(getNamesFromObjects(props.types.slice()).filter(item => !editTypes.slice().includes(item)));

    useEffect(() => {
        const activeTypes = getNamesFromObjects(document.types)
        setEditName(document.name)
        setEditTypes(activeTypes)
        setFreeTypes(getNamesFromObjects(props.types.slice()).filter(item => !activeTypes.slice().includes(item)))
    },[props, document]);

    // useEffect(() => {
    //     if(editFile != null){
    //         console.log(editFile)}
    // },[editFile]);


    if(props.mode === "admin" && props.collection === "pokemons") {


        function removeType(typeKey) {
            let activeTypes = editTypes.slice();
            let toAddTypes = freeTypes.slice();
            toAddTypes.push(activeTypes[typeKey])
            activeTypes.splice(typeKey, 1)
            setEditTypes(activeTypes)
            setFreeTypes(toAddTypes)
        }

        function addType(typeKey) {
            let activeTypes = editTypes.slice();
            let toAddTypes = freeTypes.slice();
            activeTypes.push(toAddTypes[typeKey])
            toAddTypes.splice(typeKey, 1)
            setEditTypes(activeTypes)
            setFreeTypes(toAddTypes)
        }

        return <Card bg='dark' text='white' style={{width: '100%',margin: '1rem 0'}} className="text-center bloc-document">
                    <Form>
                        <div><label style={{width:"100%"}} htmlFor="fileInput"><Card.Img variant="top" src={document.img !== null ? document.img: "https://cdn.discordapp.com/attachments/463818480186163200/1052176999680069692/img_573410.png"} /></label></div>
                        
                        <input
                            id="fileInput"
                            type="file"
                            onChange={(e) => setEditFile(e.target.files[0])}
                            style={{display:"none"}}
                        />
                        <Card.Body>
                            <Form.Group><Form.Control plaintext required style={{textAlign:"center", color:"white", fontSize:"1.25rem"}} placeholder="Name" onChange={(e) => setEditName(e.target.value)} value={editName}></Form.Control></Form.Group>

                            <Card.Text className="types">{editTypes.map((type, key) => {
                                let typeClass=type.toLowerCase()
                                if (!typeList.includes(type)) {
                                    typeClass="other"
                                }
                                return <>
                                    <input type="hidden" name={"type" + key}></input>
                                    <span style={{display:"inline-flex", flexDirection:"row", flex: "1 1 0"}} className={"type "+typeClass}><span style={{display:"block"}}>{capitalizeFirstLetter(type)}</span><CloseButton onClick={() => removeType(key)}/></span>
                                    </>
                            })}</Card.Text>
                                <DropdownButton title="+">{freeTypes.map((type, key) => {
                                        let typeClass=type
                                        if (!typeList.includes(type)) {
                                            typeClass="other"
                                        }
                                        return <>
                                            <Dropdown.Item className={"type "+typeClass} onClick={() => addType(key)}>{capitalizeFirstLetter(type)}</Dropdown.Item>
                                            </>
                                    })}
                                </DropdownButton>
                            <Button variant="success" onClick={() => updateDocument(props.collection, document, {"name":editName,"types":editTypes,"imgFile":editFile})}>Save</Button>
                            <Button variant="danger" onClick={() => deletePokemon(document)}>Delete</Button>     
                        </Card.Body>
                    </Form>
                </Card>
    }
    return <Card bg='dark' text='white' style={{width: '100%',margin: '1rem 0'}} className="text-center bloc-document">
                <div><Card.Img variant="top" src={document.img !== null ?document.img: "https://cdn.discordapp.com/attachments/463818480186163200/1052176999680069692/img_573410.png"} /></div>
                <Card.Body>
                    <Card.Title>{document.name}</Card.Title>
                    <Card.Text className="types">{editTypes.map((type, key) => {
                        let typeClass=type.toLowerCase()
                        if (!typeList.includes(capitalizeFirstLetter(type))) {
                            typeClass="other"
                        }
                        return <span className={"type "+typeClass}>{capitalizeFirstLetter(type)}</span>
                    })}</Card.Text>
                    {(collection==="pokedexes") && <p>Captured by {document.username}</p>}
                    {(collection==="pokemons") && <Button variant="primary" onClick={() => addToPokedex(document)}>Add To Pokedex</Button>}
                    {(collection==="pokedexes" && props.mode === "admin") && <Button variant="danger" onClick={() => removeFromPokedex(document)}>Remove</Button>}
                </Card.Body>
            </Card>
}

export default DocumentCard;