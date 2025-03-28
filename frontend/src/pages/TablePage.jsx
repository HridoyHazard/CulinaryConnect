import { Container, Typography, Box, useTheme, keyframes } from "@mui/material";
import React from "react";
import TableLayout from "../components/TableLayout/TableLayout";
import Loader from "../components/Loading/Loading";
import { useGetTablesQuery } from "../Slice/tableSlice";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(0.95); opacity: 0.8; }
  50% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.8; }
`;

const TablePage = () => {
  const theme = useTheme();
  const { data: tables, error, isLoading } = useGetTablesQuery();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 6,
        minHeight: "100vh",
        animation: `${fadeIn} 0.5s ease-out`,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          mb: 8,
          position: "relative",
          "&::after": {
            content: '""',
            display: "block",
            width: "60px",
            height: "4px",
            backgroundColor: theme.palette.primary.main,
            margin: "2rem auto",
            borderRadius: "2px",
          },
        }}
      >
        <Typography className="first-title" variant="h6">
          Table Overview
        </Typography>
        <Typography className="second-title" variant="h4">
          A Culinary Journey Awaits!
        </Typography>
      </Box>

      {tables?.length ? (
        <TableLayout
          table={tables}
          sx={{
            borderRadius: 4,
            border: `1px solid ${theme.palette.divider}`,
            overflow: "hidden",
            background: theme.palette.background.paper,
            boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
            "& .MuiTableCell-root": {
              transition: "background-color 0.2s ease",
            },
            "& .MuiTableRow-root:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            textAlign: "center",
            p: 4,
            borderRadius: 4,
            background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
            boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
            animation: `${pulse} 2s infinite ease-in-out`,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 500,
              mb: 1,
            }}
          >
            All Tables Occupied
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.disabled,
              maxWidth: "400px",
              lineHeight: 1.6,
            }}
          >
            Our tables are currently fully booked. Please check back later or
            contact our host for availability updates.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default TablePage;
