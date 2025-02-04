import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { OrderStatus } from '../../model/Order';

interface OrderType {
    id?: number;
    orderNumber: string;
    pickupLocation: string;
    pickupLocationName: string;
    dropoffLocation: string;
    dropoffLocationName: string;
    pickupDate: string;
    dropoffDate?: string;
    status: OrderStatus;
    phoneNumber: string;
    truckCategoryId: number;
    payment: number;
    createdAt?: string;
    updatedAt?: string;
  }

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/main/order' }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getOrders: builder.query<OrderType[], void>({
      query: () => '/',
      providesTags: ['Order'],
    }),
    createOrder: builder.mutation<OrderType, Partial<OrderType>>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),
    updateOrder: builder.mutation<OrderType, Partial<OrderType> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['Order'],
    }),
    deleteOrder: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;