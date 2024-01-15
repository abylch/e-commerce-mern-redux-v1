import { Link } from 'react-router-dom';
import { Carousel, Image, } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-secondary mb-4 carousel my-3'>
  {products.map((product) => (
    <Carousel.Item key={product._id}>
      <Link to={`/product/${product._id}`} className="d-flex justify-content-center align-items-center">
        <div className="d-flex flex-column align-items-center">
          <Image className="carousel-image" src={product.image} alt={product.name} fluid />
          <Carousel.Caption className='carousel-caption'>
            <h2 className='text-white text-center'>
              {product.name} (${product.price})
            </h2>
          </Carousel.Caption>
        </div>
      </Link>
    </Carousel.Item>
  ))}
</Carousel>
  );
};

export default ProductCarousel;