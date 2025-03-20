import { Button, Card, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../components/TableLayout/tablelayout.css";
import Loader from "../components/Loading/Loading";
import axios from "axios";

const TableDetail = () => {
  // url to getting Table Id
  let { id } = useParams();

  const [table, setTable] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the table data using Axios
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        // Make the GET request to fetch table data by ID
        const response = await axios.get(
          `http://localhost:5000/api/tables/${id}`
        );
        setTable(response.data); // Set the fetched table data
        setIsLoading(false); // Set loading state to false
      } catch (err) {
        setError("Failed to fetch table data"); // Set error state if request fails
        setIsLoading(false); // Set loading state to false
      }
    };

    fetchTableData();
  }, [id]);

  return (
    <Container
      className="Table-Detail"
      style={{
        backgroundImage: `url(${table?.picture || ""})`,
        height: "550px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "80%",
        backgroundPositionY: "100px",
      }}
    >
      <Typography className="first-title" variant="h6">
        Table
      </Typography>
      <Typography className="second-title" variant="h4">
        Discover Our Flavorful Symphony!
      </Typography>
      {isLoading && <Loader />}
      {
        // Filterd Data Mapping
        table ? (
          <Card variant="outlined" className="table-detail-card">
            <Typography component="div" align="center" padding={2} variant="h5">
              Table Overview
            </Typography>
            <Typography component="p">Table No : {table.table_no}</Typography>
            <Typography component="p">
              Seat Count : {table.seating_capacity}
            </Typography>
            <Typography component="p">Status : {table.status}</Typography>
            <Typography component="p">
              Reserved : {table.reservation?.name || " NA "}
            </Typography>
            {
              // checking Table is available or booked
              table.status === "Available" && (
                <Typography component="div">
                  <Link to="/booking">
                    <Button color="error" variant="outlined">
                      Book Now
                    </Button>
                  </Link>
                </Typography>
              )
            }
          </Card>
        ) : (
          <Typography
            sx={{
              textAlign: "center",
              color: "lightgray",
              fontSize: "30px",
              padding: "40px 0",
            }}
            component="p"
          >
            {" "}
            No Tables Available
          </Typography>
        )
      }
    </Container>
  );
};

export default TableDetail;
