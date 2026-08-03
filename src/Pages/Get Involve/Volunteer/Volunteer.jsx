import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { alpha } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { useUserAuth } from "../../../context/UserAuthContext";
import { useVolunteerMutation } from "../../../features/volunteer/hooks";
import {
  createVolunteerDefaultValues,
  volunteerAvailabilityOptions,
  volunteerContactMethodOptions,
  volunteerContactTimeOptions,
  volunteerFormSchema,
  volunteerRoleOptions,
  volunteerTimeCommitmentOptions,
} from "../../../features/volunteer/schemas";

const volunteerRoles = [
  {
    title: "Rescue Support",
    description:
      "Help coordinate urgent rescue responses, temporary care, and local follow-up.",
    icon: <VolunteerActivismOutlinedIcon color="success" />,
  },
  {
    title: "Foster Care",
    description:
      "Provide short-term shelter and stability for pets waiting for adoption or recovery.",
    icon: <FavoriteBorderOutlinedIcon color="success" />,
  },
  {
    title: "Community Outreach",
    description:
      "Support awareness campaigns, education, and adoption events in your area.",
    icon: <CampaignOutlinedIcon color="success" />,
  },
  {
    title: "Transport Help",
    description:
      "Assist with moving pets safely for rescue, treatment, foster placement, or adoption.",
    icon: <LocalShippingOutlinedIcon color="success" />,
  },
];

const processSteps = [
  "Submit your volunteer request through the application form.",
  "Our team reviews your details and matches you with a suitable role.",
  "We contact you with next steps, expectations, and how you can begin.",
];

const volunteerExpectations = [
  "A caring and respectful attitude toward animals and people",
  "Reliable communication and follow-through",
  "Availability that matches the role you choose",
  "Willingness to support safely and responsibly",
];

const faqItems = [
  {
    question: "Do I need experience?",
    answer:
      "No. Many roles are beginner-friendly. If you have experience, share it in the form so we can match you faster.",
  },
  {
    question: "How long does review take?",
    answer:
      "We review requests in order and contact you when we have a suitable task or role available.",
  },
  {
    question: "Can I volunteer remotely?",
    answer:
      "Yes. Some work (social media support, community outreach planning, coordination) can be done remotely depending on needs.",
  },
];

