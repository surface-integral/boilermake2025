import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from "@mui/material";

const LocationRec = ({ locations }) => {
  return (
    <Box sx={{ width: "100%", marginTop: 2 }}>
      {locations.map((location, index) => (
        <Card
          key={index}
          sx={{
            width: "100%", // Full width
            marginBottom: 2,
            cursor: "pointer",
            "&:hover": { boxShadow: 6 }, // Elevation effect on hover
          }}
          onClick={() => console.log(`Selected location: ${location.name}`)}
        >
          {/* Image */}
          <CardMedia
            sx={{ height: 200 }}
            image={
              location.image || "https://source.unsplash.com/800x600/?city"
            } // Fallback image
            title={location.name}
          />

          {/* Content */}
          <CardContent>
            <Typography gutterBottom variant="h5">
              {location.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {location.description ||
                "Explore the best workspaces in this city."}
            </Typography>
          </CardContent>

          {/* Actions */}
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default LocationRec;
