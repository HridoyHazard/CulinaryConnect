import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Box,
  CircularProgress,
  TableContainer,
  IconButton,
} from "@mui/material";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetReservationsQuery,
  useCancelReservationMutation,
  useGetReservationByIdQuery,
} from "../../Slice/reservationSlice";
import { formatDate, formatTime } from "../../utils/formatFunction";
import Swal from "sweetalert2";

const Bookings = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading, isError, error } = useGetReservationByIdQuery(userInfo?.user?._id);
  const [cancelReservation] = useCancelReservationMutation();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, minHeight: "100vh" }}>
        <Typography className="first-title" variant="h4" sx={{ mb: 4 }}>
          Your Bookings
        </Typography>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "center", py: 5, fontStyle: "bold", fontSize: "4rem" }}>
            <Typography color={error.status === 404 ? "inherit" : "error"}>
              {error.status === 404 ? "No bookings found." : `Error loading bookings: ${error.message}`}
            </Typography>
          </Box>
        </Paper>
      </Container>
    );
  }

  const handleCancelBooking = async (bookingId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      try {
        await cancelReservation(bookingId);
        toast.success(`Booking ${bookingId} canceled successfully!`);
      } catch (error) {
        toast.error(`Failed to cancel booking ${bookingId}`);
      }
    } else {
      Swal.fire("Cancelled", "Your booking is safe :)", "info");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, minHeight: "100vh" }}>
      <Typography className="first-title" variant="h4" sx={{ mb: 4 }}>
        Your Bookings
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Table Number</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Menu Items</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Check-in Date</TableCell>
                <TableCell>Check-in Time</TableCell>
                <TableCell>Check-out Time</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No bookings found
                  </TableCell>
                </TableRow>
              ) : (
                data?.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell>{booking.table_no}</TableCell>
                    <TableCell>
                      {booking.status === "Confirmed" ? (
                        <CheckCircle sx={{ color: "green" }} />
                      ) : (
                        <Cancel sx={{ color: "red" }} />
                      )}
                    </TableCell>
                    <TableCell>{booking.paymentId}</TableCell>
                    <TableCell>
                      <ul>
                        {booking.itemsMenu.map((item, index) => (
                          <li key={index}>
                            {item.name} <span style={{ color: "red" }}>{item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>${booking.totalAmount}</TableCell>
                    <TableCell>{formatDate(booking.check_in_date)}</TableCell>
                    <TableCell>{formatTime(booking.check_in_time)}</TableCell>
                    <TableCell>{formatTime(booking.check_out_time)}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleCancelBooking(booking._id)}
                      >
                        <Cancel />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Bookings;