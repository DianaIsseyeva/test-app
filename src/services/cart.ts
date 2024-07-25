import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:1337',
  prepareHeaders: headers => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery,
  endpoints: builder => ({
    getCart: builder.query<any, string>({
      query: userId => `/api/users/${userId}?populate=cart`,
    }),
    addToCart: builder.mutation<any, { userId: string; productId: string }>({
      query: ({ userId, productId }) => ({
        url: `/api/users/${userId}`,
        method: 'PUT',
        body: { cart: [productId] },
      }),
    }),
    removeFromCart: builder.mutation<any, { userId: string; productId: string }>({
      query: ({ userId, productId }) => ({
        url: `/api/users/${userId}`,
        method: 'PUT',
        body: { cart: { disconnect: [productId] } },
      }),
    }),
  }),
});

export const { useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation } = cartApi;
