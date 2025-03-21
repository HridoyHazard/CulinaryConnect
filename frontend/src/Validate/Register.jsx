import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import "./auth.css"; // Assuming the same CSS file as the login page
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../Slice/userSlice";
import { useSelector } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const [registerMutation, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      await registerMutation({
        name: data.name,
        email: data.email,
        password: data.password,
      }).unwrap();
      toast.success("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container className="Auth">
      <Typography className="first-title" variant="h6">
        Register
      </Typography>
      <Typography className="second-title" variant="h4">
        Join Our Flavorful Community!
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 550,
        }}
      >
        <form onSubmit={handleSubmit(submitHandler)}>
          <Card className="card" variant="outlined">
            {/* Name Field */}
            <TextField
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
              variant="standard"
              label="Enter Name"
              type="text"
            />
            {/* Email Field */}
            <TextField
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email?.message}
              variant="standard"
              label="Enter Email"
              type="email"
            />
            {/* Password Field */}
            <TextField
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
              variant="standard"
              label="Enter Password"
              type="password"
            />
            {/* Confirm Password Field */}
            <TextField
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              variant="standard"
              label="Confirm Password"
              type="password"
            />
            {/* Buttons */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: 2,
              }}
            >
              <Link to="/">
                <Button variant="text">Cancel</Button>
              </Link>
              <Button
                variant="contained"
                type="submit"
                endIcon={<ArrowForward />}
              >
                Register
              </Button>
            </Box>
            {/* Login Link */}
            <Typography sx={{ textAlign: "center", marginTop: 2 }}>
              Already have an account? <Link to="/login">Login here</Link>
            </Typography>
          </Card>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
