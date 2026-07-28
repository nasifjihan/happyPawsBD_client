import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { alpha } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

const storyTips = [
  "Tell us who the pet is and how you met.",
  "Share one turning point that made the story meaningful.",
  "Add what changed after rescue, care, or adoption.",
  "Include a hopeful message others can learn from.",
];

const storyThemes = [
  {
    title: "Rescue Journey",
    description:
      "Stories of care, recovery, and the people who showed up when it mattered most.",
    icon: <PetsOutlinedIcon color="success" />,
  },
  {
    title: "Adoption Happiness",
    description:
      "Moments when the right family and the right pet finally found each other.",
    icon: <AutoStoriesOutlinedIcon color="success" />,
  },
  {
    title: "Community Kindness",
    description:
      "Small acts of support that turned into something much bigger for an animal in need.",
    icon: <CampaignOutlinedIcon color="success" />,
  },
];

const Share_Your_Story = () => {
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
              borderRadius: 4,
              border: "1px solid",
              borderColor: alpha("#2e7d32", 0.12),
              background:
                "linear-gradient(135deg, rgba(232, 245, 233, 0.92) 0%, rgba(255,255,255,1) 100%)",
              boxShadow: "0 18px 44px rgba(46, 125, 50, 0.08)",
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <Stack spacing={2.25}>
                  <Chip
                    icon={<AutoStoriesOutlinedIcon />}
                    label="Let More People See the Good"
                    color="success"
                    variant="outlined"
                    sx={{
                      width: "fit-content",
                      borderRadius: 999,
                      bgcolor: alpha("#2e7d32", 0.05),
                    }}
                  />

                  <Typography variant="h3" fontWeight={800}>
                    Share a story that can inspire care, adoption, and hope
                  </Typography>

                  <Typography variant="body1" color="text.secondary">
                    If Happy Paws BD helped a pet you love, supported a rescue,
                    or encouraged a meaningful adoption journey, your story can
                    help more people trust the process and join the mission.
                  </Typography>

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <Button
                      component="a"
                      href="mailto:contact@happypawsbd.com?subject=Share%20My%20Happy%20Paws%20BD%20Story"
                      variant="contained"
                      color="success"
                      endIcon={<ArrowForwardOutlinedIcon />}
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Send Your Story
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/our_success_story"
                      variant="outlined"
                      color="success"
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Read Success Stories
                    </Button>
                  </Stack>
                </Stack>
              </Grid>

              <Grid item xs={12} md={5}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    bgcolor: "#fff",
                    borderColor: alpha("#2e7d32", 0.12),
                  }}
                >
                  <Stack spacing={2}>
                    <Typography variant="h6" fontWeight={700}>
                      Story guide
                    </Typography>

                    {storyTips.map((tip) => (
                      <Stack key={tip} direction="row" spacing={1.25}>
                        <Chip
                          label="Tip"
                          color="success"
                          size="small"
                          sx={{ fontWeight: 700 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {tip}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Paper>

          <Grid container spacing={2}>
            {storyThemes.map((theme) => (
              <Grid item xs={12} md={4} key={theme.title}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    height: "100%",
                    border: "1px solid",
                    borderColor: alpha("#2e7d32", 0.1),
                  }}
                >
                  <Stack spacing={1.5}>
                    <Box>{theme.icon}</Box>
                    <Typography variant="h6" fontWeight={700}>
                      {theme.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {theme.description}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: alpha("#2e7d32", 0.1),
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5" fontWeight={800}>
                    Draft your story
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This first version gives visitors a strong place to begin.
                    You can send the story by email now, and we can later
                    connect this page to an admin-managed submission workflow.
                  </Typography>

                  <TextField label="Your name" placeholder="Enter your name" />
                  <TextField
                    label="Pet or story title"
                    placeholder="Example: Luna's second chance"
                  />
                  <TextField
                    label="Short summary"
                    placeholder="A one or two sentence summary"
                  />
                  <TextField
                    label="Your story"
                    placeholder="Write the story you want to share"
                    multiline
                    minRows={6}
                  />

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <Button
                      component="a"
                      href="mailto:contact@happypawsbd.com?subject=Share%20My%20Happy%20Paws%20BD%20Story"
                      variant="contained"
                      color="success"
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Send by Email
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/contact_us"
                      variant="outlined"
                      color="success"
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Open Contact Page
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>

            <Grid item xs={12} lg={5}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: alpha("#2e7d32", 0.1),
                  height: "100%",
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5" fontWeight={800}>
                    What makes a strong submission
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    The best stories are personal, clear, and grounded in real
                    moments. They do not have to be long. They just need heart,
                    honesty, and enough detail for others to connect with them.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    If you also have photos, a rescue timeline, or an adoption
                    update, include them when you contact the team so the story
                    can later be featured more fully.
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
};

export default Share_Your_Story;
