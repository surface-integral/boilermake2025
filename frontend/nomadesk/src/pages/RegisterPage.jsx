import React from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Link,
  Divider,
} from "@mui/material";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Create an Account
        </Typography>

        <RegisterForm />

        <Divider sx={{ my: 2 }} />

        {/* Link to Login Page */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            Already have an account? <Link href="/login">Login here</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