const Volunteer = () => {
  const { user } = useUserAuth();
  const volunteerMutation = useVolunteerMutation();
  const [openDialog, setOpenDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const defaultValues = useMemo(
    () => createVolunteerDefaultValues(user),
    [user],
  );
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(volunteerFormSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const handleOpenDialog = () => {
    volunteerMutation.reset();
    reset(defaultValues);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    if (volunteerMutation.isPending) {
      return;
    }

    volunteerMutation.reset();
    setOpenDialog(false);
    reset(defaultValues);
  };

  const onSubmit = async (application) => {
    try {
      await volunteerMutation.mutateAsync(application);
      volunteerMutation.reset();
      setOpenDialog(false);
      reset(defaultValues);
      setShowSuccess(true);
    } catch (error) {
      console.error("Volunteer application submission failed:", error);
    }
  };

  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, #f7fbf4 0%, #eef7ea 48%, #f8fbf7 100%)",
        py: 4,
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
              <Grid item xs={12} md={7}>
                <Stack spacing={2.25}>
                  <Chip
                    icon={<PetsOutlinedIcon />}
                    label="Community Volunteer Program"
                    color="success"
                    variant="outlined"
                    sx={{
                      width: "fit-content",
                      borderRadius: 999,
                      bgcolor: alpha("#2e7d32", 0.05),
                    }}
                  />

                  <Typography variant="h3" fontWeight={800}>
                    Volunteer With Happy Paws BD
                  </Typography>

                  <Typography variant="body1" color="text.secondary">
                    Join a compassionate network that helps rescued, vulnerable,
                    and adoptable pets get the support they need. Whether you
                    can help on the ground or behind the scenes, your time can
                    make a real difference.
                  </Typography>

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <Button
                      variant="contained"
                      color="success"
                      size="large"
                      onClick={handleOpenDialog}
                      endIcon={<ArrowForwardOutlinedIcon />}
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Apply as a Volunteer
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/contact_us"
                      variant="outlined"
                      color="success"
                      size="large"
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Contact Us First
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
                  <Stack spacing={2}>
                    <Typography variant="h6" fontWeight={700}>
                      What we look for
                    </Typography>
                    {volunteerExpectations.map((item) => (
                      <Stack
                        key={item}
                        direction="row"
                        spacing={1.25}
                        sx={{ alignItems: "flex-start" }}
                      >
                        <CheckCircleOutlineOutlinedIcon color="success" />
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

          <Grid container spacing={2}>
            {volunteerRoles.map((role) => (
              <Grid item xs={12} md={6} key={role.title}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    height: "100%",
                    border: "1px solid",
                    borderColor: alpha("#2e7d32", 0.1),
                  }}
                >
                  <Stack spacing={1.5}>
                    <Box>{role.icon}</Box>
                    <Typography variant="h6" fontWeight={700}>
                      {role.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {role.description}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 4,
                  height: "100%",
                  border: "1px solid",
                  borderColor: alpha("#2e7d32", 0.1),
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5" fontWeight={800}>
                    How to join
                  </Typography>
                  {processSteps.map((step, index) => (
                    <Stack
                      key={step}
                      direction="row"
                      spacing={2}
                      sx={{ alignItems: "center" }}
                    >
                      <Chip
                        label={index + 1}
                        color="success"
                        size="small"
                        sx={{ fontWeight: 700 }}
                      />
                      <Typography variant="body1" color="text.secondary">
                        {step}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 4,
                  height: "100%",
                  border: "1px solid",
                  borderColor: alpha("#2e7d32", 0.1),
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5" fontWeight={800}>
                    Why volunteers matter
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Volunteers help us respond faster, support more pets, and
                    stay connected with the community. Even a few hours of your
                    time can help with rescue coordination, transport, foster
                    care, and awareness efforts.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    If you are ready to help, submit your request and we will
                    review it for the best fit.
                  </Typography>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleOpenDialog}
                    sx={{
                      alignSelf: "flex-start",
                      textTransform: "none",
                      fontWeight: 700,
                    }}
                  >
                    Open Volunteer Form
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 4,
                  height: "100%",
                  border: "1px solid",
                  borderColor: alpha("#2e7d32", 0.1),
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5" fontWeight={800}>
                    Volunteer FAQ
                  </Typography>
                  {faqItems.map((item) => (
                    <Box key={item.question}>
                      <Typography fontWeight={800}>{item.question}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.answer}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Grid>

            <Grid item xs={12} md={5}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 4,
                  height: "100%",
                  border: "1px solid",
                  borderColor: alpha("#2e7d32", 0.1),
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5" fontWeight={800}>
                    Other ways to help
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    If volunteering is not possible right now, you can still
                    support pets through donations, stories, and community
                    reviews.
                  </Typography>
                  <Stack spacing={1.5}>
                    <Button
                      component={RouterLink}
                      to="/make_donation"
                      variant="contained"
                      color="success"
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Donate
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/share_your_story"
                      variant="outlined"
                      color="success"
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Share Your Story
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/reviews"
                      variant="outlined"
                      color="success"
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Leave a Review
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Stack>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h5" fontWeight={800}>
            Volunteer Request Form
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Share your details and preferred role. We will review your request
            and contact you with next steps.
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit(onSubmit)}
            sx={{ pt: 1 }}
          >
            {Object.keys(errors).length > 0 && (
              <Alert severity="error">
                Please check the highlighted fields before submitting your
                request.
              </Alert>
            )}

            {volunteerMutation.isError && (
              <Alert severity="error">
                {volunteerMutation.error?.response?.data?.message ||
                  "Could not submit your volunteer request right now."}
              </Alert>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Full Name"
                  fullWidth
                  required
                  autoComplete="name"
                  error={Boolean(errors.fullName)}
                  helperText={errors.fullName?.message}
                  {...register("fullName")}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email Address"
                  type="email"
                  fullWidth
                  required
                  autoComplete="email"
                  error={Boolean(errors.contactEmail)}
                  helperText={errors.contactEmail?.message}
                  {...register("contactEmail")}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  fullWidth
                  required
                  autoComplete="tel"
                  error={Boolean(errors.contactPhone)}
                  helperText={errors.contactPhone?.message}
                  {...register("contactPhone")}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="City or Area"
                  fullWidth
                  required
                  error={Boolean(errors.city)}
                  helperText={errors.city?.message}
                  {...register("city")}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="preferredRole"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Preferred Role"
                      fullWidth
                      required
                      error={Boolean(errors.preferredRole)}
                      helperText={errors.preferredRole?.message}
                    >
                      {volunteerRoleOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="availability"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Availability"
                      fullWidth
                      required
                      error={Boolean(errors.availability)}
                      helperText={errors.availability?.message}
                    >
                      {volunteerAvailabilityOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="timeCommitment"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Time Commitment (Optional)"
                      fullWidth
                      error={Boolean(errors.timeCommitment)}
                      helperText={errors.timeCommitment?.message}
                    >
                      {volunteerTimeCommitmentOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="preferredContactMethod"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Preferred Contact Method (Optional)"
                      fullWidth
                      error={Boolean(errors.preferredContactMethod)}
                      helperText={errors.preferredContactMethod?.message}
                    >
                      {volunteerContactMethodOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="preferredContactTime"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Preferred Contact Time (Optional)"
                      fullWidth
                      error={Boolean(errors.preferredContactTime)}
                      helperText={errors.preferredContactTime?.message}
                    >
                      {volunteerContactTimeOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Relevant Experience"
                  fullWidth
                  multiline
                  minRows={2}
                  error={Boolean(errors.experience)}
                  helperText={
                    errors.experience?.message ||
                    "Optional: tell us about any pet care, rescue, or volunteer experience."
                  }
                  {...register("experience")}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Why do you want to volunteer?"
                  fullWidth
                  required
                  multiline
                  minRows={4}
                  error={Boolean(errors.motivation)}
                  helperText={errors.motivation?.message}
                  {...register("motivation")}
                />
              </Grid>
            </Grid>

            <DialogActions sx={{ px: 0, pt: 1 }}>
              <Button
                onClick={handleCloseDialog}
                disabled={volunteerMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="success"
                disabled={volunteerMutation.isPending}
                sx={{ textTransform: "none", fontWeight: 700 }}
              >
                {volunteerMutation.isPending
                  ? "Submitting Request..."
                  : "Submit Volunteer Request"}
              </Button>
            </DialogActions>
          </Stack>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={showSuccess}
        autoHideDuration={5000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          onClose={() => setShowSuccess(false)}
          sx={{ width: "100%" }}
        >
          Your volunteer request has been submitted successfully.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Volunteer;
