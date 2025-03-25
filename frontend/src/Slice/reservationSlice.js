import { RESERVATIONS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const reservationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReservations: builder.query({
      query: () => RESERVATIONS_URL,
      providesTags: ["Reservation"],
      keepUnusedDataFor: 5,
    }),
    createPayPalOrder: builder.mutation({
      query: (amount) => ({
        url: `${PAYPAL_URL}/create-order`,
        method: "POST",
        body: { amount },
      }),
      invalidatesTags: ["Reservation"],
    }),
    authorizePayment: builder.mutation({
      query: (orderID) => ({
        url: `${PAYPAL_URL}/authorize/${orderID}`,
        method: "POST",
      }),
    }),
    capturePayment: builder.mutation({
      query: (authorizationID) => ({
        url: `${PAYPAL_URL}/capture/${authorizationID}`,
        method: "POST",
      }),
      invalidatesTags: ["Reservation"],
    }),
    createReservation: builder.mutation({
      query: ({ reservationData, authorizationID }) => ({
        url: RESERVATIONS_URL,
        method: "POST",
        body: {
          ...reservationData,
          authorizationID, // Link reservation to PayPal authorization
        },
      }),
      invalidatesTags: ["Reservation"],
    }),
  }),
});

export const {
  useGetReservationsQuery,
  useCreateReservationMutation,
  useCreatePayPalOrderMutation,
  useAuthorizePaymentMutation,
  useCapturePaymentMutation,
} = reservationSlice;
