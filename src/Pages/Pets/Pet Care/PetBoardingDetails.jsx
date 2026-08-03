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
import { boardingApplication, getProgram } from "../../../API/api";
import ContentState from "../../../Components/Common/ContentState";

const PetBoardingDetails = () => {
  const { id } = useParams();
  const { user } = useUserAuth();
  const [item, setItem] = useState(null);
  const [isLoadingItem, setIsLoadingItem] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [boarding, setBoarding] = useState({
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

    setBoarding((current) => ({
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
        const response = await getProgram("boarding", id);

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
          error?.response?.data?.message || "Could not load this boarding program."
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
    setBoarding({ ...boarding, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!item) {
      return;
    }

    setIsSubmitting(true);

    try {
      await boardingApplication(
        {
          ...boarding,
          programId: item.id,
        },
        item.id
      );

      setBoarding({
        name: user.displayName || "",
        contactEmail: user.email || "",
        contactPhone: "",
        address: "",
      });
      setFeedback({
        open: true,
        severity: "success",
        message: "Your boarding enrollment has been submitted successfully.",
      });
    } catch (error) {
      setFeedback({
        open: true,
        severity: "error",
        message: "Could not submit your boarding request right now. Please try again.",
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
            Loading boarding program...
          </Typography>
        </Paper>
      </Box>
    );
  }

  if (!item) {
    return (
      <Box className="myContainer" sx={{ my: 5 }}>
        <ContentState
          title="Boarding program not found"
          description={
            loadError ||
            "The boarding option you requested is unavailable or may have moved. Please return to the boarding page and choose another option."
          }
          actionLabel="Back to Boarding"
          actionTo="/petcare/boarding"
          severity="warning"
        />
      </Box>
    );
  }

  return (
    <Box className="myContainer" sx={{ my: 5 }}>
      <Stack spacing={3}>
        <Stack spacing={1} sx={{ textAlign: "center" }}>
          <Typography variant="h3" fontWeight={800} color="primary.headline">
            {item.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Review what&apos;s included, then submit your request to reserve this
            boarding service for your pet.
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

                <Typography variant="body1" color="text.secondary">
                  {item.description}
                </Typography>

                <Box>
                  <Typography variant="body1" paragraph>
                    <strong>Duration:</strong> {item.duration}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Price:</strong> {item.price}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    <strong>Program Covers:</strong> {item.programCovers}
                  </Typography>
                </Box>

                {item.additionalServices ? (
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                      Additional Services
                    </Typography>
                    <List disablePadding>
                      {item.additionalServices.map((detail) => (
                        <ListItem key={detail} sx={{ px: 0, alignItems: "flex-start" }}>
                          <ListItemText primary={detail} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ) : null}

                {item.specialFeatures ? (
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                      Special Features
                    </Typography>
                    <List disablePadding>
                      {item.specialFeatures.map((detail) => (
                        <ListItem key={detail} sx={{ px: 0, alignItems: "flex-start" }}>
                          <ListItemText primary={detail} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ) : null}
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h5" gutterBottom color="primary.main" fontWeight={700}>
                Request This Boarding Service
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Share your details and we&apos;ll follow up about availability,
                scheduling, and any care instructions for your pet.
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      required
                      name="name"
                      value={boarding.name}
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
                      value={boarding.contactEmail}
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
                      value={boarding.contactPhone}
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
                      value={boarding.address}
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
                  {isSubmitting ? "Submitting Request..." : "Request Boarding Service"}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default PetBoardingDetails;
