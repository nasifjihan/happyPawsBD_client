import React from "react";
import {
  Box,
  Grid,
  Typography,
  Link as MuiLink,
  Divider,
  Avatar,
  Stack,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { Link as RouterLink } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";

import NasifIcon from "./../../images/optimized/nasif.webp";
import HPBDLogo from "./../../images/HPBD-Logo.png";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  const { user } = useUserAuth();

  const sitemapLinks = [
    { label: "Home", to: "/" },
    { label: "Adoption", to: "/adoption" },
    { label: "Rescue", to: "/rescue_alert" },
    { label: "Shop (All)", to: "/shop" },
    { label: "Shop: Food", to: "/shop?category=Food" },
    { label: "Shop: Medicine", to: "/shop?category=Medicine" },
    { label: "Shop: Accessories", to: "/shop?category=Accessories" },
    { label: "Lost & Found", to: "/lost_found" },
    { label: "Health Care Blog", to: "/health_care_blog" },
  ];

  const supportLinks = [
    { label: "About Us", to: "/about_us" },
    { label: "Contact Us", to: "/contact_us" },
    { label: "Pet Care", to: "/petcare" },
    { label: "Vet Finder", to: "/vet_finder" },
    { label: "Training", to: "/pet_training" },
    ...(user
      ? [{ label: "Profile", to: "/profile" }]
      : [{ label: "Sign In", to: "/sign_in" }]),
  ];

  return (
    <Box
      sx={{
        mt: 10,
        textAlign: "center",
        backgroundColor: "primary.back",
        // minHeight: "50vh",
      }}
    >
      <Box className="myContainer">
        <Grid container spacing={3} py={2}>
          <Grid item xs={12} md={4}>
            {/* Contact Information */}
            {/* Logo Full Screen ------------------------------------- */}
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{ color: "inherit", textDecoration: "none", pt: 1 }}
            >
              <img src={HPBDLogo} alt="Happy Paws BD" width={150} />
            </Typography>
            <Typography fontWeight={900} variant="h5" gutterBottom>
              Happy Paws BD{" "}
            </Typography>

            <Typography
              color={"primary.para"}
              variant="body2"
              // textAlign={"justify"}
            >
              The "Happy Paws BD" project is a comprehensive pet website aimed
              at promoting pet welfare and providing a range of services to pet
              owners and enthusiasts.
            </Typography>

            <Box mt={2}>
              <Stack
                component="nav"
                aria-label="Social media and contact links"
                direction="row"
                justifyContent="space-evenly"
              >
                <a
                  href="https://www.facebook.com/happypawsbd"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Happy Paws BD on Facebook"
                >
                  <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                    <FacebookOutlinedIcon />
                  </Avatar>
                </a>

                <a
                  href="https://www.instagram.com/happypawsbd"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Happy Paws BD on Instagram"
                >
                  <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                    <InstagramIcon />
                  </Avatar>
                </a>

                <a
                  href="https://www.youtube.com/@happypawsbd"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Happy Paws BD on YouTube"
                >
                  <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                    <YouTubeIcon />
                  </Avatar>
                </a>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Happy%20Paws%20BD%20Dhaka%20Bangladesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Happy Paws BD location on Google Maps"
                >
                  <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                    <FmdGoodIcon />
                  </Avatar>
                </a>

                <a
                  href="mailto:contact@happypawsbd.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open email contact for Happy Paws BD"
                >
                  <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                    <EmailIcon />
                  </Avatar>
                </a>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={6} md={2} component="nav" aria-label="Footer sitemap">
            {/* Contact Information */}
            <Typography variant="h5" fontWeight={700} mb={2} gutterBottom>
              Sitemap
            </Typography>

            <Stack spacing={1} alignItems="center">
              {sitemapLinks.map((link) => (
                <MuiLink
                  key={`${link.to}-${link.label}`}
                  component={RouterLink}
                  to={link.to}
                  color={"primary.para"}
                  underline="hover"
                >
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          <Grid
            item
            xs={6}
            md={2}
            component="nav"
            aria-label="Footer support links"
          >
            {/* Contact Information */}
            <Typography variant="h5" fontWeight={700} mb={2} gutterBottom>
              Support
            </Typography>

            <Stack spacing={1} alignItems="center">
              {supportLinks.map((link) => (
                <MuiLink
                  key={`${link.to}-${link.label}`}
                  component={RouterLink}
                  to={link.to}
                  color={"primary.para"}
                  underline="hover"
                >
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            {/* Google Map Embed */}
            <iframe
              title="Happy Paws BD location map"
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3651.815358466866!2d90.43777407440786!3d23.753962888641347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDQ1JzE0LjMiTiA5MMKwMjYnMjUuMyJF!5e0!3m2!1sen!2sbd!4v1692904836509!5m2!1sen!2sbd"
              style={{
                border: 1,
                borderColor: "black",
                width: "100%",
                height: "250px",
                borderRadius: "10px",
              }}
              allowFullScreen=""
              loading="lazy"
            />
          </Grid>
        </Grid>
      </Box>

      <Divider variant="body">All Rights Reserved</Divider>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 2,
          textAlign: "center",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          alignItems="center"
          justifyContent="center"
          variant="body2"
        >
          <span>© {new Date().getFullYear()} Happy Paws BD. Developed by</span>
          <Avatar
            alt="Nasif Jihan"
            src={NasifIcon}
            sx={{ width: 18, height: 18 }}
          />
          <a
            className="span2"
            href="https://www.facebook.com/nasifjihan/"
            target="_blank"
            rel="noreferrer"
          >
            Nasif Jihan
          </a>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
