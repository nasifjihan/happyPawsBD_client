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
import { Stack } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import HPBDLogo from "./../../images/HPBD-Logo.png"

const Header = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [menu1AnchorEl, setMenu1AnchorEl] = React.useState(null);
  const [menu2AnchorEl, setMenu2AnchorEl] = React.useState(null);
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

  // Full View Menu Nested Item Controller ----------------------------
  const handleMenu1Click = (event) => {
    setMenu1AnchorEl(event.currentTarget);
  };

  const handleMenu1Close = () => {
    setMenu1AnchorEl(null);
  };

  const handleMenu2Click = (event) => {
    setMenu2AnchorEl(event.currentTarget);
  };

  const handleMenu2Close = () => {
    setMenu2AnchorEl(null);
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
      await logOut();
      navigate("/sign_in");
    } catch (error) {
      console.log(error.message);
    }
  };

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
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo Full Screen ------------------------------------- */}
          <Typography
            variant="h6"
            component="a"
            href="../"
            textAlign={{ xs: "center", md: "inherit" }}
            flexGrow={{ xs: "1", md: "0" }}
            sx={{ color: "inherit", textDecoration: "none", pt: 1 }}
          >
            <img
              src={HPBDLogo}
              alt="Happy Paws BD"
              width={100}
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
              // href="/"
              sx={{
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "600",
                }}
                to="/home"
              >
                Home
              </Link>
            </Button>

            <Button
              // endIcon={<KeyboardArrowDownIcon />}
              onClick={handleMenu1Click}
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
              // endIcon={<KeyboardArrowDownIcon />}
              onClick={handleMenu2Click}
              sx={{
                color: "inherit",
                fontWeight: "600",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              Shop
              <KeyboardArrowDownIcon fontSize="12" />
            </Button>

            <Button
              // endIcon={<KeyboardArrowDownIcon />}
              onClick={handleMenu3Click}
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
              // endIcon={<KeyboardArrowDownIcon />}
              onClick={handleMenu4Click}
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
              sx={{
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "600",
                }}
                to="/about_us"
              >
                About Us
              </Link>
            </Button>

            <Button
              sx={{
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "600",
                }}
                to="/contact_us"
              >
                Contact Us
              </Link>
            </Button>
          </Stack>

          {/* Nasted Menu Items ----------------------------------------- */}
          <Menu
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
              onClick={handleMenu1Close}
              sx={{
                fontSize: "",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "600",
                }}
                to="/pet_info"
              >
                PET INFO
              </Link>
            </MenuItem>

            <MenuItem
              onClick={handleMenu1Close}
              sx={{
                fontSize: "",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "600",
                }}
                to="/daycare"
              >
                DAYCARE
              </Link>
            </MenuItem>

            <MenuItem
              onClick={handleMenu1Close}
              sx={{
                fontSize: "",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "600",
                }}
                to="/boarding"
              >
                BOARDING
              </Link>
            </MenuItem>

            <MenuItem
              onClick={handleMenu1Close}
              sx={{
                fontSize: "",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "600",
                }}
                to="/pet_training"
              >
                PET TRAINING
              </Link>
            </MenuItem>

            <MenuItem
              onClick={handleMenu1Close}
              sx={{
                fontSize: "",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "600",
                }}
                to="/adoption"
              >
                ADOPTION
              </Link>
            </MenuItem>

            <MenuItem
              onClick={handleMenu1Close}
              sx={{
                fontSize: "",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "600",
                }}
                to="/rescue_alert"
              >
                RESCUE ALERT
              </Link>
            </MenuItem>

            <MenuItem
              onClick={handleMenu1Close}
              sx={{
                fontSize: "",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "600",
                }}
                to="/lost_found"
              >
                LOST & FOUND
              </Link>
            </MenuItem>
          </Menu>

          <Menu
            anchorEl={menu2AnchorEl}
            keepMounted
            open={Boolean(menu2AnchorEl)}
            onClose={handleMenu2Close}
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
              onClick={handleMenu2Close}
              sx={{
                fontSize: "",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "600",
                }}
                to="/food"
              >
                FOOD
              </Link>
            </MenuItem>

            <MenuItem
              onClick={handleMenu2Close}
              sx={{
                fontSize: "",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "600",
                }}
                to="/medicine"
              >
                MEDICINE
              </Link>
            </MenuItem>

            <MenuItem
              onClick={handleMenu2Close}
              sx={{
                fontSize: "",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "600",
                }}
                to="/accessories"
              >
                ACCESSORIES
              </Link>
            </MenuItem>
          </Menu>

          <Menu
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
              onClick={handleMenu3Close}
              sx={{
                fontSize: "",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "600",
                }}
                to="/online_consultation"
              >
                ONLINE CONSULTATION
              </Link>
            </MenuItem>

            <MenuItem
              onClick={handleMenu3Close}
              sx={{
                fontSize: "",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "600",
                }}
                to="/in_person_consultation"
              >
                IN-PERSON CONSULTATION
              </Link>
            </MenuItem>

            <MenuItem
              onClick={handleMenu3Close}
              sx={{
                fontSize: "",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "600",
                }}
                to="/nearest_clinic"
              >
                NEAREST CLINIC
              </Link>
            </MenuItem>

            <MenuItem
              onClick={handleMenu3Close}
              sx={{
                fontSize: "",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "600",
                }}
                to="/house_calls"
              >
                HOUSE CALLS
              </Link>
            </MenuItem>

            <MenuItem
              onClick={handleMenu3Close}
              sx={{
                fontSize: "",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "600",
                }}
                to="/health_care_blog"
              >
                HEALTH CARE BLOG
              </Link>
            </MenuItem>

            <MenuItem
              onClick={handleMenu3Close}
              sx={{
                fontSize: "",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "600",
                }}
                to="/covid19_info"
              >
                COVID-19 INFO
              </Link>
            </MenuItem>
          </Menu>

          <Menu
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
              onClick={handleMenu4Close}
              sx={{
                fontSize: "",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "600",
                }}
                to="/volunteer"
              >
                VOLUNTEER
              </Link>
            </MenuItem>

            <MenuItem
              onClick={handleMenu4Close}
              sx={{
                fontSize: "",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "600",
                }}
                to="/make_donation"
              >
                MAKE DONATION
              </Link>
            </MenuItem>

            <MenuItem
              onClick={handleMenu4Close}
              sx={{
                fontSize: "",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "600",
                }}
                to="/our_success_story"
              >
                OUR SUCCESS STORY
              </Link>
            </MenuItem>

            <MenuItem
              onClick={handleMenu4Close}
              sx={{
                fontSize: "",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "600",
                }}
                to="/share_your_story"
              >
                SHARE YOUR STORY
              </Link>
            </MenuItem>

            <MenuItem
              onClick={handleMenu4Close}
              sx={{
                fontSize: "",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "600",
                }}
                to="/remembrance"
              >
                REMEMBRANCE
              </Link>
            </MenuItem>

            <MenuItem
              onClick={handleMenu4Close}
              sx={{
                fontSize: "",
                "&:hover": { backgroundColor: "primary.back" },
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: "600",
                }}
                to="/reviews"
              >
                REVIEWS
              </Link>
            </MenuItem>
          </Menu>

          {/* Profile Setting Icon or Login ----------------------------- */}
          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar alt="Nasif Jihan" src={user.photoURL} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
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
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link
                    style={{
                      textAlign: "center",
                      textDecoration: "none",
                      color: "inherit",
                      fontWeight: "600",
                    }}
                    to="/profile"
                  >
                    Profile
                  </Link>
                </MenuItem>

                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" fontWeight="bold" component={Link} to="/account" style={{
                      textAlign: "center",
                      textDecoration: "none",
                      color: "inherit",
                      fontWeight: "600",
                    }}>
                    Account
                  </Typography>
                </MenuItem>

                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" fontWeight="bold" component={Link} to="/dashboard" style={{
                      textAlign: "center",
                      textDecoration: "none",
                      color: "inherit",
                      fontWeight: "600",
                    }}>
                    Dashboard
                  </Typography>
                </MenuItem>

                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    onClick={handleLogout}
                    textAlign="center"
                    fontWeight="bold"
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Link
              style={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "600",
              }}
              to="/sign_in"
            >
              Login
            </Link>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer Nav Menu Item -------------------------------------- */}
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 1 }}>
              <img
                src={HPBDLogo}
                alt="Happy Paws BD"
                width={100}
              />
            </Typography>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    textAlign: "center",
                    "&:hover": { backgroundColor: "#D3D3D3" },
                  }}
                >
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    textAlign: "center",
                    "&:hover": { backgroundColor: "#D3D3D3" },
                  }}
                >
                  <ListItemText primary="Pets" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    textAlign: "center",
                    "&:hover": { backgroundColor: "#D3D3D3" },
                  }}
                >
                  <ListItemText primary="Shop" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    textAlign: "center",
                    "&:hover": { backgroundColor: "#D3D3D3" },
                  }}
                >
                  <ListItemText primary="Veterinary Services" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    textAlign: "center",
                    "&:hover": { backgroundColor: "#D3D3D3" },
                  }}
                >
                  <ListItemText primary="Get Involved" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    textAlign: "center",
                    "&:hover": { backgroundColor: "#D3D3D3" },
                  }}
                >
                  <ListItemText primary="About Us" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    textAlign: "center",
                    "&:hover": { backgroundColor: "#D3D3D3" },
                  }}
                >
                  <ListItemText primary="Contact Us" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
};

export default Header;
