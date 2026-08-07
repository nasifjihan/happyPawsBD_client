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
  adminDeletePetInfoAnimal,
  adminListPetInfoAnimals,
  adminUpsertPetInfoAnimalWithImage,
} from "../lib/adminApi";
import { useAdminListQueryState } from "../lib/useAdminListQueryState";

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

const emptyAnimal = {
  type: "",
  imageUrl: "",
  imageAlt: "",
  summary: "",
  idealFor: "",
  commonNeeds: "",
  removeImage: false,
};

const MAX_IMAGE_SIZE_MB = 5;
const ACCEPT_IMAGE = "image/jpeg,image/png,image/jpg";

const AdminPetInfoAnimals = () => {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(emptyAnimal);
  const [pendingImageFile, setPendingImageFile] = useState(null);
  const [pendingImagePreview, setPendingImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const { page, setPage, q: searchTerm, setQ: setSearchTerm } = useAdminListQueryState();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "pet-info-animals", { page, q: searchTerm }],
    queryFn: () =>
      adminListPetInfoAnimals({
        page,
        limit: 20,
        q: searchTerm.trim() || undefined,
      }),
    keepPreviousData: true,
  });

  const upsertMutation = useMutation({
    mutationFn: ({ payload, imageFile }) =>
      adminUpsertPetInfoAnimalWithImage({ payload, imageFile }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "pet-info-animals"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminDeletePetInfoAnimal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "pet-info-animals"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "pet-info-breeds"] });
      setSelected(emptyAnimal);
      setPendingImageFile(null);
      setPendingImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
  });

  const rows = useMemo(() => data?.items ?? [], [data?.items]);
  const totalPages = data?.totalPages ?? 1;
  const errorMessage =
    error?.response?.data?.message || "Could not load pet info animals.";

  const handleSelect = (item) => {
    setPendingImageFile(null);
    setPendingImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setSelected({
      ...emptyAnimal,
      ...item,
      type: item?.type || "",
      imageUrl: item?.imageUrl || "",
      imageAlt: item?.imageAlt || "",
      summary: item?.summary || "",
      idealFor: item?.idealFor || "",
      commonNeeds: serializeListField(item?.commonNeeds),
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
    const imageFile = pendingImageFile || null;

    const payload = {
      type: selected.type,
      summary: selected.summary,
      idealFor: selected.idealFor,
      imageUrl: selected.removeImage ? "" : selected.imageUrl || "",
      imageAlt: selected.imageAlt || "",
      removeImage: Boolean(selected.removeImage),
      commonNeeds: normalizeListField(selected.commonNeeds),
    };

    await upsertMutation.mutateAsync({ payload, imageFile });
  };

  const handleDelete = async () => {
    if (!selected?.type) {
      return;
    }

    await deleteMutation.mutateAsync(selected.type);
  };

  const displayImage = pendingImagePreview || selected.imageUrl;
  const effectiveImageAlt = selected.imageAlt || selected.type || "";

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 900 }}>
        Pet Info Animals
      </Typography>
      <Typography sx={{ mb: 2, color: "text.secondary" }}>
        Manage animal type group summaries and cover images shown in the Pet Library
        page. Upload a JPG or PNG photo for each animal (e.g. a dog, cat, bird).
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
        searchPlaceholder="Search type, summary, ideal for, or needs"
        resultCount={data?.total ?? 0}
        helperText="Matched animal groups across all pages"
        onReset={() => {
          setSearchTerm("");
          setPage(1);
        }}
      />

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
                  Animal Types
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    setSelected(emptyAnimal);
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
                    key={item._id || item.type}
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      cursor: "pointer",
                      borderColor:
                        selected?.type === item.type
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
                            alt={item.imageAlt || item.type || ""}
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
                          {item.type || "Untitled"}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                          }}
                        >
                          {item.summary || ""}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Paper>
                ))
              ) : (
                <Typography sx={{ color: "text.secondary" }}>No animal groups found.</Typography>
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
              Edit Animal
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Stack spacing={2.5}>
              <Stack
                direction="row"
                spacing={2}
                sx={{ alignItems: "flex-start" }}
              >
                <Box
                  sx={{
                    width: 168,
                    height: 128,
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
                        No cover image
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
                      Upload cover image
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
                name="type"
                label="Animal Type"
                value={selected.type}
                onChange={handleFieldChange}
                required
              />
              <TextField
                name="summary"
                label="Summary"
                value={selected.summary}
                onChange={handleFieldChange}
                multiline
                minRows={3}
                required
              />
              <TextField
                name="idealFor"
                label="Ideal For"
                value={selected.idealFor}
                onChange={handleFieldChange}
                multiline
                minRows={2}
                required
              />
              <TextField
                name="commonNeeds"
                label="Common Needs"
                value={selected.commonNeeds}
                onChange={handleFieldChange}
                multiline
                minRows={3}
                helperText="One per line"
              />

              {upsertMutation.isError ? (
                <Alert severity="error">
                  {upsertMutation.error?.response?.data?.message ||
                    "Could not save animal type."}
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
                  disabled={!selected?.type || deleteMutation.isPending}
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

export default AdminPetInfoAnimals;
