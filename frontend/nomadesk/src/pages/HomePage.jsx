import React from "react";
import { Container, AppBar, Toolbar, Typography, Box } from "@mui/material";
import SearchBar from "../components/NavBar";

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", boxShadow: "none", padding: 1 }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ color: "black", fontWeight: "bold" }}>
            nomadDesk - find your next desk
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Centered Search Bar */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <SearchBar />
      </Box>
    </Container>
  );
};

export default HomePage;