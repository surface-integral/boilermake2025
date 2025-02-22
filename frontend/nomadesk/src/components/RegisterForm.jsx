import React, { useState } from "react";
import { Alert } from "@mui/material"; // Import MUI Alert

import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
} from "@mui/material";

const RegisterForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(""); //success or error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("User Data:", formData);
    setMessage(null); //reset message
    // if (onRegister) onRegister(formData);
    // setFormData({
    //   username: "",
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   password: "",
    // });
    try {
      console.log("formData:", formData);
    //   const response = await httpPost(
    //     "http://localhost:3000/api/register/",
    //     formData
    //   );
        const response = await fetch("http://localhost:3000/api/register/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

      const data = await response.text();

      console.log("data:", data);
      if (response.ok) {
        setMessage({ type: "success", text: "Registration Successful!" });
      } else {
        setMessage({ type: "error", text: data || "Registration Failed" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error connecting to the server." });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: "center" }}>
        {/* <Typography variant="h5" gutterBottom>
          Create an Account
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
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
    
  );
};

export default RegisterForm;
