import { Box, Typography, Container } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import MenuItem from "../components/MenuCard/MenuItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/carouselStyles.css";
import { useGetMenuQuery } from "../Slice/menuSlice";

const MenuPage = () => {
  const { data: menuData, error, isLoading } = useGetMenuQuery();
  const [sliderKey, setSliderKey] = useState(0);
  const [groupedData, setGroupedData] = useState({});

  useEffect(() => {
    if (menuData) {
      const grouped = menuData.reduce((acc, item) => {
        const category = item.category;
        acc[category] = acc[category] || [];
        acc[category].push(item);
        return acc;
      }, {});
      setGroupedData(grouped);
      // Force slider remount when data is loaded
      setSliderKey((prev) => prev + 1);
    }
  }, [menuData]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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

      {Object.keys(groupedData).map((category) => (
        <Container
          key={category}
          maxWidth={false} // Remove max-width constraint
          sx={{
            padding: 2,
            "& .slick-slide": {
              padding: "0 10px",
              boxSizing: "border-box",
            },
            "& .slick-list": {
              margin: "0 -10px",
            },
          }}
        >
          <Typography component="div" variant="h5" sx={{ padding: 2 }}>
            {category}
          </Typography>

          {groupedData[category].length > 0 ? (
            // Key now updates when data loads
            <Slider {...sliderSettings} key={`${category}-${sliderKey}`}>
              {groupedData[category].map((menuItem, index) => (
                <div key={index} style={{ padding: "0 10px" }}>
                  <MenuItem item={menuItem} />
                </div>
              ))}
            </Slider>
          ) : (
            <Typography component="p">No items in this section</Typography>
          )}
        </Container>
      ))}
    </Box>
  );
};

export default MenuPage;