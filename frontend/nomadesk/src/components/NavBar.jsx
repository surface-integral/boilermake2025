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
import useGeolocation from "../hooks/useGeoLocation";
import { httpPost } from "../utils/utils";

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
  const {location} = useGeolocation()

  //handle multiple selection

  const handlePlaceChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedPlaces(typeof value === "string" ? value.split(",") : value);
    console.log("handlePlaceChange:", selectedPlaces);
    console.log(location.latitude, location.longitude)
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
          radius: distance || 5000,
          lat: location.latitude,
          long: location.longitude
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

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      paddingTop: "200px", width: "100%", marginTop: 2 }}>
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
                image={"https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg"} // Fallback image
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
                  {`User Ratings: ${location.rating ?? "N/A"}`}
                </Typography>
                <Typography>
                  {`Cheapest Price: ${
                    location.priceRange?.startPrice?.units ?? "N/A"
                  } 
                  ${location.priceRange?.startPrice?.currencyCode ?? ""}`}
                </Typography>
                <Typography>
                  {`Most expensive Price: ${location.priceRange?.endPrice?.units ?? "N/A"} 
                  ${location.priceRange?.endPrice?.currencyCode ?? ""}`}
                </Typography>
              </CardContent>

              {/* Actions */}
              <CardActions>
                {location.websiteUri &&
                <Button 
                component="a"
                href={location.websiteUri}
                target="_blank"
                rel="noopener noreferrer"
                size="small">
                  Visit Website
                </Button>}
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
