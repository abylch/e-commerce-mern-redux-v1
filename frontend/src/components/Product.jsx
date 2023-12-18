import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// imports products as a prop; {product}
const Products = ({product}) => {
  return (
    <>
            <Card className='my-3 p-3 rounded'>
                <Link to={`/product/${product._id}`}>
                    <Card.Img as='img' src={product.image} variant='top' alt={product.image}/>
                </Link>
                <Card.Body>
                    <Link to={`/product/${product._id}`}>
                        <Card.Title as='div'>
                            <strong>{product.name}</strong>
                        </Card.Title>
                    </Link>
                    <Card.Text as='div' className='my-3'>
                            {product.description}
                    </Card.Text>
                    <Card.Text as='h3'>${product.price}</Card.Text>
                </Card.Body>
            </Card>
    </>
  )
}

export default Products