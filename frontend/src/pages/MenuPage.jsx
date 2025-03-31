import { Box, Typography, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
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
      setSliderKey((prev) => prev + 1); // Force slider remount
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
    <Box
      id="Menu"
      sx={{ backgroundColor: "#f9f9f9", paddingTop: 4, paddingBottom: 6 }}
    >
      <Container maxWidth="lg">
        <Typography className="first-title" variant="h6">
          Menu
        </Typography>
        <Typography className="second-title" variant="h4">
          Discover Our Flavorful Symphony!
        </Typography>

        {Object.keys(groupedData).map((category) => (
          <Box key={category} sx={{ marginBottom: 6 }}>
            <Typography
              component="div"
              variant="h5"
              sx={{ padding: 2, fontWeight: "bold" }}
            >
              {category}
            </Typography>

            {groupedData[category].length > 0 ? (
              <Slider {...sliderSettings} key={`${category}-${sliderKey}`}>
                {groupedData[category].map((menuItem, index) => (
                  <Box key={index} sx={{ padding: "0 10px" }}>
                    <MenuItem item={menuItem} />
                  </Box>
                ))}
              </Slider>
            ) : (
              <Typography
                component="p"
                sx={{ textAlign: "center", color: "#888" }}
              >
                No items in this section
              </Typography>
            )}
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default MenuPage;
