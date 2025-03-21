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
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateProfileMutation, useChangePasswordMutation } from "../Slice/userSlice";
import { setCredentials } from "../Slice/authSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  // State for editing profile
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userInfo?.name || "",
      email: userInfo?.email || "",
    },
  });

  // State for changing password
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    watch,
    formState: { errors: passwordErrors },
  } = useForm();

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChanging }] = useChangePasswordMutation();

  // Handle profile update
  const submitProfileHandler = async (data) => {
    try {
      const res = await updateProfile(data).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // Handle password change
  const submitPasswordHandler = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();
      toast.success("Password changed successfully");
      setIsChangingPassword(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Card sx={{ p: 4 }}>
        <Grid container spacing={2}>
          {/* Left Section: Avatar and Basic Info */}
          <Grid item xs={12} md={4}>
            <Avatar
              sx={{ width: 100, height: 100, mb: 2 }}
              alt={userInfo?.name}
              src={userInfo?.avatar || ""}
            />
            <Typography variant="h6">{userInfo?.name}</Typography>
            <Typography variant="body1">{userInfo?.email}</Typography>
            <Button
              variant="outlined"
              onClick={() => setIsEditing(!isEditing)}
              sx={{ mt: 2 }}
            >
              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => setIsChangingPassword(!isChangingPassword)}
              sx={{ mt: 2, ml: 2 }}
            >
              {isChangingPassword ? "Cancel" : "Change Password"}
            </Button>
          </Grid>

          {/* Right Section: Forms or Welcome Message */}
          <Grid item xs={12} md={8}>
            {isEditing ? (
              <form onSubmit={handleSubmit(submitProfileHandler)}>
                <TextField
                  {...register("name", { required: "Name is required" })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  label="Name"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  {...register("email", { required: "Email is required" })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isUpdating}
                  sx={{ mt: 2 }}
                >
                  {isUpdating ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            ) : isChangingPassword ? (
              <form onSubmit={handleSubmitPassword(submitPasswordHandler)}>
                <TextField
                  {...registerPassword("currentPassword", {
                    required: "Current password is required",
                  })}
                  error={!!passwordErrors.currentPassword}
                  helperText={passwordErrors.currentPassword?.message}
                  label="Current Password"
                  type="password"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  {...registerPassword("newPassword", {
                    required: "New password is required",
                  })}
                  error={!!passwordErrors.newPassword}
                  helperText={passwordErrors.newPassword?.message}
                  label="New Password"
                  type="password"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  {...registerPassword("confirmPassword", {
                    required: "Confirm new password",
                    validate: (value) =>
                      value === watch("newPassword") || "Passwords do not match",
                  })}
                  error={!!passwordErrors.confirmPassword}
                  helperText={passwordErrors.confirmPassword?.message}
                  label="Confirm New Password"
                  type="password"
                  fullWidth
                  margin="normal"
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isChanging}
                  sx={{ mt: 2 }}
                >
                  {isChanging ? "Changing..." : "Change Password"}
                </Button>
              </form>
            ) : (
              <Typography variant="body1">
                Welcome to your profile page. Here you can view and edit your profile information.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default UserProfile;