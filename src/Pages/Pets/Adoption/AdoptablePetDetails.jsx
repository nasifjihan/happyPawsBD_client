import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Stack,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  Vaccines,
  Cake,
  Palette,
  MonitorHeart,
  Place,
  Event,
  Wc,
  Scale,
  Pets,
  ChildCare,
  Money,
  AttachMoney,
} from "@mui/icons-material";
import AdoptionForm from "./AdoptionForm";
import ContentState from "../../../Components/Common/ContentState";
import { useAdoptableAnimalQuery } from "../../../features/adoption/hooks";

const AdoptablePetDetails = () => {
  const [open, setOpen] = useState(false);
  const { code } = useParams();
  const { data: pet, isLoading, isError, error } = useAdoptableAnimalQuery(code);

  const errorMessage =
    error?.response?.data?.message ||
    "Could not load this adoptable animal right now.";

  if (isLoading) {
    return (
      <Box sx={{ py: 6, textAlign: "center" }}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box className="myContainer" sx={{ mt: 6 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
        <ContentState
          title="We could not load this pet"
          description="Please try again in a moment or return to the adoption page to browse other listings."
          actionLabel="Browse Adoptable Pets"
          actionTo="/adoption/adoptable_pets"
          severity="warning"
        />
      </Box>
    );
  }

  if (!pet) {
    return (
      <Box className="myContainer" sx={{ mt: 6 }}>
        <ContentState
          title="Pet not found"
          description="We could not find an adoptable pet for this listing code. Browse the adoption page to see currently available pets."
          actionLabel="Browse Adoptable Pets"
          actionTo="/adoption/adoptable_pets"
          severity="warning"
        />
      </Box>
    );
  }

  const handleOpen = () => {
    // Check if medical records are available; if not, show modal
    if (!pet.medicalrecords) {
      setOpen(true);
    } else {
      window.open(pet.medicalrecords, "_blank");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box className="myContainer" sx={{ margin: "auto", p: 2, mt: 4 }}>
      <Grid container spacing={4}>
        {/* Pet Image Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 900, my: 3, color: "primary.main", textAlign: "center", fontSize: { xs: "2rem", md: "3rem" } }}
          >
            Meet "{pet.name}"
          </Typography>

          <Card
            sx={{
              borderRadius: "15px",
              boxShadow: "10px 10px 30px rgba(0,0,0,0.15)",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 16,
                left: 16,
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                color: "#fff",
                padding: "5px 10px",
                borderRadius: "8px",
                zIndex: 1,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {pet.code}
              </Typography>
            </Box>

            <CardMedia
              component="img"
              image={pet.photos}
              alt={pet.name}
              sx={{
                borderRadius: "15px 15px 0 0",
                objectFit: "cover",
              }}
            />
          </Card>

          <Typography variant="body2" paragraph sx={{ mt: 2, mb: 1 }}>
            <strong>Breed:</strong> {pet.breeddescription}
          </Typography>
          <Typography variant="body2" paragraph sx={{ mb: 1 }}>
            <strong>Temperament:</strong> {pet.temperament}
          </Typography>
          <Typography variant="body2" paragraph sx={{ mb: 1 }}>
            <strong>Adoption Requirements:</strong> {pet.adoptionrequirements}
          </Typography>
          <Typography variant="body2" paragraph sx={{ mb: 1 }}>
            <strong>Background Story:</strong> {pet.storybackground}
          </Typography>
        </Grid>

        {/* Pet Details Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              py: 2,
              px: 4,
              backgroundColor: "#f3f3f3",
              borderRadius: "15px",
            }}
          >
            <CardContent>
              <Stack spacing={2}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: "primary.dark", fontSize: { xs: "1.5rem", md: "2rem" } }}
                  >
                    {pet.breed}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: "textSecondary", fontSize: { xs: "0.875rem", md: "1rem" } }}
                  >
                    {pet.origin}
                  </Typography>
                </Box>

                <Divider sx={{ mb: 2 }} />

                {/* Pet Information */}
                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                  <Cake color="secondary" />
                  <Typography variant="body1">
                    <strong>Age:</strong> {pet.age} years
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                  <Wc color="info" />
                  <Typography variant="body1">
                    <strong>Gender:</strong> {pet.gender}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                  <Scale color="secondary" />
                  <Typography variant="body1">
                    <strong>Weight:</strong> {pet.weight}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                  <Vaccines color="success" />
                  <Typography variant="body1">
                    <strong>Vaccine:</strong> {pet.vaccinationstatus}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                  <Palette color="warning" />
                  <Typography variant="body1">
                    <strong>Color:</strong> {pet.color}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                  <MonitorHeart color="error" />
                  <Typography variant="body1">
                    <strong>Health Issue:</strong> {pet.healthconditions}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                  <AttachMoney color="success" />
                  <Typography variant="body1">
                    <strong>Adoption Fee:</strong> {pet.adoptionfee} BDT
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                  <Pets color="primary" />
                  <Typography variant="body1">
                    <strong>Good with Other Pets:</strong>{" "}
                    {pet.goodwithotherpets}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                  <ChildCare color="warning" />
                  <Typography variant="body1">
                    <strong>Good with Children:</strong> {pet.goodwithchildren}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                  <Place color="primary" />
                  <Typography variant="body1">
                    <strong>Location:</strong> {pet.location}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                  <Event color="info" />
                  <Typography variant="body1">
                    <strong>Available Since:</strong> {pet.availablesince}
                  </Typography>
                </Stack>

                <Box>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleOpen}
                    >
                      View Medical Records
                    </Button>
                  </Stack>

                  {/* Modal for 'No Medical Records Found' */}
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                      {" "}
                      <strong>No Medical Records Found</strong>
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Unfortunately, there are no medical records available
                        for this pet.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleClose}
                        variant="contained"
                        color="info"
                      >
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Adoption Form Section */}
      <Box
        id="adoption-form"
        sx={{ mt: 8 }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: "green", mb: 2, textAlign: "center" }}
        >
          Ready to Adopt? Fill out the form below!
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", mb: 2, textAlign: "center" }}
        >
          Complete the application with your contact details and pet experience
          so the rescue team can review your request.
        </Typography>
        <Divider />
        <AdoptionForm animalCode={pet.code} animalType={pet.species} />
      </Box>
    </Box>
  );
};

export default AdoptablePetDetails;
