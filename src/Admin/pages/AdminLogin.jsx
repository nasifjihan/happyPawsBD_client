import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useAdminAuth } from "../context/AdminAuthContext";
import { AdminAuthProvider } from "../context/AdminAuthContext";

const AdminLoginForm = () => {
  const auth = useAdminAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin";

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await auth.login(form);
      navigate(redirect, { replace: true });
    } catch (loginError) {
      setError(
        loginError?.response?.data?.message || "Invalid admin credentials.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at 0% 0%, rgba(122,178,89,0.18) 0%, rgba(255,255,255,1) 48%, rgba(251,208,98,0.12) 100%)",
        px: 2,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 420 }}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={2.5}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ fontWeight: 900 }}>
                Admin Login
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Sign in to manage items and requests.
              </Typography>
            </Box>

            {error ? <Alert severity="error">{error}</Alert> : null}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={2}>
                <TextField
                  label="Username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                />
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  disabled={isSubmitting}
                  sx={{ py: 1.25, fontWeight: 800 }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={22} color="inherit" />
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

const AdminLogin = () => (
  <AdminAuthProvider>
    <AdminLoginForm />
  </AdminAuthProvider>
);

export default AdminLogin;
