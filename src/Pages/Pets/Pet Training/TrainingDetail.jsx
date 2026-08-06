import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useUserAuth } from "../../../context/UserAuthContext";
import { getProgram, trainingApplication } from "../../../API/api";
import ContentState from "../../../Components/Common/ContentState";

const TrainingDetail = () => {
  const { id } = useParams();
  const { user } = useUserAuth();
  const [item, setItem] = useState(null);
  const [isLoadingItem, setIsLoadingItem] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [training, setTraining] = useState({
    name: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
  });
  const [feedback, setFeedback] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    setTraining((current) => ({
      ...current,
      name: user.displayName || current.name,
      contactEmail: user.email || current.contactEmail,
    }));
  }, [user]);

  useEffect(() => {
    let isActive = true;

    (async () => {
      try {
        setIsLoadingItem(true);
        const response = await getProgram("training", id);

        if (!isActive) {
          return;
        }

        setItem(response || null);
        setLoadError("");
      } catch (error) {
        if (!isActive) {
          return;
        }

        setItem(null);
        setLoadError(
          error?.response?.data?.message || "Could not load this training program."
        );
      } finally {
        if (isActive) {
          setIsLoadingItem(false);
        }
      }
    })();

    return () => {
      isActive = false;
    };
  }, [id]);

  const handleChange = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!item) {
      return;
    }

    setIsSubmitting(true);

    try {
      await trainingApplication(
        {
          ...training,
          programId: item.id,
        },
        item.id
      );

      setTraining({
        name: user?.displayName || "",
        contactEmail: user?.email || "",
        contactPhone: "",
        address: "",
      });
      setFeedback({
        open: true,
        severity: "success",
        message: "Your training enrollment has been submitted successfully.",
      });
    } catch (error) {
      setFeedback({
        open: true,
        severity: "error",
        message: "Could not submit your enrollment right now. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingItem) {
    return (
      <Box className="myContainer" sx={{ my: 5 }}>
        <Paper sx={{ p: 3, borderRadius: 4 }}>
          <Typography sx={{ color: "text.secondary" }}>Loading training program...</Typography>
        </Paper>
      </Box>
    );
  }

  if (!item) {
    return (
      <Box className="myContainer" sx={{ my: 5 }}>
        <ContentState
          title="Training program not found"
          description={
            loadError ||
            "The program you requested is unavailable or may have moved. Please return to the training page and choose another option."
          }
          actionLabel="Back to Training"
          actionTo="/pet_training"
          severity="warning"
        />
      </Box>
    );
  }

  return (
    <Box className="myContainer" sx={{ my: 5 }}>
      <Stack spacing={3}>
        <Stack spacing={1} sx={{ textAlign: "center" }}>
          <Typography variant="h3" sx={{ color: "primary.headline", fontWeight: 800 }}>
            {item.title}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Review the program details below, then complete the enrollment form to
            request your place.
          </Typography>
        </Stack>

        {feedback.open ? (
          <Alert
            severity={feedback.severity}
            onClose={() => setFeedback((current) => ({ ...current, open: false }))}
          >
            {feedback.message}
          </Alert>
        ) : null}

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper variant="outlined" sx={{ overflow: "hidden", borderRadius: 3 }}>
              <Box
                component="img"
                src={item.picture}
                alt={item.title}
                sx={{ width: "100%", display: "block" }}
              />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: "100%" }}>
              <Stack spacing={2}>
                <Typography variant="h5" sx={{ color: "success.main", fontWeight: 700 }}>
                  Program Overview
                </Typography>

                <List disablePadding>
                  {[item.dis1, item.dis2, item.dis3].filter(Boolean).map((detail) => (
                    <ListItem key={detail} sx={{ px: 0, alignItems: "flex-start" }}>
                      <ListItemText primary={detail} />
                    </ListItem>
                  ))}
                </List>

                <Box>
                  <Typography variant="body1" paragraph>
                    <strong>Duration:</strong> {item.duration || "To be confirmed"}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Price:</strong> {item.price || "To be confirmed"}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Program Covers:</strong>{" "}
                    {item.programCovers ||
                      "Training details will be shared after enrollment."}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h5" sx={{ mb: 1, color: "primary.main", fontWeight: 700 }}>
                Enroll in This Program
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
                Submit your details and our team can follow up with next steps and
                scheduling guidance.
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      required
                      name="name"
                      value={training.name}
                      onChange={handleChange}
                      autoComplete="name"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      required
                      name="contactEmail"
                      value={training.contactEmail}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      type="tel"
                      required
                      name="contactPhone"
                      value={training.contactPhone}
                      onChange={handleChange}
                      autoComplete="tel"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Address"
                      required
                      name="address"
                      value={training.address}
                      onChange={handleChange}
                      autoComplete="street-address"
                    />
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 3, fontWeight: 700 }}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting Request..." : "Request Training Enrollment"}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default TrainingDetail;
