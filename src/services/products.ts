import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:1337',
});

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery,
  endpoints: builder => ({
    getProducts: builder.query<any, void>({
      query: () => '/api/products?populate=*',
    }),
    getProductById: builder.query<any, number>({
      query: id => `/api/products/${id}?populate=*`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
