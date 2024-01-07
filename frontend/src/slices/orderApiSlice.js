import { apiSlice } from './apiSlice';
import { ORDERS_URL, PAYPAL_URL } from '../constants';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: 'http://localhost:3001/api/orders',
        method: 'POST',
        body: order,
        credentials: 'include',
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
        method: 'GET',
        credentials: 'include',
      }),
      keepUnusedDataFor: 5,
    }),
    // paypal
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: details,
      }),
    }),
    getPaypalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery, usePayOrderMutation, useGetPaypalClientIdQuery } = orderApiSlice;