import { Box, Button, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

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

const In_Person_Consultation = () => {
  return (
    <Box sx={{ backgroundColor: "#f9f9f9", py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Paper elevation={2} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
          <Stack spacing={2} textAlign="center" alignItems="center" mb={4}>
            <Typography variant="h3" fontWeight={800}>
              In-Person Consultation
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760 }}>
              When your pet needs direct examination, treatment, or more confident
              clinical assessment, visiting a veterinary professional in person is
              often the most reliable next step.
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            {visitBenefits.map((item) => (
              <Grid item xs={12} md={4} key={item.title}>
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, height: "100%" }}>
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

          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mt: 3 }}>
            <Stack spacing={2}>
              <Typography variant="h5" fontWeight={700}>
                What to Bring
              </Typography>
              <Typography variant="body1" color="text.secondary">
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
    </Box>
  );
};

export default In_Person_Consultation;
