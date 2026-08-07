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

import { requestInPersonConsultation } from "../../../API/api";

const visitBenefits = [
  {
    title: "Hands-On Examination",
    description:
      "In-person visits are best when your pet needs a physical exam, testing, treatment, or closer observation.",
  },
  {
    title: "Vaccination and Preventive Care",
    description:
      "Routine checkups, vaccination planning, and long-term wellness support are easier to handle during clinic visits.",
  },
  {
    title: "Better for Urgent Change",
    description:
      "If your pet has worsening symptoms, pain, injuries, or sudden behavioral changes, an in-person consultation is often the right call.",
  },
];

const petTypeOptions = ["Dog", "Cat", "Bird", "Rabbit", "Fish", "Other"];

const In_Person_Consultation = () => {
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

  const handleRequestAppointment = async () => {
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const saved = await requestInPersonConsultation(formState);

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
        concern: "",
      }));
    } catch (error) {
      setSubmitError(
        error?.response?.data?.message || "Could not request an in-person consultation."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Paper elevation={2} sx={{ p: { xs: 3, md: 5 } }}>
          <Stack
            spacing={2}
            sx={{ mb: 4, textAlign: "center", alignItems: "center" }}
          >
            <Typography variant="h3" sx={{ fontWeight: 800 }}>
              In-Person Consultation
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 760 }}>
              When your pet needs direct examination, treatment, or more confident
              clinical assessment, visiting a veterinary professional in person is
              often the most reliable next step.
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            {visitBenefits.map((item) => (
              <Grid key={item.title} size={{ xs: 12, md: 4 }}>
                <Paper variant="outlined" sx={{ p: 3, height: "100%" }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {item.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 }, mt: 3 }}>
            <Stack spacing={2.5}>
              <Typography variant="h5" sx={{ fontWeight: 900 }}>
                Request an Appointment
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Share your details and preferred date/time. Our team will confirm the clinic
                schedule and any fees before the visit.
              </Typography>

              {submitError ? <Alert severity="error">{submitError}</Alert> : null}

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
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
                <Grid size={{ xs: 12, md: 6 }}>
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
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Email (optional)"
                    name="contactEmail"
                    value={formState.contactEmail}
                    onChange={handleSetFormField}
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
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
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Pet Name (optional)"
                    name="petName"
                    value={formState.petName}
                    onChange={handleSetFormField}
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Pet Age (optional)"
                    name="petAge"
                    value={formState.petAge}
                    onChange={handleSetFormField}
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
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
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Preferred Date (optional)"
                    name="preferredDate"
                    value={formState.preferredDate}
                    onChange={handleSetFormField}
                    fullWidth
                    placeholder="Example: Friday, 15 Aug"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Preferred Time (optional)"
                    name="preferredTime"
                    value={formState.preferredTime}
                    onChange={handleSetFormField}
                    fullWidth
                    placeholder="Example: 6:00 PM - 8:00 PM"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
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
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label="What is the concern?"
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
                  onClick={handleRequestAppointment}
                  disabled={submitting}
                  sx={{ fontWeight: 800 }}
                >
                  Submit Request
                </Button>
                <Button
                  component={RouterLink}
                  to="/vet_finder"
                  variant="outlined"
                  color="success"
                  sx={{ fontWeight: 800 }}
                >
                  Browse Vet Finder
                </Button>
              </Stack>
            </Stack>
          </Paper>

          <Paper variant="outlined" sx={{ p: 3, mt: 3 }}>
            <Stack spacing={2}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                What to Bring
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Bring previous prescriptions, vaccination records, symptom notes,
                and any recent test reports if available. That gives the veterinarian
                a clearer picture and can reduce repeat questions during the visit.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button component={RouterLink} to="/vet_finder" variant="contained" color="success">
                  Browse Vet Finder
                </Button>
                <Button component={RouterLink} to="/online_consultation" variant="outlined" color="success">
                  Compare Online Support
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
          Appointment request submitted
          {successState.reference ? ` (Ref: ${successState.reference})` : ""}.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default In_Person_Consultation;
