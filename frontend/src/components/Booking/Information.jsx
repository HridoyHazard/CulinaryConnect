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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Information = () => {
  const { bookingInformation: bookingData } = useSelector(
    (state) => state.cart
  );

  console.log(bookingData);

  const [name, setName] = useState(bookingData?.name || "");
  const [email, setEmail] = useState(bookingData?.email || "");
  const [checkInDate, setCheckInDate] = useState(
    bookingData?.checkInDate ? new Date(bookingData.checkInDate) : null
  );
  const [checkInTime, setCheckInTime] = useState(
    bookingData?.checkInTime ? new Date(bookingData.checkInTime) : null
  );
  const [checkOutTime, setCheckOutTime] = useState(
    bookingData?.checkOutTime ? new Date(bookingData.checkOutTime) : null
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const serializedCheckInDate = checkInDate
      ? checkInDate.toISOString()
      : null;
    const serializedCheckInTime = checkInTime
      ? checkInTime.toISOString()
      : null;
    const serializedCheckOutTime = checkOutTime
      ? checkOutTime.toISOString()
      : null;

    dispatch(
      bookingInformation({
        name,
        email,
        checkInDate: serializedCheckInDate,
        checkInTime: serializedCheckInTime,
        checkOutTime: serializedCheckOutTime,
      })
    );

    navigate("/tablebook");
  };

  const combineDateAndTime = (date, time) => {
    if (!date || !time) return null;
    const newDate = new Date(date);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    return newDate;
  };

  const isFormValid = () => {
    // First check required fields
    if (!name || !email || !checkInDate || !checkInTime || !checkOutTime) {
      return false;
    }

    const checkInDateTime = combineDateAndTime(checkInDate, checkInTime);
    const checkOutDateTime = combineDateAndTime(checkInDate, checkOutTime);

    return checkOutDateTime > checkInDateTime;
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
                    onChange={(newValue) => {
                      setCheckOutTime(newValue);

                      if (checkInDate && checkInTime && newValue) {
                        const checkInDateTime = combineDateAndTime(
                          checkInDate,
                          checkInTime
                        );
                        const checkOutDateTime = combineDateAndTime(
                          checkInDate,
                          newValue
                        );
                        if (checkOutDateTime <= checkInDateTime) {
                          toast.error(
                            "Check-out time must be after check-in time!"
                          );
                        }
                      }
                    }}
                    renderInput={(params) => {
                      let isInvalid = false;
                      let errorMessage = "";

                      if (checkInDate && checkInTime && checkOutTime) {
                        const checkInDateTime = combineDateAndTime(
                          checkInDate,
                          checkInTime
                        );
                        const checkOutDateTime = combineDateAndTime(
                          checkInDate,
                          checkOutTime
                        );
                        isInvalid = checkOutDateTime <= checkInDateTime;
                        errorMessage = isInvalid
                          ? "Check-out time must be after check-in time"
                          : "";
                      }

                      return (
                        <TextField
                          {...params}
                          fullWidth
                          error={isInvalid}
                          helperText={errorMessage}
                        />
                      );
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    mt: 3,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2, // Add space between the buttons
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/tables")} // Go back to the previous page
                    size="large"
                    sx={{
                      px: 5,
                      py: 1.5,
                      fontSize: "1.1rem",
                      borderRadius: 2,
                    }}
                  >
                    Go Back
                  </Button>
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
