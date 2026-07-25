import { Alert, Grid, Paper, Stack, Typography } from "@mui/material";
import ContentState from "../Components/Common/ContentState";
import AccountShell from "./AccountShell";
import { useUserAuth } from "../context/UserAuthContext";

const Account = () => {
  const { user } = useUserAuth();

  if (!user) {
    return (
      <AccountShell
        activeSection="account"
        title="Account"
        description="Manage your sign-in details and account readiness."
      >
        <ContentState
          title="We could not load your account"
          description="Please sign in again to manage your account settings."
          actionLabel="Sign In"
          actionTo="/sign_in"
          severity="warning"
        />
      </AccountShell>
    );
  }

  const providers = user.providerData.length
    ? user.providerData.map((provider) => provider.providerId).join(", ")
    : "Email and password";

  return (
    <AccountShell
      activeSection="account"
      title="Account"
      description="A clearer view of your current sign-in setup and the next steps available to you."
    >
      {!user.emailVerified ? (
        <Alert severity="warning">
          Your email address is not verified yet. Some trust-sensitive actions may
          work more smoothly after verification.
        </Alert>
      ) : null}

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: "100%" }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Sign-In Details
            </Typography>
            <Stack spacing={1.5}>
              <BoxRow label="Email" value={user.email || "Not available"} />
              <BoxRow
                label="Verification"
                value={user.emailVerified ? "Verified" : "Not verified"}
              />
              <BoxRow label="Providers" value={providers} />
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: "100%" }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Quick Actions
            </Typography>
            <Stack spacing={1.5}>
              <Typography variant="body2" color="text.secondary">
                Need to update how you sign in?
              </Typography>
              <ContentState
                title="Password Help"
                description="Use the password reset flow if you want to refresh your login credentials."
                actionLabel="Reset Password"
                actionTo="/password_reset"
                severity="info"
              />
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              What This Area Covers
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body1">
                Profile gives you a quick identity summary and logout access.
              </Typography>
              <Typography variant="body1">
                Dashboard brings together the main signed-in journeys across adoption,
                lost and found, and shopping.
              </Typography>
              <Typography variant="body1">
                This account page focuses on sign-in readiness and recovery actions.
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </AccountShell>
  );
};

const BoxRow = ({ label, value }) => (
  <div>
    <Typography variant="overline" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body1">{value}</Typography>
  </div>
);

export default Account;
