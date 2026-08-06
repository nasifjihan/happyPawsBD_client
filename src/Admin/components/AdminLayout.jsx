import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

import { useAdminAuth } from "../context/AdminAuthContext";
import { adminGetNewRequestCounts } from "../lib/adminApi";
import { useColorMode } from "../../context/ColorModeContext";

const drawerWidth = 260;

const navItems = [
  { label: "Dashboard", to: "/admin" },
  { label: "Shop Items", to: "/admin/catalog/shop-items" },
  { label: "Vet Providers", to: "/admin/catalog/vets" },
  { label: "Programs", to: "/admin/catalog/programs" },
  { label: "Stories", to: "/admin/content/stories" },
  { label: "Blog Posts", to: "/admin/content/blog-posts" },
  { label: "Pet Info Animals", to: "/admin/content/pet-info/animals" },
  { label: "Pet Info Breeds", to: "/admin/content/pet-info/breeds" },
  { label: "Adoptable Animals", to: "/admin/adoption/animals" },
  { label: "Orders", to: "/admin/requests/orders" },
  { label: "Online Consultations", to: "/admin/requests/consultations/online" },
  { label: "In-Person Consultations", to: "/admin/requests/consultations/in-person" },
  { label: "House Call Requests", to: "/admin/requests/consultations/house-calls" },
  { label: "Volunteer Requests", to: "/admin/requests/volunteers" },
  { label: "Adoption Requests", to: "/admin/requests/adoptions" },
  { label: "Reviews", to: "/admin/requests/reviews" },
  { label: "Enrollments", to: "/admin/requests/enrollments" },
  { label: "Lost & Found", to: "/admin/requests/lost-found" },
  { label: "Rescue Alerts", to: "/admin/requests/rescue-alerts" },
  { label: "Settings", to: "/admin/settings" },
];

const newCountsQueryKey = ["admin", "new-counts"];

const AdminLayout = () => {
  const auth = useAdminAuth();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { mode, toggleMode } = useColorMode();

  const { data: newCounts } = useQuery({
    queryKey: newCountsQueryKey,
    queryFn: adminGetNewRequestCounts,
    enabled: auth.isAuthenticated,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });

  const getItemBadgeCount = (to) => {
    if (!newCounts) {
      return 0;
    }

    if (to === "/admin/requests/orders") {
      return newCounts.orders ?? 0;
    }

    if (to === "/admin/requests/consultations/online") {
      return newCounts.onlineConsultations ?? 0;
    }

    if (to === "/admin/requests/consultations/in-person") {
      return newCounts.inPersonConsultations ?? 0;
    }

    if (to === "/admin/requests/consultations/house-calls") {
      return newCounts.houseCalls ?? 0;
    }

    if (to === "/admin/requests/volunteers") {
      return newCounts.volunteers ?? 0;
    }

    if (to === "/admin/requests/adoptions") {
      return newCounts.adoptions ?? 0;
    }

    if (to === "/admin/requests/reviews") {
      return newCounts.reviews ?? 0;
    }

    if (to === "/admin/content/stories") {
      return newCounts.stories ?? 0;
    }

    if (to === "/admin/requests/enrollments") {
      return newCounts.enrollments ?? 0;
    }

    if (to === "/admin/requests/lost-found") {
      return newCounts.lostFound ?? 0;
    }

    if (to === "/admin/requests/rescue-alerts") {
      return newCounts.rescueAlerts ?? 0;
    }

    return 0;
  };

  useEffect(() => {
    if (!auth.isAuthenticated) {
      return;
    }

    queryClient.invalidateQueries({ queryKey: newCountsQueryKey });
  }, [auth.isAuthenticated, location.pathname, queryClient]);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid",
            borderColor: "divider",
          },
        }}
      >
        <Box sx={{ p: 2.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Happy Paws Admin
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Signed in as {auth.username || "admin"}
          </Typography>
        </Box>

        <Divider />

        <List sx={{ px: 1 }}>
          {navItems.map((item) => {
            const badgeCount = getItemBadgeCount(item.to);

            return (
              <ListItemButton
                key={item.to}
                component={Link}
                to={item.to}
                selected={
                  item.to === "/admin"
                    ? location.pathname === "/admin"
                    : location.pathname.startsWith(item.to)
                }
                sx={{
                  borderRadius: 2,
                  my: 0.5,
                  "&.Mui-selected": {
                    backgroundColor: (theme) =>
                      alpha(theme.palette.success.main, 0.14),
                    color: "success.dark",
                  },
                }}
              >
                <ListItemText primary={item.label} />
                {badgeCount > 0 ? (
                  <Chip
                    label={badgeCount}
                    size="small"
                    color="success"
                    sx={{ ml: 1, fontWeight: 800 }}
                  />
                ) : null}
              </ListItemButton>
            );
          })}
        </List>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ p: 2 }}>
          <Button
            variant="outlined"
            color="success"
            fullWidth
            onClick={auth.logout}
          >
            Sign out
          </Button>
        </Box>
      </Drawer>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.9),
            color: "text.primary",
            backdropFilter: "blur(12px)",
          }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {
                navItems.find((item) =>
                  item.to === "/admin"
                    ? location.pathname === "/admin"
                    : location.pathname.startsWith(item.to)
                )?.label || "Admin Panel"
              }
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Tooltip
              title={
                mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              <IconButton
                color="inherit"
                aria-label="Toggle color mode"
                onClick={toggleMode}
              >
                {mode === "dark" ? (
                  <LightModeOutlinedIcon />
                ) : (
                  <DarkModeOutlinedIcon />
                )}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default AdminLayout;
