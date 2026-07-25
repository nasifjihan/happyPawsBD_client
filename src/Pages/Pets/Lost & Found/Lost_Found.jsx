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
import { Link } from "react-router-dom";
import FoundForm from "./FoundForm";
import LostForm from "./LostForm";
import { useLostFoundOverviewQuery } from "../../../features/lost-found/hooks";

const LostFoundRedesign = () => {
  const { data, isLoading, isError, error } = useLostFoundOverviewQuery();

  if (isLoading) {
    return (
      <Box textAlign="center" py={6}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  const lostPets = data?.lostPets || [];
  const foundPets = data?.foundPets || [];
  const errorMessage =
    error?.response?.data?.message ||
    "We could not load the latest lost and found listings right now.";

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

      {isError ? (
        <Alert severity="warning" sx={{ mt: 3 }}>
          {errorMessage} You can still browse the page and submit a report.
        </Alert>
      ) : null}

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

            {!lostPets.length ? (
              <Alert severity="info" sx={{ mt: 2 }}>
                No lost pet listings are available at the moment.
              </Alert>
            ) : null}
          </Stack>

          {/* View All Lost Pets Button */}
          <Button
            component={Link}
            to="/lost_found/lost_pets"
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

            {!foundPets.length ? (
              <Alert severity="info" sx={{ mt: 2 }}>
                No found pet listings are available at the moment.
              </Alert>
            ) : null}
          </Stack>

          {/* View All Found Pets Button */}
          <Button
            component={Link}
            to="/lost_found/found_pets"
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
