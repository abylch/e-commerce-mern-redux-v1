import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

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
                        {/* class product-title keeps the title in one line */}
                        <Card.Title as='div' className='product-title'>
                            <strong>{product.name}</strong>
                        </Card.Title>
                    </Link>
                    <Card.Text as='div' className='my-3'>
                            {product.description}
                    </Card.Text>
                    <Card.Text as='div'>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                    </Card.Text>
                    <Card.Text as='h3'>${product.price}</Card.Text>
                </Card.Body>
            </Card>
    </>
  )
}

export default Products