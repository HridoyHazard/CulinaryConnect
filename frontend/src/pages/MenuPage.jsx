import { Box, Typography, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuItem from "../components/MenuCard/MenuItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/carouselStyles.css";
import { useGetMenuQuery } from "../Slice/menuSlice";
const MenuPage = () => {
  const { data: Menu, error, isLoading } = useGetMenuQuery();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Default number of cards shown
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  return (
    <Box id="Menu">
      <Typography className="first-title" variant="h6">
        Menu
      </Typography>
      <Typography className="second-title" variant="h4">
        Discover Our Flavorful Symphony!
      </Typography>
      {
        // Home Page Menu Mapping
        Menu?.length ? (
          Menu.map((item, index) => {
            return (
              <Container key={index} sx={{ padding: 2 }}>
                <Typography component="div" variant="h5" sx={{ padding: 2 }}>
                  {item.section_name}
                </Typography>
                {item.items && item.items.length > 0 ? (
                  <Slider {...sliderSettings}>
                    {item.items.map((menuItem, itemIndex) => (
                      <div key={itemIndex} style={{ padding: "0 10px" }}>
                        <MenuItem item={menuItem} />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <Typography component="p">
                    No items in this section
                  </Typography>
                )}
              </Container>
            );
          })
        ) : (
          <Typography component="p"> No Items</Typography>
        )
      }
    </Box>
  );
};

export default MenuPage;
