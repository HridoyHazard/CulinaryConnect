import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Divider,
} from "@mui/material";
import { CheckCircle, Cancel, People } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetTablesQuery } from "../../Slice/tableSlice";
import { selectedTables } from "../../Slice/cartSlice";
import { ta } from "date-fns/locale";
import { set } from "date-fns";

const TableBook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedTable, setSelectedTable] = useState(null);
  const [TableData, setTableData] = useState([]);

  // Fetch tables from API
  const { data: tables, error, isLoading } = useGetTablesQuery();

  const handleTableSelect = (table) => {
    if (table.status.toLowerCase() !== "available") return;

    setTableData(table);

    setSelectedTable(table._id);
  };

  const handleProceed = () => {
    dispatch(selectedTables(TableData));
    navigate("/checkout");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        p: 6,
        backgroundColor: "background.paper",
      }}
    >
      <Typography className="first-title" variant="h6">
        Table
      </Typography>
      <Typography
        className="second-title"
        variant="h4"
        sx={{ margin: "16px 0" }}
      >
        Select Your Table
      </Typography>

      <Grid container spacing={3}>
        {tables?.map((table) => (
          <Grid item xs={12} sm={6} md={4} key={table._id}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                cursor:
                  table.status === "Available" ? "pointer" : "not-allowed",
                border:
                  selectedTable === table._id
                    ? "2px solid #4caf50"
                    : "2px solid transparent",
                opacity: table.status === "booked" ? 0.6 : 1,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform:
                    table.status === "Available" ? "translateY(-5px)" : "none",
                },
              }}
              onClick={() => handleTableSelect(table)}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5" component="div">
                  {table.table_no}
                </Typography>

                {table.status === "Available" ? (
                  <CheckCircle color="success" />
                ) : (
                  <Cancel color="error" />
                )}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <People color="action" />
                <Typography variant="body1">
                  {table.seating_capacity} People
                </Typography>
              </Box>

              <Chip
                label={table.status.toUpperCase()}
                color={table.status === "Available" ? "success" : "error"}
                size="small"
                sx={{ mt: 2 }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="large"
          disabled={!selectedTable}
          onClick={handleProceed}
          sx={{
            px: 6,
            py: 1.5,
            fontSize: "1.1rem",
            borderRadius: 2,
            "&:disabled": {
              backgroundColor: "grey.300",
            },
          }}
        >
          Proceed to Checkout 
        </Button>
      </Box>
    </Box>
  );
};

export default TableBook;
