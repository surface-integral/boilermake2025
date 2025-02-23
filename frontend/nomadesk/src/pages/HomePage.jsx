import React, { useState } from "react";
import { Container } from "@mui/material";
import NavBar from "../components/NavBar";
import LocationRec from "../components/LocationRec";

const HomePage = () => {
  const [locations, setLocations] = useState([]); //store search results

  return (
    <Container maxWidth="lg">
      <NavBar setLocations={setLocations} />
      <LocationRec locations={locations} />
    </Container>
  );
};

export default HomePage;