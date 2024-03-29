import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
// for pagination 
import { useParams } from 'react-router-dom';
import Paginate from '../../components/Paginate';
import { logout } from '../../slices/authSlice.js';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const OrderListScreen = () => {
  //const { data: orders, isLoading, error } = useGetOrdersQuery();

  // replaced 4 pagination
  const { pageNumber } = useParams();

  // eslint-disable-next-line
  const { data, isLoading, error, refetch } = useGetOrdersQuery({
    pageNumber,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      // Display toast message
      toast.error(error?.data?.message || error.error);
      // Dispatch logout action
      dispatch(logout());
    }
  }, [error, dispatch]);

  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* PAGINATE line */}
        <Paginate pages={data.pages} page={data.page} isAdmin={true} listType="order"/>
        </>
      )}
    </>
  );
};

export default OrderListScreen;