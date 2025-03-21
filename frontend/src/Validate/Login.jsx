import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import "./auth.css";
import { Link, useNavigate , useLocation} from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";
import { toast } from "react-toastify";
import { Authenticate } from "./AuthContext";
import { useLoginMutation } from "../Slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../Slice/authSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 270,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  //User Details View
  const [open, setOpen] = React.useState(false);

  const {register,handleSubmit,formState:{errors}}=useForm()
  //auth function
  const { setAuth } = useContext(Authenticate);

  const submitHandler = async (data) => {

    try {
      const res = await login({ email: data.Email, password: data.Psw }).unwrap();

      console.log(res);
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container className="Auth">
      <Typography className="first-title" variant="h6">
        Sign In
      </Typography>
      <Typography className="second-title" variant="h4">
        Discover Our Flavorful Symphony!
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 550,
        }}
      >
        <form action="" method="post" onSubmit={handleSubmit(submitHandler)}>
          <Card className="card" variant="outlined">
            <TextField
              {...register("Email", { required: "Enter Email" })}
              error={errors.Email ? true : false}
              variant="standard"
              label="Enter Email"
              type="email"
            />
            <TextField
              {...register("Psw", { required: "Enter Password" })}
              error={errors.Psw ? true : false}
              variant="standard"
              label="Enter Password"
              type="password"
            />
            <Button
              sx={{ alignSelf: "flex-start", marginLeft: 3, color: "gray" }}
              className="hint-btn"
              onClick={() => setOpen(true)}
            >
              Check Hint{" "}
            </Button>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
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
                Login
              </Button>
            </Box>
          </Card>
        </form>
      </Box>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
      >
        <Card sx={style}>
          <Typography id="modal-modal-title" variant="h6">
            UserName
          </Typography>
          <Typography component="p">user@gmail.com</Typography>
          <Typography id="modal-modal-title" variant="h6" marginTop={5}>
            Password
          </Typography>
          <Typography component="p">1234</Typography>
        </Card>
      </Modal>
    </Container>
  );
};

export default Login;
