import React from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Link,
  Divider,
} from "@mui/material";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Login to Your Account
        </Typography>

        <LoginForm />

        <Divider sx={{ my: 2 }} />

        {/* Link to Register Page */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            Don't have an account? <Link href="/">Register here</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
