import React from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Add, DeleteOutline, Remove } from "@mui/icons-material";
import { updateQuantity, removeFromCart } from "../Slice/cartSlice.js";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const handleIncrement = (itemId) => {
    console.log("Incrementing item", itemId);
    const item = cartItems.find((item) => item._id === itemId);

    if (item) {
      dispatch(
        updateQuantity({
          id: itemId,
          quantity: item.quantity + 1,
        })
      );
    }
  };

  const handleDecrement = (itemId) => {
    console.log("Decrementing item", itemId);
    const item = cartItems.find((item) => item._id === itemId);
    if (item && item.quantity > 1) {
      dispatch(
        updateQuantity({
          id: itemId,
          quantity: item.quantity - 1,
        })
      );
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleClick = () => {
    navigate("/information");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Box textAlign="center" sx={{ mt: 8 }}>
          <Typography variant="h6" gutterBottom>
            Your cart is empty
          </Typography>
          <Button
            component={Link}
            to="/menu"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: 60,
                              height: 60,
                              objectFit: "cover",
                              borderRadius: 8,
                              marginRight: 16,
                            }}
                          />
                          <Typography variant="body1">{item.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        ${item.price.toFixed(2)}
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <IconButton
                            onClick={() =>
                              handleDecrement(item._id, item.quantity - 1)
                            }
                          >
                            <Remove fontSize="small" />
                          </IconButton>
                          <Typography variant="body1" sx={{ mx: 1 }}>
                            {item.quantity}
                          </Typography>
                          <IconButton onClick={() => handleIncrement(item._id)}>
                            <Add fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => handleRemoveItem(item._id)}>
                          <DeleteOutline color="error" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Checkout Summary */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="body1">Subtotal:</Typography>
                <Typography variant="body1">${calculateTotal()}</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between" mb={3}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">${calculateTotal()}</Typography>
              </Box>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={handleClick}
              >
                Proceed to Reservation
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CartPage;
