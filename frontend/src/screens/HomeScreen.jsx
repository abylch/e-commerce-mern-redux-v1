import React, { useEffect } from 'react';
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
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ProductCarousel from '../components/ProductCarousel';
import ListBoxSearch from '../components/ListBoxSearch';
import Meta from '../components/Meta';

// change the server url for render https://xxx-xxx-xxx.onrender.com
// for local http://localhost:3001
//axios.defaults.baseURL = "http://localhost:3001";

const HomeScreen = () => {
  // product function states, use of Loader spinner when status isLoading
  //const { data: products, isLoading, error } = useGetProductsQuery();
  // replaced 4 pagination
  const { pageNumber, keyword, } = useParams();

  //console.log("pageNumber from homeScreen", pageNumber);
  console.log("keyword from homeScreen", keyword);

  const { data, isLoading, error } = useGetProductsQuery({keyword, pageNumber});

  useEffect(() => {
    const checkData = () => {
      console.log("data from homeScreen.jsx", data);
      if (data.pages === 0) {
        toast.error("No products found, try search with other keyword");
      }
    };

    // Call checkData function when data is available
    if (data) {
      checkData();
    }
  }, [data]); // Run this effect only when data changes


// <Message color of the message red; variant:'danger'
  return (
    <>
    <Meta />
    {!keyword ? (
        <>
        <Row>
          {/* <Col className='my-3 p-3 upper-div' sm={12} md={12} lg={12} xl={4}>
            <ProductCarousel />
          </Col> */}
          
          <Col className='my-3 p-3 upper-div' sm={12} md={12} lg={12} xl={9}>
          <ProductCarousel />
          {/* moved to footer */}
          {/* <h3>@e-Shop-Shop; Redux MERN Stack skeleton, e-commerce plataform template a work in progress, always evolving.</h3> */}
          </Col>
          <Col className='my-3 p-3 list-box-search upper-div' sm={12} md={12} lg={12} xl={3}>
            <h3>Search products by keyword:</h3>
            <ListBoxSearch />
          </Col>
        </Row>
        </>
      ) : ("")}
      { keyword && <Link to = '/' className='btn btn-light mb-4'> Go Back </Link>}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Products (website 4 testing only)</h1>
          <Row id='products-section'>
            {/* {products.map((product) => ( //replaced 4 pagination  */}
            {data.products.map((product) => (
              <Col className='my-3 p-3 card-container' key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}
                 />
              </Col>
            ))}
          </Row>
          {/* pagination line */}
          {/* <Paginate pages={data.pages} page={data.page} /> */}
          {/* paginate withe search function keyword */}
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;