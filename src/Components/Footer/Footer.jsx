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

import NasifIcon from "./../../images/optimized/nasif.webp";
import HPBDLogo from "./../../images/HPBD-Logo.png";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
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
              <Stack direction="row" justifyContent="space-evenly">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                    <FacebookOutlinedIcon />
                  </Avatar>
                </a>

                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                    <InstagramIcon />
                  </Avatar>
                </a>

                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                    <YouTubeIcon />
                  </Avatar>
                </a>

                <a
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                    <FmdGoodIcon />
                  </Avatar>
                </a>

                <a
                  href="https://mail.google.com/mail/u/0/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                    <EmailIcon />
                  </Avatar>
                </a>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            {/* Contact Information */}
            <Typography variant="h5" fontWeight={700} mb={2} gutterBottom>
              Sitemap
            </Typography>

            {/* Multiple Links */}
            <Stack spacing={-2}>
              <MuiLink
                component={RouterLink}
                to="/"
                color={"primary.para"}
                style={{ textDecoration: "none" }}
              >
                Home
              </MuiLink>

              <br />
              <MuiLink
                component={RouterLink}
                to="/adoption"
                color={"primary.para"}
                style={{ textDecoration: "none" }}
              >
                Adoption
              </MuiLink>

              <br />
              <MuiLink
                component={RouterLink}
                to="/rescue_alert"
                color={"primary.para"}
                style={{ textDecoration: "none" }}
              >
                Rescue
              </MuiLink>

              <br />
              <MuiLink
                component={RouterLink}
                to="/shop"
                color={"primary.para"}
                style={{ textDecoration: "none" }}
              >
                Shop
              </MuiLink>
              <br />
              <MuiLink
                component={RouterLink}
                to="/lost_found"
                color={"primary.para"}
                style={{ textDecoration: "none" }}
              >
                Lost & Found
              </MuiLink>

              <br />
              <MuiLink
                component={RouterLink}
                to="/health_care_blog"
                color={"primary.para"}
                style={{ textDecoration: "none" }}
              >
                Health Care Blog
              </MuiLink>

              <br />
            </Stack>
          </Grid>

          <Grid item xs={6} md={2}>
            {/* Contact Information */}
            <Typography variant="h5" fontWeight={700} mb={2} gutterBottom>
              Support
            </Typography>

            {/* Multiple Links */}
            <Stack spacing={-2}>
              <MuiLink
                component={RouterLink}
                to="/about_us"
                color={"primary.para"}
                style={{ textDecoration: "none" }}
              >
                About Us
              </MuiLink>

              <br />
              <MuiLink
                component={RouterLink}
                to="/contact_us"
                color={"primary.para"}
                style={{ textDecoration: "none" }}
              >
                Contact Us
              </MuiLink>

              <br />
              <MuiLink
                component={RouterLink}
                to="/petcare"
                color={"primary.para"}
                style={{ textDecoration: "none" }}
              >
                Pet Care
              </MuiLink>

              <br />
              <MuiLink
                component={RouterLink}
                to="/vet_finder"
                color={"primary.para"}
                style={{ textDecoration: "none" }}
              >
                Vet Finder
              </MuiLink>

              <br />

              <MuiLink
                component={RouterLink}
                to="/pet_training"
                color={"primary.para"}
                style={{ textDecoration: "none" }}
              >
                Training
              </MuiLink>

              <br />
              <MuiLink
                component={RouterLink}
                to="/profile"
                color={"primary.para"}
                style={{ textDecoration: "none" }}
              >
                Profile
              </MuiLink>

              <br />
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            {/* Google Map Embed */}
            <iframe
              title="Google Map"
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
