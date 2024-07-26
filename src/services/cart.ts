import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:1337/api',
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
      query: userId => `/users/${userId}?populate=cart,cart.image`,
    }),
    addToCart: builder.mutation<any, { userId: string; productId: number }>({
      query: ({ userId, productId }) => ({
        url: `/cart/add`,
        method: 'POST',
        body: { userId, productId },
      }),
    }),
    removeFromCart: builder.mutation<any, { userId: string; productId: number }>({
      query: ({ userId, productId }) => ({
        url: `/cart/remove`,
        method: 'POST',
        body: { userId, productId },
      }),
    }),
  }),
});

export const { useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation } = cartApi;
