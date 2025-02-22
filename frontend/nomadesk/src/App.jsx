import { React } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { AuthProvider, useAuth } from "./contexts/authContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();

  useEffect(() => {
    const get_user = async () => {
      await auth.get_current_user();
    };
    get_user();
  }, []);

  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ProtectedRoute>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </ProtectedRoute>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
