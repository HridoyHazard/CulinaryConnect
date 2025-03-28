import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loading/Loading";
import { useGetTableDetailsQuery } from "../Slice/tableSlice";
import { styled } from "@mui/system";

const DetailContainer = styled(Container)({
  padding: "2rem 1rem",
  minHeight: "100vh",
});

const ImageContainer = styled("div")({
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  height: "100%",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

const InfoCard = styled(Card)({
  padding: "2rem",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  "& .MuiTypography-h4": {
    marginBottom: "1.5rem",
    fontWeight: 600,
    color: "#2d3436",
  },
});

const DetailItem = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 0",
  borderBottom: "1px solid #eee",
  "&:last-child": {
    borderBottom: "none",
  },
});

const TableDetail = () => {
  const { id } = useParams();
  const { data: table, error, isLoading } = useGetTableDetailsQuery(id);
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  console.log(table);

  if (isLoading) return <Loader />;

  if (error || !table)
    return (
      <DetailContainer>
        <Typography variant="h5" align="center" color="error">
          {error?.data?.message || "Table not found"}
        </Typography>
      </DetailContainer>
    );

    const handleClick = () => {
      navigate(`/login?redirect=/information`);
    }

  return (
    <DetailContainer maxWidth="lg">
      <Typography
        className="first-title"
        variant="h6"
        sx={{
          mb: 6,
        }}
      >
        Table Details
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ImageContainer>
            <img
              src={table.picture || "/placeholder-table.jpg"}
              alt={`Table ${table.table_no}`}
              loading="lazy"
            />
          </ImageContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <InfoCard>
            <Typography variant="h4" component="h2">
              Table {table.table_no}
            </Typography>

            <Box sx={{ mb: 3 }}>
              <DetailItem>
                <Typography variant="body1">Seating Capacity</Typography>
                <Typography variant="body1" fontWeight="500">
                  {table.seating_capacity} People
                </Typography>
              </DetailItem>

              <DetailItem>
                <Typography variant="body1">Status</Typography>
                <Typography
                  variant="body1"
                  fontWeight="500"
                  sx={{
                    color:
                      table.status === "Available"
                        ? theme.palette.success.main
                        : theme.palette.error.main,
                  }}
                >
                  {table.status}
                </Typography>
              </DetailItem>

              <DetailItem>
                {table.status !== "Available" && (
                  <>
                    <Typography variant="body1">Reserved By</Typography>
                    <Typography
                      variant="body1"
                      fontWeight="500"
                      sx={{
                        color:
                          table.status === "Available"
                            ? theme.palette.success.main
                            : theme.palette.error.main,
                      }}
                    >
                      {table.status === "Available" ? "Not Reserved" : "Others"}
                    </Typography>
                  </>
                )}
              </DetailItem>
            </Box>

            {table.status === "Available" && (
              <Button
                onClick={handleClick}
                variant="contained"
                color="primary"
                size="large"
                fullWidth={isMobile}
                sx={{
                  py: 1.5,
                  fontSize: "1.1rem",
                  borderRadius: "12px",
                }}
              >
                Book This Table
              </Button>
            )}
          </InfoCard>
        </Grid>
      </Grid>
    </DetailContainer>
  );
};

export default TableDetail;
