import { ListGroup, Card } from 'react-bootstrap';
const ListBoxSearch = () => {
  return (
    <ListGroup>
        <Card className='card rounded my-3 p-3'>
            <ListGroup.Item variant="light" action href='/search/skull'>Skull</ListGroup.Item>
            <ListGroup.Item variant="light" action href='/search/phone'>Phone</ListGroup.Item>
            <ListGroup.Item variant="light" action href='/search/cannon'>Cannon</ListGroup.Item>
            <ListGroup.Item variant="light" action href='/search/pantum'>Pantum</ListGroup.Item>
            <ListGroup.Item variant="light" action href='/search/amazon'>Amazon</ListGroup.Item>
            <ListGroup.Item variant="light" action href='/search/headphones'>Headphones</ListGroup.Item>
            <ListGroup.Item variant="light" action href='/search/sony'>Sony</ListGroup.Item>
            <ListGroup.Item variant="light" action href='/search/viking'>Viking</ListGroup.Item>
            <ListGroup.Item variant="light" action href='/search/skull'>Skull</ListGroup.Item>
            <ListGroup.Item variant="light" action href='/search/phone'>Phone</ListGroup.Item>
            <ListGroup.Item variant="light" action href='/search/cannon'>Cannon</ListGroup.Item>
            <ListGroup.Item variant="light" action href='/search/pantum'>Pantum</ListGroup.Item>
        </Card>
    </ListGroup>
    
  );
};

export default ListBoxSearch;