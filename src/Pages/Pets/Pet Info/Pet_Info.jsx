import { useMemo } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { useQuery } from "@tanstack/react-query";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { getPetInfoAnimals, getPetInfoLibrary } from "../../../API/api";

const Pet_Info = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type") || "all";
  const searchTerm = searchParams.get("q") || "";

  const { data: animalsData } = useQuery({
    queryKey: ["pet-info-animals"],
    queryFn: getPetInfoAnimals,
    staleTime: 300_000,
  });

  const { data: libraryData, isLoading, isError } = useQuery({
    queryKey: [
      "pet-info-library",
      {
        type: typeFilter === "all" ? undefined : typeFilter,
        q: searchTerm.trim() || undefined,
      },
    ],
    queryFn: () =>
      getPetInfoLibrary({
        type: typeFilter === "all" ? undefined : typeFilter,
        q: searchTerm.trim() || undefined,
      }),
    staleTime: 300_000,
  });

  const animalTypes = useMemo(
    () => (animalsData?.items ?? []).map((item) => item.type),
    [animalsData?.items]
  );

  const filteredLibrary = useMemo(() => libraryData?.items ?? [], [libraryData?.items]);
  const visibleBreedCount = libraryData?.totalBreeds ?? 0;
  const groupCount = animalsData?.items?.length ?? 0;

  const updateParams = (next) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(next).forEach(([key, value]) => {
      const normalizedValue = String(value || "").trim();
      if (!normalizedValue || normalizedValue === "all") {
        params.delete(key);
      } else {
        params.set(key, normalizedValue);
      }
    });

    setSearchParams(params, { replace: true });
  };

  return (
    <Box sx={{ bgcolor: "background.default", py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Paper elevation={2} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
          <Stack
            spacing={2}
            mb={4}
            sx={{ textAlign: "center", alignItems: "center" }}
          >
            <Chip
              label="Pet Library"
              variant="outlined"
              sx={{
                borderRadius: 2,
                color: "success.dark",
                borderColor: "rgba(122, 178, 89, 0.3)",
                bgcolor: "rgba(122, 178, 89, 0.08)",
                fontWeight: 700,
              }}
            />
            <Typography variant="h3" fontWeight={900}>
              Pet Animals, Breeds, and Info
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 820 }}>
              Explore different kinds of pet animals and browse common breeds for
              each one. This page is built as a quick reference so visitors can
              compare temperament, care level, size, and lifestyle fit.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button
                component={RouterLink}
                to="/adoption"
                variant="contained"
                color="success"
                endIcon={<ArrowForwardOutlinedIcon />}
              >
                Browse Pets
              </Button>
              <Button
                component={RouterLink}
                to="/vet_finder"
                variant="outlined"
                color="success"
              >
                Vet Finder
              </Button>
            </Stack>
          </Stack>

          <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3, mt: 3 }}>
            <Stack spacing={2}>
              <Stack
                direction={{ xs: "column", lg: "row" }}
                spacing={2}
                sx={{
                  justifyContent: "space-between",
                  alignItems: { xs: "stretch", lg: "center" },
                }}
              >
                <Box>
                  <Typography variant="h5" fontWeight={900}>
                    Explore by Animal Type and Breed
                  </Typography>
                  <Typography color="text.secondary">
                    {visibleBreedCount} breed{visibleBreedCount === 1 ? "" : "s"} shown
                  across {filteredLibrary.length || groupCount} animal group
                  {filteredLibrary.length === 1 ? "" : "s"}.
                  </Typography>
                </Box>
                <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
                  <TextField
                    label="Search breeds"
                    value={searchTerm}
                    onChange={(event) =>
                      updateParams({
                        q: event.target.value,
                      })
                    }
                    placeholder="Golden Retriever, Siamese, Betta..."
                    sx={{ minWidth: { md: 280 } }}
                  />
                  <TextField
                    select
                    label="Animal type"
                    value={typeFilter}
                    onChange={(event) =>
                      updateParams({
                        type: event.target.value,
                      })
                    }
                    sx={{ minWidth: { md: 200 } }}
                  >
                    <MenuItem value="all">All animals</MenuItem>
                    {animalTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Stack>

              <Grid container spacing={2}>
                {(animalsData?.items ?? []).map((group) => (
                  <Grid key={group.type} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2.5,
                        borderRadius: 3,
                        height: "100%",
                        borderColor:
                          typeFilter === "all" || typeFilter === group.type
                            ? "rgba(122, 178, 89, 0.35)"
                            : "divider",
                        bgcolor:
                          typeFilter === group.type
                            ? "rgba(122, 178, 89, 0.08)"
                            : "background.paper",
                      }}
                    >
                      <Stack spacing={1.25}>
                        <Stack
                          direction="row"
                          spacing={1.25}
                          sx={{ alignItems: "center" }}
                        >
                          <PetsOutlinedIcon sx={{ color: "success.main" }} />
                          <Typography variant="h6" fontWeight={800}>
                            {group.type}
                          </Typography>
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                          {group.summary}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Ideal for:</strong> {group.idealFor}
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={1}
                          useFlexGap
                          sx={{ flexWrap: "wrap" }}
                        >
                          {(group.commonNeeds || []).map((item) => (
                            <Chip key={item} label={item} size="small" variant="outlined" />
                          ))}
                        </Stack>
                      </Stack>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Paper>

          <Stack spacing={3} sx={{ mt: 3 }}>
            {filteredLibrary.length ? (
              filteredLibrary.map((group) => (
                <Paper key={group.type} variant="outlined" sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3 }}>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="h4" fontWeight={900}>
                        {group.type}
                      </Typography>
                      <Typography color="text.secondary" sx={{ maxWidth: 840 }}>
                        {group.summary}
                      </Typography>
                    </Box>

                    <Grid container spacing={2}>
                      {group.breeds.map((breed) => (
                        <Grid
                          key={`${group.type}-${breed.name}`}
                          size={{ xs: 12, md: 6, xl: 4 }}
                        >
                          <Paper
                            variant="outlined"
                            sx={{
                              p: 2.5,
                              borderRadius: 3,
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              gap: 1.25,
                            }}
                          >
                            <Stack
                              direction="row"
                              spacing={1.5}
                              sx={{ justifyContent: "space-between" }}
                            >
                              <Box>
                                <Typography variant="h6" fontWeight={900}>
                                  {breed.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {breed.origin} • {breed.size}
                                </Typography>
                              </Box>
                              <Chip label={breed.careLevel} color="success" size="small" />
                            </Stack>

                            <Typography variant="body2" color="text.secondary">
                              {breed.highlights}
                            </Typography>

                            <Typography variant="body2">
                              <strong>Lifespan:</strong> {breed.lifespan}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Exercise:</strong> {breed.exerciseNeeds}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Grooming:</strong> {breed.groomingNeeds}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Good for:</strong> {breed.goodFor}
                            </Typography>

                            <Stack
                              direction="row"
                              spacing={1}
                              useFlexGap
                              sx={{ flexWrap: "wrap" }}
                            >
                              {(breed.temperament || []).map((trait) => (
                                <Chip key={trait} label={trait} size="small" variant="outlined" />
                              ))}
                            </Stack>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Stack>
                </Paper>
              ))
            ) : (
              <Paper variant="outlined" sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
                <Typography variant="h6" fontWeight={800} gutterBottom>
                  {isLoading
                    ? "Loading pet library..."
                    : isError
                      ? "Could not load pet library"
                      : "No breeds matched your search"}
                </Typography>
                <Typography color="text.secondary">
                  Try another animal type or search term to explore the full pet
                  library again.
                </Typography>
              </Paper>
            )}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Pet_Info;
