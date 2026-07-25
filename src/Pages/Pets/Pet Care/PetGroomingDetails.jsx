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
import PetGroomingAPI from "./../../../API/petGrooming.json";
import { groomingApplication } from "../../../API/api";

const PetGroomingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const [item, setItem] = useState(null);
  const [grooming, setGrooming] = useState({
    name: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const selectedProgram = PetGroomingAPI.find((p) => p.id === parseInt(id));
    setItem(selectedProgram);

    if (user) {
      setGrooming((currentGrooming) => ({
        ...currentGrooming,
        name: user.displayName || "",
        contactEmail: user.email || "",
      }));
    }
  }, [id, user]);

  const handleChange = (e) => {
    setGrooming({ ...grooming, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate(`/sign_in?redirect=${encodeURIComponent(`/petcare/grooming/${id}`)}`);
      return;
    }

    try {
      const updatedGrooming = {
        ...grooming,
        programId: item.id,
      };

      await groomingApplication(updatedGrooming, item.id);

      // Reset the form but keep name and email from user
      setGrooming({
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
              <Typography variant="h5" gutterBottom color="green"></Typography>
              <Typography variant="body1" color="primary.para" pl={2} mb={2}>
                <ul>
                  <li>{item.dis1}</li>
                  <li>{item.dis2}</li>
                  <li>{item.dis3}</li>
                </ul>
              </Typography>

              <Typography variant="body1" paragraph>
                <strong>Duration:</strong> {item.Duration}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Price:</strong> {item.Price}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Program Covers:</strong> {item.ProgramCovers}
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
                  value={grooming.name}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  margin="normal"
                  required
                  name="contactEmail"
                  value={grooming.contactEmail}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  type="tel"
                  margin="normal"
                  required
                  name="contactPhone"
                  value={grooming.contactPhone}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Address"
                  margin="normal"
                  required
                  name="address"
                  value={grooming.address}
                  onChange={handleChange}
                />
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 3, fontWeight: "700" }}
                  type="submit"
                >
                  Accept Grooming Program
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
                    Your grooming enrollment has been successfully submitted!
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

export default PetGroomingDetails;
