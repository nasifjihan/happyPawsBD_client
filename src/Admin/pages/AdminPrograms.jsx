import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Pagination,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";

import AdminFilterToolbar from "../components/AdminFilterToolbar";
import {
  adminDeleteProgram,
  adminListPrograms,
  adminUpsertProgram,
} from "../lib/adminApi";
import { sanitizeImageUrl } from "../../lib/media";

const programTypes = [
  { value: "training", label: "Training" },
  { value: "grooming", label: "Grooming" },
  { value: "boarding", label: "Boarding" },
];

const normalizeProgramType = (value) => {
  const normalizedValue = String(value || "").trim();
  const exists = programTypes.some((entry) => entry.value === normalizedValue);
  return exists ? normalizedValue : "training";
};

const normalizePositiveInteger = (value, fallback) => {
  const normalizedValue = Number.parseInt(value, 10);

  if (Number.isNaN(normalizedValue) || normalizedValue <= 0) {
    return fallback;
  }

  return normalizedValue;
};

const emptyShared = {
  id: "",
  title: "",
  picture: "",
  dis1: "",
  dis2: "",
  dis3: "",
  duration: "",
  price: "",
  programCovers: "",
};

const emptyBoarding = {
  id: "",
  title: "",
  picture: "",
  shortDescription: "",
  description: "",
  duration: "",
  price: "",
  programCovers: "",
  additionalServices: "",
  specialFeatures: "",
};

const normalizeNumber = (value) => (value === "" ? "" : Number(value));

const normalizeListField = (value) => {
  const normalized = String(value || "")
    .split(/[\n,]+/g)
    .map((item) => item.trim())
    .filter(Boolean);

  if (normalized.length === 0) {
    return [];
  }

  return normalized;
};

const serializeListField = (value) => {
  if (!value) {
    return "";
  }

  return Array.isArray(value) ? value.join("\n") : String(value);
};

