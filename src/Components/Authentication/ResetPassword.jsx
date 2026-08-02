import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert } from "@mui/material";
import { Link, useLocation } from "react-router";
import { useUserAuth } from "../../context/UserAuthContext";
import { getAuthErrorMessage } from "./authErrors";

const defaultTheme = createTheme();

const ResetPassword = () => {
  const { resetPassword } = useUserAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const redirectPath =
    new URLSearchParams(location.search).get("redirect") || "/";
  const signInLink = `/sign_in?redirect=${encodeURIComponent(redirectPath)}`;

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      await resetPassword(email);
      setMessage("A reset link has been sent to your email.");
    } catch (err) {
      setError(getAuthErrorMessage(err, "Failed to send reset link."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockResetOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{ mt: 1 }}
          >
            Enter the email for your account and we&apos;ll send you a reset
            link.
          </Typography>

          {/* Success or Error Message */}
          {message && (
            <Alert severity="success" sx={{ width: "100%", mt: 2 }}>
              {message}
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleResetPassword}
            noValidate
            sx={{ mt: 3 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending Reset Link..." : "Send Reset Link"}
            </Button>

            <Link
              to={signInLink}
              style={{
                margin: "0",
                textDecoration: "underline",
                color: "#1976d2",
                fontFamily: "Roboto",
                fontWeight: "400",
                fontSize: "0.875rem",
                lineHeight: "1.43",
                letterSpacing: "0.01071em",
              }}
            >
              Back to sign in
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ResetPassword;
