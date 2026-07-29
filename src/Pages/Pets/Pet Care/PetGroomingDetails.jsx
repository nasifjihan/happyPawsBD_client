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
import { getProgram, groomingApplication } from "../../../API/api";
import ContentState from "../../../Components/Common/ContentState";

const PetGroomingDetails = () => {
  const { id } = useParams();
  const { user } = useUserAuth();
  const [item, setItem] = useState(null);
  const [isLoadingItem, setIsLoadingItem] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [grooming, setGrooming] = useState({
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

    setGrooming((current) => ({
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
        const response = await getProgram("grooming", id);

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
          error?.response?.data?.message || "Could not load this grooming program."
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
    setGrooming({ ...grooming, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!item) {
      return;
    }

    setIsSubmitting(true);

    try {
      await groomingApplication(
        {
          ...grooming,
          programId: item.id,
        },
        item.id
      );

      setGrooming({
        name: user.displayName || "",
        contactEmail: user.email || "",
        contactPhone: "",
        address: "",
      });
      setFeedback({
        open: true,
        severity: "success",
        message: "Your grooming enrollment has been submitted successfully.",
      });
    } catch (error) {
      setFeedback({
        open: true,
        severity: "error",
        message: "Could not submit your grooming request right now. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingItem) {
    return (
      <Box className="myContainer" sx={{ my: 5 }}>
        <Paper sx={{ p: 3, borderRadius: 4 }}>
          <Typography color="text.secondary">
            Loading grooming program...
          </Typography>
        </Paper>
      </Box>
    );
  }

  if (!item) {
    return (
      <Box className="myContainer" sx={{ my: 5 }}>
        <ContentState
          title="Grooming program not found"
          description={
            loadError ||
            "The grooming service you requested is unavailable or may have moved. Please return to the grooming page and choose another option."
          }
          actionLabel="Back to Grooming"
          actionTo="/petcare/grooming"
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
            Review what&apos;s included, then submit your request to reserve this
            grooming service for your pet.
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
                  Service Overview
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
                    <strong>Duration:</strong>{" "}
                    {item.duration || item.Duration || "Contact us for an estimated duration."}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Price:</strong>{" "}
                    {item.price || item.Price || "Contact us for a quote."}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Program Covers:</strong>{" "}
                    {item.programCovers || "Contact us to confirm what is included."}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h5" gutterBottom color="primary.main" fontWeight={700}>
                Request This Grooming Service
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Share your details and we&apos;ll follow up about scheduling and
                availability.
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      required
                      name="name"
                      value={grooming.name}
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
                      value={grooming.contactEmail}
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
                      value={grooming.contactPhone}
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
                      value={grooming.address}
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
                  {isSubmitting ? "Submitting Request..." : "Request Grooming Service"}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default PetGroomingDetails;
