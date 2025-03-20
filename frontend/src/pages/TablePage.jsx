import { Container, Typography } from "@mui/material";
import React from "react";
import TableLayout from "../components/TableLayout/TableLayout";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loading/Loading";
import axios from "axios";
const TablePage = () => {

  const TableData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tables"); // Axios GET request
      console.log(response.data);
      return response.data; // Return the data from the response
    } catch (error) {
      throw new Error("Failed to fetch data: " + error.message); // Handle error if request fails
    }
  };

  const { isLoading, data } = useQuery({
    queryKey: ["table"],
    queryFn: TableData,
  });
  const Table = data || [];

  if (isLoading) return <Loader />;
  return (
    <Container className="Table-page">
      <Typography className="first-title" variant="h6">
        Table Overview
      </Typography>
      <Typography className="second-title" variant="h4">
        A Culinary Journey Awaits!
      </Typography>
      {
        //Table Details  mapping in Layout
        Table.length ? (
          <TableLayout table={Table} />
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

export default TablePage;
