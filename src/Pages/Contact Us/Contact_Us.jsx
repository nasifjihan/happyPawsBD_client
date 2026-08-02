import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import OptimizedImage from "../../Components/Common/OptimizedImage";
import { getSiteSettings } from "../../API/api";
import contactImage from "./../../images/optimized/contact-us.webp";

const Contact_Us = () => {
  const { data: siteSettings } = useQuery({
    queryKey: ["site-settings"],
    queryFn: getSiteSettings,
    staleTime: 300_000,
  });

  const contactEmail = siteSettings?.contactEmail || "contact@happypawsbd.com";
  const contactPhone = siteSettings?.contactPhone || "+880 1983794542";
  const address = siteSettings?.address || "Dhaka, Bangladesh";
  const mapUrl =
    siteSettings?.mapUrl ||
    "https://www.google.com/maps/search/?api=1&query=Happy%20Paws%20BD%20Dhaka%20Bangladesh";
  const facebookUrl =
    siteSettings?.facebookUrl || "https://www.facebook.com/happypawsbd";
  const instagramUrl =
    siteSettings?.instagramUrl || "https://www.instagram.com/happypawsbd";
  const youtubeUrl =
    siteSettings?.youtubeUrl || "https://www.youtube.com/@happypawsbd";

  const contactItems = [
    {
      label: "Email",
      value: contactEmail,
      href: `mailto:${contactEmail}`,
      icon: <EmailIcon />,
    },
    {
      label: "Phone",
      value: contactPhone,
      href: `tel:${contactPhone.replace(/\s+/g, "")}`,
      icon: <PhoneIcon />,
    },
    {
      label: "Address",
      value: address,
      href: mapUrl,
      icon: <LocationIcon />,
    },
  ];

  const socialLinks = [
    {
      label: "Visit Happy Paws BD on Facebook",
      href: facebookUrl,
      icon: <FacebookOutlinedIcon />,
    },
    {
      label: "Visit Happy Paws BD on Instagram",
      href: instagramUrl,
      icon: <InstagramIcon />,
    },
    {
      label: "Visit Happy Paws BD on YouTube",
      href: youtubeUrl,
      icon: <YouTubeIcon />,
    },
    {
      label: "Open Happy Paws BD on Google Maps",
      href: mapUrl,
      icon: <FmdGoodIcon />,
    },
  ];

  return (
    <Box sx={{ bgcolor: "background.default", py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Paper
          elevation={2}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            bgcolor: "background.paper",
          }}
        >
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={6}>
              <OptimizedImage
                src={contactImage}
                alt="Contact Happy Paws BD"
                style={{
                  width: "100%",
                  borderRadius: "24px",
                  objectFit: "cover",
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack spacing={2.5}>
                <Typography variant="h3" fontWeight={800}>
                  Contact Us
                </Typography>

                <Typography variant="body1" color="text.secondary">
                  Reach out if you need help with adoption, rescue support, lost
                  and found guidance, or general questions about using the
                  platform.
                </Typography>

                <Typography variant="body1" color="text.secondary">
                  We aim to make it easy for pet families and animal lovers to
                  find the right next step quickly.
                </Typography>

                <Divider />

                <Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Contact Information
                  </Typography>

                  <List disablePadding>
                    {contactItems.map((item) => (
                      <ListItem
                        key={item.label}
                        component="a"
                        href={item.href}
                        target={item.label === "Address" ? "_blank" : undefined}
                        rel={
                          item.label === "Address"
                            ? "noopener noreferrer"
                            : undefined
                        }
                        sx={{
                          padding: 0,
                          alignItems: "center",
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        <ListItemIcon
                          sx={{ minWidth: 40, color: "success.main" }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.label}
                          secondary={item.value}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    What do you need help with?
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    Use these quick links to reach the right page faster.
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Button
                      component={RouterLink}
                      to="/adoption"
                      variant="contained"
                      color="success"
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Adoption
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/lost_found"
                      variant="outlined"
                      color="success"
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Lost & Found
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/volunteer"
                      variant="outlined"
                      color="success"
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Volunteer
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/make_donation"
                      variant="outlined"
                      color="success"
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Donate
                    </Button>
                  </Stack>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Response expectations
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    If your message is urgent, please call directly.
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Chip
                      label="Replies: 24–48 hours"
                      color="success"
                      variant="outlined"
                      sx={{ fontWeight: 700 }}
                    />
                    <Chip
                      label="Urgent: Phone call"
                      color="success"
                      variant="outlined"
                      sx={{ fontWeight: 700 }}
                    />
                  </Stack>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Connect with Us
                  </Typography>

                  <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                    {socialLinks.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                      >
                        <Avatar sx={{ bgcolor: "success.main" }} variant="rounded">
                          {item.icon}
                        </Avatar>
                      </a>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Contact_Us;
