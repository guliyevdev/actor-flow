import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const driverService = createApi({
  reducerPath: 'driverApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/main' }), // Backend API baz URL-ni buraya əlavə edin
  endpoints: (builder) => ({
    getDrivers: builder.query({
      query: () => '/drivers',
    }),
    createDriver: builder.mutation({
      query: (newDriver) => ({
        url: '/drivers',
        method: 'POST',
        body: newDriver,
      }),
    }),
    deleteDriver: builder.mutation({
      query: (driverId) => ({
        url: `/drivers/${driverId}`,
        method: 'DELETE',
      }),
    }),
    updateDriver: builder.mutation({
      query: ({ id, ...updatedDriver }) => ({
        url: `/drivers/${id}`,
        method: 'PUT',
        body: updatedDriver,
      }),
    }),
  }),
});

export const {
  useGetDriversQuery,
  useCreateDriverMutation,
  useDeleteDriverMutation,
  useUpdateDriverMutation,
} = driverService;