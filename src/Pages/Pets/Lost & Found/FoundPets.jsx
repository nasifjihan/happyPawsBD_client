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
import { useFoundPetsQuery } from "../../../features/lost-found/hooks";
import ContentState from "../../../Components/Common/ContentState";

const FoundPets = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useFoundPetsQuery({
    page,
    limit: 12,
  });
  const foundPets = useMemo(() => data?.items ?? [], [data]);
  const totalPages = data?.totalPages ?? 1;
  const errorMessage =
    error?.response?.data?.message ||
    "Could not load found pets right now.";

  if (isLoading) {
    return (
      <Box sx={{ py: 6, textAlign: "center" }}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  return (
    <Box className="myContainer" sx={{ my: 5 }}>
      <Box
        sx={{
          color: "white",
          borderRadius: 3,
          p: { xs: 3, md: 4 },
          my: 5,
          backgroundColor: "primary.para",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 900, pb: 1.5 }}>
          All Found Pets
        </Typography>

        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          If any pet below may be yours, contact the person who reported the
          found listing.
        </Typography>
      </Box>

      {isError ? (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      ) : null}

      {/* Card Section Starts ----------------------------------------------------  */}
      <Stack sx={{ my: 3 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {/* {adoptableAnimals.slice(0, 6).map((item) => ( */}
          {foundPets.map((pet) => (
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
                  alt={pet.breed || "Found pet listing"}
                  sx={{ height: 220 }}
                />
                <CardContent sx={{ p: 2.5 }}>
                  <Stack spacing={1.5}>
                    <Divider>Pet Info</Divider>

                    <Typography variant="body2" sx={{ color: "primary.para" }}>
                      <span className="span3">Type:</span> {pet.animalType}
                    </Typography>

                    <Typography variant="body2" sx={{ color: "primary.para" }}>
                      <span className="span3"> Breed: </span> {pet.breed}
                    </Typography>

                    <Typography variant="body2" sx={{ color: "primary.para" }}>
                      <span className="span3">Color: </span> {pet.colors}
                    </Typography>

                    <Typography variant="body2" sx={{ color: "primary.para" }}>
                      <span className="span3">Lost Location:</span>{" "}
                      {pet.foundLocation}
                    </Typography>

                    <Typography variant="body2" sx={{ color: "primary.para" }}>
                      <span className="span3"> Lost Date:</span> {pet.foundDate}
                    </Typography>

                    <Divider>Reporter Info</Divider>

                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      Reporter Name: {pet.founderName}
                    </Typography>

                    <Typography variant="body2" sx={{ color: "primary.para" }}>
                      <span className="span3"> Contact: </span>{" "}
                      {pet.contactPhone}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {foundPets.length > 0 && totalPages > 1 ? (
          <Box sx={{ display: "flex", mt: 4, justifyContent: "center" }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, nextPage) => setPage(nextPage)}
              color="success"
            />
          </Box>
        ) : null}

        {!foundPets.length ? (
          <ContentState
            title="No found pet listings right now"
            description="There are currently no found pet reports to review. You can return later or submit a new found pet report from the lost and found page."
            actionLabel="Open Lost & Found"
            actionTo="/lost_found"
            severity="info"
          />
        ) : null}
      </Stack>
    </Box>
  );
};

export default FoundPets;
