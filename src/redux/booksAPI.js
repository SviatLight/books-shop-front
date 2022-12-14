import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const booksAPI = createApi({
  reducerPath: 'booksAPI',
  tagTypes: ['Books'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:5001/api/' }),
  endpoints: (build) => ({
    getBooks: build.query({
      query: ({ search, currentPage, activeThemes }) =>
        `books?Page=${currentPage}${search ? `&q=${search}` : ''}${
          activeThemes ? activeThemes.join('') : ''
        }`,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Books', id })), { type: 'Books', id: 'LIST' }]
          : [{ type: 'Books', id: 'LIST' }],
    }),
  }),
});

export const { useGetBooksQuery } = booksAPI;
