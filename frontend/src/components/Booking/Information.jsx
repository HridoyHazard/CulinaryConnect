import React, { useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Typography,
  Paper,
  FormControl,
  FormLabel,
  Box,
  Stack
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const Information = ({ onNext }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);

  const handleSubmit = () => {
    if (!name || !email || !checkInDate || !checkInTime || !checkOutTime) {
      return;
    }
    onNext({
      name,
      email,
      checkInDate,
      checkInTime,
      checkOutTime
    });
  };

  const isFormValid = () => {
    return name && email && checkInDate && checkInTime && checkOutTime;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, margin: 'auto' }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
          Booking Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel component="legend">Check-in Date</FormLabel>
              <DatePicker
                value={checkInDate}
                onChange={(newValue) => setCheckInDate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} sx={{ mt: 1 }} fullWidth />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel component="legend">Check-in Time</FormLabel>
              <TimePicker
                value={checkInTime}
                onChange={(newValue) => setCheckInTime(newValue)}
                renderInput={(params) => (
                  <TextField {...params} sx={{ mt: 1 }} fullWidth />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel component="legend">Check-out Time</FormLabel>
              <TimePicker
                value={checkOutTime}
                onChange={(newValue) => setCheckOutTime(newValue)}
                renderInput={(params) => (
                  <TextField {...params} sx={{ mt: 1 }} fullWidth />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                size="large"
                disabled={!isFormValid()}
              >
                Next
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </LocalizationProvider>
  );
};

export default Information;