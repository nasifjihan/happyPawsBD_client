import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";

import { useAdminAuth } from "../context/AdminAuthContext";

const drawerWidth = 260;

const navItems = [
  { label: "Dashboard", to: "/admin" },
  { label: "Shop Items", to: "/admin/catalog/shop-items" },
  { label: "Adoptable Animals", to: "/admin/adoption/animals" },
  { label: "Orders", to: "/admin/requests/orders" },
  { label: "Volunteer Requests", to: "/admin/requests/volunteers" },
  { label: "Adoption Requests", to: "/admin/requests/adoptions" },
  { label: "Enrollments", to: "/admin/requests/enrollments" },
  { label: "Lost & Found", to: "/admin/requests/lost-found" },
  { label: "Settings", to: "/admin/settings" },
];

const AdminLayout = () => {
  const auth = useAdminAuth();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f7fafc" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid rgba(15, 23, 42, 0.12)",
          },
        }}
      >
        <Box sx={{ p: 2.5 }}>
          <Typography variant="h6" fontWeight={800}>
            Happy Paws Admin
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Signed in as {auth.username || "admin"}
          </Typography>
        </Box>

        <Divider />

        <List sx={{ px: 1 }}>
          {navItems.map((item) => (
            <ListItemButton
              key={item.to}
              component={Link}
              to={item.to}
              sx={{ borderRadius: 2, my: 0.5 }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
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
            borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
            backgroundColor: "rgba(255,255,255,0.96)",
            color: "text.primary",
            backdropFilter: "blur(12px)",
          }}
        >
          <Toolbar>
            <Typography variant="h6" fontWeight={800}>
              Admin Panel
            </Typography>
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

