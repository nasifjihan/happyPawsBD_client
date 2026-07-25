import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Stack, Collapse } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import HPBDLogo from "./../../images/HPBD-Logo.png";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const Header2 = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openMenus, setOpenMenus] = React.useState({});

  // Copied
  const [menu1AnchorEl, setMenu1AnchorEl] = React.useState(null);
  const [menu3AnchorEl, setMenu3AnchorEl] = React.useState(null);
  const [menu4AnchorEl, setMenu4AnchorEl] = React.useState(null);

  const drawerWidth = 200;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleMenuToggle = (menu) => {
    setOpenMenus((prevOpenMenus) => ({
      ...prevOpenMenus,
      [menu]: !prevOpenMenus[menu],
    }));
  };

  // Copied
  // Full View Menu Nested Item Controller ----------------------------
  const handleMenu1Click = (event) => {
    setMenu1AnchorEl(event.currentTarget);
  };

  const handleMenu1Close = () => {
    setMenu1AnchorEl(null);
  };

  const handleMenu3Click = (event) => {
    setMenu3AnchorEl(event.currentTarget);
  };

  const handleMenu3Close = () => {
    setMenu3AnchorEl(null);
  };

  const handleMenu4Click = (event) => {
    setMenu4AnchorEl(event.currentTarget);
  };

  const handleMenu4Close = () => {
    setMenu4AnchorEl(null);
  };

  // LogOut
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      handleCloseUserMenu();
      setMobileOpen(false);
      await logOut();
      navigate("/sign_in");
    } catch (error) {
      console.log(error.message);
    }
  };

  const drawer = (
    <Box
      // onClick={handleDrawerToggle}
      sx={{ textAlign: "center" }}
    >
      <Typography variant="h6" sx={{ my: 1 }}>
        <Link to="/">
          <img
            src={HPBDLogo}
            alt="Happy Paws BD"
            width={100}
            style={{ cursor: "pointer" }}
          />
        </Link>
      </Typography>

      <Divider />
      <List>
        <ListItem disablePadding onClick={handleDrawerToggle}>
          <ListItemButton component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleMenuToggle("pets")}
            aria-expanded={Boolean(openMenus.pets)}
            aria-controls="mobile-pets-menu"
          >
            <ListItemText primary="Pets" />
            {openMenus.pets ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openMenus.pets} timeout="auto" unmountOnExit>
          <List
            id="mobile-pets-menu"
            component="div"
            disablePadding
            onClick={handleDrawerToggle}
          >
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/pet_info">
              <ListItemText primary="Pet Info" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }} component={Link} to="/petcare">
              <ListItemText primary="Pet Care" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }} component={Link} to="/pet_training">
              <ListItemText primary="Pet Training" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }} component={Link} to="/adoption">
              <ListItemText primary="Adoption" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }} component={Link} to="/rescue_alert">
              <ListItemText primary="Rescue Alert" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }} component={Link} to="/lost_found">
              <ListItemText primary="Lost & Found" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItem disablePadding onClick={handleDrawerToggle}>
          <ListItemButton component={Link} to="/shop">
            <ListItemText primary="Shop" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleMenuToggle("veterinary")}
            aria-expanded={Boolean(openMenus.veterinary)}
            aria-controls="mobile-veterinary-menu"
          >
            <ListItemText primary="Veterinary" />
            {openMenus.veterinary ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openMenus.veterinary} timeout="auto" unmountOnExit>
          <List
            id="mobile-veterinary-menu"
            component="div"
            disablePadding
            onClick={handleDrawerToggle}
          >
            <ListItemButton
              sx={{ pl: 4 }}
              component={Link}
              to="/online_consultation"
            >
              <ListItemText primary="Online Consultation" />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              component={Link}
              to="/in_person_consultation"
            >
              <ListItemText primary="In-Person Consultation" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }} component={Link} to="/vet_finder">
              <ListItemText primary="Vet Finder" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }} component={Link} to="/house_calls">
              <ListItemText primary="House Calls" />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              component={Link}
              to="/health_care_blog"
            >
              <ListItemText primary="Health Care Blog" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }} component={Link} to="/covid19_info">
              <ListItemText primary="COVID-19 Info" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleMenuToggle("getInvolve")}
            aria-expanded={Boolean(openMenus.getInvolve)}
            aria-controls="mobile-get-involve-menu"
          >
            <ListItemText primary="Get Involve" />
            {openMenus.getInvolve ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={openMenus.getInvolve} timeout="auto" unmountOnExit>
          <List
            id="mobile-get-involve-menu"
            component="div"
            disablePadding
            onClick={handleDrawerToggle}
          >
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/volunteer">
              <ListItemText primary="Volunteer" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/make_donation">
              <ListItemText primary="Make Donation" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              component={Link}
              to="/our_success_story"
            >
              <ListItemText primary="Our Success Story" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              component={Link}
              to="/share_your_story"
            >
              <ListItemText primary="Share Your Story" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/remembrance">
              <ListItemText primary="Remembrance" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} component={Link} to="/reviews">
              <ListItemText primary="Reviews" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItem disablePadding onClick={handleDrawerToggle}>
          <ListItemButton component={Link} to="/about_us">
            <ListItemText primary="About Us" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={handleDrawerToggle}>
          <ListItemButton component={Link} to="/contact_us">
            <ListItemText primary="Contact Us" />
          </ListItemButton>
        </ListItem>

        <Divider sx={{ my: 1 }} />

        {user ? (
          <>
            <ListItem>
              <ListItemText
                primary={user.displayName || "Happy Paws Member"}
                secondary={user.email || "Signed in"}
              />
            </ListItem>
            <ListItem disablePadding onClick={handleDrawerToggle}>
              <ListItemButton component={Link} to="/profile">
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={handleDrawerToggle}>
              <ListItemButton component={Link} to="/account">
                <ListItemText primary="Account" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={handleDrawerToggle}>
              <ListItemButton component={Link} to="/dashboard">
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding onClick={handleDrawerToggle}>
            <ListItemButton component={Link} to="/sign_in">
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
        <Toolbar>
          {/* Drawer Icon Button ----------------------------------- */}
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

          {/* Logo Full Screen ------------------------------------- */}
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
            spacing={2}
            sx={{
              mx: 4,
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Button
              component={Link}
              to="/"
              sx={{
                color: "inherit",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              Home
            </Button>

            <Button
              onClick={handleMenu1Click}
              aria-controls={menu1AnchorEl ? "pets-menu" : undefined}
              aria-expanded={Boolean(menu1AnchorEl)}
              aria-haspopup="menu"
              sx={{
                color: "inherit",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              Pets
              <KeyboardArrowDownIcon fontSize="12" />
            </Button>

            <Button
              component={Link}
              to="/shop"
              sx={{
                color: "inherit",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              Shop
            </Button>

            <Button
              onClick={handleMenu3Click}
              aria-controls={menu3AnchorEl ? "veterinary-menu" : undefined}
              aria-expanded={Boolean(menu3AnchorEl)}
              aria-haspopup="menu"
              sx={{
                color: "inherit",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              Veterinary
              <KeyboardArrowDownIcon fontSize="12" />
            </Button>

            <Button
              onClick={handleMenu4Click}
              aria-controls={menu4AnchorEl ? "get-involve-menu" : undefined}
              aria-expanded={Boolean(menu4AnchorEl)}
              aria-haspopup="menu"
              sx={{
                color: "inherit",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              Get Involve
              <KeyboardArrowDownIcon fontSize="12" />
            </Button>

            <Button
              component={Link}
              to="/about_us"
              sx={{
                color: "inherit",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              About Us
            </Button>

            <Button
              component={Link}
              to="/contact_us"
              sx={{
                color: "inherit",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              Contact Us
            </Button>
          </Stack>

          {/* Main Sub Menu Items ----------------------------------------- */}
          <Menu
            id="pets-menu"
            anchorEl={menu1AnchorEl}
            keepMounted
            open={Boolean(menu1AnchorEl)}
            onClose={handleMenu1Close}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem
              component={Link}
              to="/pet_info"
              onClick={handleMenu1Close}
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              PET INFO
            </MenuItem>

            <MenuItem
              component={Link}
              to="/petcare"
              onClick={handleMenu1Close}
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              Pet Care
            </MenuItem>
            <MenuItem
              component={Link}
              to="/pet_training"
              onClick={handleMenu1Close}
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              PET TRAINING
            </MenuItem>
            <MenuItem
              component={Link}
              to="/adoption"
              onClick={handleMenu1Close}
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              ADOPTION
            </MenuItem>
            <MenuItem
              component={Link}
              to="/rescue_alert"
              onClick={handleMenu1Close}
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              RESCUE ALERT
            </MenuItem>
            <MenuItem
              component={Link}
              to="/lost_found"
              onClick={handleMenu1Close}
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              LOST & FOUND
            </MenuItem>
          </Menu>

          <Menu
            id="veterinary-menu"
            anchorEl={menu3AnchorEl}
            keepMounted
            open={Boolean(menu3AnchorEl)}
            onClose={handleMenu3Close}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem
              component={Link}
              to="/online_consultation"
              onClick={handleMenu3Close}
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              ONLINE CONSULTATION
            </MenuItem>

            <MenuItem
              component={Link}
              to="/in_person_consultation"
              onClick={handleMenu3Close}
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              IN-PERSON CONSULTATION
            </MenuItem>

            <MenuItem
              component={Link}
              to="/vet_finder"
              onClick={handleMenu3Close}
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              VET FINDER
            </MenuItem>

            <MenuItem
              component={Link}
              to="/house_calls"
              onClick={handleMenu3Close}
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              HOUSE CALLS
            </MenuItem>

            <MenuItem
              component={Link}
              to="/health_care_blog"
              onClick={handleMenu3Close}
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              HEALTH CARE BLOG
            </MenuItem>

            <MenuItem
              component={Link}
              to="/covid19_info"
              onClick={handleMenu3Close}
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              COVID-19 INFO
            </MenuItem>
          </Menu>

          <Menu
            id="get-involve-menu"
            anchorEl={menu4AnchorEl}
            keepMounted
            open={Boolean(menu4AnchorEl)}
            onClose={handleMenu4Close}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem
              component={Link}
              to="/volunteer"
              onClick={handleMenu4Close}
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              VOLUNTEER
            </MenuItem>

            <MenuItem
              component={Link}
              to="/make_donation"
              onClick={handleMenu4Close}
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              MAKE DONATION
            </MenuItem>

            <MenuItem
              component={Link}
              to="/our_success_story"
              onClick={handleMenu4Close}
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              OUR SUCCESS STORY
            </MenuItem>

            <MenuItem
              component={Link}
              to="/share_your_story"
              onClick={handleMenu4Close}
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              SHARE YOUR STORY
            </MenuItem>

            <MenuItem
              component={Link}
              to="/remembrance"
              onClick={handleMenu4Close}
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              REMEMBRANCE
            </MenuItem>

            <MenuItem
              component={Link}
              to="/reviews"
              onClick={handleMenu4Close}
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              REVIEWS
            </MenuItem>
          </Menu>

          {/* Profile Setting Icon or Login ----------------------------- */}
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

                <MenuItem
                  component={Link}
                  to="/profile"
                  onClick={handleCloseUserMenu}
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                    fontWeight: "600",
                  }}
                >
                  Profile
                </MenuItem>

                <MenuItem
                  component={Link}
                  to="/account"
                  onClick={handleCloseUserMenu}
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                    fontWeight: "600",
                  }}
                >
                  Account
                </MenuItem>

                <MenuItem
                  component={Link}
                  to="/dashboard"
                  onClick={handleCloseUserMenu}
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                    fontWeight: "600",
                  }}
                >
                  Dashboard
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center" fontWeight="bold">
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              component={Link}
              to="/sign_in"
              sx={{
                color: "inherit",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer Nav Menu Item -------------------------------------- */}
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

export default Header2;
