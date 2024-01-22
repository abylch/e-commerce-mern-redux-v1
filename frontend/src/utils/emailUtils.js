// emailUtils.js
import { useSendOrderConfirmationEmailMutation,
    useSendWelcomeEmailMutation,
    useSendPaidInvoiceEmailMutation, } from '../slices/emailSlice';
import { toast } from 'react-toastify';

export const useSendOrderConfirmationEmail = () => {
  const [sendOrderConfirmationEmailMutation] = useSendOrderConfirmationEmailMutation();

  const sendOrderConfirmationEmail = async ({ orderState, userInfo }) => {
    try {
      console.log("hi from sendOrderConfirmationEmail in the EmailOrderStatus component");
      console.log("orderState", orderState);
      console.log("userInfo", userInfo);

      const response = await sendOrderConfirmationEmailMutation({ orderState, userInfo });

      if (response.data.success === true) {
        toast.success('Order Confirmation Email Sent!');
        return response.data.success;
      } else {
        toast.error(`Failed to send order Confirmation Email: ${response.error.data.message}`);
      }
    } catch (err) {
      toast.error(`Failed to send order Confirmation Email: ${err?.data?.message || err.error}`);
      throw err; // Rethrow the error for the caller to handle
    }
  };

  return { sendOrderConfirmationEmail };
};


export const useSendWelcomeEmail = () => {
    const [sendWelcomeEmailMutation] = useSendWelcomeEmailMutation();
  
    const sendWelcomeEmail = async (userInfo) => {
      try {
        console.log("hi from sendWelcomeEmail in the EmailUtils");
        console.log("userInfo", userInfo);
  
        const response = await sendWelcomeEmailMutation(userInfo);
  
        if (response.data.success === true) {
          toast.success('Welcome Email Sent!');
          return response.data.success;
        } else {
          toast.error(`Failed to send Welcome Email: ${response.error.data.message}`);
        }
      } catch (err) {
        toast.error(`Failed to send Welcome Email: ${err?.data?.message || err.error}`);
        throw err; // Rethrow the error for the caller to handle
      }
    };
  
    return { sendWelcomeEmail };
  };

  export const useSendPaidInvoiceEmail = () => {
    const [sendPaidInvoiceEmailMutation] = useSendPaidInvoiceEmailMutation();
  
    const sendPaidInvoiceEmail = async ({ orderState, userInfo }) => {
      try {
        console.log("hi from sendPaidInvoiceEmail in the EmailUtils");
        console.log("orderState", orderState);
        console.log("userInfo", userInfo);
  
        const response = await sendPaidInvoiceEmailMutation({ orderState, userInfo });
  
        if (response.data.success === true) {
          toast.success('Paid Invoice Email Sent!');
          return response.data.success;
        } else {
          toast.error(`Failed to send Paid Invoice Email: ${response.error.data.message}`);
        }
      } catch (err) {
        toast.error(`Failed to send Paid Invoice Email: ${err?.data?.message || err.error}`);
        throw err; // Rethrow the error for the caller to handle
      }
    };
  
    return { sendPaidInvoiceEmail };
  };