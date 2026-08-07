import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { alpha } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { getSiteSettings } from "../../../API/api";

const donationMethods = [
  {
    title: "bKash Donation",
    description:
      "Send support directly through bKash for urgent pet rescue, treatment, food, and shelter needs.",
    status: "Available now",
    icon: <PhoneIphoneOutlinedIcon color="success" />,
  },
  {
    title: "Nagad Support",
    description:
      "Nagad donations can also be arranged when needed through direct coordination with the team.",
    status: "Available on request",
    icon: <VolunteerActivismOutlinedIcon color="success" />,
  },
  {
    title: "Bank Transfer",
    description:
      "For larger donations or sponsorship support, bank transfer details can be shared personally.",
    status: "Available on request",
    icon: <AccountBalanceOutlinedIcon color="success" />,
  },
  {
    title: "In-Kind Donation",
    description:
      "You can also support with pet food, medicine, rescue supplies, bedding, or transport help.",
    status: "Always welcome",
    icon: <Inventory2OutlinedIcon color="success" />,
  },
];

const impactAreas = [
  {
    title: "Emergency Rescue",
    description:
      "Your donation helps respond to injured, abandoned, and vulnerable pets that need urgent support.",
    icon: <FavoriteBorderOutlinedIcon color="success" />,
  },
  {
    title: "Medical Treatment",
    description:
      "Funds can support vet visits, medicine, recovery care, and critical treatment when pets need help fast.",
    icon: <LocalHospitalOutlinedIcon color="success" />,
  },
  {
    title: "Food and Shelter",
    description:
      "Donations help provide daily food, temporary shelter, and essential care for rescued pets.",
    icon: <HomeOutlinedIcon color="success" />,
  },
  {
    title: "Community Awareness",
    description:
      "Support also helps outreach, adoption awareness, and compassionate pet care education in the community.",
    icon: <CampaignOutlinedIcon color="success" />,
  },
];

const donationSteps = [
  "Send your donation to the bKash number below.",
  "Keep the transaction ID for confirmation.",
  "Contact Happy Paws BD by phone or email to share your donation details.",
];

const supportOptions = [
  "Food, medicine, and pet supplies",
  "Treatment sponsorship for a rescue case",
  "Transport or temporary care support",
  "Corporate or group donations",
];

