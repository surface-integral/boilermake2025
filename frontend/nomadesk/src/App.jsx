import { React } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider, useAuth } from "./contexts/authContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const auth = useAuth()

  useEffect(() => {
    const get_user = async () => {
      await auth.get_current_user()
    }
    get_user()
  }, [])

  return children
}

function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <Router>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      </ProtectedRoute>
    </AuthProvider>
  );
}

export default App;
