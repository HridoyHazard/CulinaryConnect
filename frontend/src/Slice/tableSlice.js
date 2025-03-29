import { create } from "@mui/material/styles/createTransitions";
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
    
    updateTable: builder.mutation({
      query: (tableData) => ({
        url: `${TABLES_URL}/${tableData._id}`,
        method: "PUT",
        body: tableData,
      }),
      invalidatesTags: ["Table"],
    }),
    deleteTable: builder.mutation({
      query: (id) => ({
        url: `${TABLES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Table"],
    }),
    createTable: builder.mutation({
      query: (tableData) => ({
        url: TABLES_URL,
        method: "POST",
        body: tableData,
      }),
      invalidatesTags: ["Table"],
    }),
  }),
});

export const { useGetTablesQuery, useGetTableDetailsQuery, useUpdateTableMutation, useDeleteTableMutation, useCreateTableMutation } = tableSlice;
