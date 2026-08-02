import React from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router";
import { useUserAuth } from "../../context/UserAuthContext";
import { useColorMode } from "../../context/ColorModeContext";
import HPBDLogo from "./../../images/HPBD-Logo.png";

const navSections = [
  {
    key: "pets",
    label: "Pets",
    items: [
      { label: "Pet Info", to: "/pet_info" },
      { label: "Pet Care", to: "/petcare" },
      { label: "Pet Training", to: "/pet_training" },
      { label: "Adoption", to: "/adoption" },
      { label: "Rescue Alert", to: "/rescue_alert" },
      { label: "Lost & Found", to: "/lost_found" },
    ],
  },
  {
    key: "shop",
    label: "Shop",
    matchPaths: ["/shop", "/cart"],
    items: [
      { label: "All Items", to: "/shop" },
      { label: "Food", to: "/shop?category=Food" },
      { label: "Medicine", to: "/shop?category=Medicine" },
      { label: "Accessories", to: "/shop?category=Accessories" },
    ],
  },
  {
    key: "veterinary",
    label: "Veterinary",
    items: [
      { label: "Online Consultation", to: "/online_consultation" },
      { label: "In-Person Consultation", to: "/in_person_consultation" },
      { label: "Vet Finder", to: "/vet_finder" },
      { label: "Nearest Clinic", to: "/vet_finder?mode=nearest" },
      { label: "House Calls", to: "/house_calls" },
      { label: "Health Care Blog", to: "/health_care_blog" },
      { label: "COVID-19 Info", to: "/covid19_info" },
    ],
  },
  {
    key: "getInvolved",
    label: "Get Involved",
    items: [
      { label: "Volunteer", to: "/volunteer" },
      { label: "Make Donation", to: "/make_donation" },
      { label: "Our Success Story", to: "/our_success_story" },
      { label: "Share Your Story", to: "/share_your_story" },
      { label: "Remembrance", to: "/remembrance" },
      { label: "Reviews", to: "/reviews" },
    ],
  },
];

const primaryLinks = [
  { label: "Home", to: "/", matchPaths: ["/", "/home"] },
  { label: "About Us", to: "/about_us", matchPaths: ["/about_us"] },
  { label: "Contact Us", to: "/contact_us", matchPaths: ["/contact_us"] },
];

const accountLinks = [
  { label: "Profile", to: "/profile" },
  { label: "Account", to: "/account" },
  { label: "Dashboard", to: "/dashboard" },
];

const desktopNavRadius = 1.5;
const mobileNavRadius = 1;

const matchesPath = (pathname, paths) =>
  paths.some((path) =>
    path === "/"
      ? pathname === "/" || pathname === "/home"
      : pathname === path || pathname.startsWith(`${path}/`)
  );

const navButtonSx = (active) => ({
  color: active ? "success.main" : "inherit",
  fontWeight: 600,
  borderRadius: desktopNavRadius,
  px: 1.5,
  backgroundColor: active ? "rgba(122, 178, 89, 0.14)" : "transparent",
  "&:hover": {
    backgroundColor: "primary.back",
  },
});

const menuItemSx = {
  textDecoration: "none",
  color: "inherit",
  fontWeight: 600,
  minWidth: 220,
  "&:hover": { backgroundColor: "primary.back" },
};

