import {
  Box,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Stack,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getLostPets, getFoundPets } from "../../../API/api";
import FoundForm from "./FoundForm";
import LostForm from "./LostForm";

const LostFoundRedesign = () => {
  const [lostPets, setLostPets] = useState([]);
  const [foundPets, setFoundPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lostResponse = await getLostPets();
        const foundResponse = await getFoundPets();
        setLostPets(lostResponse);
        setFoundPets(foundResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          error.response?.data?.message ||
            "Error fetching data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" py={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={6}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box className="myContainer">
      {/* Hero Section / Banner */}
      <Box textAlign="center" py={4} bgcolor="primary.back">
        <Typography variant="h2" fontWeight="bold" mb={2}>
          Lost & Found Pets
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Help reunite pets with their families by searching for lost pets or
          posting found ones.
        </Typography>
      </Box>

      {/* First 2-Column Section */}
      <Grid container mt={2} bgcolor="primary.back">
        <Box textAlign="center" sx={{ mx: "auto" }}>
          <Typography variant="h5" fontWeight="bold" py={2} color={"green"}>
            Found a Pet?? Search in "Lost Pets" or Post by "Found Pet
            Registration" Section
          </Typography>

          <Divider variant="middle" sx={{ mx: "auto" }} />
        </Box>

        {/* Left Column: Search Lost Pets */}
        <Grid item xs={12} md={6} p={2}>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            LOST PETS
          </Typography>

          <Stack my={3}>
            <Grid container spacing={2}>
              {lostPets &&
                lostPets.slice(0, 2).map((pet) => (
                  <Grid item xs={12} sm={6} key={pet._id}>
                    <Card
                      sx={{
                        boxShadow: "none",
                        backgroundColor: "#FBFBFB",
                        "&:hover": {
                          boxShadow: "10px 10px 10px 0px rgba(82,82,82,0.2)",
                        },
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          image={pet.petPicture || "/placeholder.png"}
                          height={187}
                        />

                        <CardContent>
                          <Divider>PET INFO</Divider>
                          <Typography gutterBottom fontWeight={700}>
                            Pet Name: {pet.petName}
                          </Typography>
                          <Typography variant="body2">
                            Type: {pet.animalType}
                          </Typography>
                          <Typography variant="body2">
                            Age: {pet.age}
                          </Typography>
                          <Typography variant="body2">
                            Color: {pet.colors}
                          </Typography>
                          <Typography variant="body2">
                            Lost Location: {pet.lastSeenLocation}
                          </Typography>
                          <Typography variant="body2">
                            Lost Date: {pet.lostDate}
                          </Typography>

                          <Divider>OWNER INFO</Divider>
                          <Typography variant="body2" fontWeight={700}>
                            Owner Name: {pet.ownerName}
                          </Typography>
                          <Typography variant="body2">
                            Contact: {pet.contactPhone}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Stack>

          {/* View All Lost Pets Button */}
          <Button
            href="/lost_found/lost_pets"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            View All Lost Pets
          </Button>
        </Grid>

        {/* Right Column: Post Found Pet */}
        <Grid item xs={12} md={6} p={2}>
          <FoundForm />
        </Grid>
      </Grid>

      {/* Second 2-Column Section */}
      <Grid container mt={2} bgcolor="primary.back">
        <Box textAlign="center" sx={{ mx: "auto" }}>
          <Typography variant="h5" fontWeight="bold" py={2} color={"green"}>
            Lost a Pet?? Search in "Found Pets" or Post by "Lost Pet
            Registration" Section
          </Typography>

          <Divider variant="middle" sx={{ mx: "auto" }} />
        </Box>

        {/* Left Column: Search Found Pets */}
        <Grid item xs={12} md={6} p={2}>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            FOUND PETS
          </Typography>

          <Stack my={3}>
            <Grid container spacing={2}>
              {foundPets &&
                foundPets.slice(0, 2).map((pet) => (
                  <Grid item xs={12} sm={6} key={pet._id}>
                    <Card
                      sx={{
                        boxShadow: "none",
                        backgroundColor: "#FBFBFB",
                        "&:hover": {
                          boxShadow: "10px 10px 10px 0px rgba(82,82,82,0.2)",
                        },
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          image={pet.petPicture}
                          height={206}
                        />
                        <CardContent>
                          <Divider>PET INFO</Divider>
                          <Typography gutterBottom fontWeight={700}>
                            Pet Name: {pet.petName}
                          </Typography>
                          <Typography variant="body2">
                            Type: {pet.animalType}
                          </Typography>
                          <Typography variant="body2">
                            Age: {pet.age}
                          </Typography>
                          <Typography variant="body2">
                            Color: {pet.colors}
                          </Typography>
                          <Typography variant="body2">
                            Found Location: {pet.lastSeenLocation}
                          </Typography>

                          <Divider>FINDER INFO</Divider>
                          <Typography variant="body2" fontWeight={700}>
                            Finder Name: {pet.ownerName}
                          </Typography>
                          <Typography variant="body2">
                            Contact: {pet.contactPhone}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Stack>

          {/* View All Found Pets Button */}
          <Button
            href="/lost_found/found_pets"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            View All Found Pets
          </Button>
        </Grid>

        {/* Right Column: Post Lost Pet */}
        <Grid item xs={12} md={6} p={2}>
          <LostForm />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LostFoundRedesign;
