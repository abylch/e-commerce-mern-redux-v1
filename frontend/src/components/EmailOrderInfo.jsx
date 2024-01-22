// components/EmailOrderInfo.jsx
// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { Button, } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { 
    useSendOrderInfoEmailMutation,
  } from '../slices/emailSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

export const EmailOrderInfo = ({ cartState, userInfo, }) => {

  const [sendOrderInfoEmail, { isLoading, error }] = useSendOrderInfoEmailMutation();

  const handleSendEmail = async () => {

    try {
        const response = await sendOrderInfoEmail({ cartState, userInfo});
        //console.log(response.data.success);
        if (response.data.success === true) {
            toast.success('Product/s information email sent successfully!');
          }
          else {
            toast.error(`Failed to send order information email ${response.error.data.message}`);
            //console.log(response);
          }
        
      } catch (err) {
        toast.error(`Failed to send order information email:`, err?.data?.message || err.error);
        // Unauthorized - redirect to login page
        //window.location.href = '/login';
      };
  };

  return (
    <>
    <h3>Inquire Information Product/s, Payment... </h3>
      <Button variant="secondary" onClick={handleSendEmail}>
        Send E-mail
      </Button>
      <h4>We'll get back to you, ASAP!</h4>
      {isLoading && <Loader />}
      {error && <Message variant='danger'>{error.data.message}</Message>}
    </>
  );
};