const Header = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openMenus, setOpenMenus] = React.useState({});
  const [menuAnchors, setMenuAnchors] = React.useState(
    Object.fromEntries(navSections.map((section) => [section.key, null]))
  );
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const drawerWidth = 280;
  const { logOut, user } = useUserAuth();
  const { mode, toggleMode } = useColorMode();
  const navigate = useNavigate();
  const location = useLocation();

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuToggle = (menuKey) => {
    setOpenMenus((prevOpenMenus) => ({
      ...prevOpenMenus,
      [menuKey]: !prevOpenMenus[menuKey],
    }));
  };

  const handleDesktopMenuOpen = (menuKey, event) => {
    setMenuAnchors((prevState) => ({
      ...prevState,
      [menuKey]: event.currentTarget,
    }));
  };

  const handleDesktopMenuClose = (menuKey) => {
    setMenuAnchors((prevState) => ({
      ...prevState,
      [menuKey]: null,
    }));
  };

  const closeMobileDrawer = () => {
    setMobileOpen(false);
  };

  const handleLogout = async () => {
    try {
      handleCloseUserMenu();
      closeMobileDrawer();
      await logOut();
      navigate("/sign_in");
    } catch (error) {
      console.log(error.message);
    }
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 1 }}>
        <Link to="/" onClick={closeMobileDrawer}>
          <img
            src={HPBDLogo}
            alt="Happy Paws BD"
            width={100}
            style={{ cursor: "pointer" }}
          />
        </Link>
      </Typography>

      <Divider />

      <List sx={{ px: 1, py: 1.5 }}>
        {primaryLinks.map((link) => {
          const isActive = matchesPath(location.pathname, link.matchPaths);

          return (
            <ListItem disablePadding key={link.label} onClick={closeMobileDrawer}>
              <ListItemButton
                component={Link}
                to={link.to}
                selected={isActive}
                aria-current={isActive ? "page" : undefined}
                sx={{ borderRadius: mobileNavRadius, mb: 0.5 }}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          );
        })}

        {navSections.map((section) => {
          const isSectionActive = matchesPath(
            location.pathname,
            section.matchPaths || section.items.map((item) => item.to)
          );

          return (
            <Box key={section.key}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleMenuToggle(section.key)}
                  selected={isSectionActive}
                  aria-expanded={Boolean(openMenus[section.key])}
                  aria-controls={`mobile-${section.key}-menu`}
                  sx={{ borderRadius: mobileNavRadius, mb: 0.5 }}
                >
                  <ListItemText primary={section.label} />
                  {openMenus[section.key] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>

              <Collapse
                in={openMenus[section.key]}
                timeout="auto"
                unmountOnExit
              >
                <List id={`mobile-${section.key}-menu`} component="div" disablePadding>
                  {section.items.map((item) => {
                    const isActive =
                      location.pathname === item.to ||
                      location.pathname.startsWith(`${item.to}/`);

                    return (
                      <ListItemButton
                        key={item.to}
                        sx={{
                          pl: 4,
                          borderRadius: mobileNavRadius,
                          mx: 0.5,
                          mb: 0.5,
                        }}
                        component={Link}
                        to={item.to}
                        onClick={closeMobileDrawer}
                        selected={isActive}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    );
                  })}
                </List>
              </Collapse>
            </Box>
          );
        })}

        <Divider sx={{ my: 1.5 }} />

        {user ? (
          <>
            <ListItem sx={{ textAlign: "left", px: 2, py: 1 }}>
              <ListItemText
                primary={user.displayName || "Happy Paws Member"}
                secondary={user.email || "Signed in"}
              />
            </ListItem>

            {accountLinks.map((link) => {
              const isActive = matchesPath(location.pathname, [link.to]);

              return (
                <ListItem
                  disablePadding
                  key={link.to}
                  onClick={closeMobileDrawer}
                >
                  <ListItemButton
                    component={Link}
                    to={link.to}
                    selected={isActive}
                    aria-current={isActive ? "page" : undefined}
                    sx={{ borderRadius: mobileNavRadius, mb: 0.5 }}
                  >
                    <ListItemText primary={link.label} />
                  </ListItemButton>
                </ListItem>
              );
            })}

            <ListItem disablePadding>
              <ListItemButton
                onClick={handleLogout}
                sx={{ borderRadius: mobileNavRadius }}
              >
                <ListItemText primary="Log Out" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding onClick={closeMobileDrawer}>
            <ListItemButton
              component={Link}
              to="/sign_in"
              selected={matchesPath(location.pathname, [
                "/sign_in",
                "/sign_up",
                "/password_reset",
              ])}
              sx={{ borderRadius: mobileNavRadius }}
            >
              <ListItemText primary="Sign In" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box className="myContainer" sx={{ display: "flex" }}>
      <AppBar
        color="default"
        component="nav"
        position="sticky"
        sx={{ backgroundColor: "transparent", boxShadow: "none" }}
      >
        <Toolbar sx={{ gap: 1.5 }}>
          <IconButton
            color="inherit"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component={Link}
            to="/"
            textAlign={{ xs: "center", md: "inherit" }}
            flexGrow={{ xs: "1", md: "0" }}
            sx={{
              color: "inherit",
              textDecoration: "none",
              pt: 1,
              display: "inline-block",
            }}
          >
            <img
              src={HPBDLogo}
              alt="Happy Paws BD"
              width={100}
              style={{ cursor: "pointer" }}
            />
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              mx: 3,
              flexGrow: 1,
              alignItems: "center",
              display: { xs: "none", md: "flex" },
              flexWrap: "wrap",
            }}
          >
            {primaryLinks.slice(0, 1).map((link) => {
              const isActive = matchesPath(location.pathname, link.matchPaths);

              return (
                <Button
                  key={link.to}
                  component={Link}
                  to={link.to}
                  aria-current={isActive ? "page" : undefined}
                  sx={navButtonSx(isActive)}
                >
                  {link.label}
                </Button>
              );
            })}

            {navSections.map((section) => {
              const isSectionActive = matchesPath(
                location.pathname,
                section.matchPaths || section.items.map((item) => item.to)
              );

              return (
                <Button
                  key={section.key}
                  onClick={(event) => handleDesktopMenuOpen(section.key, event)}
                  aria-controls={
                    menuAnchors[section.key] ? `${section.key}-menu` : undefined
                  }
                  aria-expanded={Boolean(menuAnchors[section.key])}
                  aria-haspopup="menu"
                  sx={navButtonSx(isSectionActive)}
                >
                  {section.label}
                  <KeyboardArrowDownIcon sx={{ fontSize: 18 }} />
                </Button>
              );
            })}

            {primaryLinks.slice(1).map((link) => {
              const isActive = matchesPath(location.pathname, link.matchPaths);

              return (
                <Button
                  key={link.to}
                  component={Link}
                  to={link.to}
                  aria-current={isActive ? "page" : undefined}
                  sx={navButtonSx(isActive)}
                >
                  {link.label}
                </Button>
              );
            })}
          </Stack>

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

          {navSections.map((section) => (
            <Menu
              key={section.key}
              id={`${section.key}-menu`}
              anchorEl={menuAnchors[section.key]}
              keepMounted
              open={Boolean(menuAnchors[section.key])}
              onClose={() => handleDesktopMenuClose(section.key)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {section.items.map((item) => {
                const isActive =
                  location.pathname === item.to ||
                  location.pathname.startsWith(`${item.to}/`);

                return (
                  <MenuItem
                    key={item.to}
                    component={Link}
                    to={item.to}
                    onClick={() => handleDesktopMenuClose(section.key)}
                    selected={isActive}
                    aria-current={isActive ? "page" : undefined}
                    sx={menuItemSx}
                  >
                    {item.label}
                  </MenuItem>
                );
              })}
            </Menu>
          ))}

          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip
                title={
                  user.displayName
                    ? `Open account menu for ${user.displayName}`
                    : "Open account menu"
                }
              >
                <IconButton
                  onClick={handleOpenUserMenu}
                  aria-label="Open account menu"
                  aria-controls={anchorElUser ? "user-menu" : undefined}
                  aria-expanded={Boolean(anchorElUser)}
                  aria-haspopup="menu"
                >
                  <Avatar
                    alt={user.displayName || user.email || "Account"}
                    src={user.photoURL || undefined}
                  >
                    {(user.displayName || user.email || "A").charAt(0)}
                  </Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                id="user-menu"
                sx={{ mt: "45px" }}
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  disabled
                  sx={{
                    opacity: 1,
                    pointerEvents: "none",
                    display: "block",
                    maxWidth: 240,
                  }}
                >
                  <Typography variant="subtitle2" fontWeight={700} noWrap>
                    {user.displayName || "Happy Paws Member"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {user.email || "Signed in"}
                  </Typography>
                </MenuItem>

                <Divider />

                {accountLinks.map((link) => {
                  const isActive = matchesPath(location.pathname, [link.to]);

                  return (
                    <MenuItem
                      key={link.to}
                      component={Link}
                      to={link.to}
                      onClick={handleCloseUserMenu}
                      selected={isActive}
                      aria-current={isActive ? "page" : undefined}
                      sx={menuItemSx}
                    >
                      {link.label}
                    </MenuItem>
                  );
                })}

                <MenuItem onClick={handleLogout} sx={menuItemSx}>
                  Log Out
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              component={Link}
              to="/sign_in"
              aria-current={
                matchesPath(location.pathname, [
                  "/sign_in",
                  "/sign_up",
                  "/password_reset",
                ])
                  ? "page"
                  : undefined
              }
              sx={navButtonSx(
                matchesPath(location.pathname, [
                  "/sign_in",
                  "/sign_up",
                  "/password_reset",
                ])
              )}
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          id="mobile-navigation-drawer"
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Header;
