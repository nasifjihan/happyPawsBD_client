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

const defaultTheme = createTheme();

const SignIn = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const redirectPath =
    new URLSearchParams(location.search).get("redirect") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate(redirectPath);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate(redirectPath);
    } catch (error) {
      setError(error.message);
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

          {/* Error Alert Msg */}
          {error && <Alert severity="error">{error}</Alert>}

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            >
              Sign In
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
              />
            </Box>

            <Grid container mt={2}>
              <Grid item xs>
                <Link
                  to="/password_reset"
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
                  to="/sign_up"
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
