import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const locationApi = createApi({
  reducerPath: 'locationApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/main/location' }),
  endpoints: (builder) => ({
    getLocations: builder.query({
      query: () => '/',
    }),
    createLocation: builder.mutation({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),
    deleteLocation: builder.mutation({
      query: (id: number) => ({
        url: `/${id}`,
        method: 'DELETE'
      }),
    }),
  }),
});

export const { useGetLocationsQuery, useCreateLocationMutation,useDeleteLocationMutation } = locationApi;