import React, { useEffect, useMemo, useState } from "react";
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
import Training from "./../../../API/training.json";
import { trainingApplication } from "../../../API/api";
import ContentState from "../../../Components/Common/ContentState";

const programMeta = {
  1: {
    duration: "6 weeks",
    price: "BDT 4,500",
    covers: "Sit, stay, recall, leash manners, and owner communication basics.",
  },
  2: {
    duration: "4 weeks",
    price: "BDT 3,000",
    covers: "Routine building, potty cues, crate support, and home consistency tips.",
  },
  3: {
    duration: "5 weeks",
    price: "BDT 3,800",
    covers: "Loose-leash walking, outdoor focus, and calmer public walks.",
  },
  4: {
    duration: "5 weeks",
    price: "BDT 4,000",
    covers: "Confidence building, healthy introductions, and positive exposure work.",
  },
  5: {
    duration: "8 weeks",
    price: "BDT 6,000",
    covers: "Behavior assessment, redirection plans, and ongoing owner guidance.",
  },
  6: {
    duration: "Custom schedule",
    price: "Consultation required",
    covers: "Trainer assessment, suitability review, and closely supervised guidance.",
  },
};

const TrainingDetail = () => {
  const { id } = useParams();
  const { user } = useUserAuth();
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

  const item = useMemo(
    () => Training.find((program) => program.id === Number.parseInt(id, 10)),
    [id]
  );

  const itemMeta = item ? programMeta[item.id] : null;

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

  if (!item) {
    return (
      <Box className="myContainer" sx={{ my: 5 }}>
        <ContentState
          title="Training program not found"
          description="The program you requested is unavailable or may have moved. Please return to the training page and choose another option."
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
        <Stack spacing={1} textAlign="center">
          <Typography variant="h3" fontWeight={800} color="primary.headline">
            {item.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
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
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ overflow: "hidden", borderRadius: 3 }}>
              <img
                src={item.picture}
                alt={item.title}
                style={{ width: "100%", display: "block" }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: "100%" }}>
              <Stack spacing={2}>
                <Typography variant="h5" color="success.main" fontWeight={700}>
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
                    <strong>Duration:</strong> {itemMeta?.duration || "To be confirmed"}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Price:</strong> {itemMeta?.price || "To be confirmed"}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Program Covers:</strong>{" "}
                    {itemMeta?.covers || "Training details will be shared after enrollment."}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h5" gutterBottom color="primary.main" fontWeight={700}>
                Enroll in This Program
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Submit your details and our team can follow up with next steps and
                scheduling guidance.
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
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
                  <Grid item xs={12} md={6}>
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
                  <Grid item xs={12} md={6}>
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
                  <Grid item xs={12} md={6}>
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
                  {isSubmitting ? "Submitting Enrollment..." : "Accept Training Program"}
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