const AdminPrograms = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramType = searchParams.get("type");
  const paramPage = searchParams.get("page");
  const paramQuery = searchParams.get("q");
  const [type, setType] = useState(() => normalizeProgramType(paramType));
  const [page, setPage] = useState(() => normalizePositiveInteger(paramPage, 1));
  const [searchTerm, setSearchTerm] = useState(() => paramQuery || "");
  const [selected, setSelected] = useState(emptyShared);
  const queryClient = useQueryClient();

  const isBoarding = type === "boarding";
  const emptyProgram = isBoarding ? emptyBoarding : emptyShared;

  useEffect(() => {
    const nextType = normalizeProgramType(paramType);
    const nextPage = normalizePositiveInteger(paramPage, 1);
    const nextQuery = paramQuery || "";

    const typeChanged = nextType !== type;
    const pageChanged = nextPage !== page;
    const queryChanged = nextQuery !== searchTerm;

    if (!typeChanged && !pageChanged && !queryChanged) {
      return;
    }

    if (typeChanged) {
      setType(nextType);
      setSelected(nextType === "boarding" ? emptyBoarding : emptyShared);
    }

    if (pageChanged) {
      setPage(nextPage);
    }

    if (queryChanged) {
      setSearchTerm(nextQuery);
    }
  }, [page, paramPage, paramQuery, paramType, searchTerm, type]);

  useEffect(() => {
    const nextParams = {};

    if (type) {
      nextParams.type = type;
    }

    if (page > 1) {
      nextParams.page = String(page);
    }

    const trimmedQuery = searchTerm.trim();
    if (trimmedQuery) {
      nextParams.q = trimmedQuery;
    }

    const nextSerialized = new URLSearchParams(nextParams).toString();
    const currentSerialized = searchParams.toString();

    if (nextSerialized === currentSerialized) {
      return;
    }

    setSearchParams(nextParams, { replace: true });
  }, [page, searchParams, searchTerm, setSearchParams, type]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "programs", type, { page, q: searchTerm }],
    queryFn: () =>
      adminListPrograms({
        type,
        page,
        limit: 20,
        q: searchTerm.trim() || undefined,
      }),
    keepPreviousData: true,
  });

  const upsertMutation = useMutation({
    mutationFn: adminUpsertProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "programs", type] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminDeleteProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "programs", type] });
      setSelected(emptyProgram);
    },
  });

  const rows = useMemo(() => data?.items ?? [], [data?.items]);
  const totalPages = data?.totalPages ?? 1;
  const errorMessage =
    error?.response?.data?.message || "Could not load programs.";

  const handleChangeType = (_, nextType) => {
    setType(nextType);
    setPage(1);
    setSearchTerm("");
    setSelected(nextType === "boarding" ? emptyBoarding : emptyShared);
  };

  const handleSelect = (item) => {
    if (type === "boarding") {
      setSelected({
        ...emptyBoarding,
        ...item,
        id: item?.id ?? "",
        picture: sanitizeImageUrl(item?.picture),
        additionalServices: serializeListField(item?.additionalServices),
        specialFeatures: serializeListField(item?.specialFeatures),
      });
      return;
    }

    setSelected({
      ...emptyShared,
      ...item,
      id: item?.id ?? "",
      picture: sanitizeImageUrl(item?.picture),
      duration: item?.duration || item?.Duration || "",
      price: item?.price || item?.Price || "",
      programCovers: item?.programCovers || item?.ProgramCovers || "",
    });
  };

  const handleFieldChange = (event) => {
    setSelected((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSave = async () => {
    const payload = {
      ...selected,
      id: normalizeNumber(selected.id),
      picture: sanitizeImageUrl(selected.picture),
    };

    if (type === "boarding") {
      payload.additionalServices = normalizeListField(selected.additionalServices);
      payload.specialFeatures = normalizeListField(selected.specialFeatures);
    }

    await upsertMutation.mutateAsync({ type, payload });
  };

  const handleDelete = async () => {
    if (!selected?.id) {
      return;
    }

    await deleteMutation.mutateAsync({ type, id: selected.id });
  };

  const selectedImage = sanitizeImageUrl(selected.picture);

  return (
    <Box>
      <Typography variant="h3" fontWeight={900} sx={{ mb: 2 }}>
        Programs
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Manage training, grooming, and boarding program content shown on the public
        pages.
      </Typography>

      <Paper sx={{ p: 1.5, borderRadius: 4, mb: 3 }}>
        <Tabs value={type} onChange={handleChangeType} variant="scrollable">
          {programTypes.map((entry) => (
            <Tab key={entry.value} value={entry.value} label={entry.label} />
          ))}
        </Tabs>
      </Paper>

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
        searchPlaceholder="Search by title or description"
        resultCount={data?.total ?? 0}
        helperText="Matched programs across all pages"
        onReset={() => {
          setSearchTerm("");
          setPage(1);
        }}
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Paper sx={{ p: 2.5, borderRadius: 4 }}>
            <Stack spacing={1.5}>
              <Stack
                direction="row"
                spacing={2}
                sx={{ justifyContent: "space-between" }}
              >
                <Typography variant="h5" fontWeight={900}>
                  {programTypes.find((entry) => entry.value === type)?.label} Programs
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => setSelected(emptyProgram)}
                  sx={{ borderRadius: 3, fontWeight: 800 }}
                >
                  New
                </Button>
              </Stack>

              {isLoading ? (
                <Typography color="text.secondary">Loading...</Typography>
              ) : rows.length ? (
                rows.map((item) => (
                  <Paper
                    key={item._id || item.id}
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      cursor: "pointer",
                      borderColor:
                        selected?.id === item.id
                          ? "success.main"
                          : "rgba(15, 23, 42, 0.12)",
                    }}
                    onClick={() => handleSelect(item)}
                  >
                    <Stack spacing={0.5}>
                      <Typography fontWeight={900}>
                        {item.title || "Untitled"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ID {item.id} • {item.duration || item.Duration || "TBD"} •{" "}
                        {item.price || item.Price || "TBD"}
                      </Typography>
                    </Stack>
                  </Paper>
                ))
              ) : (
                <Typography color="text.secondary">No programs found.</Typography>
              )}

              {totalPages > 1 ? (
                <Box display="flex" pt={2} sx={{ justifyContent: "center" }}>
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
          <Paper sx={{ p: 2.5, borderRadius: 4 }}>
            <Typography variant="h5" fontWeight={900} sx={{ mb: 2 }}>
              Edit Program
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Stack spacing={2}>
              {selectedImage ? (
                <Box
                  component="img"
                  src={selectedImage}
                  alt={selected.title || "Program"}
                  sx={{
                    width: "100%",
                    height: 220,
                    objectFit: "cover",
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                />
              ) : null}

              <TextField
                name="id"
                label="ID"
                value={selected.id}
                onChange={handleFieldChange}
                required
              />
              <TextField
                name="title"
                label="Title"
                value={selected.title}
                onChange={handleFieldChange}
              />
              <TextField
                name="picture"
                label="Image URL"
                value={selected.picture}
                onChange={handleFieldChange}
              />

              {type === "boarding" ? (
                <>
                  <TextField
                    name="shortDescription"
                    label="Short Description"
                    value={selected.shortDescription}
                    onChange={handleFieldChange}
                    multiline
                    minRows={2}
                  />
                  <TextField
                    name="description"
                    label="Description"
                    value={selected.description}
                    onChange={handleFieldChange}
                    multiline
                    minRows={4}
                  />
                </>
              ) : (
                <>
                  <TextField
                    name="dis1"
                    label="Description 1"
                    value={selected.dis1}
                    onChange={handleFieldChange}
                    multiline
                    minRows={2}
                  />
                  <TextField
                    name="dis2"
                    label="Description 2"
                    value={selected.dis2}
                    onChange={handleFieldChange}
                    multiline
                    minRows={2}
                  />
                  <TextField
                    name="dis3"
                    label="Description 3"
                    value={selected.dis3}
                    onChange={handleFieldChange}
                    multiline
                    minRows={2}
                  />
                </>
              )}

              <TextField
                name="duration"
                label="Duration"
                value={selected.duration}
                onChange={handleFieldChange}
              />
              <TextField
                name="price"
                label="Price"
                value={selected.price}
                onChange={handleFieldChange}
              />
              <TextField
                name="programCovers"
                label="Program Covers"
                value={selected.programCovers}
                onChange={handleFieldChange}
                multiline
                minRows={2}
              />

              {type === "boarding" ? (
                <>
                  <TextField
                    name="additionalServices"
                    label="Additional Services (newline or comma separated)"
                    value={selected.additionalServices}
                    onChange={handleFieldChange}
                    multiline
                    minRows={3}
                  />
                  <TextField
                    name="specialFeatures"
                    label="Special Features (newline or comma separated)"
                    value={selected.specialFeatures}
                    onChange={handleFieldChange}
                    multiline
                    minRows={3}
                  />
                </>
              ) : null}

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSave}
                  disabled={upsertMutation.isPending || !selected.id}
                  sx={{ borderRadius: 3, fontWeight: 800, flex: 1 }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending || !selected.id}
                  sx={{ borderRadius: 3, fontWeight: 800, flex: 1 }}
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminPrograms;
