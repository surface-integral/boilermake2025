import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  TextField,
  MenuItem,
  Paper,
  Box,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

const places = [
  "corporate_office",
  "library",
  "university",
  "internet_cafe",
  "community_center",
  "convention_center",
  "event_venue",
  "acai_shop",
  "pub",
  "coffe_shop",
  "cafe",
  "bar",
  "juice_shop",
  "bagel_shop",
  "tea_house",
  "food_court",
  "ski_resort",
];

const ITEM_HEIGHT = 48;

const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,

      width: 350,
    },
  },
};

const NavBar = ({ setLocations }) => {
  const theme = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [distance, setDistance] = useState("");
  const [googlePlaces, setGooglePlaces] = useState([]);

  //handle multiple selection

  const handlePlaceChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedPlaces(typeof value === "string" ? value.split(",") : value);
    console.log("handlePlaceChange:", selectedPlaces);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  //handles the search and sends a POST request to the backend
  const handleSearch = async () => {
    if (selectedPlaces.length === 0) {
      alert("Please select at least one place type.");
      console.log("selectedPlaces 1:", selectedPlaces);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/search/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          includedTypes: selectedPlaces, //send selected places in request body
          radius: distance || 500,
          lat: 34.1662801,
          long: -118.1766523,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setGooglePlaces(data.places); //set locations in state for display
        console.log("selectedPlaces data1 success:", data.places);
      } else {
        console.error("Search failed:", data);
        console.log("selectedPlaces data1 failed:", data);
      }
      console.log("Google places", googlePlaces);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  return (
    <>
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
          nomadDesk <br />
          find your next desk
        </Typography>

        {/* Search Bar */}

        <Paper
          elevation={3}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            padding: 2,
            borderRadius: 10,
            width: "70%",
          }}
        >
          {/* Places Dropdown (90%) */}
          <FormControl sx={{ flex: 9 }}>
            <InputLabel id="places-chip-label">Places</InputLabel>

            <Select
              labelId="places-chip-label"
              id="places-chip"
              multiple
              value={selectedPlaces}
              onChange={handlePlaceChange}
              input={<OutlinedInput id="select-multiple-chip" label="Places" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {places.map((place) => (
                <MenuItem
                  key={place}
                  value={place}
                  style={{ fontWeight: theme.typography.fontWeightRegular }}
                >
                  {place}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Distance Text Field (10%) */}
          <TextField
            label="Distance"
            variant="outlined"
            sx={{ flex: 1 }}
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="e.g., 10 km"
          />

          {/* Search Button */}
          <IconButton
            onClick={handleSearch}
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

      <Box sx={{ width: "100%", marginTop: 2 }}>
        {googlePlaces.length > 0 ? (
          googlePlaces.map((location, index) => (
            <Card
              key={index}
              sx={{
                width: "100%", // Full width
                marginBottom: 2,
                cursor: "pointer",
                "&:hover": { boxShadow: 6 }, // Elevation effect on hover
              }}
            >
              {/* Image */}
              <CardMedia
                sx={{ height: 200 }}
                image={"https://source.unsplash.com/800x600/?city"} // Fallback image
                title={location.displayName?.text ?? "No name found"}
              />

              {/* Content */}
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {location.displayName?.text ?? "No name found"}
                </Typography>
                {location.types.map((type, index) => (
                  <Typography variant="body2" color="text.secondary">
                    {type}
                  </Typography>
                ))}
                <Typography>
                  {location.formattedAddress ?? "No address available"}
                </Typography>
                <Typography>
                  {`Start Price: ${
                    location.priceRange?.startPrice?.units ?? "N/A"
                  } 
                  ${location.priceRange?.startPrice?.currencyCode ?? ""}`}
                </Typography>
                <Typography>
                  {`End Price: ${location.priceRange?.endPrice?.units ?? "N/A"} 
                  ${location.priceRange?.endPrice?.currencyCode ?? ""}`}
                </Typography>
              </CardContent>

              {/* Actions */}
              <CardActions>
                <Button size="small">
                  {location.websiteUri ? <a href={location.websiteUri}></a> : <></>}
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};

export default NavBar;
