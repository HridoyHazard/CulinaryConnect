import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
  Avatar,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useProfileMutation } from "../Slice/userSlice";
import { setCredentials } from "../Slice/authSlice";
import LockResetIcon from "@mui/icons-material/LockReset";
import EventIcon from "@mui/icons-material/Event";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { userInfo } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    trigger,
  } = useForm({
    defaultValues: {
      name: userInfo?.user?.name || "",
      email: userInfo?.user?.email || "",
    },
  });

  const [updateProfile, { isLoading: isUpdating }] = useProfileMutation();
  const [bookings, setBookings] = useState([]);

  // Mock bookings data - replace with actual API call
  useEffect(() => {
    if (watch("password") !== watch("confirmPassword")) {
      trigger("confirmPassword");
    }

    const fetchBookings = async () => {
      try {
        // const response = await fetchUserBookings();
        // setBookings(response.data);
        const mockBookings = [
          {
            id: 1,
            date: "2023-10-01",
            service: "Spa Treatment",
            status: "Completed",
          },
          {
            id: 2,
            date: "2023-10-05",
            service: "Haircut",
            status: "Confirmed",
          },
          { id: 3, date: "2023-10-10", service: "Massage", status: "Pending" },
        ];
        setBookings(mockBookings);
      } catch (error) {
        toast.error("Failed to load bookings");
      }
    };
    fetchBookings();
  }, [watch("password"), trigger, watch]);

  const submitProfileHandler = async (data) => {
    console.log(data);
    try {
      const res = await updateProfile(data).unwrap();
      dispatch(
        setCredentials({
          ...userInfo,
          user: { ...userInfo.user, name: data.name, email: data.email },
        })
      );
      reset({
        name: data.name,
        email: data.email,
        password: "", 
        confirmPassword: "", 
      });

      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        User Profile
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, height: "100%" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{ width: 120, height: 120, mb: 2 }}
                alt={userInfo?.user?.name}
                src={userInfo?.avatar || ""}
              />
              <Typography variant="h5" gutterBottom>
                {userInfo?.user?.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {userInfo?.user?.email}
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Update Form Section */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <form onSubmit={handleSubmit(submitProfileHandler)}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    {...register("name", { required: "Name is required" })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    label="Username"
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    {...register("password", {
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    label="New Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <LockResetIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    {...register("confirmPassword", {
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <LockResetIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isUpdating}
                sx={{ mt: 3 }}
                fullWidth={isSmallScreen}
              >
                {isUpdating ? "Updating..." : "Update Profile"}
              </Button>
            </form>
          </Card>
        </Grid>

        {/* Bookings Section */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ mb: 3, display: "flex", alignItems: "center" }}
            >
              <EventIcon sx={{ mr: 1 }} /> My Bookings
            </Typography>
            <Grid container spacing={2}>
              {bookings.map((booking) => (
                <Grid item xs={12} sm={6} lg={4} key={booking.id}>
                  <Card sx={{ p: 2, bgcolor: "background.paper" }}>
                    <Typography variant="subtitle1" gutterBottom>
                      <strong>{booking.service}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Date: {booking.date}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          booking.status === "Confirmed"
                            ? "success.main"
                            : booking.status === "Pending"
                            ? "warning.main"
                            : "text.secondary",
                      }}
                    >
                      Status: {booking.status}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {bookings.length === 0 && (
              <Typography variant="body1" sx={{ textAlign: "center", p: 3 }}>
                No bookings found
              </Typography>
            )}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
