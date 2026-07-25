import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentState from "../Components/Common/ContentState";
import AccountShell from "./AccountShell";
import { useUserAuth } from "../context/UserAuthContext";

const Profile = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const [logoutError, setLogoutError] = useState("");

  if (!user) {
    return (
      <AccountShell
        activeSection="profile"
        title="Profile"
        description="Review your signed-in profile details and account status."
      >
        <ContentState
          title="We could not load your profile"
          description="Please sign in again to view your account information."
          actionLabel="Sign In"
          actionTo="/sign_in"
          severity="warning"
        />
      </AccountShell>
    );
  }

  const displayName = user.displayName || "Happy Paws Member";
  const providerLabel =
    user.providerData[0]?.providerId || "Email and password";

  const handleLogout = async () => {
    try {
      setLogoutError("");
      await logOut();
      navigate("/sign_in");
    } catch (error) {
      setLogoutError("Could not log you out right now. Please try again.");
    }
  };

  return (
    <AccountShell
      activeSection="profile"
      title="Profile"
      description="Your account details, sign-in provider, and verification status all in one place."
    >
      {logoutError ? <Alert severity="error">{logoutError}</Alert> : null}

      <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={3}>
            <Stack alignItems={{ xs: "flex-start", md: "center" }} spacing={2}>
              <Avatar
                sx={{ width: 120, height: 120, fontSize: 40 }}
                alt={displayName}
                src={user.photoURL || undefined}
              >
                {displayName.charAt(0)}
              </Avatar>
            </Stack>
          </Grid>

          <Grid item xs={12} md={9}>
            <Typography variant="h5" fontWeight={800}>
              {displayName}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
              {user.email || "No email address available"}{" "}
              <Chip
                label={
                  user.emailVerified ? "Email Verified" : "Email Not Verified"
                }
                sx={{ ml: 2 }}
                size="small"
                color={user.emailVerified ? "success" : "warning"}
              />
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              UID: {user.uid}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="overline" color="text.secondary">
                Contact
              </Typography>
              <Typography variant="body1">
                {user.phoneNumber || "No phone number added yet"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="overline" color="text.secondary">
                Sign-In Provider
              </Typography>
              <Typography variant="body1">{providerLabel}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="overline" color="text.secondary">
                Display Name
              </Typography>
              <Typography variant="body1">{displayName}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="overline" color="text.secondary">
                Account Status
              </Typography>
              <Typography variant="body1">
                {user.emailVerified
                  ? "Ready to use protected features"
                  : "Please verify your email when possible"}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          sx={{ mt: 3 }}
        >
          Log Out
        </Button>
      </Paper>
    </AccountShell>
  );
};

export default Profile;
