import { useMemo, useState } from "react";
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
import { Link as RouterLink } from "react-router-dom";
import petInfoLibrary from "../../../data/petInfoLibrary.json";

const Pet_Info = () => {
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const animalTypes = useMemo(
    () => petInfoLibrary.map((item) => item.type),
    []
  );

  const filteredLibrary = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    return petInfoLibrary
      .filter((group) => typeFilter === "all" || group.type === typeFilter)
      .map((group) => {
        const breeds = normalizedQuery
          ? group.breeds.filter((breed) => {
              const haystack = [
                breed.name,
                breed.origin,
                breed.size,
                breed.goodFor,
                breed.highlights,
                ...(breed.temperament || []),
              ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

              return haystack.includes(normalizedQuery);
            })
          : group.breeds;

        return { ...group, breeds };
      })
      .filter((group) => group.breeds.length > 0);
  }, [searchTerm, typeFilter]);

  const visibleBreedCount = filteredLibrary.reduce(
    (sum, group) => sum + group.breeds.length,
    0
  );

  return (
    <Box sx={{ bgcolor: "background.default", py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Paper elevation={2} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
          <Stack spacing={2} textAlign="center" alignItems="center" mb={4}>
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
                justifyContent="space-between"
                alignItems={{ xs: "stretch", lg: "center" }}
              >
                <Box>
                  <Typography variant="h5" fontWeight={900}>
                    Explore by Animal Type and Breed
                  </Typography>
                  <Typography color="text.secondary">
                    {visibleBreedCount} breed{visibleBreedCount === 1 ? "" : "s"} shown
                    across {filteredLibrary.length} animal group
                    {filteredLibrary.length === 1 ? "" : "s"}.
                  </Typography>
                </Box>
                <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
                  <TextField
                    label="Search breeds"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Golden Retriever, Siamese, Betta..."
                    sx={{ minWidth: { md: 280 } }}
                  />
                  <TextField
                    select
                    label="Animal type"
                    value={typeFilter}
                    onChange={(event) => setTypeFilter(event.target.value)}
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
                {petInfoLibrary.map((group) => (
                  <Grid item xs={12} sm={6} md={4} key={group.type}>
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
                        <Stack direction="row" spacing={1.25} alignItems="center">
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
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          {group.commonNeeds.map((item) => (
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
                        <Grid item xs={12} md={6} xl={4} key={`${group.type}-${breed.name}`}>
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
                            <Stack direction="row" justifyContent="space-between" spacing={1.5}>
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

                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                              {breed.temperament.map((trait) => (
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
                  No breeds matched your search
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
