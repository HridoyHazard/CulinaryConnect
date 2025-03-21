import { Button, Card, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../components/TableLayout/tablelayout.css";
import Loader from "../components/Loading/Loading";
import axios from "axios";

import { useGetTableDetailsQuery } from "../Slice/tableSlice";

const TableDetail = () => {
  // url to getting Table Id
  let { id } = useParams();

  // Fetching Table Data
  const { data: table, error, isLoading } = useGetTableDetailsQuery(id);

  console.log("Table", table);
  console.log("Error", error);

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
