import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Paper,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const auth = useAuth();
  const navigate = useNavigate(); // Initialize navigation hook
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      // const response = await fetch("http://localhost:3000/api/login/", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(loginData),
      // });
      const response = await auth.login(loginData.email, loginData.password);
      console.log("response:", response);
      // const data = await response.json();
      // console.log("data:", data);

      if (response) {
        setMessage({ type: "success", text: "Login successful!" });
        navigate("/home");
        // <Link href="/">Register here</Link>;
      } else {
        setMessage({ type: "error", text: data.message || "Login failed" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error connecting to server." });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: "center" }}>
        {/* <Typography variant="h5" gutterBottom>
          Login to Your Account
        </Typography> */}

        {message && (
          <Alert severity={message.type} sx={{ mb: 2 }}>
            {message.text}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Email"
            name="email"
            type="email"
            value={loginData.email}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={loginData.password}
            onChange={handleChange}
            required
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;
