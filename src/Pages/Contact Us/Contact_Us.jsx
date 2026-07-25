import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Stack,
  Button,
} from "@mui/material";

import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Margin,
} from "@mui/icons-material";

import { green } from "@mui/material/colors";
import contactImage from "./../../images/optimized/contact-us.webp";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import OptimizedImage from "../../Components/Common/OptimizedImage";
// import EmailIcon from "@mui/icons-material/Email";

const Contact_Us = () => {
  return (
    <Box
      style={{
        backgroundColor: "#f9f9f9",
      }}
      my={5}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          style={{
            padding: "2.5rem",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <OptimizedImage
                src={contactImage}
                alt="Contact Us"
                style={{
                  paddingTop: "30px",
                  width: "100%",
                  // maxHeight: "600px",
                  objectFit: "cover",
                  // borderRadius: "10px",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                textAlign={"center"}
                fontWeight={700}
                gutterBottom
              >
                Contact Us
              </Typography>

              <Typography paragraph>
                Have any questions or inquiries? Feel free to reach out to us.
                We are here to help and answer your queries.
              </Typography>

              <Divider />

              <Box style={{ marginTop: "1.5rem" }}>
                <Typography variant="h6" gutterBottom>
                  Contact Information
                </Typography>

                <List style={{ paddingLeft: 0 }}>
                  <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <ListItemIcon
                      style={{
                        minWidth: "auto",
                        marginRight: "1rem",
                        color: "green",
                      }}
                    >
                      <EmailIcon />
                    </ListItemIcon>

                    <ListItemText
                      primary="Email"
                      secondary="contact@happypawsbd.com"
                    />
                  </ListItem>

                  <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <ListItemIcon
                      style={{
                        minWidth: "auto",
                        marginRight: "1rem",
                        color: "green",
                      }}
                    >
                      <PhoneIcon />
                    </ListItemIcon>

                    <ListItemText primary="Phone" secondary="+880 1983794542" />
                  </ListItem>

                  <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <ListItemIcon
                      style={{
                        minWidth: "auto",
                        marginRight: "1rem",
                        color: "green",
                      }}
                    >
                      <LocationIcon />
                    </ListItemIcon>

                    <ListItemText
                      primary="Address"
                      secondary="123 Happy Paws Street, Dhaka, Bangladesh"
                    />
                  </ListItem>
                </List>
              </Box>

              <Divider />

              <Box style={{ marginTop: "1.5rem" }}>
                <Typography variant="h6" gutterBottom>
                  Connect with Us
                </Typography>

                <Stack direction="row" spacing={2}>
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
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Contact_Us;
