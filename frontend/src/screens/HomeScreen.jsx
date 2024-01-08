import React from 'react';
//import products from "../products-and-images/products"
import {Row, Col} from "react-bootstrap";
// import hardcoded db
import Product from "../components/Product";
//we don't use useEffect no more, we gonna use the redux, productSlice.js, useGetProductsQuery
//import { useEffect, useState } from 'react';
//we don't use axios no more, we gonna use the redux
//import axios from 'axios';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';



// change the server url for render https://xxx-xxx-xxx.onrender.com
// for local http://localhost:3001
//axios.defaults.baseURL = "http://localhost:3001";

const HomeScreen = () => {
    // product function states, use of Loader spinner when status isLoading
  const { data: products, isLoading, error } = useGetProductsQuery();
// <Message color of the message red; variant:'danger'
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Products (website 4 testing only)</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;