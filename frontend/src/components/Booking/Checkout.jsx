import React, { useState } from "react";
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
  FormControlLabel,
  Checkbox,
  Chip,
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
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({
    email: false,
    phone: false,
    cardNumber: false,
    expiryDate: false,
    cvc: false,
  });

  // Mock data
  const tableInfo = {
    tableNumber: "T05",
    capacity: 4,
    date: "2023-08-15",
    time: "19:00",
    price: 49.99,
  };

  const menuItems = [
    { id: 1, name: "Margherita Pizza", price: 12.99, quantity: 2 },
    { id: 2, name: "Caesar Salad", price: 8.99, quantity: 1 },
    { id: 3, name: "Red Wine", price: 6.5, quantity: 3 },
  ];

  const calculateTotal = () => {
    const menuTotal = menuItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = (tableInfo.price + menuTotal) * 0.1;
    return (tableInfo.price + menuTotal + tax).toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "agreeTerms" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      email: !/\S+@\S+\.\S+/.test(formData.email),
      phone: !/^\d{10}$/.test(formData.phone),
      cardNumber: formData.cardNumber.replace(/ /g, "").length !== 16,
      expiryDate: !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.expiryDate),
      cvc: formData.cvc.length < 3 || formData.cvc.length > 4,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() && formData.agreeTerms) {
      console.log("Checkout data:", formData);
      navigate("/confirmation");
    }
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
              <Typography>Name</Typography>
              <Typography>Email</Typography>
              <Divider sx={{ my: 2 }} />
            </Box>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              <EventSeat sx={{ mr: 1 }} /> Table Details
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Chip label={`Table ${tableInfo.tableNumber}`} sx={{ mb: 1 }} />
              <Typography>Date: {tableInfo.date}</Typography>
              <Typography>Time: {tableInfo.time}</Typography>
              <Typography>Capacity: {tableInfo.capacity} people</Typography>
              <Divider sx={{ my: 2 }} />
            </Box>

            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              <Restaurant sx={{ mr: 1 }} /> Your Order
            </Typography>
            <List dense>
              {menuItems.map((item) => (
                <ListItem key={item.id} sx={{ py: 1 }}>
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
                    {menuItems
                      .reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </Typography>
                  <Typography>
                    $
                    {(
                      (tableInfo.price +
                        menuItems.reduce(
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
            <PayPalScriptProvider
              options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID" }}
            >
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: calculateTotal(),
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    alert("Payment Successful!");
                  });
                }}
              />
            </PayPalScriptProvider>
            <FormControlLabel
              control={
                <Checkbox
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  required
                />
              }
              label="I agree to the terms and conditions"
              sx={{ mt: 2 }}
            />
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
              onClick={handleSubmit}
              disabled={!formData.agreeTerms}
            >
              Confirm Booking (${calculateTotal()})
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
