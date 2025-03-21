import { BASE_URL, TABLES_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const tableSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTables: builder.query({
      query: () => TABLES_URL,
      providesTags: ["Table"],
      keepUnusedDataFor: 5,
    }),
    getTableDetails: builder.query({
      query: (id) => `${TABLES_URL}/${id}`,
      providesTags: ["Table"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetTablesQuery, useGetTableDetailsQuery } = tableSlice;
