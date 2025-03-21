import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Badge, Button, Divider } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import TocIcon from "@mui/icons-material/Toc";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import "./nav.css";
import { useLogoutMutation } from "../../Slice/userSlice";
import { logout } from "../../Slice/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { AccountCircleRounded, ExitToApp } from "@mui/icons-material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userAnchorEl, setUserAnchorEl] = React.useState(null);
  const { userInfo } = useSelector((state) => state.auth);

  console.log(userInfo);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenu = (event) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleUserClose = () => {
    setUserAnchorEl(null);
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: "white" }} position="static">
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, color: "#e52b34", fontSize: "30px" }}
          >
            Culinary Connect
          </Typography>
          <div>
            <Badge color="warning" variant="dot">
              <Link to="/orders">
                <LocalMallIcon color="error" />
              </Link>
            </Badge>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="error"
              sx={{ margin: "0 15px" }}
            >
              <WidgetsIcon />
            </IconButton>
            {userInfo && (
              <>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="user-menu"
                  aria-haspopup="true"
                  color="error"
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, "&:hover": { bgcolor: "transparent" } }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "error.main",
                      width: 25,
                      height: 25,
                      fontSize: "1rem",
                      mr: 1,
                    }}
                  >
                    {userInfo?.name?.[0]}
                  </Avatar>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.primary",
                      fontWeight: 500,
                      display: { xs: "none", sm: "block" },
                    }}
                  ></Typography>
                </IconButton>

                <Menu
                  id="user-menu"
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      mt: 1.5,
                      minWidth: 160,
                      borderRadius: 1,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem
                    onClick={() => {
                      navigate("/profile");
                      handleCloseUserMenu();
                    }}
                    sx={{ py: 1.5 }}
                  >
                    <Avatar sx={{ bgcolor: "action.selected" }} />{" "}
                    {userInfo?.user?.name || "User"}
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={logoutHandler}
                    sx={{ py: 1.5, color: "error.main" }}
                  >
                    <LogoutOutlinedIcon sx={{ opacity: 0.8, mr: 1 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link to="/home">
                <MenuItem onClick={handleClose}>
                  <Button startIcon={<HomeIcon />}>Home</Button>
                </MenuItem>
              </Link>
              <Link to="/menu">
                <MenuItem onClick={handleClose}>
                  <Button startIcon={<RestaurantMenuIcon />}>Menu</Button>
                </MenuItem>
              </Link>
              <Link to="/tables">
                <MenuItem onClick={handleClose}>
                  <Button startIcon={<TocIcon />}>Tables</Button>
                </MenuItem>
              </Link>
              <Link to="/booking">
                <MenuItem onClick={handleClose}>
                  <Button startIcon={<BookOnlineIcon />}>Bookings</Button>
                </MenuItem>
              </Link>
              {!userInfo && (
                <Link to="/login">
                  <MenuItem onClick={handleClose}>
                    <Button startIcon={<AdminPanelSettingsIcon />}>
                      Login
                    </Button>
                  </MenuItem>
                </Link>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
    // <Box sx={{ flexGrow: 1 }}>
    //   <AppBar sx={{ backgroundColor: "white" }} position="static">
    //     <Toolbar>
    //       <Typography
    //         variant="h5"
    //         component="div"
    //         sx={{ flexGrow: 1, color: "#e52b34", fontSize: "30px" }}
    //       >
    //         Culinary Connect
    //       </Typography>
    //       <div>
    //         <Badge color="warning" variant="dot">
    //           <Link to="/orders">
    //             <LocalMallIcon color="error" />
    //           </Link>
    //         </Badge>
    //         <IconButton
    //           size="large"
    //           aria-label="main menu"
    //           onClick={handleMenu}
    //           color="error"
    //           sx={{ margin: "0 15px" }}
    //         >
    //           <WidgetsIcon />
    //         </IconButton>
    //         {userInfo ? (
    //           <Button
    //             color="inherit"
    //             startIcon={<Avatar>{userInfo.name}</Avatar>}
    //             onClick={handleUserMenu}
    //             aria-label="user menu"
    //           >
    //             {userInfo.name}
    //           </Button>
    //         ) : (
    //           <Link to="/login">
    //             <MenuItem onClick={handleClose}>
    //               <Button startIcon={<AdminPanelSettingsIcon />}>Login</Button>
    //             </MenuItem>
    //           </Link>
    //         )}
    //       </div>
    //     </Toolbar>
    //   </AppBar>
    //   <Menu
    //     id="menu-appbar"
    //     anchorEl={anchorEl}
    //     anchorOrigin={{ vertical: "top", horizontal: "right" }}
    //     keepMounted
    //     transformOrigin={{ vertical: "top", horizontal: "right" }}
    //     open={Boolean(anchorEl)}
    //     onClose={handleClose}
    //   >
    //     <MenuItem onClick={handleClose}>
    //       <Button component={Link} to="/home" startIcon={<HomeIcon />}>
    //         Home
    //       </Button>
    //     </MenuItem>
    //     <MenuItem onClick={handleClose}>
    //       <Button
    //         component={Link}
    //         to="/menu"
    //         startIcon={<RestaurantMenuIcon />}
    //       >
    //         Menu
    //       </Button>
    //     </MenuItem>
    //     <MenuItem onClick={handleClose}>
    //       <Button component={Link} to="/tables" startIcon={<TocIcon />}>
    //         Tables
    //       </Button>
    //     </MenuItem>
    //     <MenuItem onClick={handleClose}>
    //       <Button component={Link} to="/booking" startIcon={<BookOnlineIcon />}>
    //         Bookings
    //       </Button>
    //     </MenuItem>
    //   </Menu>
    //   {userInfo && (
    //     <Menu
    //       id="user-menu"
    //       anchorEl={userAnchorEl}
    //       anchorOrigin={{ vertical: "top", horizontal: "right" }}
    //       keepMounted
    //       transformOrigin={{ vertical: "top", horizontal: "right" }}
    //       open={Boolean(userAnchorEl)}
    //       onClose={handleUserClose}
    //     >
    //       <MenuItem onClick={handleUserClose}>
    //         <Button
    //           component={Link}
    //           to="/profile"
    //           startIcon={<AccountCircleRounded />}
    //         >
    //           Profile
    //         </Button>
    //       </MenuItem>
    //       <MenuItem onClick={logoutHandler}>
    //         <Button startIcon={<ExitToApp />}>Logout</Button>
    //       </MenuItem>
    //     </Menu>
    //   )}
    // </Box>
  );
}
