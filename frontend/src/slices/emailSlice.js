// emailSlice.js
import { apiSlice } from './apiSlice';
// eslint-disable-next-line
import { EMAIL_ORDER_INFO_URL, } from '../constants';

export const emailSlice  = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      sendOrderInfoEmail: builder.mutation({
        query: ({ cartState, userInfo }) => ({
          url: 'http://localhost:3001/api/emails/email-order-info',
          method: 'POST',
          body: { cartState, userInfo },
          credentials: 'include',
        }),
      }),
      sendOrderConfirmationEmail: builder.mutation({
        query: ({ orderState, userInfo }) => ({
          url: 'http://localhost:3001/api/emails/email-order-confirmation',
          method: 'POST',
          body: { orderState, userInfo },
          credentials: 'include',
        }),
      }),
      sendOrderPaidEmail: builder.mutation({
        query: ({ orderState, userInfo }) => ({
          url: 'http://localhost:3001/api/emails/email-order-paid',
          method: 'POST',
          body: { orderState, userInfo },
          credentials: 'include',
        }),
      }),
    }),
});

export const { useSendOrderInfoEmailMutation, useSendOrderConfirmationEmailMutation, useSendOrderPaidEmailMutation } = emailSlice;