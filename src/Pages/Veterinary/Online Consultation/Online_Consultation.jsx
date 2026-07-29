import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import { Link as RouterLink } from "react-router-dom";
import { requestOnlineConsultation } from "../../../API/api";

const availableDoctors = [
  {
    name: "Dr. Farhana Rahman",
    specialty: "General Pet Care",
    availability: "Available Today",
    schedule: "10:00 AM - 1:00 PM, 7:00 PM - 10:00 PM",
    fee: "৳500 video consult",
    supports: "Dogs, cats, basic health issues, follow-up review",
  },
  {
    name: "Dr. Tanvir Ahmed",
    specialty: "Skin and Nutrition",
    availability: "Next Slot Tomorrow",
    schedule: "11:30 AM - 2:30 PM",
    fee: "৳600 video consult",
    supports: "Allergy, coat issues, food plan, weight concerns",
  },
  {
    name: "Dr. Nusrat Jahan",
    specialty: "Puppy and Kitten Care",
    availability: "Available Today",
    schedule: "4:00 PM - 8:00 PM",
    fee: "৳450 video consult",
    supports: "Feeding advice, deworming guidance, early symptom review",
  },
];

const consultSteps = [
  "Choose a doctor and preferred time slot.",
  "Share your pet's symptoms, age, and short medical history.",
  "Upload or keep ready photos, videos, and previous prescriptions.",
  "Join the call and receive guidance, medicine advice, or referral for clinic visit.",
];

const consultationUseCases = [
  "Skin allergy, itching, coat issues",
  "Vomiting, loose stool, appetite change",
  "Follow-up after treatment or surgery",
  "Food plan, supplement, and routine care questions",
];

const pricingNotes = [
  {
    title: "Consultation Fee",
    value: "৳450 - ৳600",
    detail: "Depends on doctor and consultation type.",
    icon: <PaymentsOutlinedIcon color="success" />,
  },
  {
    title: "Session Length",
    value: "15 - 25 minutes",
    detail: "Enough for symptom review and next-step guidance.",
    icon: <VideocamOutlinedIcon color="success" />,
  },
  {
    title: "Booking Window",
    value: "Same day or next day",
    detail: "Based on doctor availability.",
    icon: <EventAvailableOutlinedIcon color="success" />,
  },
];

const petTypeOptions = ["Dog", "Cat", "Bird", "Rabbit", "Fish", "Other"];

