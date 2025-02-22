import React from "react";
import { TextField, MenuItem, Paper, Box, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const wifiSpeeds = ["Any", "Slow", "Moderate", "Fast"];
const noiseLevels = ["Any", "Quiet", "Moderate", "Loud"];
const budgets = ["Any", "$", "$$", "$$$"];

const NavBar = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: 2,
        borderRadius: 10,
        width: "70%",
      }}
    >
      {/* Wifi Speed */}
      <TextField select label="Wifi Speed" variant="outlined" fullWidth>
        {wifiSpeeds.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      {/* Noise Level */}
      <TextField select label="Noise Level" variant="outlined" fullWidth>
        {noiseLevels.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      {/* Budget */}
      <TextField select label="Budget" variant="outlined" fullWidth>
        {budgets.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      {/* Search Button */}
      <IconButton
        sx={{
          backgroundColor: "#ff385c",
          color: "white",
          "&:hover": { backgroundColor: "#e31b54" },
        }}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default NavBar;
