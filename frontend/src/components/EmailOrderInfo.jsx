// components/EmailOrderInfo.jsx
// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { Button, } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { 
    useSendOrderInfoEmailMutation,
    useSendOrderConfirmationEmailMutation,
  } from '../slices/emailSlice'; // Adjust the path accordingly
import Loader from '../components/Loader';
import Message from '../components/Message';
// for handling create order and redirect
import { useNavigate } from 'react-router-dom';
import { clearCartItems } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';

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

export const EmailOrderStatus = ({ orderState, userInfo }) => {


    const [sendOrderConfirmationEmail, { isLoading, error }] = useSendOrderConfirmationEmailMutation();
    const [emailSent, setEmailSent] = useState(true);
    // for handling create order and redirect
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const handleSendEmail = async () => {
            try {
                console.log("hi from sendOrderConfirmationEmail in the EmailOrderStatus component");
                console.log("orderState", orderState);
                console.log("userInfo", userInfo);

                const response = await sendOrderConfirmationEmail({ orderState, userInfo });

                if (response.data.success === true) {
                    setEmailSent(true); // Mark email as sent
                    dispatch(clearCartItems());
                    navigate(`/order/${orderState._id}`);
                    toast.success('Order placed successfully');
                    toast.success('Order Confirmation Email Sent!');
                } else {
                    toast.error(`Failed to send order Confirmation Email: ${response.error.data.message}`);
                }
            } catch (err) {
                toast.error(`Failed to send order Confirmation Email: ${err?.data?.message || err.error}`);
                // Unauthorized - redirect to login page
                //window.location.href = '/login';
            } finally {
                setEmailSent(true); // Reset emailSent to true regardless of success or failure
              }
        };

        if (orderState && emailSent) {
            handleSendEmail();
        }
        // eslint-disable-next-line
    }, [orderState, userInfo, isLoading, setEmailSent, sendOrderConfirmationEmail]);
    

    return ( 

        <>
            {isLoading && <Loader />}
            {error && <Message variant='danger'>{error.data.message}</Message>}
        </>
)
};
