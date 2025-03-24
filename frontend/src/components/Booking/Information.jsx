import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Paper,
  FormControl,
  FormLabel,
  Box,
  Stack,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { bookingInformation } from "../../Slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Information = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(
      bookingInformation({
        name,
        email,
        checkInDate,
        checkInTime,
        checkOutTime,
      })
    );
  };

  const isFormValid = () => {
    return name && email && checkInDate && checkInTime && checkOutTime;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        backgroundColor: "background.paper",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 800,
            borderRadius: 4,
            boxShadow: "0px 8px 24px rgba(0,0,0,0.1)",
          }}
        >
          <Stack spacing={3} alignItems="center">
            <Typography className="first-title" variant="h6">
              Booking
            </Typography>
            <Typography className="second-title" variant="h4">
              A Culinary Journey Awaits!
            </Typography>

            <Grid container spacing={2} sx={{ width: "100%" }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ mb: 2 }}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 2 }}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <FormLabel sx={{ mb: 1, fontWeight: 500 }}>
                    Check-in Date
                  </FormLabel>
                  <DatePicker
                    value={checkInDate}
                    onChange={(newValue) => setCheckInDate(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <FormLabel sx={{ mb: 1, fontWeight: 500 }}>
                    Check-in Time
                  </FormLabel>
                  <TimePicker
                    value={checkInTime}
                    onChange={(newValue) => setCheckInTime(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <FormLabel sx={{ mb: 1, fontWeight: 500 }}>
                    Check-out Time
                  </FormLabel>
                  <TimePicker
                    value={checkOutTime}
                    onChange={(newValue) => setCheckOutTime(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    mt: 3,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    size="large"
                    disabled={!isFormValid()}
                    sx={{
                      px: 6,
                      py: 1.5,
                      fontSize: "1.1rem",
                      borderRadius: 2,
                    }}
                  >
                    Next
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Stack>
        </Paper>
      </LocalizationProvider>
    </Box>
  );
};

export default Information;
