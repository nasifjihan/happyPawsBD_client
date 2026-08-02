import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { submitRescueAlert } from "../../../API/api";

const rescueSteps = [
  {
    title: "Report Quickly",
    description:
      "Share what happened, where the animal is located, and any visible injuries or urgent risks.",
  },
  {
    title: "Stay Safe",
    description:
      "Keep yourself safe first. If possible, remain nearby from a safe distance until help or guidance arrives.",
  },
  {
    title: "Help Us Coordinate",
    description:
      "Photos, landmarks, and short notes about the animal's condition can make rescue follow-up much faster.",
  },
];

const supportCards = [
  {
    title: "Emergency Contact",
    description:
      "For immediate assistance with an animal in urgent distress, call our emergency line right away.",
    actionLabel: "Call +880 1983794542",
    href: "tel:+8801983794542",
  },
  {
    title: "Coordinate with Our Team",
    description:
      "Need help explaining the situation or sending details? Reach our support team through the contact page.",
    actionLabel: "Contact Us",
    to: "/contact_us",
  },
  {
    title: "Check Lost & Found",
    description:
      "If the animal may be someone's missing pet, reviewing current lost and found listings can help reconnect families.",
    actionLabel: "View Lost & Found",
    to: "/lost_found",
  },
];

const RescueDetails = () => {
  const [form, setForm] = useState({
    reporterName: "",
    contactPhone: "",
    contactEmail: "",
    animalType: "",
    location: "",
    landmark: "",
    urgency: "medium",
    description: "",
    photo: null,
  });
  const [successId, setSuccessId] = useState(null);

  const mutation = useMutation({
    mutationFn: submitRescueAlert,
    onSuccess: (data) => {
      setSuccessId(data?.id || null);
      setForm({
        reporterName: "",
        contactPhone: "",
        contactEmail: "",
        animalType: "",
        location: "",
        landmark: "",
        urgency: "medium",
        description: "",
        photo: null,
      });
    },
  });

  const formData = useMemo(() => {
    const payload = new FormData();
    payload.append("reporterName", form.reporterName);
    payload.append("contactPhone", form.contactPhone);
    payload.append("contactEmail", form.contactEmail);
    payload.append("animalType", form.animalType);
    payload.append("location", form.location);
    payload.append("landmark", form.landmark);
    payload.append("urgency", form.urgency);
    payload.append("description", form.description);
    if (form.photo) {
      payload.append("photo", form.photo);
    }
    return payload;
  }, [form]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  return (
    <Box className="myContainer" sx={{ my: 5 }}>
      <Paper variant="outlined" sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
        <Stack spacing={2} textAlign="center" alignItems="center" mb={4}>
          <Typography variant="h4" color="primary.headline" fontWeight={900}>
            Make a Difference for Animals in Need
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760 }}>
            Happy Paws BD believes rescue works best when communities act early,
            share accurate information, and stay connected. Your report can help
            start the right response sooner.
          </Typography>
        </Stack>

        <Grid container spacing={2}>
          {rescueSteps.map((item) => (
            <Grid item xs={12} md={4} key={item.title}>
              <Paper
                variant="outlined"
                sx={{ p: 3, borderRadius: 3, height: "100%" }}
              >
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {supportCards.map((item) => (
            <Grid item xs={12} md={4} key={item.title}>
              <Paper
                variant="outlined"
                sx={{ p: 3, borderRadius: 3, height: "100%" }}
              >
                <Stack spacing={2} height="100%">
                  <Typography variant="h6" fontWeight={700}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                    {item.description}
                  </Typography>
                  <Button
                    component={item.to ? RouterLink : "a"}
                    to={item.to}
                    href={item.href}
                    variant="contained"
                    color="success"
                  >
                    {item.actionLabel}
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Stack spacing={1.5} alignItems="center" textAlign="center" sx={{ mt: 4 }}>
          <Typography variant="h5" color="primary.headline" fontWeight={800}>
            Together, We Can Respond Faster
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760 }}>
            Thank you for being part of a more compassionate rescue network. The
            earlier a report reaches the right people, the better the chances of
            safety, treatment, and reunification.
          </Typography>
        </Stack>

        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" fontWeight={900} textAlign="center" gutterBottom>
            Submit a Rescue Report
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{ maxWidth: 760, mx: "auto", mb: 3 }}
          >
            Share the location and condition details. Our team will review and follow
            up as quickly as possible.
          </Typography>

          {mutation.isError ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {mutation.error?.response?.data?.message ||
                "Could not submit rescue report."}
            </Alert>
          ) : null}

          {successId ? (
            <Alert severity="success" sx={{ mb: 2 }}>
              Report submitted. Reference ID: {successId}
            </Alert>
          ) : null}

          <Box
            component="form"
            onSubmit={(event) => {
              event.preventDefault();
              setSuccessId(null);
              mutation.mutate(formData);
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  name="reporterName"
                  label="Your Name"
                  value={form.reporterName}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="contactPhone"
                  label="Phone"
                  value={form.contactPhone}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="contactEmail"
                  label="Email (optional)"
                  value={form.contactEmail}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="animalType"
                  label="Animal Type"
                  value={form.animalType}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="location"
                  label="Location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="landmark"
                  label="Nearby Landmark (optional)"
                  value={form.landmark}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="urgency"
                  label="Urgency"
                  value={form.urgency}
                  onChange={handleChange}
                  select
                  fullWidth
                >
                  {["low", "medium", "high", "critical"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button variant="outlined" component="label" fullWidth sx={{ height: "100%" }}>
                  {form.photo ? "Photo Selected" : "Upload Photo (optional)"}
                  <input
                    hidden
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        photo: event.target.files?.[0] || null,
                      }))
                    }
                  />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="What happened / Current condition"
                  value={form.description}
                  onChange={handleChange}
                  required
                  fullWidth
                  multiline
                  minRows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => {
                      setSuccessId(null);
                      setForm({
                        reporterName: "",
                        contactPhone: "",
                        contactEmail: "",
                        animalType: "",
                        location: "",
                        landmark: "",
                        urgency: "medium",
                        description: "",
                        photo: null,
                      });
                    }}
                    disabled={mutation.isPending}
                    sx={{ fontWeight: 800 }}
                  >
                    Clear
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    disabled={mutation.isPending}
                    sx={{ fontWeight: 800 }}
                  >
                    {mutation.isPending ? "Submitting..." : "Submit Report"}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default RescueDetails;
