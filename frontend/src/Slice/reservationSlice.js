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
    processPayment: builder.mutation({
      query: (paymentData) => ({
        url: `${RESERVATIONS_URL}/payment`,
        method: "POST",
        body: paymentData,
      }),
    }),
  }),
});

export const {
  useGetReservationsQuery,
  useCreateReservationMutation,
  useProcessPaymentMutation,
} = reservationSlice;
