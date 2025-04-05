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
import { useGetReservationByIdQuery } from "../Slice/reservationSlice";
import { formatDate, formatTime } from "../utils/formatFunction";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { userInfo } = useSelector((state) => state.auth);

  console.log(userInfo);

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

  const { data: reservationData } = useGetReservationByIdQuery(
    userInfo?.user?._id
  );

  // Mock bookings data - replace with actual API call
  useEffect(() => {
    if (watch("password") !== watch("confirmPassword")) {
      trigger("confirmPassword");
    }
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, minHeight: "100vh" }}>
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
          <Card
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
              background: theme.palette.background.paper,
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                mb: 3,
                display: "flex",
                alignItems: "center",
                color: theme.palette.text.primary,
                fontWeight: 600,
              }}
            >
              <EventIcon sx={{ mr: 1, color: theme.palette.primary.main }} /> My
              Bookings
            </Typography>

            <Grid container spacing={2}>
              {reservationData?.map((booking) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={4}
                  key={booking._id}
                  sx={{ display: "flex" }}
                >
                  <Card
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      transition: "all 0.3s ease",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: theme.shadows[4],
                      },
                    }}
                  >
                    <Box sx={{ mb: 1 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          color: theme.palette.primary.main,
                          fontSize: "1.1rem",
                        }}
                      >
                        Table #{booking.table_no}
                      </Typography>
                    </Box>

                    <Grid container spacing={1} sx={{ mb: 1 }}>
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          🗓️ {formatDate(booking.check_in_date)}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          🕒 {formatTime(booking.check_in_time)}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          🏁 {formatTime(booking.check_out_time)}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.text.primary }}
                      >
                        👥 {booking.capacity} People
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.success.dark,
                        }}
                      >
                        ${booking.totalAmount}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        borderTop: `1px solid ${theme.palette.divider}`,
                        pt: 1,
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          display: "block",
                          color: theme.palette.text.secondary,
                          mb: 0.5,
                        }}
                      >
                        Menu Items:
                      </Typography>
                      {booking.itemsMenu.map((item) => (
                        <Box
                          key={item.name}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: "0.8rem",
                            "&:not(:last-child)": { mb: 0.5 },
                          }}
                        >
                          <span>• {item.name}</span>
                          <span>x{item.quantity}</span>
                        </Box>
                      ))}
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 1,
                        marginTop: "auto",
                      }}
                    >
                      <Box
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          backgroundColor:
                            booking.status === "Confirmed"
                              ? theme.palette.success.light
                              : booking.status === "Cancelled"
                              ? theme.palette.error.light
                              : theme.palette.grey[300],
                          color:
                            booking.status === "Confirmed"
                              ? theme.palette.success.contrastText
                              : booking.status === "Cancelled"
                              ? theme.palette.error.contrastText
                              : theme.palette.grey[800],
                        }}
                      >
                        {booking.status}
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {reservationData?.length === 0 && (
              <Box
                sx={{
                  textAlign: "center",
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <EventIcon
                  sx={{
                    fontSize: 40,
                    color: theme.palette.text.disabled,
                    mb: 1,
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  No bookings found
                </Typography>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
