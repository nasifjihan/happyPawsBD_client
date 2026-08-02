import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";
import ContentState from "../Components/Common/ContentState";
import AccountShell from "./AccountShell";
import { useCart } from "../context/CartContext";
import { useUserAuth } from "../context/UserAuthContext";

const Dashboard = () => {
  const { user } = useUserAuth();
  const { cartItemsCount } = useCart();

  if (!user) {
    return (
      <AccountShell
        activeSection="dashboard"
        title="Dashboard"
        description="Your signed-in shortcuts and activity overview."
      >
        <ContentState
          title="We could not load your dashboard"
          description="Please sign in again to access your saved journeys."
          actionLabel="Sign In"
          actionTo="/sign_in"
          severity="warning"
        />
      </AccountShell>
    );
  }

  const cards = [
    {
      title: "Profile",
      description: "Review your personal details, provider, and verification status.",
      actionLabel: "Open Profile",
      actionTo: "/profile",
    },
    {
      title: "Adoption Journey",
      description: "Browse adoptable pets and continue protected adoption flows.",
      actionLabel: "Explore Adoption",
      actionTo: "/adoption/adoptable_pets",
    },
    {
      title: "Lost & Found",
      description: "Report a lost or found pet and access the protected submission forms.",
      actionLabel: "Open Lost & Found",
      actionTo: "/lost_found",
    },
    {
      title: "Orders",
      description: "Review your recent checkout statuses and delivery details.",
      actionLabel: "View Orders",
      actionTo: "/orders",
    },
    {
      title: "Shopping Cart",
      description: `${cartItemsCount} item${cartItemsCount === 1 ? "" : "s"} currently in your cart.`,
      actionLabel: cartItemsCount ? "Go to Cart" : "Browse Shop",
      actionTo: cartItemsCount ? "/cart" : "/shop",
    },
  ];

  return (
    <AccountShell
      activeSection="dashboard"
      title="Dashboard"
      description="A simple control center for the most important signed-in actions across Happy Paws BD."
    >
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          Welcome back{user.displayName ? `, ${user.displayName}` : ""}.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Use these shortcuts to jump back into adoption, rescue support, account
          management, or checkout without hunting through the full site navigation.
        </Typography>
      </Paper>

      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid item xs={12} md={6} key={card.title}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: "100%" }}>
              <Stack spacing={2} height="100%">
                <Typography variant="h6" fontWeight={700}>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                  {card.description}
                </Typography>
                <Button
                  component={RouterLink}
                  to={card.actionTo}
                  variant="contained"
                  color="success"
                >
                  {card.actionLabel}
                </Button>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </AccountShell>
  );
};

export default Dashboard;
