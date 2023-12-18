import React from 'react';
//import products from "../products-and-images/products"
import {Row, Col} from "react-bootstrap";
// import hardcoded db
import Product from "../components/Product";
import { useEffect, useState } from 'react';
import axios from 'axios';

// change the server url for render https://xxx-xxx-xxx.onrender.com
// for local http://localhost:3001
axios.defaults.baseURL = "http://localhost:3001";

const Home = () => {
    const [products, setProduct] = useState([]);
    useEffect(() => {
        // fetch products using axios
        const fetchProducts = async () => {
            const response = await axios.get('/api/products');
            setProduct(response.data);
        }
        fetchProducts();
    }, []);
    console.log("products from HomeScreen.js after axios fetch" ,products);
// we can use the product.id to uniquely identify the product
// we can use the product.name to display the name of the product
// we can use the product.image to display the image of the product
// we can use the product.description to display the description of the product
// we can use the product.price to display the price of the product
// we can use the product.rating to display the rating of the product
// we can use the product.numReviews to display the number of reviews of the product
// we can use the product.countInStock to display the count in stock of the product
// we can use the product.category to display the category of the product
// we can use the product.brand to display the brand of the product
  return (
    <>
        <h1>Latest Products</h1>
            <Row>
                {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product}/> 
                            {/* we pass the product as a prop to the Product component */}
                            {/* we can use the product.id to uniquely identify the product */}
                            {/* we can use the product.name to display the name of the product */}
                            {/* we can use the product.image to display the image of the product */}
                            {/* we can use the product.description to display the description of the product */}
                            {/* we can use the product.price to display the price of the product */}
                            {/* we can use the product.rating to display the rating of the product */}
                            {/* we can use the product.numReviews to display the number of reviews of the product */}
                            {/* we can use the product.countInStock to display the count in stock of the product */}
                            {/* we can use the product.category to display the category of the product */}
                            {/* we can use the product.brand to display the brand of the product */}
                            {/* we can use the product.createdAt to display the created at of the product */}
                        </Col>
                )
                )}
            </Row>
        
    </>
  )
}

export default Home