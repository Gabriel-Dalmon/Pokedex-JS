import { useEffect, useState } from "react";
import { getAllOnPage} from "../api/pokemons";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListPagination from "./ListPagination";

import PokeCard from "./PokeCard";
import { getCollectionLength } from '../api/pokemons';

function DocumentsList (props) {
    const [ documents, setDocuments ] = useState([]);
    const [ activePage, setActivePage ] = useState([]);
    const [ collectionLength, setCollectionLength ] = useState([]);
    //init
    useEffect(() => {
        async function init () {
            
            const getColLength = await getCollectionLength(props.collection);
            setActivePage(props.activePage)
            setCollectionLength(getColLength);
            }
            init();
            console.log("inited")
    }, [props.activePage,props.collection])

    useEffect(() => {
        async function fetchData(){
            const getDocuments = await getAllOnPage(props.collection, activePage);
            setDocuments(getDocuments);
        }
        fetchData();
    },[activePage,props.collection]);
    
    function pageSwitch (pageId) {
        setActivePage(pageId);        
    }

    return <div className="documents-list">
                <Container>
                    <Row>
                    {
                        documents.map((document) =>{
                            return <Col sm={3}><PokeCard pokemon={document} mode={props.mode}/></Col>
                        })
                    }
                    </Row>
                    <Container>
                        <ListPagination collection={props.collection} activePage={activePage} pageAmount={Math.ceil(collectionLength/20)} handleClick={pageSwitch}/>
                    </Container>
                </Container>

            </div>;
}

export default DocumentsList;