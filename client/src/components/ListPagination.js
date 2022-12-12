import { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { getCollectionLength } from '../api/pokemons';
import { useHistory } from "react-router-dom";



function ListPagination(props) {
    const [ length, setLength ] = useState([]);
    const [activePage, setActivePage] = useState([]);
    let items = []
    const history = useHistory();

    function ActivePageEvents(pageId) {
        history.push("/"+props.collection+"/"+pageId)
        setActivePage(pageId);
        console.log(activePage)
    }
    
    useEffect(()=>{
        async function fetchLength(){
            const collectionLength = await getCollectionLength(props.collection);
            setLength(Math.ceil(collectionLength/20));
        }
        fetchLength();
        setActivePage(props.activePage);
    },[props])

    

    if(activePage <= 4) {
        for (let pageId=2; pageId <= 7; pageId++){
            items.push(<Pagination.Item onClick={() => ActivePageEvents(pageId)} active={pageId === activePage}>{pageId}</Pagination.Item>)
            }
        items.push(<Pagination.Ellipsis />)
    } else if(activePage >= length-4){
        items.push(<Pagination.Ellipsis />)
        for (let pageId=length-7; pageId <= length-1; pageId++){
            items.push(<Pagination.Item onClick={() => ActivePageEvents(pageId)} active={pageId === activePage}>{pageId}</Pagination.Item>)
        }
    } else {
        items.push(<Pagination.Ellipsis />)
        for (let pageId=activePage-2; pageId <= activePage+2; pageId++){
            items.push(<Pagination.Item onClick={() => ActivePageEvents(pageId)} active={pageId === activePage}>{pageId}</Pagination.Item>)
        }
        items.push(<Pagination.Ellipsis />)
    }

    return <div className="pagination" style={{display:"flex",justifyContent:"center"}}>
        <Pagination>
            <Pagination.First onClick={() => ActivePageEvents(1)} disabled={activePage === 1}/>
            <Pagination.Prev onClick={() => ActivePageEvents(activePage - 1)} disabled={activePage === 1}/>
            <Pagination.Item onClick={() => ActivePageEvents(1)} active={activePage === 1}>{1}</Pagination.Item>
            {items}
            <Pagination.Item onClick={() => ActivePageEvents(length)} active={activePage === length}>{length}</Pagination.Item>
            <Pagination.Next onClick={() => ActivePageEvents(activePage + 1)} disabled={activePage === length}/>
            <Pagination.Last onClick={() => ActivePageEvents(length)} disabled={activePage === length}/>
        </Pagination>
    </div>
}


export default ListPagination;