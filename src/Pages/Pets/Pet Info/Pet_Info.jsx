import { useMemo } from "react";
import {
  Box,
  Button,
  CardActionArea,
  Chip,
  Container,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
import { useQuery } from "@tanstack/react-query";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { getPetInfoAnimals, getPetInfoLibrary } from "../../../API/api";

const ImagePlaceholder = ({ label, sx }) => (
  <Stack
    spacing={0.75}
    sx={{
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: "rgba(122, 178, 89, 0.08)",
      color: "text.disabled",
      textAlign: "center",
      ...sx,
    }}
  >
    <ImageNotSupportedOutlinedIcon sx={{ fontSize: 40 }} />
    {label ? (
      <Typography variant="caption" sx={{ fontWeight: 600, px: 2 }}>
        {label}
      </Typography>
    ) : null}
  </Stack>
);

const Pet_Info = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedType = searchParams.get("type") || "";
  const searchTerm = searchParams.get("q") || "";

  const { data: animalsData, isLoading: animalsLoading } = useQuery({
    queryKey: ["pet-info-animals"],
    queryFn: getPetInfoAnimals,
    staleTime: 300_000,
  });

  const {
    data: libraryData,
    isLoading: libraryLoading,
    isError,
  } = useQuery({
    queryKey: ["pet-info-library", { type: selectedType || undefined }],
    queryFn: () =>
      getPetInfoLibrary({
        type: selectedType || undefined,
      }),
    staleTime: 300_000,
    enabled: Boolean(selectedType),
  });

  const animalTypes = useMemo(
    () => (animalsData?.items ?? []).map((item) => item.type),
    [animalsData?.items],
  );

  const animals = useMemo(() => animalsData?.items ?? [], [animalsData?.items]);

  const selectedGroup = useMemo(() => {
    if (!selectedType) return null;
    return (
      (libraryData?.items ?? []).find((g) => g.type === selectedType) || null
    );
  }, [libraryData?.items, selectedType]);

  const groupMeta = useMemo(() => {
    if (!selectedType) return null;
    return animals.find((a) => a.type === selectedType) || null;
  }, [animals, selectedType]);

  const visibleBreeds = useMemo(() => {
    if (!selectedGroup?.breeds) return [];
    const q = searchTerm.trim().toLowerCase();
    if (!q) return selectedGroup.breeds;

    const matchText = (s) => String(s || "").toLowerCase();

    return selectedGroup.breeds.filter((breed) => {
      const fields = [
        breed.name,
        breed.origin,
        breed.size,
        breed.lifespan,
        breed.careLevel,
        breed.exerciseNeeds,
        breed.groomingNeeds,
        breed.goodFor,
        breed.highlights,
        ...(breed.temperament || []),
      ].map(matchText);

      return fields.some((field) => field.includes(q));
    });
  }, [selectedGroup, searchTerm]);

  const visibleBreedCount = visibleBreeds?.length ?? 0;
  const totalGroupBreeds = selectedGroup?.breeds?.length ?? 0;

  const updateParams = (next) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(next).forEach(([key, value]) => {
      const normalizedValue = String(value || "").trim();
      if (!normalizedValue) {
        params.delete(key);
      } else {
        params.set(key, normalizedValue);
      }
    });

    setSearchParams(params, { replace: true });
  };

  const handleSelectAnimal = (type) => {
    const params = new URLSearchParams(searchParams);
    params.set("type", type);
    params.delete("q");
    setSearchParams(params, { replace: true });
  };

  const handleClearType = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("type");
    params.delete("q");
    setSearchParams(params, { replace: true });
  };

  return (
    <Box sx={{ bgcolor: "background.default", py: { xs: 3, md: 5 } }}>
      <Container maxWidth="xl">
        <Paper elevation={2} sx={{ p: { xs: 2.5, md: 4.5 } }}>
          <Stack
            spacing={2}
            sx={{ mb: 3, textAlign: "center", alignItems: "center" }}
          >
            <Chip
              icon={<PetsOutlinedIcon fontSize="inherit" />}
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
            <Typography
              variant="h3"
              sx={{ fontWeight: 900, fontSize: { xs: "1.8rem", md: "2.5rem" } }}
            >
              {selectedType
                ? `${selectedType} Breeds & Info`
                : "Pet Animals, Breeds, and Info"}
            </Typography>
            <Typography
              variant="body1"
              sx={{ maxWidth: 860, color: "text.secondary" }}
            >
              {selectedType
                ? `Browse real ${selectedType.toLowerCase()} breed photos and compare
                   temperament, care level, size, and lifestyle fit.`
                : `Pick a pet animal below to explore common breeds with photos and
                   breed-specific information to help you find the right fit.`}
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button
                component={RouterLink}
                to="/adoption"
                variant="contained"
                color="success"
                endIcon={<ArrowForwardOutlinedIcon />}
                sx={{ fontWeight: 800, px: 2.5 }}
              >
                Browse Pets
              </Button>
              <Button
                component={RouterLink}
                to="/vet_finder"
                variant="outlined"
                color="success"
                sx={{ fontWeight: 700, px: 2.5 }}
              >
                Vet Finder
              </Button>
            </Stack>
          </Stack>

          {selectedType ? (
            <Stack spacing={3} sx={{ mt: 1 }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{
                  alignItems: { xs: "stretch", sm: "center" },
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onClick={handleClearType}
                  variant="outlined"
                  color="inherit"
                  startIcon={<ArrowBackOutlinedIcon />}
                  sx={{
                    alignSelf: { xs: "flex-start", sm: "auto" },
                    fontWeight: 700,
                    px: 2,
                  }}
                >
                  Back to all animals
                </Button>
                <TextField
                  label={`Search ${selectedType} breeds`}
                  value={searchTerm}
                  onChange={(event) => updateParams({ q: event.target.value })}
                  placeholder="Golden Retriever, Siamese..."
                  size="small"
                  sx={{ minWidth: { sm: 300 } }}
                />
              </Stack>

              {(groupMeta || selectedGroup) && (
                <Paper
                  variant="outlined"
                  sx={{
                    overflow: "hidden",
                    borderColor: "rgba(122, 178, 89, 0.2)",
                  }}
                >
                  <Grid container>
                    <Grid
                      size={{
                        xs: 12,
                        md: 5,
                        lg: 4,
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          minHeight: { xs: 220, md: 300, lg: 340 },
                          bgcolor: "rgba(122, 178, 89, 0.08)",
                        }}
                      >
                        {groupMeta?.imageUrl ? (
                          <Box
                            component="img"
                            src={groupMeta.imageUrl}
                            alt={groupMeta.imageAlt || groupMeta.type}
                            sx={{
                              width: "100%",
                              height: "100%",
                              minHeight: "inherit",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        ) : (
                          <ImagePlaceholder
                            label={`${groupMeta?.type || selectedType} image (upload via Admin)`}
                            sx={{ minHeight: "inherit" }}
                          />
                        )}
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 7, lg: 8 }}>
                      <Stack
                        spacing={2}
                        sx={{ p: { xs: 2.5, md: 3, lg: 3.5 }, height: "100%" }}
                      >
                        <Stack spacing={1}>
                          <Stack
                            direction="row"
                            spacing={1.25}
                            useFlexGap
                            sx={{ flexWrap: "wrap", alignItems: "center" }}
                          >
                            <Chip
                              label={groupMeta?.type || selectedType}
                              color="success"
                              sx={{ fontWeight: 800 }}
                            />
                            <Chip
                              label={`${totalGroupBreeds} breed${totalGroupBreeds === 1 ? "" : "s"}`}
                              variant="outlined"
                              sx={{
                                borderColor: "rgba(122, 178, 89, 0.35)",
                                bgcolor: "rgba(122, 178, 89, 0.06)",
                                fontWeight: 700,
                              }}
                            />
                          </Stack>
                          <Typography
                            variant="h4"
                            sx={{
                              fontWeight: 900,
                              fontSize: { xs: "1.5rem", md: "1.75rem" },
                            }}
                          >
                            About {groupMeta?.type || selectedType}
                          </Typography>
                        </Stack>

                        <Typography
                          variant="body1"
                          sx={{ color: "text.secondary" }}
                        >
                          {groupMeta?.summary || selectedGroup?.summary || ""}
                        </Typography>

                        {groupMeta?.idealFor ? (
                          <Typography variant="body2">
                            <strong style={{ fontWeight: 800 }}>
                              Ideal for:
                            </strong>{" "}
                            {groupMeta.idealFor}
                          </Typography>
                        ) : null}

                        {(groupMeta?.commonNeeds || []).length ? (
                          <Stack
                            direction="row"
                            spacing={1}
                            useFlexGap
                            sx={{ flexWrap: "wrap" }}
                          >
                            {(groupMeta.commonNeeds || []).map((need) => (
                              <Chip
                                key={need}
                                label={need}
                                size="small"
                                variant="outlined"
                                sx={{
                                  borderColor: "rgba(122, 178, 89, 0.35)",
                                  bgcolor: "rgba(122, 178, 89, 0.06)",
                                  fontWeight: 600,
                                }}
                              />
                            ))}
                          </Stack>
                        ) : null}

                        {searchTerm && (
                          <Box>
                            <Chip
                              label={`Showing ${visibleBreedCount} of ${totalGroupBreeds} breed${totalGroupBreeds === 1 ? "" : "s"}`}
                              size="small"
                              sx={{ alignSelf: "flex-start" }}
                            />
                          </Box>
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                </Paper>
              )}

              <Divider sx={{ my: 0.5 }} />

              {libraryLoading && !selectedGroup ? (
                <Paper variant="outlined" sx={{ p: 4, textAlign: "center" }}>
                  <Typography sx={{ color: "text.secondary" }}>
                    Loading breeds...
                  </Typography>
                </Paper>
              ) : visibleBreeds.length ? (
                <Grid container spacing={2.5}>
                  {visibleBreeds.map((breed) => (
                    <Grid
                      key={`${breed.type}-${breed.name}-${breed.id}`}
                      size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}
                    >
                      <Paper
                        variant="outlined"
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          overflow: "hidden",

                          borderColor: "rgba(0,0,0,0.08)",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            transform: "translateY(-3px)",
                            boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
                            borderColor: "rgba(122, 178, 89, 0.5)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            aspectRatio: "4 / 3",
                            bgcolor: "rgba(122, 178, 89, 0.06)",
                            overflow: "hidden",
                          }}
                        >
                          {breed.imageUrl ? (
                            <Box
                              component="img"
                              src={breed.imageUrl}
                              alt={breed.imageAlt || breed.name}
                              sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                                transition: "transform 0.4s ease",
                                "&:hover": { transform: "scale(1.04)" },
                              }}
                            />
                          ) : (
                            <ImagePlaceholder label="Breed photo not uploaded yet" />
                          )}
                        </Box>

                        <Stack spacing={1.75} sx={{ p: 2, flex: 1 }}>
                          <Stack
                            direction="row"
                            spacing={1.5}
                            sx={{
                              alignItems: "flex-start",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box sx={{ minWidth: 0, flex: 1 }}>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 900,
                                  fontSize: { xs: "1.05rem", md: "1.15rem" },
                                  lineHeight: 1.2,
                                }}
                              >
                                {breed.name}
                              </Typography>
                              <Stack
                                direction="row"
                                spacing={0.75}
                                useFlexGap
                                sx={{ flexWrap: "wrap", mt: 0.75 }}
                              >
                                {breed.origin ? (
                                  <Chip
                                    size="small"
                                    variant="outlined"
                                    icon={
                                      <LocationOnOutlinedIcon
                                        sx={{ fontSize: 14, ml: 0.5 }}
                                      />
                                    }
                                    label={breed.origin}
                                    sx={{
                                      borderColor: "rgba(0,0,0,0.1)",
                                      bgcolor: "rgba(0,0,0,0.02)",
                                    }}
                                  />
                                ) : null}
                                {breed.size ? (
                                  <Chip
                                    size="small"
                                    variant="outlined"
                                    label={breed.size}
                                    sx={{
                                      borderColor: "rgba(0,0,0,0.1)",
                                      bgcolor: "rgba(0,0,0,0.02)",
                                    }}
                                  />
                                ) : null}
                              </Stack>
                            </Box>
                            {breed.careLevel ? (
                              <Chip
                                label={breed.careLevel}
                                color="success"
                                size="small"
                                sx={{
                                  flexShrink: 0,
                                  fontWeight: 700,
                                  "& .MuiChip-label": { px: 1 },
                                }}
                              />
                            ) : null}
                          </Stack>

                          {breed.highlights ? (
                            <Typography
                              variant="body2"
                              sx={{
                                color: "text.secondary",
                                lineHeight: 1.55,
                              }}
                            >
                              {breed.highlights}
                            </Typography>
                          ) : null}

                          <Divider sx={{ my: 0.25 }} />

                          <Grid container spacing={1.25} sx={{ mt: "auto" }}>
                            {breed.lifespan ? (
                              <Grid size={{ xs: 6 }}>
                                <Stack
                                  direction="row"
                                  spacing={0.75}
                                  sx={{ alignItems: "center" }}
                                >
                                  <AccessTimeOutlinedIcon
                                    sx={{ fontSize: 16, color: "success.main" }}
                                  />
                                  <Box sx={{ minWidth: 0 }}>
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        display: "block",
                                        lineHeight: 1.1,
                                        color: "text.secondary",
                                        fontWeight: 600,
                                      }}
                                    >
                                      Lifespan
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{ fontWeight: 800, lineHeight: 1.3 }}
                                    >
                                      {breed.lifespan}
                                    </Typography>
                                  </Box>
                                </Stack>
                              </Grid>
                            ) : null}

                            {breed.exerciseNeeds ? (
                              <Grid size={{ xs: 6 }}>
                                <Stack
                                  direction="row"
                                  spacing={0.75}
                                  sx={{ alignItems: "center" }}
                                >
                                  <ArrowForwardOutlinedIcon
                                    sx={{
                                      fontSize: 16,
                                      color: "success.main",
                                      transform: "rotate(-45deg)",
                                    }}
                                  />
                                  <Box sx={{ minWidth: 0 }}>
                                    <Typography
                                      variant="caption"
                                      sx={{
                                        display: "block",
                                        lineHeight: 1.1,
                                        color: "text.secondary",
                                        fontWeight: 600,
                                      }}
                                    >
                                      Exercise
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{ fontWeight: 800, lineHeight: 1.3 }}
                                    >
                                      {breed.exerciseNeeds}
                                    </Typography>
                                  </Box>
                                </Stack>
                              </Grid>
                            ) : null}

                            {breed.groomingNeeds ? (
                              <Grid size={{ xs: 6 }}>
                                <Box>
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      display: "block",
                                      lineHeight: 1.1,
                                      color: "text.secondary",
                                      fontWeight: 600,
                                    }}
                                  >
                                    Grooming
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 800, lineHeight: 1.3 }}
                                  >
                                    {breed.groomingNeeds}
                                  </Typography>
                                </Box>
                              </Grid>
                            ) : null}

                            {breed.goodFor ? (
                              <Grid size={{ xs: 6 }}>
                                <Box sx={{ minWidth: 0 }}>
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      display: "block",
                                      lineHeight: 1.1,
                                      color: "text.secondary",
                                      fontWeight: 600,
                                    }}
                                  >
                                    Good for
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      fontWeight: 800,
                                      lineHeight: 1.3,
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {breed.goodFor}
                                  </Typography>
                                </Box>
                              </Grid>
                            ) : null}
                          </Grid>

                          {(breed.temperament || []).length ? (
                            <Stack
                              direction="row"
                              spacing={1}
                              useFlexGap
                              sx={{ flexWrap: "wrap", pt: 0.5 }}
                            >
                              {breed.temperament.map((trait) => (
                                <Chip
                                  key={trait}
                                  label={trait}
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    borderColor: "rgba(122, 178, 89, 0.4)",
                                    bgcolor: "rgba(122, 178, 89, 0.08)",
                                    color: "success.dark",
                                    fontWeight: 700,
                                  }}
                                />
                              ))}
                            </Stack>
                          ) : null}
                        </Stack>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              ) : isError ? (
                <Paper variant="outlined" sx={{ p: 4, textAlign: "center" }}>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 800 }}>
                    Could not load pet library
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    Please try again in a moment.
                  </Typography>
                </Paper>
              ) : (
                <Paper variant="outlined" sx={{ p: 4, textAlign: "center" }}>
                  <Stack spacing={1.5} sx={{ alignItems: "center" }}>
                    <Box
                      sx={{
                        width: 72,
                        height: 72,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "rgba(122, 178, 89, 0.08)",
                      }}
                    >
                      <PetsOutlinedIcon
                        sx={{ fontSize: 36, color: "success.main" }}
                      />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      {searchTerm
                        ? "No breeds matched your search"
                        : libraryLoading
                          ? "Loading breeds..."
                          : `${selectedType} breeds haven't been added yet`}
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {searchTerm
                        ? "Try a different search term to see more breed results."
                        : libraryLoading
                          ? "Just a moment..."
                          : `Breeds for ${selectedType} will appear once they are added via the Admin panel.`}
                    </Typography>
                  </Stack>
                </Paper>
              )}
            </Stack>
          ) : (
            <Box sx={{ mt: 1 }}>
              <Paper
                variant="outlined"
                sx={{
                  p: { xs: 2, md: 2.5 },

                  borderColor: "rgba(122, 178, 89, 0.25)",
                }}
              >
                <Stack spacing={2.5}>
                  <Stack
                    direction={{ xs: "column", lg: "row" }}
                    spacing={2}
                    sx={{
                      justifyContent: "space-between",
                      alignItems: { xs: "stretch", lg: "center" },
                    }}
                  >
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 900 }}>
                        Choose a pet animal to see breeds
                      </Typography>
                      <Typography sx={{ color: "text.secondary" }}>
                        Select an animal card below to browse its breeds with
                        photos and breed-specific information.
                      </Typography>
                    </Box>
                    <TextField
                      select
                      label="Animal type"
                      value={selectedType || ""}
                      onChange={(e) => {
                        if (e.target.value) handleSelectAnimal(e.target.value);
                      }}
                      sx={{ minWidth: { lg: 220 } }}
                    >
                      <MenuItem value="" disabled>
                        — Select an animal —
                      </MenuItem>
                      {animalTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>

                  <Grid container spacing={2.5}>
                    {(animalsLoading ? [] : animals).length ? (
                      animals.map((group) => (
                        <Grid
                          key={group.type}
                          size={{ xs: 12, sm: 6, md: 4, xl: 3 }}
                        >
                          <Paper
                            variant="outlined"
                            sx={{
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                              overflow: "hidden",

                              borderColor: "rgba(0,0,0,0.1)",
                              transition: "all 0.2s ease",
                              cursor: "pointer",
                              "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: "0 14px 32px rgba(0,0,0,0.1)",
                                borderColor: "rgba(122, 178, 89, 0.5)",
                              },
                            }}
                          >
                            <CardActionArea
                              sx={{
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "stretch",
                                justifyContent: "flex-start",
                              }}
                              onClick={() => handleSelectAnimal(group.type)}
                            >
                              <Box
                                sx={{
                                  width: "100%",
                                  aspectRatio: "16 / 10",
                                  bgcolor: "rgba(122, 178, 89, 0.08)",
                                  overflow: "hidden",
                                }}
                              >
                                {group.imageUrl ? (
                                  <Box
                                    component="img"
                                    src={group.imageUrl}
                                    alt={group.imageAlt || group.type}
                                    sx={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                      display: "block",
                                      transition: "transform 0.5s ease",
                                      ".MuiCardActionArea-root:hover &": {
                                        transform: "scale(1.06)",
                                      },
                                    }}
                                  />
                                ) : (
                                  <ImagePlaceholder
                                    label={`${group.type} image (upload via Admin)`}
                                    sx={{ aspectRatio: "16 / 10" }}
                                  />
                                )}
                              </Box>
                              <Stack
                                spacing={1.5}
                                sx={{ p: 2, alignSelf: "stretch" }}
                              >
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  useFlexGap
                                  sx={{
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Typography
                                    variant="h6"
                                    sx={{
                                      fontWeight: 900,
                                      fontSize: { xs: "1.1rem", md: "1.2rem" },
                                      lineHeight: 1.2,
                                    }}
                                  >
                                    {group.type}
                                  </Typography>
                                  <Chip
                                    label={`${(libraryData?.items || []).find((g) => g.type === group.type)?.breeds?.length ?? "—"}`}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                      flexShrink: 0,
                                      borderColor: "rgba(122, 178, 89, 0.35)",
                                      bgcolor: "rgba(122, 178, 89, 0.08)",
                                      color: "success.dark",
                                      fontWeight: 700,
                                      "& .MuiChip-label": { px: 1.25 },
                                    }}
                                  />
                                </Stack>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "text.secondary",
                                    lineHeight: 1.5,
                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                  }}
                                >
                                  {group.summary}
                                </Typography>
                                <Typography variant="body2">
                                  <strong style={{ fontWeight: 800 }}>
                                    Ideal for:
                                  </strong>{" "}
                                  {group.idealFor}
                                </Typography>
                                {(group.commonNeeds || []).length ? (
                                  <Stack
                                    direction="row"
                                    spacing={0.75}
                                    useFlexGap
                                    sx={{ flexWrap: "wrap", mt: 0.25 }}
                                  >
                                    {group.commonNeeds
                                      .slice(0, 3)
                                      .map((item) => (
                                        <Chip
                                          key={item}
                                          label={item}
                                          size="small"
                                          variant="outlined"
                                          sx={{
                                            borderColor:
                                              "rgba(122, 178, 89, 0.3)",
                                            bgcolor: "rgba(122, 178, 89, 0.06)",
                                            fontWeight: 600,
                                          }}
                                        />
                                      ))}
                                    {group.commonNeeds.length > 3 ? (
                                      <Chip
                                        label={`+${group.commonNeeds.length - 3}`}
                                        size="small"
                                        variant="outlined"
                                        sx={{ fontWeight: 600 }}
                                      />
                                    ) : null}
                                  </Stack>
                                ) : null}

                                <Button
                                  color="success"
                                  size="small"
                                  sx={{
                                    mt: 0.5,
                                    alignSelf: "flex-start",
                                    fontWeight: 800,
                                  }}
                                  endIcon={<ArrowForwardOutlinedIcon />}
                                >
                                  View breeds
                                </Button>
                              </Stack>
                            </CardActionArea>
                          </Paper>
                        </Grid>
                      ))
                    ) : animalsLoading ? (
                      [...new Array(6)].map((_, i) => (
                        <Grid key={i} size={{ xs: 12, sm: 6, md: 4, xl: 3 }}>
                          <Paper
                            variant="outlined"
                            sx={{
                              p: 2.5,
                              height: 260,

                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography sx={{ color: "text.secondary" }}>
                              Loading...
                            </Typography>
                          </Paper>
                        </Grid>
                      ))
                    ) : (
                      <Grid size={{ xs: 12 }}>
                        <Paper
                          variant="outlined"
                          sx={{ p: 4, textAlign: "center" }}
                        >
                          <Stack spacing={1.5} sx={{ alignItems: "center" }}>
                            <Box
                            sx={{
                              width: 72,
                              height: 72,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              bgcolor: "rgba(122, 178, 89, 0.08)",
                            }}
                          >
                            <PetsOutlinedIcon
                              sx={{ fontSize: 36, color: "success.main" }}
                            />
                          </Box>
                            <Typography variant="h6" sx={{ fontWeight: 800 }}>
                              {isError
                                ? "Could not load pet library"
                                : "No pet animal types yet"}
                            </Typography>
                            <Typography sx={{ color: "text.secondary" }}>
                              {isError
                                ? "Please try again in a moment."
                                : "Animal type groups can be added in the Admin panel."}
                            </Typography>
                          </Stack>
                        </Paper>
                      </Grid>
                    )}
                  </Grid>
                </Stack>
              </Paper>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Pet_Info;
