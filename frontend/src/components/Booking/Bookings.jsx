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
} from "../../Slice/reservationSlice"; // Ensure correct hooks
import { formatDate, formatTime } from "../../utils/formatFunction";

const Bookings = () => {
  const { data, isLoading, isError, error } = useGetReservationsQuery();

  const [cancelReservation] = useCancelReservationMutation();

  console.log(data);

  // Handle loading and error states
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
        <Typography color="error">
          Error loading bookings: {error.message}
        </Typography>
      </Box>
    );
  }

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelReservation(bookingId); 
      toast.success(`Booking ${bookingId} canceled successfully!`);
    } catch (error) {
      toast.error(`Failed to cancel booking ${bookingId}`);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 4 }}>
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
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No bookings found
                  </TableCell>
                </TableRow>
              ) : (
                data.map((booking) => (
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
                            {item.name}{" "}
                            <span style={{ color: "red" }}>
                              {item.quantity}
                            </span>{" "}
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
