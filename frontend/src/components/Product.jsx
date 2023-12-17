import React from 'react'
import { Card } from 'react-bootstrap'

// imports products as a prop; {product}
const Products = ({product}) => {
  return (
    <>
            <Card className='my-3 p-3 rounded'>
                <Card.Img as='img' src={product.image} variant='top' alt={product.image}/>
                <Card.Body>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
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