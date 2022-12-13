import { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';



function ListPagination(props) {
    const [ pageAmount, setPageAmount ] = useState([]);
    let items = []
    
    useEffect(()=>{
        setPageAmount(props.pageAmount)
    }, [props.pageAmount])

    if(props.activePage <= 4) {
        for (let pageId=2; pageId <= 7; pageId++){
            items.push(<Pagination.Item onClick={() => props.handleClick(pageId)} active={pageId === props.activePage}>{pageId}</Pagination.Item>)
            }
        items.push(<Pagination.Ellipsis />)
    } else if(props.activePage >= pageAmount-4){
        items.push(<Pagination.Ellipsis />)
        for (let pageId=pageAmount-7; pageId <= pageAmount-1; pageId++){
            items.push(<Pagination.Item onClick={() => props.handleClick(pageId)} active={pageId === props.activePage}>{pageId}</Pagination.Item>)
        }
    } else {
        items.push(<Pagination.Ellipsis />)
        for (let pageId=props.activePage-2; pageId <= props.activePage+2; pageId++){
            items.push(<Pagination.Item onClick={() => props.handleClick(pageId)} active={pageId === props.activePage}>{pageId}</Pagination.Item>)
        }
        items.push(<Pagination.Ellipsis />)
    }

    return <div className="pagination" style={{display:"flex",justifyContent:"center"}}>
        <Pagination>
            <Pagination.First onClick={() => props.handleClick(1)} disabled={props.activePage === 1}/>
            <Pagination.Prev onClick={() => props.handleClick(props.activePage - 1)} disabled={props.activePage === 1}/>
            <Pagination.Item onClick={() => props.handleClick(1)} active={props.activePage === 1}>{1}</Pagination.Item>
            {items}
            <Pagination.Item onClick={() => props.handleClick(pageAmount)} active={props.activePage === pageAmount}>{pageAmount}</Pagination.Item>
            <Pagination.Next onClick={() => props.handleClick(props.activePage + 1)} disabled={props.activePage === pageAmount}/>
            <Pagination.Last onClick={() => props.handleClick(pageAmount)} disabled={props.activePage === pageAmount}/>
        </Pagination>
    </div>
}


export default ListPagination;