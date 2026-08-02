import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import { alpha, useTheme } from "@mui/material/styles";
import { Link as RouterLink, useLocation, useNavigate } from "react-router";
import { useUserAuth } from "../../context/UserAuthContext";
import { getAuthErrorMessage } from "./authErrors";

const SignUp = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp } = useUserAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const redirectPath =
    new URLSearchParams(location.search).get("redirect") || "/";
  const signInLink = `/sign_in?redirect=${encodeURIComponent(redirectPath)}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await signUp(email, password);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(getAuthErrorMessage(err, "Could not create your account."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const pageBackground =
    theme.palette.mode === "dark"
      ? `radial-gradient(circle at top, ${alpha(theme.palette.success.main, 0.22)}, transparent 36%), linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`
      : "radial-gradient(circle at top, rgba(139, 195, 74, 0.18), transparent 30%), linear-gradient(180deg, #f7fbf4 0%, #eef7ea 100%)";

  const cardBackground =
    theme.palette.mode === "dark"
      ? `linear-gradient(180deg, ${alpha(theme.palette.success.main, 0.16)} 0%, ${alpha(theme.palette.background.paper, 0.98)} 42%)`
      : "linear-gradient(180deg, rgba(46, 125, 50, 0.08) 0%, rgba(255, 255, 255, 0.98) 38%)";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        pt: 8,
        background: pageBackground,
      }}
    >
      <Container component="main" maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            overflow: "hidden",
            border: "1px solid",
            borderColor: alpha(theme.palette.primary.main, 0.2),
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 24px 60px rgba(0, 0, 0, 0.45)"
                : "0 24px 60px rgba(46, 125, 50, 0.12)",
          }}
        >
          <Box
            sx={{
              px: { xs: 3, sm: 5 },
              py: { xs: 4, sm: 5 },
              background: cardBackground,
            }}
          >
            <Stack spacing={3}>
              <Stack spacing={1.5} alignItems="center" textAlign="center">
                <Chip
                  icon={<PetsOutlinedIcon />}
                  label="Join Happy Paws"
                  color="primary"
                  variant="outlined"
                  sx={{
                    borderRadius: 999,
                    px: 0.75,
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                  }}
                />

                  <Box>
                    <Typography component="h1" variant="h4" fontWeight={700}>
                      Create your account
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1, maxWidth: 460 }}
                    >
                      Get started with adoptions, rescue support, checkout, and
                      personalized pet care updates in one place.
                    </Typography>
                  </Box>
                </Stack>

                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  flexWrap="wrap"
                  justifyContent="center"
                >
                  <Chip
                    size="small"
                    icon={<CheckCircleOutlineIcon />}
                    label="Faster checkout"
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                    }}
                  />
                  <Chip
                    size="small"
                    icon={<CheckCircleOutlineIcon />}
                    label="Adoption-ready access"
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                    }}
                  />
                  <Chip
                    size="small"
                    icon={<CheckCircleOutlineIcon />}
                    label="Rescue updates"
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                    }}
                  />
                </Stack>

                {error && <Alert severity="error">{error}</Alert>}

                <Box component="form" noValidate onSubmit={handleSubmit}>
                  <Stack spacing={2.25}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      type="email"
                      autoComplete="email"
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
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      helperText="Use a strong password with at least 6 characters."
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlinedIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />

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
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Creating Account..." : "Create Account"}
                    </Button>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="center"
                    >
                      By continuing, you are setting up your Happy Paws account
                      for secure pet care access.
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
                    Already have an account?{" "}
                    <Link
                      component={RouterLink}
                      to={signInLink}
                      underline="hover"
                      color="primary.main"
                      fontWeight={700}
                    >
                      Sign in
                    </Link>
                  </Typography>
                </Box>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUp;
