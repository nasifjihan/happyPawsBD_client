import React, { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useLostPetsQuery } from "../../../features/lost-found/hooks";
import ContentState from "../../../Components/Common/ContentState";

const LostPets = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useLostPetsQuery({
    page,
    limit: 12,
  });
  const lostPets = useMemo(() => data?.items ?? [], [data]);
  const totalPages = data?.totalPages ?? 1;
  const errorMessage =
    error?.response?.data?.message ||
    "Could not load lost pets right now.";

  if (isLoading) {
    return (
      <Box py={6} sx={{ textAlign: "center" }}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  return (
    <Box className="myContainer" my={5}>
      <Box
        color="white"
        borderRadius={3}
        p={{ xs: 3, md: 4 }}
        my={5}
        backgroundColor={"primary.para"}
        sx={{ textAlign: "center" }}
      >
        <Typography variant="h4" fontWeight={900} pb={1.5}>
          All Lost Pets
        </Typography>

        <Typography variant="body1" fontWeight={500}>
          If you recognize or have found any pet below, contact the owner using
          the listing details.
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
            <Grid
              key={pet._id}
              sx={{ display: "flex" }}
              size={{ xs: 2, sm: 4, md: 4 }}
            >
              <Card
                sx={{
                  width: "100%",
                  backgroundColor: "#FBFBFB",
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  boxShadow: "none",
                  overflow: "hidden",
                  "&:hover": {
                    boxShadow: "0px 12px 24px rgba(82,82,82,0.12)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={pet.petPicture}
                  alt={pet.petName || "Lost pet listing"}
                  height={220}
                />
                <CardContent sx={{ p: 2.5 }}>
                  <Stack spacing={1.5}>
                    <Divider>Pet Info</Divider>
                    <Typography gutterBottom fontWeight={700} sx={{ mb: 0 }}>
                      {pet.petName ? `Pet Name: ${pet.petName}` : "Lost pet listing"}
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

                    <Divider>Owner Info</Divider>

                    <Typography variant="body2" fontWeight={700}>
                      Owner Name: {pet.ownerName}
                    </Typography>

                    <Typography variant="body2" color="primary.para">
                      <span className="span3"> Contact:</span>{" "}
                      {pet.contactPhone}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {lostPets.length > 0 && totalPages > 1 ? (
          <Box display="flex" mt={4} sx={{ justifyContent: "center" }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, nextPage) => setPage(nextPage)}
              color="success"
            />
          </Box>
        ) : null}

        {!lostPets.length ? (
          <ContentState
            title="No lost pet listings right now"
            description="There are currently no active lost pet reports to review. You can come back later or submit a new report from the lost and found page."
            actionLabel="Open Lost & Found"
            actionTo="/lost_found"
            severity="info"
          />
        ) : null}
      </Stack>
    </Box>
  );
};

export default LostPets;
