import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const truckCategoryApi = createApi({
  reducerPath: 'truckCategoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/main/category' }), // base URL API endpointinizə uyğunlaşdırılır
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => '/all', // Bütün kateqoriyaları əldə etmək
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: '/add', // Yeni kateqoriya əlavə etmək
        method: 'POST',
        body: data,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/update/${id}`, // Mövcud kateqoriyanı yeniləmək
        method: 'PUT',
        body: data,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id: number) => ({
        url: `/delete/${id}`, // Mövcud kateqoriyanı silmək
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} = truckCategoryApi;