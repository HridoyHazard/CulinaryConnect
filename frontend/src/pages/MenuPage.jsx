import { Box, Typography, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuItem from "../components/MenuCard/MenuItem";
import axios from "axios";
const MenuPage = () => {
  const [Menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/menus");
        setMenu(response.data);
      } catch (error) {
        console.log("Failed to fetch menu data: " + error.message);
      }
    };
    fetchMenu();
  }, []);

  console.log(Menu);

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
        Menu.length ? (
          Menu.map((item, index) => {
            return (
              <Container key={index} sx={{ padding: 2 }}>
                <Typography component="div" variant="h5" sx={{ padding: 2 }}>
                  {item.section_name}
                </Typography>
                <div className="MenuSingleContainer">
                  {item.items &&
                    item.items.map((menuItem, index) => (
                      <MenuItem key={index} item={menuItem} />
                    ))}
                </div>
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
