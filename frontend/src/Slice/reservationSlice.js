import { RESERVATIONS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const reservationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReservations: builder.query({
      query: () => RESERVATIONS_URL,
      providesTags: ["Reservation"],
      keepUnusedDataFor: 5,
    }),
    createReservation: builder.mutation({
      query: (reservationData) => ({
        url: RESERVATIONS_URL,
        method: "POST",
        body: reservationData,
      }),
      invalidatesTags: ["Reservation"],
    }),
    cancelReservation: builder.mutation({
      query: (id) => ({
        url: `${RESERVATIONS_URL}/cancel/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Reservation"],
    }),
    getReservationById: builder.query({
      query: (id) => `${RESERVATIONS_URL}/user/${id}`,
      providesTags: ["Reservation"],
      keepUnusedDataFor: 5,
    }),
    deleteReservation: builder.mutation({
      query: (id) => ({
        url: `${RESERVATIONS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reservation"],
    }),
  }),
});

export const {
  useGetReservationsQuery,
  useCreateReservationMutation,
  useCancelReservationMutation,
  useGetReservationByIdQuery,
  useDeleteReservationMutation,
} = reservationSlice;
