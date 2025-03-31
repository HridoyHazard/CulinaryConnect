import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  Box,
  Button,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Restaurant as RestaurantIcon,
  TableRestaurant as TableIcon,
  BookOnline as ReservationIcon,
  Dashboard as DashboardIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  useGetTablesQuery,
  useUpdateTableMutation,
  useDeleteTableMutation,
  useCreateTableMutation,
} from "../Slice/tableSlice";
import {
  useGetMenuQuery,
  useDeleteMenuMutation,
  useUpdateMenuMutation,
  useCreateMenuMutation,
} from "../Slice/menuSlice";
import {
  useGetReservationsQuery,
  useDeleteReservationMutation,
  useCancelReservationMutation,
} from "../Slice/reservationSlice";
import { formatDate, formatTime } from "../utils/formatFunction";
import { uploadImage } from "../utils/uploadImage";
import Swal from "sweetalert2";

const AdminUserProfile = () => {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogType, setDialogType] = useState("");
  const [loading, setLoading] = useState(false);

  //fetching data hooks
  const { data: tables, refetch: refetchTables } = useGetTablesQuery();
  const { data: menu, refetch: refetchMenu } = useGetMenuQuery();
  const { data: reservations, refetch: refetchReservations } =
    useGetReservationsQuery();
  //table
  const [updateTable] = useUpdateTableMutation();
  const [deleteTable] = useDeleteTableMutation();
  const [createTable] = useCreateTableMutation();
  //menu
  const [deleteMenu] = useDeleteMenuMutation();
  const [updateMenu] = useUpdateMenuMutation();
  const [createMenu] = useCreateMenuMutation();
  //reservation
  const [deleteReservation] = useDeleteReservationMutation();
  const [cancelReservation] = useCancelReservationMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleOpenDialog = (type, item = null) => {
    console.log(item);
    setDialogType(type);
    setSelectedItem(item);
    reset(item || {});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
    reset();
  };

  const handleCancelReservation = (reservationId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this reservation?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await cancelReservation(reservationId).unwrap();
          await refetchReservations();
          toast.success("Reservation cancelled successfully");
          Swal.fire(
            "Cancelled!",
            "The reservation has been cancelled.",
            "success"
          );
        } catch (err) {
          toast.error("Failed to cancel reservation");
          Swal.fire(
            "Error!",
            "There was an issue cancelling the reservation.",
            "error"
          );
        }
      }
    });
  };

  const handleDelete = async (type, id) => {
    switch (type) {
      case "table":
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              await deleteTable(id).unwrap();
              await refetchTables();
              toast.success("Table deleted successfully");
              Swal.fire("Deleted!", "Your table has been deleted.", "success");
            } catch (err) {
              toast.error("Failed to delete table");
              Swal.fire(
                "Error!",
                "There was an issue deleting the table.",
                "error"
              );
            }
          }
        });
        break;
      case "menu":
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              await deleteMenu(id).unwrap();
              await refetchMenu();
              toast.success("Menu deleted successfully");
              Swal.fire("Deleted!", "Your menu has been deleted.", "success");
            } catch (err) {
              toast.error("Failed to delete menu");
              Swal.fire(
                "Error!",
                "There was an issue deleting the menu.",
                "error"
              );
            }
          }
        });
        break;
      case "reservation":
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              await deleteReservation(id).unwrap();
              await refetchReservations();
              toast.success("Reservation deleted successfully");
              Swal.fire(
                "Deleted!",
                "Your reservation has been deleted.",
                "success"
              );
            } catch (err) {
              toast.error("Failed to delete reservation");
              Swal.fire(
                "Error!",
                "There was an issue deleting the reservation.",
                "error"
              );
            }
          }
        });
        break;
    }
  };

  const onSubmit = async (data) => {
    if (data.image && data.image.length > 0) {
      setLoading(true);
      try {
        const picture = await uploadImage(data.image[0]);
        if (picture) {
          data.picture = picture; // Add new image URL to form data
        }
      } catch (error) {
        toast.error("Image upload failed");
        setLoading(false);
        return;
      }
      setLoading(false);
    }
    try {
      switch (dialogType) {
        case "table":
          if (selectedItem) {
            await updateTable({
              ...data,
              id: selectedItem._id,
            });
            toast.success("Table updated successfully");
          } else {
            await createTable({ ...data, id: uuidv4() });
            toast.success("Table created successfully");
          }
          break;
        case "menu":
          if (selectedItem) {
            await updateMenu({
              ...data,
              id: selectedItem._id,
            });
            toast.success("Menu updated successfully");
          } else {
            await createMenu({ ...data, id: uuidv4() });
            toast.success("Menu created successfully");
          }
          break;
      }
      handleCloseDialog();
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  const handleStatusChange = (reservationId, status) => {
    //   setReservations(reservations.map(res =>
    //     res.id === reservationId ? { ...res, status } : res
    //   ));
    //   toast.success("Reservation status updated");
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4, minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Admin Dashboard
      </Typography>

      <Tabs value={currentTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab value="dashboard" label="Dashboard" icon={<DashboardIcon />} />
        <Tab value="tables" label="Tables" icon={<TableIcon />} />
        <Tab value="menu" label="Menu" icon={<RestaurantIcon />} />
        <Tab
          value="reservations"
          label="Reservations"
          icon={<ReservationIcon />}
        />
      </Tabs>

      {currentTab === "dashboard" && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6">Total Tables</Typography>
              <Typography variant="h4">{tables?.length}</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6">Total Menu Items</Typography>
              <Typography variant="h4">{menu?.length}</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6">Active Reservations</Typography>
              <Typography variant="h4">
                {reservations?.filter((r) => r.status === "Confirmed").length}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      )}

      {currentTab === "tables" && (
        <Card sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog("table")}
            >
              Add Table
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Table Number</TableCell>
                  <TableCell>Capacity</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tables?.map((table) => (
                  <TableRow key={table._id}>
                    <TableCell>{table.table_no}</TableCell>
                    <TableCell>{table.seating_capacity}</TableCell>
                    <TableCell>{table.status}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleOpenDialog("table", table)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete("table", table._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {currentTab === "menu" && (
        <Card sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog("menu")}
            >
              Add Menu Item
            </Button>
          </Box>
          <Grid container spacing={3}>
            {menu?.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Card sx={{ p: 2 }}>
                  {item.picture && (
                    <Box
                      sx={{
                        position: "relative",
                        pt: "56.25%", // 16:9 aspect ratio
                        mb: 2,
                        borderRadius: 1,
                        overflow: "hidden",
                        backgroundColor: "background.paper",
                      }}
                    >
                      <Box
                        component="img"
                        src={item.picture}
                        alt={item.name}
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          transition: "transform 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                        }}
                      />
                    </Box>
                  )}
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    ${item.price}
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}
                  >
                    <IconButton onClick={() => handleOpenDialog("menu", item)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete("menu", item._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Card>
      )}

      {currentTab === "reservations" && (
        <Card sx={{ p: 3 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>In Time</TableCell>
                  <TableCell>Out Time</TableCell>
                  <TableCell>Table</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservations?.map((reservation) => (
                  <TableRow key={reservation._id}>
                    <TableCell>{reservation.customer_name}</TableCell>
                    <TableCell>
                      {formatDate(reservation.check_in_date)}
                    </TableCell>
                    <TableCell>
                      {formatTime(reservation.check_in_time)}
                    </TableCell>
                    <TableCell>
                      {formatTime(reservation.check_out_time)}
                    </TableCell>
                    <TableCell>{reservation.table_no}</TableCell>
                    <TableCell
                      style={{
                        color:
                          reservation.status === "Confirmed"
                            ? "green"
                            : reservation.status === "Cancelled"
                            ? "red"
                            : "black",
                        fontWeight: "bold",
                      }}
                    >
                      {reservation.status}
                    </TableCell>

                    <TableCell>
                      {reservation.status !== "Cancelled" && (
                        <IconButton
                          onClick={() =>
                            handleCancelReservation(reservation._id)
                          }
                          color="warning"
                        >
                          <CancelIcon />
                        </IconButton>
                      )}
                      <IconButton
                        onClick={() =>
                          handleDelete("reservation", reservation._id)
                        }
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedItem ? "Edit" : "Create"} {dialogType}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {dialogType === "table" && (
              <>
                <TextField
                  {...register("table_no", { required: true })}
                  label="Table Number"
                  fullWidth
                  margin="normal"
                  error={!!errors.table_no}
                  helperText={errors.table_no && "Table number is required"}
                />
                <TextField
                  {...register("seating_capacity", { required: true, min: 1 })}
                  label="Capacity"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={!!errors.seating_capacity}
                  helperText={errors.seating_capacity && "Capacity is required"}
                />
                <TextField
                  {...register("status", { required: true })}
                  label="Status"
                  select
                  fullWidth
                  margin="normal"
                  error={!!errors.status}
                  helperText={errors.status && "Status is required"}
                  defaultValue={selectedItem?.status || ""}
                >
                  <MenuItem value="Available">Available</MenuItem>
                  <MenuItem value="Booked">Booked</MenuItem>
                </TextField>
                <Box sx={{ mt: 2 }}>
                  <input
                    {...register("image", { required: false })}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button variant="contained" component="span">
                      Upload Image
                    </Button>
                  </label>
                  {loading && <CircularProgress sx={{ ml: 2 }} size={24} />}
                </Box>
              </>
            )}

            {dialogType === "menu" && (
              <>
                <TextField
                  {...register("name", { required: true })}
                  label="Item Name"
                  fullWidth
                  margin="normal"
                  error={!!errors.name}
                  helperText={errors.name && "Name is required"}
                />
                <TextField
                  {...register("description", { required: true })}
                  label="Description"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={3}
                  error={!!errors.description}
                  helperText={errors.description && "Description is required"}
                />
                <TextField
                  {...register("price", { required: true, min: 0 })}
                  label="Price"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={!!errors.price}
                  helperText={errors.price && "Valid price is required"}
                  inputProps={{
                    step: "0.01",
                  }}
                />
                <TextField
                  {...register("category", { required: true })}
                  label="Category"
                  select
                  fullWidth
                  margin="normal"
                  error={!!errors.category}
                  helperText={errors.category && "Category is required"}
                  defaultValue={selectedItem?.category || ""}
                >
                  <MenuItem value="Entrees">Entrees</MenuItem>
                  <MenuItem value="Appetizers">Appetizers</MenuItem>
                  <MenuItem value="Desserts">Desserts</MenuItem>
                  <MenuItem value="Beverages">Beverages</MenuItem>
                </TextField>
                <Box sx={{ mt: 2 }}>
                  <input
                    {...register("image", { required: false })}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button variant="contained" component="span">
                      Upload Image
                    </Button>
                  </label>
                  {loading && <CircularProgress sx={{ ml: 2 }} size={24} />}
                </Box>
              </>
            )}

            <DialogActions sx={{ mt: 2 }}>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button type="submit" variant="contained">
                {selectedItem ? "Update" : "Create"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default AdminUserProfile;
