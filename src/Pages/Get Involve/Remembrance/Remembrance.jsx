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
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import CandlestickChartOutlinedIcon from "@mui/icons-material/CandlestickChartOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { alpha } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { getStories } from "../../../API/api";

const remembranceIdeas = [
  {
    title: "Share a Memory",
    description:
      "Tell the story of a pet you loved, helped, rescued, fostered, or never forgot.",
    icon: <AutoStoriesOutlinedIcon color="success" />,
  },
  {
    title: "Honor Their Impact",
    description:
      "Celebrate how a pet changed your family, your routine, or your understanding of care and compassion.",
    icon: <FavoriteBorderOutlinedIcon color="success" />,
  },
  {
    title: "Support Another Life",
    description:
      "A remembrance donation or volunteer action can help another animal receive the care your pet once knew.",
    icon: <WbSunnyOutlinedIcon color="success" />,
  },
];

const tributePrompts = [
  "What made this pet special to you?",
  "What is one memory you always return to?",
  "What would you want others to know about their life?",
  "How would you like their story to inspire kindness toward animals?",
];

const Remembrance = () => {
  const [selectedTribute, setSelectedTribute] = useState(null);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["stories", "remembrance", "featured"],
    queryFn: () =>
      getStories({
        category: "remembrance",
        featured: true,
        page: 1,
        limit: 6,
      }),
  });

  const tributes = useMemo(() => data?.items ?? [], [data?.items]);
  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, #fbfcfa 0%, #f2f8ef 48%, #f9fcf8 100%)",
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
                "linear-gradient(135deg, rgba(245, 250, 243, 1) 0%, rgba(255,255,255,1) 100%)",
              boxShadow: "0 18px 44px rgba(46, 125, 50, 0.08)",
            }}
          >
            <Grid container spacing={4} sx={{ alignItems: "center" }}>
              <Grid size={{ xs: 12, md: 7 }}>
                <Stack spacing={2.25}>
                  <Chip
                    icon={<CandlestickChartOutlinedIcon />}
                    label="Remember With Compassion"
                    color="success"
                    variant="outlined"
                    sx={{
                      width: "fit-content",
                      borderRadius: 999,
                      bgcolor: alpha("#2e7d32", 0.05),
                    }}
                  />

                  <Typography variant="h3" sx={{ fontWeight: 800 }}>
                    A quiet space to honor the pets who stay with us
                  </Typography>

                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Remembrance is for the animals who shaped our homes, our
                    hearts, and our lives. Whether your memory is joyful,
                    bittersweet, or still healing, this space is meant to hold
                    it with respect and warmth.
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
                      Share a Tribute
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/make_donation"
                      variant="outlined"
                      color="success"
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Donate in Their Memory
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
                      Tribute prompts
                    </Typography>

                    {tributePrompts.map((prompt) => (
                      <Stack
                        key={prompt}
                        direction="row"
                        spacing={1.25}
                        sx={{ alignItems: "flex-start" }}
                      >
                        <FavoriteBorderOutlinedIcon color="success" />
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          {prompt}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Paper>

          <Grid container spacing={2}>
            {remembranceIdeas.map((item) => (
              <Grid key={item.title} size={{ xs: 12, md: 4 }}>
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
                    <Box>{item.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {item.description}
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
            <Stack spacing={2}>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                Community tributes
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Tributes are reviewed and published by the admin team to keep this
                space respectful and supportive.
              </Typography>

              {isLoading ? (
                <Typography sx={{ color: "text.secondary" }}>Loading tributes...</Typography>
              ) : isError ? (
                <Typography sx={{ color: "text.secondary" }}>
                  Tributes are unavailable right now.
                </Typography>
              ) : tributes.length ? (
                <Grid container spacing={2}>
                  {tributes.map((entry) => (
                    <Grid key={entry._id || entry.id} size={{ xs: 12, md: 6 }}>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 2.5,
                          height: "100%",
                          borderColor: alpha("#2e7d32", 0.12),
                        }}
                      >
                        <Stack spacing={1}>
                          <Typography sx={{ fontWeight: 800 }}>
                            {entry.title || "Tribute"}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            {entry.excerpt ||
                              String(entry.story || "").slice(0, 140) + "..."}
                          </Typography>
                          <Box sx={{ pt: 0.5 }}>
                            <Button
                              size="small"
                              color="success"
                              onClick={() => setSelectedTribute(entry)}
                            >
                              Read tribute
                            </Button>
                          </Box>
                        </Stack>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography sx={{ color: "text.secondary" }}>
                  No tributes have been published yet.
                </Typography>
              )}
            </Stack>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              border: "1px solid",
              borderColor: alpha("#2e7d32", 0.1),
            }}
          >
            <Stack spacing={2}>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                Why this page matters
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                For many people, grief after losing a pet is real and lasting.
                Making space for remembrance helps keep that bond visible,
                valued, and connected to future acts of care for animals still
                waiting for help.
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Over time, this page can grow into a collection of community
                tributes that honor animals and gently encourage others to adopt
                kindly, care responsibly, and remember deeply.
              </Typography>
            </Stack>
          </Paper>
        </Stack>
      </Box>

      <Dialog
        open={Boolean(selectedTribute)}
        onClose={() => setSelectedTribute(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 900 }}>
          {selectedTribute?.title || "Tribute"}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={1.5}>
            {selectedTribute?.petName ? (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Pet: {selectedTribute.petName}
              </Typography>
            ) : null}
            {selectedTribute?.authorName ? (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                By {selectedTribute.authorName}
              </Typography>
            ) : null}
            <Typography
              variant="body1"
              sx={{ whiteSpace: "pre-line", color: "text.primary" }}
            >
              {selectedTribute?.story || ""}
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedTribute(null)} color="success">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Remembrance;
