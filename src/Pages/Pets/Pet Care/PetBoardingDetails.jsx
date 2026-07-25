import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";
import { useUserAuth } from "../../../context/UserAuthContext";
import PetBoardingAPI from "./../../../API/petBoarding.json";
import { boardingApplication } from "../../../API/api";

const PetBoardingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const [item, setItem] = useState(null);
  const [boarding, setBoarding] = useState({
    name: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Find the selected program
    const selectedProgram = PetBoardingAPI.find((p) => p.id === parseInt(id));
    setItem(selectedProgram);

    // Auto-fill name and email from the logged-in user
    if (user) {
      setBoarding((currentBoarding) => ({
        ...currentBoarding,
        name: user.displayName || "",
        contactEmail: user.email || "",
      }));
    }
  }, [id, user]);

  const handleChange = (e) => {
    setBoarding({ ...boarding, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!user) {
    //   navigate(`/login?redirect=/petcare/boarding/${id}`);
    //   return;
    // }

    try {
      const updatedBoarding = {
        ...boarding,
        programId: item.id,
      };

      await boardingApplication(updatedBoarding, item.id);

      // Reset the form but keep name and email from user
      setBoarding({
        name: user.displayName || "",
        contactEmail: user.email || "",
        contactPhone: "",
        address: "",
      });
      setShowSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (!item) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box className="myContainer">
      <Typography
        variant="h4"
        fontWeight={900}
        my={5}
        gutterBottom
        textAlign="center"
        color="primary"
      >
        {item.title}
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: "2% 2% 0",
              boxShadow: "none",
            }}
          >
            <img
              src={item.picture}
              alt={item.title}
              style={{ width: "100%" }}
            />
            <CardContent>
              <Typography variant="body1" color="primary.para" mb={2}>
                {item.description}
              </Typography>

              <Typography variant="body1" paragraph>
                <strong>Duration:</strong> {item.duration}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Price:</strong> {item.price}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Program Covers:</strong> {item.programCovers}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Additional Services:</strong> {item.additionalServices}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Special Features:</strong> {item.specialFeatures}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Enroll Form */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              boxShadow: "none",
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                fontWeight={700}
                gutterBottom
                color="primary.main"
              >
                Enroll in this Program
              </Typography>

              <Box component="form" mt={2} onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Full Name"
                  margin="normal"
                  required
                  name="name"
                  value={boarding.name}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  margin="normal"
                  required
                  name="contactEmail"
                  value={boarding.contactEmail}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  type="tel"
                  margin="normal"
                  required
                  name="contactPhone"
                  value={boarding.contactPhone}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Address"
                  margin="normal"
                  required
                  name="address"
                  value={boarding.address}
                  onChange={handleChange}
                />
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 3, fontWeight: "700" }}
                  type="submit"
                >
                  Accept Boarding Program
                </Button>
                {/* Snackbar for showing the success message */}
                <Snackbar
                  open={showSuccess}
                  autoHideDuration={4000}
                  onClose={() => setShowSuccess(false)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                  <Alert
                    onClose={() => setShowSuccess(false)}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    Your boarding enrollment has been successfully submitted!
                  </Alert>
                </Snackbar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PetBoardingDetails;
