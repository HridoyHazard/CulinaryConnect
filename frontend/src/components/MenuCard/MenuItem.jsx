import { Button, Card, Rating, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import React from "react";
import { addToCart } from "../../Slice/cartSlice";

const MenuItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: "15px",
        width: "280px", // Ensures that the card occupies full width
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "16px",
        minHeight: "450px", // Ensures that the card occupies full height
      }}
      className="MenuSingleCard"
    >
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "8px",
          objectFit: "cover", // Ensures the image scales properly
        }}
      />
      <Typography component="div" variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
        {item.name}
      </Typography>
      <Rating value={4.5} precision={0.5} size="small" sx={{ mt: 1 }} />
      <Typography component="p" sx={{ mt: 1, color: "gray" }}>
        {item.description}
      </Typography>
      <Typography
        className="card-price"
        variant="h6"
        component="div"
        sx={{ mt: 2, fontWeight: "bold" }}
      >
        $ {item.price}
      </Typography>
      <Button
        variant="contained"
        sx={{
          mt: 2,
          width: "80%", // Slightly less than full width for a better look
          mx: "auto", // Centers the button horizontally
          borderRadius: "8px",
          padding: "10px 0", // Padding for button size
          '&:hover': {
            backgroundColor: "#f50057", // Change color on hover
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Add subtle shadow
          },
        }}
        onClick={() => dispatch(addToCart(item))}
      >
        Add to Cart
      </Button>
    </Card>
  );
};

export default MenuItem;
