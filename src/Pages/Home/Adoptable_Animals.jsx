import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import OptimizedImage from "../../Components/Common/OptimizedImage";
import { useAdoptableAnimalsQuery } from "../../features/adoption/hooks";

const Adoptable_Animals = () => {
  const navigate = useNavigate();
  const {
    data: adoptableAnimals = [],
    isLoading,
    isError,
    error,
  } = useAdoptableAnimalsQuery();

  const handleCardClick = (code) => {
    navigate(`/adoption/adoptable_pets/${code}`);
  };

  const errorMessage =
    error?.response?.data?.message ||
    "Could not load adoptable animals right now.";

  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  return (
    <Box className="myContainer" sx={{ textAlign: "center", my: 10 }}>
      <Stack spacing={5}>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <Chip
            label="Ready for Adoption"
            color="success"
            variant="outlined"
            sx={{ fontWeight: 700 }}
          />
          <Typography
            variant="h4"
            color="primary.headline"
            sx={{ lineHeight: 1.2, fontWeight: "900" }}
          >
            Adoptable Animals
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 760 }}
          >
            Meet a few of the pets currently looking for a safe, caring home.
            Browse featured companions here or open the full adoption page to
            explore more details and matches.
          </Typography>
        </Stack>

        {isError ? (
          <Alert severity="warning" sx={{ textAlign: "left" }}>
            {errorMessage}
          </Alert>
        ) : null}

        <Stack sx={{ my: 3 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {adoptableAnimals.slice(0, 6).map((item) => (
              <Grid key={item.code} size={{ xs: 2, sm: 4, md: 4 }}>
                <Card
                  sx={{
                    boxShadow: "none",
                    border: "1px solid",
                    borderColor: "divider",
                    height: "100%",
                    "&:hover": {
                      boxShadow: "0px 12px 24px rgba(82,82,82,0.12)",
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => handleCardClick(item.code)}
                    sx={{ height: "100%", alignItems: "stretch" }}
                  >
                    <Box
                      sx={{ width: "100%", height: 250, overflow: "hidden" }}
                    >
                      <OptimizedImage
                        src={item.photos}
                        alt={item.name}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </Box>
                    <CardContent>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          mb: 1,
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ mb: 0, fontWeight: 700 }}
                        >
                          {item.name}
                        </Typography>
                        <Chip
                          label={item.species}
                          size="small"
                          color="success"
                          variant="outlined"
                        />
                      </Stack>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: 12, color: "text.secondary" }}
                      >
                        {item.breed} - {item.origin}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ pt: 2, color: "primary.para" }}
                      >
                        {item.age} Year{" "}
                        <Box component="span" sx={{ color: "green" }}>
                          |
                        </Box>{" "}
                        {item.gender}{" "}
                        <Box component="span" sx={{ color: "green" }}>
                          |
                        </Box>{" "}
                        {item.weight}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1.5,
                          minHeight: 48,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          overflowWrap: "break-word",
                          color: "text.secondary",
                        }}
                      >
                        {item.breeddescription}
                      </Typography>

                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                          mt: 2,
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ textAlign: "left", color: "primary.green" }}
                        >
                          Code: {item.code}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            textAlign: "right",
                            fontWeight: 700,
                            color: "primary.green",
                          }}
                        >
                          View Details
                        </Typography>
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Stack>

        <Button
          variant="outlined"
          color="success"
          component={RouterLink}
          to="/adoption/adoptable_pets"
          sx={{
            ":hover": {
              backgroundColor: "success.main",
              color: "white",
              borderColor: "success.main",
            },
          }}
        >
          <Typography variant="button" sx={{ fontWeight: "bold" }}>
            View All Adoptable Animals
          </Typography>
        </Button>
      </Stack>
    </Box>
  );
};

export default Adoptable_Animals;
