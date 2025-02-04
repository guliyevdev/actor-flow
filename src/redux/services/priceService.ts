import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const priceApi = createApi({
  reducerPath: 'priceApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/main/price' }),
  endpoints: (builder) => ({
    // Bütün qiymətləri əldə etmək
    getPrices: builder.query({
      query: () => '/all',
    }),
    // Yeni qiymət əlavə etmək
    createPrice: builder.mutation({
      query: (data) => ({
        url: '/add',
        method: 'POST',
        body: data,
      }),
    }),
    // Mövcud qiyməti yeniləmək
    updatePrice: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/update/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    // Qiyməti silmək
    deletePrice: builder.mutation({
      query: (id: number) => ({
        url: `/delete/${id}`,
        method: 'DELETE',
      }),
    }),
    // Qiymət hesablamaq
    calculatePrice: builder.mutation({
      query: (data) => ({
        url: '/calculate',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

// Hook-ları export edirik
export const {
  useGetPricesQuery,
  useCreatePriceMutation,
  useUpdatePriceMutation,
  useDeletePriceMutation,
  useCalculatePriceMutation,
} = priceApi;