import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';

function PokeCard(props) {
    return <Card bg='dark' text='white' style={{width: '10rem'}} className="text-center">
        <Card.Header>
            <Nav justify variant="tabs" defaultActiveKey="#first" className="justify-content-center">
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
        <div><Card.Img variant="top" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png" /></div>
        <Card.Body>
            <Card.Title>Weedle</Card.Title>
            <Card.Text>Bug | Poison</Card.Text>
        </Card.Body>
    </Card>
}



export default PokeCard;