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
import { useQuery } from "@tanstack/react-query";
import { Link as RouterLink } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { getSiteSettings } from "../../API/api";
import NasifIcon from "./../../images/optimized/nasif.webp";
import HPBDLogo from "./../../images/HPBD-Logo.png";
import HPBDLogo2 from "./../../images/HPBD-Logo2.png";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import EmailIcon from "@mui/icons-material/Email";
import { useColorMode } from "../../context/ColorModeContext";

const Footer = () => {
  const { mode } = useColorMode();
  const { user } = useUserAuth();
  const { data: siteSettings } = useQuery({
    queryKey: ["site-settings"],
    queryFn: getSiteSettings,
    staleTime: 300_000,
  });

  const brandName = siteSettings?.brandName || "Happy Paws BD";
  const facebookUrl =
    siteSettings?.facebookUrl || "https://www.facebook.com/happypawsbd";
  const instagramUrl =
    siteSettings?.instagramUrl || "https://www.instagram.com/happypawsbd";
  const youtubeUrl =
    siteSettings?.youtubeUrl || "https://www.youtube.com/@happypawsbd";
  const mapUrl =
    siteSettings?.mapUrl ||
    "https://www.google.com/maps/search/?api=1&query=Happy%20Paws%20BD%20Dhaka%20Bangladesh";
  const contactEmail = siteSettings?.contactEmail || "contact@happypawsbd.com";
  const mapEmbedUrl =
    siteSettings?.mapEmbedUrl ||
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3651.815358466866!2d90.43777407440786!3d23.753962888641347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDQ1JzE0LjMiTiA5MMKwMjYnMjUuMyJF!5e0!3m2!1sen!2sbd!4v1692904836509!5m2!1sen!2sbd";

  const sitemapLinks = [
    { label: "Home", to: "/" },
    { label: "Adoption", to: "/adoption" },
    { label: "Rescue", to: "/rescue_alert" },
    { label: "Shop", to: "/shop" },
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
        textAlign: "center",
        backgroundColor: "primary.back",
        pt: 4,
      }}
    >
      <Box className="myContainer">
        <Grid container sx={{ py: 2 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            {/* Contact Information */}
            {/* Logo Full Screen ------------------------------------- */}
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{ color: "inherit", textDecoration: "none", pt: 1 }}
            >
              <Box
                component="img"
                src={mode === "dark" ? HPBDLogo2 : HPBDLogo}
                alt="Happy Paws BD"
                sx={{ width: 150 }}
              />
            </Typography>

            <Typography sx={{ fontWeight: 900, mb: "0.35em" }} variant="h5">
              {brandName}
            </Typography>

            <Typography variant="body2" sx={{ color: "primary.para" }}>
              The "Happy Paws BD" project is a comprehensive pet website aimed
              at promoting pet welfare and providing a range of services to pet
              owners and enthusiasts.
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Stack
                component="nav"
                aria-label="Social media and contact links"
                direction="row"
                sx={{ justifyContent: "space-evenly" }}
              >
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Happy Paws BD on Facebook"
                >
                  <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                    <FacebookOutlinedIcon />
                  </Avatar>
                </a>

                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Happy Paws BD on Instagram"
                >
                  <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                    <InstagramIcon />
                  </Avatar>
                </a>

                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Happy Paws BD on YouTube"
                >
                  <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                    <YouTubeIcon />
                  </Avatar>
                </a>

                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Happy Paws BD location on Google Maps"
                >
                  <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                    <FmdGoodIcon />
                  </Avatar>
                </a>

                <a
                  href={`mailto:${contactEmail}`}
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

          <Grid
            size={{ xs: 6, md: 2 }}
            component="nav"
            aria-label="Footer sitemap"
          >
            {/* Contact Information */}
            <Typography sx={{ fontWeight: 700, mb: 2 }} variant="h5">
              Sitemap
            </Typography>

            <Stack sx={{ alignItems: "center", gap: 1 }}>
              {sitemapLinks.map((link) => (
                <MuiLink
                  key={`${link.to}-${link.label}`}
                  component={RouterLink}
                  to={link.to}
                  underline="hover"
                  sx={{ color: "primary.para" }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          <Grid
            size={{ xs: 6, md: 2 }}
            component="nav"
            aria-label="Footer support links"
          >
            {/* Contact Information */}
            <Typography sx={{ fontWeight: 700, mb: 2 }} variant="h5">
              Support
            </Typography>

            <Stack sx={{ alignItems: "center", gap: 1 }}>
              {supportLinks.map((link) => (
                <MuiLink
                  key={`${link.to}-${link.label}`}
                  component={RouterLink}
                  to={link.to}
                  underline="hover"
                  sx={{ color: "primary.para" }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            {/* Google Map Embed */}
            <Box
              component="iframe"
              title="Happy Paws BD location map"
              src={mapEmbedUrl}
              allowFullScreen=""
              loading="lazy"
              sx={{
                border: 1,
                borderColor: "transparent",
                width: "100%",
                height: "250px",
                borderRadius: "10px",
              }}
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
          sx={{ alignItems: "center", justifyContent: "center", gap: 1 }}
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