const Online_Consultation = () => {
  const doctorOptions = useMemo(
    () => ["Any Available", ...availableDoctors.map((doctor) => doctor.name)],
    []
  );
  const [formState, setFormState] = useState({
    fullName: "",
    contactEmail: "",
    contactPhone: "",
    petType: "",
    petName: "",
    petAge: "",
    consultationMode: "video",
    preferredDoctor: "Any Available",
    preferredSlot: "",
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
      const saved = await requestOnlineConsultation({
        ...formState,
        preferredDoctor:
          formState.preferredDoctor === "Any Available"
            ? ""
            : formState.preferredDoctor,
      });

      setSuccessState({ open: true, reference: saved?._id || "" });
      setFormState((current) => ({
        ...current,
        petType: "",
        petName: "",
        petAge: "",
        preferredSlot: "",
        concern: "",
      }));
    } catch (error) {
      setSubmitError(
        error?.response?.data?.message || "Could not request an appointment."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleSelectDoctor = (doctorName) => {
    setFormState((current) => ({ ...current, preferredDoctor: doctorName }));
    setSubmitError("");
  };

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Paper elevation={2} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
            <Stack spacing={2} alignItems="flex-start">
              <Chip
                label="Online Vet Appointment"
                color="success"
                variant="outlined"
                sx={{ fontWeight: 700 }}
              />
              <Typography variant="h3" fontWeight={800}>
                Online Consultation
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 820 }}>
                Book a short online appointment with an available vet, discuss your
                pet&apos;s symptoms, and get guidance on treatment, medicine, or whether
                you should visit a clinic in person.
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} pt={1}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleRequestAppointment}
                  disabled={submitting}
                  sx={{ fontWeight: 800, borderRadius: 3 }}
                >
                  Request Appointment
                </Button>
                <Button
                  component={RouterLink}
                  to="/vet_finder"
                  variant="outlined"
                  color="success"
                  sx={{ fontWeight: 800, borderRadius: 3 }}
                >
                  View All Vets
                </Button>
              </Stack>
            </Stack>
          </Paper>

          <Paper
            variant="outlined"
            sx={{ p: { xs: 3, md: 4 }, borderRadius: 4 }}
          >
            <Stack spacing={2.5}>
              <Typography variant="h5" fontWeight={900}>
                Appointment Request
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Submit your details and preferred slot. Our team will confirm the
                schedule and payment.
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
                    select
                    label="Consultation Mode"
                    name="consultationMode"
                    value={formState.consultationMode}
                    onChange={handleSetFormField}
                    fullWidth
                  >
                    <MenuItem value="video">Video Call</MenuItem>
                    <MenuItem value="phone">Phone Call</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    label="Preferred Doctor"
                    name="preferredDoctor"
                    value={formState.preferredDoctor}
                    onChange={handleSetFormField}
                    fullWidth
                  >
                    {doctorOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Preferred Slot"
                    name="preferredSlot"
                    value={formState.preferredSlot}
                    onChange={handleSetFormField}
                    fullWidth
                    placeholder="Example: Today 7:00 PM - 8:00 PM"
                  />
                </Grid>
                <Grid item xs={12}>
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
                  Prefer In-Person
                </Button>
              </Stack>
            </Stack>
          </Paper>

          <Grid container spacing={3}>
            {pricingNotes.map((item) => (
              <Grid item xs={12} md={4} key={item.title}>
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: "100%" }}>
                  <Stack spacing={1.5}>
                    {item.icon}
                    <Typography variant="h6" fontWeight={800}>
                      {item.title}
                    </Typography>
                    <Typography variant="h4" color="success.main" fontWeight={900}>
                      {item.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.detail}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 }, borderRadius: 4 }}>
            <Stack spacing={3}>
              <Typography variant="h5" fontWeight={800}>
                Available Online Doctors
              </Typography>

              <Grid container spacing={2}>
                {availableDoctors.map((doctor) => (
                  <Grid item xs={12} md={4} key={doctor.name}>
                    <Paper
                      variant="outlined"
                      sx={{ p: 2.5, borderRadius: 3, height: "100%" }}
                    >
                      <Stack spacing={1.25}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="flex-start"
                          spacing={1}
                        >
                          <Box>
                            <Typography variant="h6" fontWeight={800}>
                              {doctor.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {doctor.specialty}
                            </Typography>
                          </Box>
                          <Chip
                            label={doctor.availability}
                            color={doctor.availability === "Available Today" ? "success" : "warning"}
                            size="small"
                          />
                        </Stack>

                        <Typography variant="body2" color="text.secondary">
                          <strong>Time:</strong> {doctor.schedule}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Fee:</strong> {doctor.fee}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Best for:</strong> {doctor.supports}
                        </Typography>

                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleSelectDoctor(doctor.name)}
                          sx={{ mt: 1, alignSelf: "flex-start", borderRadius: 3, fontWeight: 700 }}
                        >
                          Select Doctor
                        </Button>
                      </Stack>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Paper>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 4, height: "100%" }}>
                <Stack spacing={2}>
                  <Typography variant="h5" fontWeight={800}>
                    How It Works
                  </Typography>
                  {consultSteps.map((step) => (
                    <Typography key={step} variant="body2" color="text.secondary">
                      • {step}
                    </Typography>
                  ))}
                </Stack>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 4, height: "100%" }}>
                <Stack spacing={2}>
                  <Typography variant="h5" fontWeight={800}>
                    Good Cases for Online Consult
                  </Typography>
                  {consultationUseCases.map((item) => (
                    <Typography key={item} variant="body2" color="text.secondary">
                      • {item}
                    </Typography>
                  ))}
                </Stack>
              </Paper>
            </Grid>
          </Grid>

          <Alert
            icon={<LocalHospitalOutlinedIcon fontSize="inherit" />}
            severity="warning"
            sx={{ borderRadius: 3 }}
          >
            Online consultation is not the right option for breathing trouble,
            seizures, collapse, heavy bleeding, poisoning, or severe injury. For
            these cases, use Vet Finder and go for urgent in-person care.
          </Alert>
        </Stack>
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

export default Online_Consultation;
