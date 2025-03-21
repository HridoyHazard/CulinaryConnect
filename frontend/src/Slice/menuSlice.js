import { BASE_URL,  MENUS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const menuSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMenu: builder.query({
            query: () => MENUS_URL,
            providesTags: ["Menu"],
            keepUnusedDataFor: 5,
        }),
    }),
});


export const { useGetMenuQuery } = menuSlice;

