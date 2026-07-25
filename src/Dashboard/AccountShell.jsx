import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const navItems = [
  { label: "Profile", to: "/profile", key: "profile" },
  { label: "Account", to: "/account", key: "account" },
  { label: "Dashboard", to: "/dashboard", key: "dashboard" },
];

const AccountShell = ({ activeSection, title, description, children }) => {
  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 3, md: 5 } }}>
      <Paper elevation={2} sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 4 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4" fontWeight={800} gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {description}
            </Typography>
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            {navItems.map((item) => (
              <Button
                key={item.key}
                component={RouterLink}
                to={item.to}
                variant={activeSection === item.key ? "contained" : "outlined"}
                color={activeSection === item.key ? "success" : "inherit"}
              >
                {item.label}
              </Button>
            ))}
          </Stack>

          {children}
        </Stack>
      </Paper>
    </Container>
  );
};

export default AccountShell;
