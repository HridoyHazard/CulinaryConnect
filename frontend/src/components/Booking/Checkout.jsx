import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  IconButton,
  Chip,
  Avatar,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import {
  CreditCard,
  Person,
  Email,
  Home,
  LocalDining,
  CalendarToday,
  Lock,
  Phone,
  EventSeat,
  Restaurant,
  Payment,
} from "@mui/icons-material";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { formatDate, formatTime } from "../../utils/formatFunction";
import { useCreateReservationMutation } from "../../Slice/reservationSlice";

const Checkout = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { bookingInformation, selectedTables, cartItems } = useSelector(
    (state) => state.cart
  );

  const navigate = useNavigate();

  console.log("user", userInfo);
  console.log(
    "booking",
    bookingInformation,
    "tables",
    selectedTables,
    "items",
    cartItems
  );

  // Use the hooks from reservationSlice
  const [createReservation] = useCreateReservationMutation();
  const [isChecked, setIsChecked] = useState(false);

  const CheckInDate = formatDate(bookingInformation.checkInDate);
  const CheckInTime = formatTime(bookingInformation.checkInTime);
  const CheckOutTime = formatTime(bookingInformation.checkOutTime);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  async function onToken(token) {
    const reservationDetails = {
      userId: userInfo.user._id,
      customer_name: bookingInformation.name,
      customer_email: bookingInformation.email,
      check_in_date: new Date(bookingInformation.checkInDate),
      check_in_time: new Date(bookingInformation.checkInTime),
      check_out_time: new Date(bookingInformation.checkOutTime),
      totalAmount: parseFloat(calculateTotal()),
      capacity: selectedTables.seating_capacity,
      table_no: selectedTables.table_no,
      itemsMenu: cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      })),
      token,
    };

    try {
      const response = await createReservation(reservationDetails);
      console.log("Reservation created:", response);
      if (response.data) {
        toast.success("Reservation created successfully");
        navigate("/bookings");
      } else {
        toast.error("Reservation creation failed");
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
      toast.error("Reservation creation failed");
    }
  }



  // Mock data
  const tableInfo = {
    tableNumber: "T05",
    capacity: 4,
    date: "2023-08-15",
    time: "19:00",
    price: 49.99,
  };

  const calculateTotal = () => {
    const menuTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = (tableInfo.price + menuTotal) * 0.1;
    return (tableInfo.price + menuTotal + tax).toFixed(2);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 4 }}>
        Complete Your Booking
      </Typography>

      <Grid container spacing={4}>
        {/* Left Column - Summary */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              <Person sx={{ mr: 1 }} /> Customer Information
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography>{bookingInformation.name}</Typography>
              <Typography>{bookingInformation.email}</Typography>
              <Divider sx={{ my: 2 }} />
            </Box>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              <EventSeat sx={{ mr: 1 }} /> Table Details
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Chip label={`Table ${selectedTables.table_no}`} sx={{ mb: 1 }} />
              <Typography>Date: {CheckInDate}</Typography>
              <Typography>CheckInTime: {CheckInTime}</Typography>
              <Typography>CheckOutTime: {CheckOutTime}</Typography>
              <Typography>
                Capacity: {selectedTables.seating_capacity} people
              </Typography>
              <Divider sx={{ my: 2 }} />
            </Box>

            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              <Restaurant sx={{ mr: 1 }} /> Your Order
            </Typography>
            <List dense>
              {cartItems.map((item, index) => (
                <ListItem key={index} sx={{ py: 1 }}>
                  <Avatar
                    src={item.image} // Assuming 'image' is the property holding the image URL
                    alt={item.name}
                    sx={{ mr: 2, width: 40, height: 40 }}
                  />
                  <ListItemText
                    primary={item.name}
                    secondary={`Quantity: ${item.quantity}`}
                  />
                  <Typography>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Right Column - Payment & Total */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box sx={{ mb: 2 }}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography>Table Booking:</Typography>
                  <Typography>Food & Drinks:</Typography>
                  <Typography>Tax (10%):</Typography>
                  <Typography variant="h6">Total:</Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "right" }}>
                  <Typography>${tableInfo.price}</Typography>
                  <Typography>
                    $
                    {cartItems
                      .reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </Typography>
                  <Typography>
                    $$
                    {(
                      (tableInfo.price +
                        cartItems.reduce(
                          (sum, item) => sum + item.price * item.quantity,
                          0
                        )) *
                      0.1
                    ).toFixed(2)}
                  </Typography>
                  <Typography variant="h6">${calculateTotal()}</Typography>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    name="agree"
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2">
                    Pay And Confirm Your Booking
                  </Typography>
                }
              />
              {!isChecked && (
                <FormHelperText error>
                  You must agree to the terms and conditions.
                </FormHelperText>
              )}
            </Box>
            <StripeCheckout
              name="Culinary Connect Booking"
              description={`Payment for Table No:${selectedTables.table_no}`}
              amount={calculateTotal() * 100}
              currency="USD"
              token={onToken}
              stripeKey="pk_test_51R6SjKARt0cv2wfi1su5am3VH4eaAwioaJkIpaNGVxRXTMn3xwygReuhQWr1VIU2NjEkRLqPtKCU3qS7znRoF73P00YWogZDJG"
            >
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                disabled={!isChecked}
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 2,
                  backgroundColor: "#424242", // Customize background color
                  "&:hover": {
                    backgroundColor: "#616161", // Hover effect
                  },
                  borderRadius: "8px",
                }}
                startIcon={<Payment sx={{ mr: 1 }} />}
              >
                Pay ${calculateTotal()}
              </Button>
            </StripeCheckout>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
