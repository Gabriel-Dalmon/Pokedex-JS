import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import DropdownButton from 'react-bootstrap/esm/DropdownButton';
import CloseButton from 'react-bootstrap/esm/CloseButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { addPokemon } from '../api/pokemons';

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


function ModalCard(props){
    const [editName, setEditName] = useState("");
    const [editTypes, setEditTypes] = useState(getNamesFromObjects([]));
    const [editFile, setEditFile] = useState(null);

    const [freeTypes, setFreeTypes] = useState(getNamesFromObjects(props.types));

    console.log(getNamesFromObjects(props.types))

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

    useEffect(()=>{
        setEditTypes([])
        setFreeTypes(getNamesFromObjects(props.types))
    }, [props])

    return <Modal
    {...props}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Add a new pokemon
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            <Form.Group><Form.Control plaintext required style={{textAlign:"center", fontSize:"1.25rem"}} placeholder="Name" onChange={(e) => setEditName(e.target.value)} value={editName}></Form.Control></Form.Group>
            <input
                id="fileInput"
                type="file"
                onChange={(e) => setEditFile(e.target.files[0])}
            />

        </Form>
        <p className="types">{editTypes.map((type, key) => {
            let typeClass=type.toLowerCase()
            if (!typeList.includes(type)) {
                typeClass="other"
            }
            return <>
                <input type="hidden" name={"type" + key}></input>
                <span style={{display:"inline-flex", flexDirection:"row", flex: "1 1 0"}} className={"type "+typeClass}><span style={{display:"block"}}>{capitalizeFirstLetter(type)}</span><CloseButton onClick={() => removeType(key)}/></span>
                </>
        })}</p>
        <DropdownButton title="+">
            {freeTypes.map((type, key) => {
                let typeClass=type
                if (!typeList.includes(type)) {
                    typeClass="other"
                }
                return <>
                    <Dropdown.Item className={"type "+typeClass} onClick={() => addType(key)}>{capitalizeFirstLetter(type)}</Dropdown.Item>
                </>
            })}
        </DropdownButton>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={() => addPokemon(editName, editTypes, editFile)}>Add a new pokemon</Button>
    </Modal.Footer>
  </Modal>
}

export default ModalCard;