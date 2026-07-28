import {
  Box,
  Button,
  Chip,
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
              borderRadius: 4,
              border: "1px solid",
              borderColor: alpha("#2e7d32", 0.12),
              background:
                "linear-gradient(135deg, rgba(245, 250, 243, 1) 0%, rgba(255,255,255,1) 100%)",
              boxShadow: "0 18px 44px rgba(46, 125, 50, 0.08)",
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
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

                  <Typography variant="h3" fontWeight={800}>
                    A quiet space to honor the pets who stay with us
                  </Typography>

                  <Typography variant="body1" color="text.secondary">
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
                      Tribute prompts
                    </Typography>

                    {tributePrompts.map((prompt) => (
                      <Stack
                        key={prompt}
                        direction="row"
                        spacing={1.25}
                        alignItems="flex-start"
                      >
                        <FavoriteBorderOutlinedIcon color="success" />
                        <Typography variant="body2" color="text.secondary">
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
              <Grid item xs={12} md={4} key={item.title}>
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
                    <Box>{item.icon}</Box>
                    <Typography variant="h6" fontWeight={700}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
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
              borderRadius: 4,
              border: "1px solid",
              borderColor: alpha("#2e7d32", 0.1),
            }}
          >
            <Stack spacing={2}>
              <Typography variant="h5" fontWeight={800}>
                Why this page matters
              </Typography>
              <Typography variant="body1" color="text.secondary">
                For many people, grief after losing a pet is real and lasting.
                Making space for remembrance helps keep that bond visible,
                valued, and connected to future acts of care for animals still
                waiting for help.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Over time, this page can grow into a collection of community
                tributes that honor animals and gently encourage others to adopt
                kindly, care responsibly, and remember deeply.
              </Typography>
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
};

export default Remembrance;
