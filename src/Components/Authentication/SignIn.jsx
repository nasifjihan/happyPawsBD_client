import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { alpha, createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { getAuthErrorMessage } from "./authErrors";

const authTheme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32",
      light: "#60ad5e",
      dark: "#005005",
    },
    secondary: {
      main: "#8bc34a",
    },
    background: {
      default: "#f4f9f1",
    },
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

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
    redirectPath,
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
      setError(
        getAuthErrorMessage(error, "Could not sign you in with Google."),
      );
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={authTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          pt: 8,
          background:
            "radial-gradient(circle at top, rgba(139, 195, 74, 0.18), transparent 32%), linear-gradient(180deg, #f7fbf4 0%, #eef7ea 100%)",
        }}
      >
        <Container component="main" maxWidth="sm">
          <Paper
            elevation={0}
            sx={{
              overflow: "hidden",
              border: "1px solid",
              borderColor: alpha(authTheme.palette.primary.main, 0.12),
              boxShadow: "0 24px 60px rgba(46, 125, 50, 0.12)",
            }}
          >
            <Box
              sx={{
                px: { xs: 3, sm: 5 },
                py: { xs: 4, sm: 5 },
                background:
                  "linear-gradient(180deg, rgba(46, 125, 50, 0.08) 0%, rgba(255, 255, 255, 0.98) 38%)",
              }}
            >
              <Stack spacing={3}>
                <Stack spacing={1.5} alignItems="center" textAlign="center">
                  <Chip
                    icon={<SecurityOutlinedIcon />}
                    label="Secure Pet Care Access"
                    color="primary"
                    variant="outlined"
                    sx={{
                      borderRadius: 999,
                      px: 0.75,
                      bgcolor: alpha(authTheme.palette.primary.main, 0.06),
                    }}
                  />

                  <Box>
                    <Typography component="h1" variant="h4" fontWeight={700}>
                      Welcome back
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1, maxWidth: 420 }}
                    >
                      Sign in to manage adoptions, rescue requests, checkout,
                      and your saved pet care activity.
                    </Typography>
                  </Box>
                </Stack>

                {authMessage && <Alert severity="info">{authMessage}</Alert>}

                {error && <Alert severity="error">{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Stack spacing={2.25}>
                    <TextField
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
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailOutlinedIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlinedIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: { xs: "flex-start", sm: "center" },
                        justifyContent: "space-between",
                        gap: 1,
                        flexDirection: { xs: "column", sm: "row" },
                      }}
                    >
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" size="small" />}
                        label="Remember me"
                      />
                      <Link
                        component={RouterLink}
                        to={resetPasswordLink}
                        underline="hover"
                        color="primary.main"
                        fontWeight={600}
                      >
                        Forgot password?
                      </Link>
                    </Box>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      sx={{
                        py: 1.4,
                        fontWeight: 700,
                        textTransform: "none",
                        boxShadow: "0 14px 28px rgba(46, 125, 50, 0.24)",
                        background:
                          "linear-gradient(135deg, #2e7d32 0%, #43a047 100%)",
                      }}
                      disabled={isSubmitting || isGoogleSubmitting}
                    >
                      {isSubmitting ? "Signing In..." : "Sign In"}
                    </Button>

                    <Divider sx={{ color: "text.secondary" }}>
                      or continue with
                    </Divider>

                    <Button
                      fullWidth
                      variant="outlined"
                      size="large"
                      startIcon={<GoogleIcon />}
                      onClick={handleGoogleSignIn}
                      disabled={isSubmitting || isGoogleSubmitting}
                      sx={{
                        py: 1.3,
                        textTransform: "none",
                        fontWeight: 700,
                        borderColor: alpha(authTheme.palette.primary.main, 0.2),
                        bgcolor: "#fff",
                      }}
                    >
                      {isGoogleSubmitting
                        ? "Connecting to Google..."
                        : "Continue with Google"}
                    </Button>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                    >
                      Protected access for your account, orders, and care
                      updates.
                    </Typography>
                  </Stack>
                </Box>

                <Box
                  sx={{
                    pt: 1,
                    borderTop: "1px solid",
                    borderColor: "divider",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    New to Happy Paws?{" "}
                    <Link
                      component={RouterLink}
                      to={signUpLink}
                      underline="hover"
                      color="primary.main"
                      fontWeight={700}
                    >
                      Create an account
                    </Link>
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default SignIn;
