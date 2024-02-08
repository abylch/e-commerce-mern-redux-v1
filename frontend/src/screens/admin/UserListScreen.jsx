import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetUsersQuery, useDeleteUserMutation, } from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';
// for pagination 
import { useParams } from 'react-router-dom';
import Paginate from '../../components/Paginate';
import { logout } from '../../slices/authSlice.js';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const UserListScreen = () => {

  //const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  // replaced 4 pagination
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetUsersQuery({
    pageNumber,
  });

  const dispatch = useDispatch();
  
  const [deleteUser] = useDeleteUserMutation();

  const cannotDeleteHandler = () => {
    toast.error('Cannot delete the user admin, uncheck the admin box and try again');
};


  const deleteHandler = async (id) => {
    //console.log('delete');
    if (window.confirm('delete the user from database??')) {
        try {
          await deleteUser(id);
          refetch();
        } catch (err) {
          toast.error(err?.data?.message || err.error);
          dispatch(logout());
        }
      }
  };

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
      <h1>Users</h1>
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
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                {/* is admin condition does not show edit and delete */}
                  {/* {!user.isAdmin && ( */}
                    <>
                      <LinkContainer
                        to={`/admin/user/${user._id}/edit`}
                        style={{ marginRight: '10px' }}
                      >
                        <Button variant='light' className='btn-sm'>
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      {user.isAdmin === true ? (
                        <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => cannotDeleteHandler()}
                      >
                        <FaTrash style={{ color: 'red' }} />
                      </Button>
                      ) : (
                        <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(user._id)}
                      >
                        <FaTrash style={{ color: 'white' }} />
                      </Button>
                      )}
                    </>
                  {/* )} */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* PAGINATE line */}
        <Paginate pages={data.pages} page={data.page} isAdmin={true} listType="user"/>
        </>
      )}
    </>
  );
};

export default UserListScreen;