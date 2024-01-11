import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

// imports products as a prop; {product}
const Products = ({product}) => {
  return (
    <>
    
            <Card as='div' className='card h-100 rounded'>
                <Link className='link-no' to={`/product/${product._id}`}>
                    <Card.Img className="card-img-top" as='img' src={product.image} variant='top' alt={product.image}/>
                
                <Card.Body>
                    <Link className='link-no' to={`/product/${product._id}`}>
                        {/* class product-title keeps the title in one line */}
                        <Card.Title as='div' className='product-title'>
                            <strong>{product.name}</strong>
                        </Card.Title>
                    </Link>
                    <Card.Text as='div' className='card-text my-3 text-truncate'>
                            {product.description}
                    </Card.Text>
                    <Card.Text as='div'>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                    </Card.Text>
                    <Card.Text as='h3'>${product.price}</Card.Text>
                </Card.Body>
                </Link>
            </Card>

    </>
  )
}

export default Products