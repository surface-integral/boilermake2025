import React from "react";
import RegisterForm from "./components/RegisterForm";
import { CssBaseline, Container, Typography } from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline />
      <Container>
        <Typography variant="h3" align="center" gutterBottom sx={{ mt: 4 }}>
          Welcome to NomadDesk
        </Typography>
        <RegisterForm />
      </Container>
    </>
  );
}

export default App;
