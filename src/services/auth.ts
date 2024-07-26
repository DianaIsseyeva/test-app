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

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: builder => ({
    register: builder.mutation<any, { username: string; email: string; password: string }>({
      query: user => ({
        url: '/api/auth/local/register',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation<any, { email: string; password: string }>({
      query: credentials => ({
        url: '/api/auth/local',
        method: 'POST',
        body: credentials,
      }),
    }),
    checkAuth: builder.query<any, void>({
      query: () => '/api/users/me',
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useCheckAuthQuery } = authApi;
