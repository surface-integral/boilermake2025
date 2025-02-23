import React from "react";
import {
  TextField,
  MenuItem,
  Paper,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

const wifiSpeeds = ["Any", "Slow", "Moderate", "Fast"]; //Key Word
const noiseLevels = ["Any", "Quiet", "Moderate", "Loud"];
const budgets = ["Any", "$", "$$", "$$$"];

const NavBar = () => {
  const { logout } = useAuth();

  const navigate = useNavigate(); // Redirect after logout

  const handleLogout = async () => {
    await logout();

    navigate("/login"); // Redirect user to login page
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 3,
        width: "95%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      {/* Title */}
      <Typography variant="h5" fontWeight="bold" fontSize={30}>
        nomadDesk <br></br>
        find your next desk
      </Typography>

      {/* NavBar */}
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: 2,
          borderRadius: 10,
          width: "60%",
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
      {/* Log Out Button */}
      <IconButton
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        sx={{
          backgroundColor: "#ff385c",
          color: "white",
          "&:hover": { backgroundColor: "#e31b54" },
        }}
      >
        <LogoutIcon />
      </IconButton>
    </Box>
  );
};

export default NavBar;

// import React from "react";
// import { TextField, MenuItem, Paper, Box, IconButton } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";

// const wifiSpeeds = ["Any", "Slow", "Moderate", "Fast"];
// const noiseLevels = ["Any", "Quiet", "Moderate", "Loud"];
// const budgets = ["Any", "$", "$$", "$$$"];

// const NavBar = () => {
//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         gap: 20,
//         padding: 2,
//         borderRadius: 10,
//         width: "70%",
//       }}
//     >
//       {/* Wifi Speed */}
//       <TextField select label="Wifi Speed" variant="outlined" fullWidth>
//         {wifiSpeeds.map((option) => (
//           <MenuItem key={option} value={option}>
//             {option}
//           </MenuItem>
//         ))}
//       </TextField>

//       {/* Noise Level */}
//       <TextField select label="Noise Level" variant="outlined" fullWidth>
//         {noiseLevels.map((option) => (
//           <MenuItem key={option} value={option}>
//             {option}
//           </MenuItem>
//         ))}
//       </TextField>

//       {/* Budget */}
//       <TextField select label="Budget" variant="outlined" fullWidth>
//         {budgets.map((option) => (
//           <MenuItem key={option} value={option}>
//             {option}
//           </MenuItem>
//         ))}
//       </TextField>

//       {/* Search Button */}
//       <IconButton
//         sx={{
//           backgroundColor: "#ff385c",
//           color: "white",
//           "&:hover": { backgroundColor: "#e31b54" },
//         }}
//       >
//         <SearchIcon />
//       </IconButton>
//     </Paper>
//   );
// };

// export default NavBar;