const Make_Donation = () => {
  const { data: siteSettings } = useQuery({
    queryKey: ["site-settings"],
    queryFn: getSiteSettings,
    staleTime: 300_000,
  });

  const bkashNumber = siteSettings?.donationBkashNumber || "+880 1983794542";
  const supportEmail = siteSettings?.donationEmail || siteSettings?.contactEmail || "contact@happypawsbd.com";
  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, #f7fbf4 0%, #eef7ea 48%, #f8fbf7 100%)",
        pt: 4,
      }}
    >
      <Box className="myContainer">
        <Stack spacing={4}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              border: "1px solid",
              borderColor: alpha("#2e7d32", 0.12),
              background:
                "linear-gradient(135deg, rgba(232, 245, 233, 0.92) 0%, rgba(255, 255, 255, 1) 100%)",
              boxShadow: "0 18px 44px rgba(46, 125, 50, 0.08)",
            }}
          >
            <Grid container spacing={4} sx={{ alignItems: "center" }}>
              <Grid size={{ xs: 12, md: 7 }}>
                <Stack spacing={2.25}>
                  <Chip
                    icon={<PetsOutlinedIcon />}
                    label="Support Rescue and Care"
                    color="success"
                    variant="outlined"
                    sx={{
                      width: "fit-content",
                      borderRadius: 999,
                      bgcolor: alpha("#2e7d32", 0.05),
                    }}
                  />

                  <Typography variant="h3" sx={{ fontWeight: 800 }}>
                    Make a Donation to Help Pets in Need
                  </Typography>

                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Your support helps Happy Paws BD care for rescued,
                    vulnerable, and adoptable pets through food, shelter,
                    treatment, and urgent rescue response. Even a small donation
                    can create real impact.
                  </Typography>

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <Button
                      component="a"
                      href={`tel:${bkashNumber.replace(/\s+/g, "")}`}
                      variant="contained"
                      color="success"
                      size="large"
                      endIcon={<ArrowForwardOutlinedIcon />}
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Donate via bKash
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/contact_us"
                      variant="outlined"
                      color="success"
                      size="large"
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Contact for Other Methods
                    </Button>
                  </Stack>
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, md: 5 }}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    bgcolor: "#fff",
                    borderColor: alpha("#2e7d32", 0.12),
                  }}
                >
                  <Stack spacing={2}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Donation Support Channels
                    </Typography>

                    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                      <PhoneOutlinedIcon color="success" />
                      <Box>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          Donation Phone / bKash
                        </Typography>
                        <Link
                          href={`tel:${bkashNumber.replace(/\s+/g, "")}`}
                          underline="hover"
                          sx={{ color: "success.main", fontWeight: 700 }}
                        >
                          {bkashNumber}
                        </Link>
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                      <EmailOutlinedIcon color="success" />
                      <Box>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          Donation Email Support
                        </Typography>
                        <Link
                          href={`mailto:${supportEmail}`}
                          underline="hover"
                          sx={{ color: "success.main", fontWeight: 700 }}
                        >
                          {supportEmail}
                        </Link>
                      </Box>
                    </Stack>

                    <Divider />

                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      bKash is the fastest option right now. Nagad, bank
                      transfer, and in-kind donations are also available by
                      contacting the team directly.
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Paper>

          <Grid container spacing={2}>
            {donationMethods.map((method) => (
              <Grid key={method.title} size={{ xs: 12, md: 6 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: "100%",
                    border: "1px solid",
                    borderColor: alpha("#2e7d32", 0.1),
                  }}
                >
                  <Stack spacing={1.5}>
                    <Box>{method.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {method.title}
                    </Typography>
                    <Chip
                      label={method.status}
                      color="success"
                      size="small"
                      variant="outlined"
                      sx={{ width: "fit-content", borderRadius: 999 }}
                    />
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {method.description}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={0}
                sx={{
              p: { xs: 3, md: 4 },
              height: "100%",
              border: "1px solid",
              borderColor: alpha("#2e7d32", 0.1),
            }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    Donate via bKash
                  </Typography>

                  <Box
                    sx={{
                      p: 2.5,
                      bgcolor: alpha("#2e7d32", 0.06),
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      bKash Number
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 800, color: "success.main" }}
                    >
                      {bkashNumber}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mt: 1 }}
                    >
                      Send your donation and keep the transaction ID for
                      confirmation.
                    </Typography>
                  </Box>

                  {donationSteps.map((step, index) => (
                    <Stack
                      key={step}
                      direction="row"
                      spacing={1.5}
                      sx={{ alignItems: "flex-start" }}
                    >
                      <Chip
                        label={index + 1}
                        color="success"
                        size="small"
                        sx={{ fontWeight: 700 }}
                      />
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {step}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={0}
                sx={{
              p: { xs: 3, md: 4 },
              height: "100%",
              border: "1px solid",
              borderColor: alpha("#2e7d32", 0.1),
            }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    Other Ways to Support
                  </Typography>

                  {supportOptions.map((item) => (
                    <Stack
                      key={item}
                      direction="row"
                      spacing={1.25}
                      sx={{ alignItems: "flex-start" }}
                    >
                      <CheckCircleOutlineOutlinedIcon color="success" />
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {item}
                      </Typography>
                    </Stack>
                  ))}

                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    For Nagad, bank transfer, sponsorship, or supply donations,
                    please contact Happy Paws BD directly so the team can guide
                    you with the right next step.
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            {impactAreas.map((area) => (
              <Grid key={area.title} size={{ xs: 12, md: 6, lg: 3 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: "100%",
                    border: "1px solid",
                    borderColor: alpha("#2e7d32", 0.1),
                  }}
                >
                  <Stack spacing={1.5}>
                    <Box>{area.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {area.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {area.description}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              border: "1px solid",
              borderColor: alpha("#2e7d32", 0.1),
            }}
          >
            <Grid container spacing={3} sx={{ alignItems: "center" }}>
              <Grid size={{ xs: 12, md: 8 }}>
                <Stack spacing={1.5}>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    Need help with a donation?
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    If you want to make a larger contribution, donate through a
                    different channel, or support with supplies instead of cash,
                    reach out directly and the team will guide you.
                  </Typography>
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Stack
                  direction={{ xs: "column", sm: "row", md: "column" }}
                  spacing={1.5}
                >
                  <Button
                    component="a"
                    href={`tel:${bkashNumber.replace(/\s+/g, "")}`}
                    variant="contained"
                    color="success"
                    sx={{ textTransform: "none", fontWeight: 700 }}
                  >
                    Call Donation Support
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/contact_us"
                    variant="outlined"
                    color="success"
                    sx={{ textTransform: "none", fontWeight: 700 }}
                  >
                    Go to Contact Page
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
};

export default Make_Donation;
