import { MENUS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const menuSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMenu: builder.query({
      query: () => MENUS_URL,
      providesTags: ["Menu"],
      keepUnusedDataFor: 5,
    }),
    updateMenu: builder.mutation({
      query: (menuData) => ({
        url: `${MENUS_URL}/${menuData._id}`,
        method: "PUT",
        body: menuData,
      }),
      invalidatesTags: ["Menu"],
    }),
    deleteMenu: builder.mutation({
      query: (id) => ({
        url: `${MENUS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    createMenu: builder.mutation({
      query: (menuData) => ({
        url: MENUS_URL,
        method: "POST",
        body: menuData,
      }),
      invalidatesTags: ["Menu"],
    }),
  }),
});

export const { useGetMenuQuery, useUpdateMenuMutation, useDeleteMenuMutation, useCreateMenuMutation } = menuSlice;
