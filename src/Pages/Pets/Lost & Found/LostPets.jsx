import React, { useMemo } from "react";
import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useLostPetsQuery } from "../../../features/lost-found/hooks";

const LostPets = () => {
  const { data = [], isLoading, isError, error } = useLostPetsQuery();
  const lostPets = useMemo(() => [...data].reverse(), [data]);
  const errorMessage =
    error?.response?.data?.message ||
    "Could not load lost pets right now.";

  if (isLoading) {
    return (
      <Box textAlign="center" py={6}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  return (
    <Box className="myContainer" my={5}>
      <Box
        color="white"
        borderRadius={2}
        p={2}
        my={5}
        textAlign={"center"}
        backgroundColor={"primary.para"}
      >
        <Typography variant="h4" fontWeight={900} pb={2}>
          All Lost Pets
        </Typography>

        <Typography variant="" fontWeight={500}>
          If You Found Any Pet Bellow <br /> Contact The Owner
        </Typography>
      </Box>

      {isError ? (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      ) : null}

      {/* Card Section Starts ----------------------------------------------------  */}
      <Stack my={3}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {/* {adoptableAnimals.slice(0, 6).map((item) => ( */}
          {lostPets.map((pet) => (
            <Grid item xs={2} sm={4} md={4} key={pet._id}>
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
                    // image={LostPetPic}
                    image={pet.petPicture}
                    // alt={item.name}
                    height={200}
                  />
                  <CardContent>
                    <Divider>PET INFO</Divider>
                    <Typography gutterBottom fontWeight={700}>
                      Pet Name: {pet.petName}
                    </Typography>

                    <Typography variant="body2" color="primary.para">
                      <span className="span3">Type:</span> {pet.animalType}
                    </Typography>

                    <Typography variant="body2" color="primary.para">
                      <span className="span3">Age:</span> {pet.age}
                    </Typography>

                    <Typography variant="body2" color="primary.para">
                      <span className="span3"> Color: </span> {pet.colors}
                    </Typography>

                    <Typography variant="body2" color="primary.para">
                      <span className="span3">Lost Location:</span>{" "}
                      {pet.lastSeenLocation}
                    </Typography>

                    <Typography variant="body2" color="primary.para">
                      <span className="span3">Lost Date:</span> {pet.lostDate}
                    </Typography>

                    <Divider>OWNER INFO</Divider>

                    <Typography variant="body2" fontWeight={700}>
                      Owner Name: {pet.ownerName}
                    </Typography>

                    <Typography variant="body2" color="primary.para">
                      <span className="span3"> Contact:</span>{" "}
                      {pet.contactPhone}
                    </Typography>

                    {/* <Typography
                      variant="body2"
                      color="primary.green"
                      textAlign={"right"}
                    >
                      - Read More
                    </Typography> */}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {!lostPets.length ? (
          <Alert severity="info" sx={{ mt: 2 }}>
            There are no lost pet listings to show right now.
          </Alert>
        ) : null}
      </Stack>
    </Box>
  );
};

export default LostPets;
