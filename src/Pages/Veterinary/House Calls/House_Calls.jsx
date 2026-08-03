import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { requestHouseCall } from "../../../API/api";

const houseCallBenefits = [
  {
    title: "Lower Stress for Pets",
    description:
      "House calls can be helpful for anxious pets who struggle with travel, noisy waiting rooms, or unfamiliar places.",
  },
  {
    title: "Support for Limited Mobility",
    description:
      "Older pets and post-surgery recovery cases may benefit from checkups at home when traveling is difficult.",
  },
  {
    title: "Convenient Follow-Ups",
    description:
      "When your pet already has a treatment plan, a home visit can be a practical way to monitor progress and adjust care.",
  },
];

const preparationChecklist = [
  "Keep your pet in a calm, safe room before the visit",
  "Bring previous prescriptions and vaccination records if available",
  "Write down symptoms, timing, appetite changes, and behavior notes",
  "Prepare a clean surface, good lighting, and a quiet space",
];

const petTypeOptions = ["Dog", "Cat", "Bird", "Rabbit", "Fish", "Other"];
const urgencyOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const House_Calls = () => {
  const [formState, setFormState] = useState({
    fullName: "",
    contactEmail: "",
    contactPhone: "",
    petType: "",
    petName: "",
    petAge: "",
    city: "",
    address: "",
    preferredDate: "",
    preferredTime: "",
    urgency: "medium",
    concern: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successState, setSuccessState] = useState({ open: false, reference: "" });

  const handleSetFormField = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formState.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }

    if (!formState.contactPhone.trim()) {
      nextErrors.contactPhone = "Phone number is required.";
    }

    if (!formState.petType.trim()) {
      nextErrors.petType = "Select a pet type.";
    }

    if (!formState.city.trim()) {
      nextErrors.city = "City is required.";
    }

    if (!formState.address.trim()) {
      nextErrors.address = "Address is required.";
    }

    if (!formState.concern.trim()) {
      nextErrors.concern = "Describe the concern.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleRequestHouseCall = async () => {
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const saved = await requestHouseCall(formState);
      setSuccessState({ open: true, reference: saved?._id || "" });
      setFormState((current) => ({
        ...current,
        petType: "",
        petName: "",
        petAge: "",
        city: "",
        address: "",
        preferredDate: "",
        preferredTime: "",
        urgency: "medium",
        concern: "",
      }));
    } catch (error) {
      setSubmitError(error?.response?.data?.message || "Could not request a house call.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ bgcolor: "background.default", py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Paper elevation={2} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
          <Stack
            spacing={2}
            mb={4}
            sx={{ textAlign: "center", alignItems: "center" }}
          >
            <Typography variant="h3" fontWeight={800}>
              House Calls
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 760 }}
            >
              When traveling is hard for your pet, a home visit can provide
              practical guidance and basic care support. For emergencies or
              severe symptoms, an in-person clinic visit is usually the safest
              choice.
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            {houseCallBenefits.map((item) => (
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

          <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, mt: 3 }}>
            <Stack spacing={2.5}>
              <Typography variant="h5" fontWeight={900}>
                Request a House Call
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Share your address, preferred date/time, and what your pet needs help with. Our
                team will confirm availability and the expected visit fee.
              </Typography>

              {submitError ? <Alert severity="error">{submitError}</Alert> : null}

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Full Name"
                    name="fullName"
                    value={formState.fullName}
                    onChange={handleSetFormField}
                    error={Boolean(errors.fullName)}
                    helperText={errors.fullName}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Phone Number"
                    name="contactPhone"
                    value={formState.contactPhone}
                    onChange={handleSetFormField}
                    error={Boolean(errors.contactPhone)}
                    helperText={errors.contactPhone}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Email (optional)"
                    name="contactEmail"
                    value={formState.contactEmail}
                    onChange={handleSetFormField}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    label="Pet Type"
                    name="petType"
                    value={formState.petType}
                    onChange={handleSetFormField}
                    error={Boolean(errors.petType)}
                    helperText={errors.petType}
                    fullWidth
                    required
                  >
                    {petTypeOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Pet Name (optional)"
                    name="petName"
                    value={formState.petName}
                    onChange={handleSetFormField}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Pet Age (optional)"
                    name="petAge"
                    value={formState.petAge}
                    onChange={handleSetFormField}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="City"
                    name="city"
                    value={formState.city}
                    onChange={handleSetFormField}
                    error={Boolean(errors.city)}
                    helperText={errors.city}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    label="Urgency"
                    name="urgency"
                    value={formState.urgency}
                    onChange={handleSetFormField}
                    fullWidth
                  >
                    {urgencyOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Preferred Date (optional)"
                    name="preferredDate"
                    value={formState.preferredDate}
                    onChange={handleSetFormField}
                    fullWidth
                    placeholder="Example: Friday, 15 Aug"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Preferred Time (optional)"
                    name="preferredTime"
                    value={formState.preferredTime}
                    onChange={handleSetFormField}
                    fullWidth
                    placeholder="Example: 6:00 PM - 8:00 PM"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Address"
                    name="address"
                    value={formState.address}
                    onChange={handleSetFormField}
                    error={Boolean(errors.address)}
                    helperText={errors.address}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="What do you need help with?"
                    name="concern"
                    value={formState.concern}
                    onChange={handleSetFormField}
                    error={Boolean(errors.concern)}
                    helperText={errors.concern}
                    fullWidth
                    multiline
                    minRows={4}
                    required
                  />
                </Grid>
              </Grid>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleRequestHouseCall}
                  disabled={submitting}
                  sx={{ borderRadius: 3, fontWeight: 800 }}
                >
                  Submit Request
                </Button>
                <Button
                  component={RouterLink}
                  to="/vet_finder"
                  variant="outlined"
                  color="success"
                  sx={{ borderRadius: 3, fontWeight: 800 }}
                >
                  Find a Clinic
                </Button>
                <Button
                  component={RouterLink}
                  to="/in_person_consultation"
                  variant="outlined"
                  color="success"
                  sx={{ borderRadius: 3, fontWeight: 800 }}
                >
                  In-Person Consultation
                </Button>
              </Stack>
            </Stack>
          </Paper>

          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mt: 3 }}>
            <Stack spacing={2}>
              <Typography variant="h5" fontWeight={700}>
                How to prepare
              </Typography>
              <Grid container spacing={1.5}>
                {preparationChecklist.map((item) => (
                  <Grid item xs={12} sm={6} key={item}>
                    <Typography variant="body2" color="text.secondary">
                      {item}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button
                  component={RouterLink}
                  to="/vet_finder"
                  variant="outlined"
                  color="success"
                >
                  Find a Clinic
                </Button>
                <Button
                  component={RouterLink}
                  to="/in_person_consultation"
                  variant="outlined"
                  color="success"
                >
                  In-Person Consultation
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Paper>
      </Container>

      <Snackbar
        open={successState.open}
        autoHideDuration={4500}
        onClose={() => setSuccessState((current) => ({ ...current, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccessState((current) => ({ ...current, open: false }))}
          severity="success"
          sx={{ width: "100%" }}
        >
          House call request submitted
          {successState.reference ? ` (Ref: ${successState.reference})` : ""}.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default House_Calls;
