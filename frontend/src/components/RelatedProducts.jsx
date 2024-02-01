// components/RelatedProducts.jsx
import React, { useEffect, useState } from 'react';
import { useGetAllProductsQuery } from '../slices/productsApiSlice';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';

const RelatedProducts = ({ currentProductId, related }) => {

  

  const { data: products, error, isLoading } = useGetAllProductsQuery();
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (products) {
          // Filter products based on related and exclude the cursrent product
          const filteredProducts = products.filter(
            (product) => product.related === related && product._id !== currentProductId
          );
          setRelatedProducts(filteredProducts);
        }
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };

    fetchProducts();
}, [isLoading, products, currentProductId, related, error]);

// Check if related is an empty 
if (!related) {
    return null;
  }


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
        <div>
            <h3>Related Products</h3>
            <ul>
                {relatedProducts.map((product) => (
                <li key={product._id}>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '50px', marginRight: '10px' }}
                  />
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                </li>
                ))}
            </ul>
        </div>
        </>
      )}
    </>
  );
};

export default RelatedProducts;
