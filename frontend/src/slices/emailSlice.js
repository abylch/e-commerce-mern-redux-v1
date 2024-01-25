// emailSlice.js
import { apiSlice } from './apiSlice';
import { EMAIL_ORDER_INFO_URL, } from '../constants';

export const emailSlice  = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      sendOrderInfoEmail: builder.mutation({
        query: ({ cartState, userInfo }) => ({
          url: `${EMAIL_ORDER_INFO_URL}/email-order-info`,
          method: 'POST',
          body: { cartState, userInfo },
          credentials: 'include',
        }),
      }),
      sendOrderConfirmationEmail: builder.mutation({
        query: ({ orderState, userInfo }) => ({
          url: `${EMAIL_ORDER_INFO_URL}/email-order-confirmation`,
          method: 'POST',
          body: { orderState, userInfo },
          credentials: 'include',
        }),
      }),
      sendPaidInvoiceEmail: builder.mutation({
        query: ({ orderState, userInfo }) => ({
          url: `${EMAIL_ORDER_INFO_URL}/email-paid-invoice`,
          method: 'POST',
          body: { orderState, userInfo },
          credentials: 'include',
        }),
      }),
      sendWelcomeEmail: builder.mutation({
        query: (userInfo) => ({
          url: `${EMAIL_ORDER_INFO_URL}/email-welcome`,
          method: 'POST',
          body: userInfo,
          credentials: 'include',
        }),
      }),
    }),
});

export const {
  useSendOrderInfoEmailMutation, useSendOrderConfirmationEmailMutation,
  useSendPaidInvoiceEmailMutation, useSendWelcomeEmailMutation,
} = emailSlice;
