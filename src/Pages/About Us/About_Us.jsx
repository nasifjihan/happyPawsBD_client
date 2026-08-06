import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import OptimizedImage from "../../Components/Common/OptimizedImage";
import aboutImage from "./../../images/optimized/about-us.webp";

const impactHighlights = [
  {
    title: "Rescue Support",
    description:
      "We help connect urgent rescue needs with people who care and want to act.",
  },
  {
    title: "Adoption Pathways",
    description:
      "We make it easier for loving families to discover pets ready for a safe home.",
  },
  {
    title: "Trusted Guidance",
    description:
      "We bring together pet care, training, and veterinary resources in one place.",
  },
];

const About_Us = () => {
  return (
    <Box sx={{ backgroundColor: "#f9f9f9", py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Paper
          elevation={2}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            backgroundColor: "#ffffff",
          }}
        >
          <Grid container spacing={4} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Stack spacing={2.5}>
                <Typography variant="h3" sx={{ fontWeight: 800 }}>
                  About Happy Paws BD
                </Typography>

                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Happy Paws BD is a community-focused pet platform built to make
                  rescue, adoption, and everyday pet care more accessible for families
                  across Bangladesh.
                </Typography>

                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  We want pet owners, rescuers, and animal lovers to find practical
                  support in one place, whether that means helping a lost pet return
                  home, exploring adoption, or getting trusted guidance for health and
                  care.
                </Typography>

                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Our goal is simple: reduce friction for good care and create a more
                  compassionate journey for pets and the people looking after them.
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                  <Button
                    component={RouterLink}
                    to="/adoption"
                    variant="contained"
                    color="success"
                  >
                    Explore Adoption
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/contact_us"
                    variant="outlined"
                    color="success"
                  >
                    Contact Us
                  </Button>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                component={OptimizedImage}
                src={aboutImage}
                alt="Happy Paws BD supporting pets and pet families"
                sx={{ width: "100%", borderRadius: "24px" }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: { xs: 3, md: 4 } }}>
            {impactHighlights.map((item) => (
              <Grid key={item.title} size={{ xs: 12, md: 4 }}>
                <Paper
                  variant="outlined"
                  sx={{ p: 3, borderRadius: 3, height: "100%" }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: "0.35em" }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {item.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default About_Us;
