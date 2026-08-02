import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { alpha } from "@mui/material/styles";
import { Link as RouterLink } from "react-router";
import { getStories } from "../../../API/api";

const milestones = [
  {
    number: "120+",
    label: "Pets helped through rescue, treatment, and rehoming support",
  },
  {
    number: "45+",
    label: "Community members engaged through adoption and care awareness",
  },
  {
    number: "24/7",
    label: "Response mindset for urgent rescue and care coordination",
  },
];

const storyCards = [
  {
    title: "From Street Survival to Safe Recovery",
    description:
      "Many pets first reach Happy Paws BD in difficult condition. Success starts with rescue, gentle handling, treatment planning, and patient recovery support.",
  },
  {
    title: "Adoption Matches That Actually Fit",
    description:
      "The best outcomes come from thoughtful matching, not rushed placement. Families, routines, home readiness, and animal temperament all matter.",
  },
  {
    title: "Community Support Multiplies Impact",
    description:
      "Every donation, volunteer hour, shared post, and transport offer helps create one more real success story for a pet in need.",
  },
];

const progressSteps = [
  "Rescue and immediate stabilization",
  "Medical care, nutrition, and observation",
  "Behavior and recovery support",
  "Adoption preparation or long-term care planning",
];

const Our_Success_Story = () => {
  const [selectedStory, setSelectedStory] = useState(null);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["stories", "success", "featured"],
    queryFn: () =>
      getStories({
        category: "success",
        featured: true,
        page: 1,
        limit: 6,
      }),
  });

  const stories = useMemo(() => data?.items ?? [], [data?.items]);
  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, #f8fbf7 0%, #eef7ea 48%, #f8fbf7 100%)",
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
                "linear-gradient(135deg, rgba(232, 245, 233, 0.9) 0%, rgba(255,255,255,1) 100%)",
              boxShadow: "0 18px 44px rgba(46, 125, 50, 0.08)",
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <Stack spacing={2.25}>
                  <Chip
                    icon={<PetsOutlinedIcon />}
                    label="Real Stories, Real Impact"
                    color="success"
                    variant="outlined"
                    sx={{
                      width: "fit-content",
                      borderRadius: 999,
                      bgcolor: alpha("#2e7d32", 0.05),
                    }}
                  />

                  <Typography variant="h3" fontWeight={800}>
                    Every rescue journey is built one small win at a time
                  </Typography>

                  <Typography variant="body1" color="text.secondary">
                    Happy Paws BD success is not only about adoption. It is also
                    about healing injured animals, helping lost pets return
                    home, supporting families with care guidance, and building a
                    kinder community for animals.
                  </Typography>

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <Button
                      component={RouterLink}
                      to="/share_your_story"
                      variant="contained"
                      color="success"
                      endIcon={<ArrowForwardOutlinedIcon />}
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Share a Story
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/make_donation"
                      variant="outlined"
                      color="success"
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Help Create More Wins
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
                      What success looks like here
                    </Typography>

                    {progressSteps.map((step) => (
                      <Stack
                        key={step}
                        direction="row"
                        spacing={1.25}
                        alignItems="flex-start"
                      >
                        <CheckCircleOutlineOutlinedIcon color="success" />
                        <Typography variant="body2" color="text.secondary">
                          {step}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Paper>

          <Grid container spacing={2}>
            {milestones.map((item) => (
              <Grid item xs={12} md={4} key={item.label}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: alpha("#2e7d32", 0.1),
                    height: "100%",
                  }}
                >
                  <Stack spacing={1}>
                    <Typography variant="h3" color="success.main" fontWeight={900}>
                      {item.number}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.label}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={2}>
            {storyCards.map((story) => (
              <Grid item xs={12} md={4} key={story.title}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: alpha("#2e7d32", 0.1),
                    height: "100%",
                  }}
                >
                  <Stack spacing={1.5}>
                    <FavoriteBorderOutlinedIcon color="success" />
                    <Typography variant="h6" fontWeight={700}>
                      {story.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {story.description}
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
              borderRadius: 4,
              border: "1px solid",
              borderColor: alpha("#2e7d32", 0.1),
            }}
          >
            <Stack spacing={2}>
              <Typography variant="h5" fontWeight={800}>
                Featured success stories
              </Typography>
              <Typography variant="body2" color="text.secondary">
                These stories are managed from the admin panel so they stay up to
                date as new rescues, recoveries, and adoptions happen.
              </Typography>

              {isLoading ? (
                <Typography color="text.secondary">Loading stories...</Typography>
              ) : isError ? (
                <Typography color="text.secondary">
                  Stories are unavailable right now.
                </Typography>
              ) : stories.length ? (
                <Grid container spacing={2}>
                  {stories.map((entry) => (
                    <Grid item xs={12} md={6} key={entry._id || entry.id}>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 2.5,
                          borderRadius: 3,
                          height: "100%",
                          borderColor: alpha("#2e7d32", 0.12),
                        }}
                      >
                        <Stack spacing={1}>
                          <Typography fontWeight={800}>
                            {entry.title || "Story"}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {entry.excerpt ||
                              String(entry.story || "").slice(0, 140) + "..."}
                          </Typography>
                          <Box pt={0.5}>
                            <Button
                              size="small"
                              color="success"
                              onClick={() => setSelectedStory(entry)}
                            >
                              Read full story
                            </Button>
                          </Box>
                        </Stack>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography color="text.secondary">
                  No stories have been published yet.
                </Typography>
              )}
            </Stack>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 4,
              border: "1px solid",
              borderColor: alpha("#2e7d32", 0.1),
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8}>
                <Stack spacing={1.25}>
                  <Typography variant="h5" fontWeight={800}>
                    Want to be part of the next success story?
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    You can help through donations, volunteering, adoption
                    support, transport coordination, or simply by sharing the
                    stories that deserve to be seen.
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack
                  direction={{ xs: "column", sm: "row", md: "column" }}
                  spacing={1.5}
                >
                  <Button
                    component={RouterLink}
                    to="/volunteer"
                    variant="contained"
                    color="success"
                    startIcon={<VolunteerActivismOutlinedIcon />}
                    sx={{ textTransform: "none", fontWeight: 700 }}
                  >
                    Volunteer With Us
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/adoption"
                    variant="outlined"
                    color="success"
                    sx={{ textTransform: "none", fontWeight: 700 }}
                  >
                    Explore Adoption
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Stack>
      </Box>

      <Dialog
        open={Boolean(selectedStory)}
        onClose={() => setSelectedStory(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 900 }}>
          {selectedStory?.title || "Story"}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={1.5}>
            {selectedStory?.petName ? (
              <Typography variant="body2" color="text.secondary">
                Pet: {selectedStory.petName}
              </Typography>
            ) : null}
            {selectedStory?.authorName ? (
              <Typography variant="body2" color="text.secondary">
                By {selectedStory.authorName}
              </Typography>
            ) : null}
            <Typography
              variant="body1"
              sx={{ whiteSpace: "pre-line", color: "text.primary" }}
            >
              {selectedStory?.story || ""}
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedStory(null)} color="success">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Our_Success_Story;
