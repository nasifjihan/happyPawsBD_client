import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Rating,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { alpha } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

const sampleReviews = [
  {
    name: "Happy Paws Supporter",
    rating: 5,
    title: "Quick rescue help and kind guidance",
    message:
      "The team responded fast and gave clear instructions. The follow-up support made a difficult situation much easier.",
  },
  {
    name: "Adoption Family",
    rating: 5,
    title: "A thoughtful adoption experience",
    message:
      "We felt supported from the first message to the final adoption step. Our pet settled in beautifully and we got great care tips.",
  },
  {
    name: "Volunteer",
    rating: 4,
    title: "Meaningful work with real impact",
    message:
      "The tasks are practical and the team communicates well. It’s rewarding to help in transport and community outreach.",
  },
];

const reviewEmail = "contact@happypawsbd.com";

const Reviews = () => {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("Happy Paws BD Review");
    const body = encodeURIComponent(
      `Name: ${name}\nRating: ${rating}/5\nTitle: ${title}\n\nReview:\n${message}\n`
    );

    return `mailto:${reviewEmail}?subject=${subject}&body=${body}`;
  }, [message, name, rating, title]);

  const canSubmit = Boolean(message.trim()) && Boolean(title.trim());

  const handleSend = () => {
    if (!canSubmit) {
      return;
    }

    setShowSuccess(true);
    setName("");
    setTitle("");
    setMessage("");
    setRating(5);
  };

  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, #f7fbf4 0%, #eef7ea 48%, #f8fbf7 100%)",
        pt: 4,
        pb: 6,
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
                "linear-gradient(135deg, rgba(232, 245, 233, 0.92) 0%, rgba(255, 255, 255, 1) 100%)",
              boxShadow: "0 18px 44px rgba(46, 125, 50, 0.08)",
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <Stack spacing={2.25}>
                  <Chip
                    icon={<RateReviewOutlinedIcon />}
                    label="Community Reviews"
                    color="success"
                    variant="outlined"
                    sx={{
                      width: "fit-content",
                      borderRadius: 999,
                      bgcolor: alpha("#2e7d32", 0.05),
                    }}
                  />

                  <Typography variant="h3" fontWeight={800}>
                    Real feedback builds trust and helps more pets
                  </Typography>

                  <Typography variant="body1" color="text.secondary">
                    If you’ve adopted, rescued, donated, volunteered, or received
                    guidance from Happy Paws BD, your review helps others feel
                    confident and supported.
                  </Typography>

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <Button
                      component={RouterLink}
                      to="/volunteer"
                      variant="contained"
                      color="success"
                      endIcon={<ArrowForwardOutlinedIcon />}
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Volunteer Next
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/share_your_story"
                      variant="outlined"
                      color="success"
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Share a Story Instead
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
                  <Stack spacing={1.5}>
                    <Typography variant="h6" fontWeight={700}>
                      What to include
                    </Typography>
                    {[
                      "How Happy Paws BD supported you or the pet",
                      "What went well during the process",
                      "A short suggestion (optional)",
                    ].map((item) => (
                      <Stack
                        key={item}
                        direction="row"
                        spacing={1.25}
                        alignItems="flex-start"
                      >
                        <FavoriteBorderOutlinedIcon color="success" />
                        <Typography variant="body2" color="text.secondary">
                          {item}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Paper>

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
                    Leave a review
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Reviews are collected via email for now. Later we can
                    connect this page to an admin-managed review workflow.
                  </Typography>

                  <TextField
                    label="Your name (optional)"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <TextField
                    label="Review title"
                    required
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />

                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    alignItems={{ xs: "stretch", sm: "center" }}
                  >
                    <Typography fontWeight={700}>Rating</Typography>
                    <Rating
                      value={rating}
                      onChange={(_, next) => setRating(next || 5)}
                    />
                  </Stack>

                  <TextField
                    label="Your review"
                    required
                    multiline
                    minRows={5}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                  />

                  {!canSubmit ? (
                    <Alert severity="info">
                      Add a title and a review message to enable sending.
                    </Alert>
                  ) : null}

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <Button
                      component="a"
                      href={mailtoHref}
                      onClick={handleSend}
                      variant="contained"
                      color="success"
                      disabled={!canSubmit}
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Send Review by Email
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/contact_us"
                      variant="outlined"
                      color="success"
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Contact Us
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>

            <Grid item xs={12} lg={5}>
              <Stack spacing={2} sx={{ height: "100%" }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: alpha("#2e7d32", 0.1),
                  }}
                >
                  <Stack spacing={1.25}>
                    <Typography variant="h5" fontWeight={800}>
                      Recent community notes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      These are sample reviews until we publish verified
                      community submissions.
                    </Typography>
                  </Stack>
                </Paper>

                <Stack spacing={2} sx={{ flex: 1 }}>
                  {sampleReviews.map((review) => (
                    <Paper
                      key={review.title}
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: 4,
                        border: "1px solid",
                        borderColor: alpha("#2e7d32", 0.1),
                      }}
                    >
                      <Stack spacing={1}>
                        <Typography fontWeight={800}>{review.title}</Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Rating
                            value={review.rating}
                            readOnly
                            size="small"
                          />
                          <Typography variant="body2" color="text.secondary">
                            {review.name}
                          </Typography>
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                          {review.message}
                        </Typography>
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>

      <Snackbar
        open={showSuccess}
        autoHideDuration={4000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          onClose={() => setShowSuccess(false)}
          sx={{ width: "100%" }}
        >
          Review draft prepared. Your email app will send it to Happy Paws BD.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Reviews;
