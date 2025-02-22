import React, { useState } from "react";
import { Container, AppBar, Toolbar, Typography, Box } from "@mui/material";
import NavBar from "../components/NavBar";
import LocationRec from "../components/LocationRec";

const HomePage = () => {
  const [recommendations, setRecommendations] = useState([
    "New York, NY",
    "San Francisco, CA",
    "Los Angeles, CA",
    "Chicago, IL",
    "Seattle, WA",
    // null
  ]);

  return (
    <Container maxWidth="lg">
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", boxShadow: "none", padding: 1 }}
      >
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between" }}
        ></Toolbar>
      </AppBar>

      {/* Centered Search Bar */}
      <Box sx={{ display: "flex", justifyContent: "right", mt: 3 }}>
        <NavBar />
      </Box>

      {/* Location Recommendations under Search Bar */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <LocationRec locations={recommendations} />
      </Box>
    </Container>
  );
};

export default HomePage;

