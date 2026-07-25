import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate, useLocation } from "react-router-dom";
import GoogleButton from "react-google-button";
import { Alert } from "@mui/material";
import { useUserAuth } from "../../context/UserAuthContext";
import { getAuthErrorMessage } from "./authErrors";

const defaultTheme = createTheme();

const SignIn = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const redirectPath =
    new URLSearchParams(location.search).get("redirect") || "/";
  const authMessage = location.state?.authMessage;
  const signUpLink = `/sign_up?redirect=${encodeURIComponent(redirectPath)}`;
  const resetPasswordLink = `/password_reset?redirect=${encodeURIComponent(
    redirectPath
  )}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await logIn(email, password);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(getAuthErrorMessage(err, "Could not sign you in."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setIsGoogleSubmitting(true);
    try {
      await googleSignIn();
      navigate(redirectPath, { replace: true });
    } catch (error) {
      setError(getAuthErrorMessage(error, "Could not sign you in with Google."));
    } finally {
      setIsGoogleSubmitting(false);
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
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          {authMessage && (
            <Alert severity="info" sx={{ width: "100%", mt: 2 }}>
              {authMessage}
            </Alert>
          )}

          {/* Error Alert Msg */}
          {error && (
            <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Sign in to continue to your account and saved actions.
            </Typography>

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

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
              disabled={isSubmitting || isGoogleSubmitting}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
            <hr />
            <Box
              mt={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "rgb(66, 133, 244)",
              }}
            >
              <GoogleButton
                width="390px"
                className="g-btn"
                type="dark"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting || isGoogleSubmitting}
              />
            </Box>

            <Grid container mt={2}>
              <Grid item xs>
                <Link
                  to={resetPasswordLink}
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
                  Forgot password?
                </Link>
              </Grid>

              <Grid item>
                <Link
                  to={signUpLink}
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
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
