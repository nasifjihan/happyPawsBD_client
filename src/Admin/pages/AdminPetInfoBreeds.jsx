import { useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

import AdminFilterToolbar from "../components/AdminFilterToolbar";
import {
  adminDeletePetInfoBreed,
  adminListPetInfoBreeds,
  adminListPetInfoAnimals,
  adminUpsertPetInfoBreedWithImage,
} from "../lib/adminApi";
import { useAdminListQueryState } from "../lib/useAdminListQueryState";

const normalizeNumber = (value) => (value === "" ? undefined : Number(value));

const serializeListField = (value) => {
  if (!value) {
    return "";
  }

  return Array.isArray(value) ? value.join("\n") : String(value);
};

const normalizeListField = (value) =>
  String(value || "")
    .split(/[\n,]+/g)
    .map((item) => item.trim())
    .filter(Boolean);

const emptyBreed = {
  id: "",
  type: "",
  name: "",
  imageUrl: "",
  imageAlt: "",
  origin: "",
  size: "",
  lifespan: "",
  temperament: "",
  careLevel: "",
  exerciseNeeds: "",
  groomingNeeds: "",
  goodFor: "",
  highlights: "",
  removeImage: false,
};

const MAX_IMAGE_SIZE_MB = 5;
const ACCEPT_IMAGE = "image/jpeg,image/png,image/jpg";

const AdminPetInfoBreeds = () => {
  const queryClient = useQueryClient();
  const [typeFilter, setTypeFilter] = useState("all");
  const [selected, setSelected] = useState(emptyBreed);
  const [pendingImageFile, setPendingImageFile] = useState(null);
  const [pendingImagePreview, setPendingImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const staticParams = useMemo(
    () => ({
      type: typeFilter === "all" ? undefined : typeFilter,
    }),
    [typeFilter]
  );

  const { page, setPage, q: searchTerm, setQ: setSearchTerm } = useAdminListQueryState({
    staticParams,
  });

  const { data: animalsData } = useQuery({
    queryKey: ["admin", "pet-info-animals", { page: 1, limit: 100 }],
    queryFn: () => adminListPetInfoAnimals({ page: 1, limit: 100 }),
  });

  const animalTypes = useMemo(
    () => (animalsData?.items ?? []).map((item) => item.type).filter(Boolean),
    [animalsData?.items]
  );

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "pet-info-breeds", { page, q: searchTerm, ...staticParams }],
    queryFn: () =>
      adminListPetInfoBreeds({
        page,
        limit: 20,
        q: searchTerm.trim() || undefined,
        type: typeFilter === "all" ? undefined : typeFilter,
      }),
    keepPreviousData: true,
  });

  const upsertMutation = useMutation({
    mutationFn: ({ payload, imageFile, breedId }) =>
      adminUpsertPetInfoBreedWithImage({ payload, imageFile, breedId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "pet-info-breeds"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminDeletePetInfoBreed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "pet-info-breeds"] });
      setSelected(emptyBreed);
      setPendingImageFile(null);
      setPendingImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
  });

  const rows = useMemo(() => data?.items ?? [], [data?.items]);
  const totalPages = data?.totalPages ?? 1;
  const errorMessage =
    error?.response?.data?.message || "Could not load pet info breeds.";

  const handleReset = () => {
    setSearchTerm("");
    setTypeFilter("all");
    setPage(1);
  };

  const handleSelect = (item) => {
    setPendingImageFile(null);
    setPendingImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setSelected({
      ...emptyBreed,
      ...item,
      id: item?.id ?? "",
      imageUrl: item?.imageUrl || "",
      imageAlt: item?.imageAlt || "",
      temperament: serializeListField(item?.temperament),
      removeImage: false,
    });
  };

  const handleFieldChange = (event) => {
    setSelected((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      alert(`Image must be smaller than ${MAX_IMAGE_SIZE_MB}MB.`);
      event.target.value = "";
      return;
    }

    setPendingImageFile(file);
    setSelected((current) => ({ ...current, removeImage: false }));

    const reader = new FileReader();
    reader.onload = () => setPendingImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleClearPendingImage = () => {
    setPendingImageFile(null);
    setPendingImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleMarkRemoveExistingImage = () => {
    handleClearPendingImage();
    setSelected((current) => ({
      ...current,
      imageUrl: "",
      removeImage: true,
    }));
  };

  const handleSave = async () => {
    const finalId = normalizeNumber(selected.id);
    const imageFile = pendingImageFile || null;

    const payload = {
      ...selected,
      id: finalId,
      imageUrl: selected.removeImage ? "" : selected.imageUrl || "",
      imageAlt: selected.imageAlt || "",
      removeImage: Boolean(selected.removeImage),
      temperament: normalizeListField(selected.temperament),
    };

    await upsertMutation.mutateAsync({
      payload,
      imageFile,
      breedId: finalId,
    });
  };

  const handleDelete = async () => {
    if (!selected?.id) {
      return;
    }

    await deleteMutation.mutateAsync(selected.id);
  };

  const displayImage = pendingImagePreview || selected.imageUrl;
  const effectiveImageAlt = selected.imageAlt || selected.name || "";

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 900 }}>
        Pet Info Breeds
      </Typography>
      <Typography sx={{ mb: 2, color: "text.secondary" }}>
        Manage breed records and breed photos shown under each animal type in the
        Pet Library page. Upload a clear JPG or PNG photo for every breed so
        visitors can identify them visually.
      </Typography>

      {isError ? (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      ) : null}

      <AdminFilterToolbar
        searchValue={searchTerm}
        onSearchChange={(value) => {
          setSearchTerm(value);
          setPage(1);
        }}
        searchPlaceholder="Search by breed, origin, temperament, good for..."
        resultCount={data?.total ?? 0}
        helperText="Matched breeds across all pages"
        onReset={handleReset}
      >
        <TextField
          select
          label="Animal type"
          value={typeFilter}
          onChange={(event) => {
            setTypeFilter(event.target.value);
            setPage(1);
          }}
          sx={{ minWidth: { xs: "100%", md: 220 } }}
        >
          <MenuItem value="all">All animals</MenuItem>
          {animalTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
      </AdminFilterToolbar>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Paper sx={{ p: 2.5 }}>
            <Stack spacing={1.5}>
              <Stack
                direction="row"
                spacing={2}
                sx={{ justifyContent: "space-between" }}
              >
                <Typography variant="h5" sx={{ fontWeight: 900 }}>
                  Breeds
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    setSelected(emptyBreed);
                    setPendingImageFile(null);
                    setPendingImagePreview(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  sx={{ fontWeight: 800 }}
                >
                  New
                </Button>
              </Stack>

              {isLoading ? (
                <Typography sx={{ color: "text.secondary" }}>Loading...</Typography>
              ) : rows.length ? (
                rows.map((item) => (
                  <Paper
                    key={item._id || item.id}
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      cursor: "pointer",
                      borderColor:
                        selected?.id === item.id
                          ? "success.main"
                          : "rgba(15, 23, 42, 0.12)",
                    }}
                    onClick={() => handleSelect(item)}
                  >
                    <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                      <Box
                        sx={{
                          width: 80,
                          height: 64,
                          overflow: "hidden",
                          flexShrink: 0,
                          bgcolor: "rgba(122, 178, 89, 0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid rgba(0,0,0,0.06)",
                        }}
                      >
                        {item.imageUrl ? (
                          <Box
                            component="img"
                            src={item.imageUrl}
                            alt={item.imageAlt || item.name || ""}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <ImageOutlinedIcon
                            sx={{ fontSize: 30, color: "text.disabled" }}
                          />
                        )}
                      </Box>
                      <Stack spacing={0.3} sx={{ minWidth: 0, flex: 1 }}>
                        <Typography sx={{ fontWeight: 900 }}>
                          {item.name || "Unnamed"}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          ID {item.id} • {item.type || "Unknown type"} •{" "}
                          {item.size || "N/A"}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Paper>
                ))
              ) : (
                <Typography sx={{ color: "text.secondary" }}>No breeds found.</Typography>
              )}

              {totalPages > 1 ? (
                <Box sx={{ display: "flex", pt: 2, justifyContent: "center" }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, nextPage) => setPage(nextPage)}
                    color="success"
                  />
                </Box>
              ) : null}
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <Paper sx={{ p: 2.5 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 900 }}>
              Edit Breed
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Stack spacing={2}>
              <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start" }}>
                <Box
                  sx={{
                    width: 180,
                    height: 140,
                    overflow: "hidden",
                    flexShrink: 0,
                    bgcolor: "rgba(122, 178, 89, 0.06)",
                    border: "1px solid rgba(0,0,0,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  {displayImage ? (
                    <Box
                      component="img"
                      src={displayImage}
                      alt={effectiveImageAlt}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Stack
                      spacing={0.5}
                      sx={{
                        alignItems: "center",
                        color: "text.disabled",
                        px: 2,
                      }}
                    >
                      <ImageOutlinedIcon sx={{ fontSize: 34 }} />
                      <Typography variant="caption" sx={{ textAlign: "center" }}>
                        No breed photo
                      </Typography>
                    </Stack>
                  )}
                  {displayImage && (
                    <Tooltip
                      title={pendingImagePreview ? "Clear selected file" : "Remove existing image"}
                    >
                      <IconButton
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 4,
                          right: 4,
                          bgcolor: "rgba(0,0,0,0.55)",
                          color: "#fff",
                          "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                        }}
                        onClick={
                          pendingImagePreview
                            ? handleClearPendingImage
                            : handleMarkRemoveExistingImage
                        }
                      >
                        <ClearOutlinedIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
                <Stack spacing={1.5} sx={{ flex: 1, minWidth: 0 }}>
                  <Box>
                    <Button
                      component="label"
                      variant="outlined"
                      color="success"
                      startIcon={<UploadFileOutlinedIcon />}
                      sx={{ fontWeight: 700 }}
                    >
                      Upload breed photo
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept={ACCEPT_IMAGE}
                        hidden
                        onChange={handleFileChange}
                      />
                    </Button>
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        mt: 0.75,
                        color: "text.secondary",
                      }}
                    >
                      JPG / PNG, max {MAX_IMAGE_SIZE_MB}MB.
                    </Typography>
                  </Box>
                  {pendingImageFile && (
                    <Chip
                      label={pendingImageFile.name}
                      size="small"
                      onDelete={handleClearPendingImage}
                      variant="outlined"
                      sx={{ alignSelf: "flex-start" }}
                    />
                  )}
                </Stack>
              </Stack>

              <TextField
                name="imageAlt"
                label="Image alt text"
                value={selected.imageAlt}
                onChange={handleFieldChange}
                helperText="Short description for accessibility & SEO"
              />

              <TextField
                name="id"
                label="ID"
                value={selected.id}
                onChange={handleFieldChange}
              />
              <TextField
                name="type"
                label="Animal type"
                select
                value={selected.type}
                onChange={handleFieldChange}
                required
              >
                {animalTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="name"
                label="Breed name"
                value={selected.name}
                onChange={handleFieldChange}
                required
              />
              <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap">
                <TextField
                  name="origin"
                  label="Origin"
                  value={selected.origin}
                  onChange={handleFieldChange}
                  sx={{ minWidth: 160, flex: 1 }}
                />
                <TextField
                  name="size"
                  label="Size"
                  value={selected.size}
                  onChange={handleFieldChange}
                  sx={{ minWidth: 140, flex: 1 }}
                />
                <TextField
                  name="lifespan"
                  label="Lifespan"
                  value={selected.lifespan}
                  onChange={handleFieldChange}
                  sx={{ minWidth: 140, flex: 1 }}
                />
              </Stack>
              <TextField
                name="careLevel"
                label="Care level"
                value={selected.careLevel}
                onChange={handleFieldChange}
              />
              <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap">
                <TextField
                  name="exerciseNeeds"
                  label="Exercise needs"
                  value={selected.exerciseNeeds}
                  onChange={handleFieldChange}
                  sx={{ minWidth: 180, flex: 1 }}
                />
                <TextField
                  name="groomingNeeds"
                  label="Grooming needs"
                  value={selected.groomingNeeds}
                  onChange={handleFieldChange}
                  sx={{ minWidth: 180, flex: 1 }}
                />
              </Stack>
              <TextField
                name="goodFor"
                label="Good for"
                value={selected.goodFor}
                onChange={handleFieldChange}
                multiline
                minRows={2}
              />
              <TextField
                name="highlights"
                label="Highlights"
                value={selected.highlights}
                onChange={handleFieldChange}
                multiline
                minRows={3}
              />
              <TextField
                name="temperament"
                label="Temperament"
                value={selected.temperament}
                onChange={handleFieldChange}
                multiline
                minRows={2}
                helperText="One trait per line"
              />

              {upsertMutation.isError ? (
                <Alert severity="error">
                  {upsertMutation.error?.response?.data?.message ||
                    "Could not save breed."}
                </Alert>
              ) : null}

              {upsertMutation.isSuccess ? (
                <Alert severity="success">Saved.</Alert>
              ) : null}

              <Stack
                direction="row"
                spacing={1.5}
                sx={{ justifyContent: "flex-end" }}
              >
                <Button
                  variant="outlined"
                  color="error"
                  disabled={!selected?.id || deleteMutation.isPending}
                  onClick={handleDelete}
                  sx={{ fontWeight: 800 }}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  disabled={upsertMutation.isPending}
                  onClick={handleSave}
                  sx={{ fontWeight: 800 }}
                >
                  Save
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminPetInfoBreeds;
