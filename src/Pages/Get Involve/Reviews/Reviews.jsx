import { useEffect, useMemo, useState } from "react";
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

import { getApprovedReviews, submitReview } from "../../../API/api";

const Reviews = () => {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [publishedReviews, setPublishedReviews] = useState([]);
  const [isLoadingPublished, setIsLoadingPublished] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isActive = true;

    (async () => {
      try {
        setIsLoadingPublished(true);
        const response = await getApprovedReviews({ page: 1, limit: 6 });

        if (!isActive) {
          return;
        }

        setPublishedReviews(response?.items ?? []);
        setLoadError("");
      } catch (error) {
        if (!isActive) {
          return;
        }

        setLoadError(
          error?.response?.data?.message || "Could not load community reviews."
        );
      } finally {
        if (isActive) {
          setIsLoadingPublished(false);
        }
      }
    })();

    return () => {
      isActive = false;
    };
  }, []);

  const canSubmit = useMemo(
    () =>
      Boolean(name.trim()) &&
      Boolean(title.trim()) &&
      Boolean(message.trim()) &&
      Number(rating) > 0,
    [message, name, rating, title]
  );

  const handleSend = async () => {
    if (!canSubmit || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await submitReview({
        fullName: name.trim(),
        contactEmail: contactEmail.trim() ? contactEmail.trim() : undefined,
        rating,
        title: title.trim(),
        message: message.trim(),
      });
      setShowSuccess(true);
      setName("");
      setContactEmail("");
      setTitle("");
      setMessage("");
      setRating(5);
    } catch (error) {
      setSubmitError(
        error?.response?.data?.message || "Could not submit your review."
      );
    } finally {
      setIsSubmitting(false);
    }
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
            <Grid container spacing={4} sx={{ alignItems: "center" }}>
              <Grid size={{ xs: 12, md: 7 }}>
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

                  <Typography variant="h3" sx={{ fontWeight: 800 }}>
                    Real feedback builds trust and helps more pets
                  </Typography>

                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
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

              <Grid size={{ xs: 12, md: 5 }}>
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
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
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
                        sx={{ alignItems: "flex-start" }}
                      >
                        <FavoriteBorderOutlinedIcon color="success" />
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
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
            <Grid size={{ xs: 12, lg: 7 }}>
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
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    Leave a review
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Reviews are moderated before publishing. Submissions help us
                    improve and build trust with the community.
                  </Typography>

                  <TextField
                    label="Your name"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <TextField
                    label="Email (optional)"
                    value={contactEmail}
                    onChange={(event) => setContactEmail(event.target.value)}
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
                    sx={{ alignItems: { xs: "stretch", sm: "center" } }}
                  >
                    <Typography sx={{ fontWeight: 700 }}>Rating</Typography>
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

                  {submitError ? (
                    <Alert severity="warning">{submitError}</Alert>
                  ) : null}

                  {!canSubmit ? (
                    <Alert severity="info">
                      Add your name, title, and review message to submit.
                    </Alert>
                  ) : null}

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <Button
                      onClick={handleSend}
                      variant="contained"
                      color="success"
                      disabled={!canSubmit || isSubmitting}
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Review"}
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

            <Grid size={{ xs: 12, lg: 5 }}>
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
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      Recent community notes
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      Verified reviews are published after moderation.
                    </Typography>
                  </Stack>
                </Paper>

                <Stack spacing={2} sx={{ flex: 1 }}>
                  {loadError ? (
                    <Alert severity="warning">{loadError}</Alert>
                  ) : null}

                  {isLoadingPublished ? (
                    <Typography sx={{ color: "text.secondary" }}>Loading reviews...</Typography>
                  ) : null}

                  {!isLoadingPublished && !publishedReviews.length ? (
                    <Typography sx={{ color: "text.secondary" }}>
                      No verified reviews published yet.
                    </Typography>
                  ) : null}

                  {publishedReviews.map((review) => (
                    <Paper
                      key={review._id || review.title}
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: 4,
                        border: "1px solid",
                        borderColor: alpha("#2e7d32", 0.1),
                      }}
                    >
                      <Stack spacing={1}>
                        <Typography sx={{ fontWeight: 800 }}>{review.title || "Review"}</Typography>
                        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                          <Rating
                            value={Number(review.rating || 0)}
                            readOnly
                            size="small"
                          />
                          <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            {review.fullName || "Community member"}
                          </Typography>
                        </Stack>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          {review.message || ""}
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
          Review submitted. We’ll publish it after admin approval.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Reviews;
