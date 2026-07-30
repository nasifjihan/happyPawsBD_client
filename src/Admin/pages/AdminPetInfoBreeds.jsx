import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Pagination,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AdminFilterToolbar from "../components/AdminFilterToolbar";
import {
  adminDeletePetInfoBreed,
  adminListPetInfoBreeds,
  adminListPetInfoAnimals,
  adminUpsertPetInfoBreed,
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
  origin: "",
  size: "",
  lifespan: "",
  temperament: "",
  careLevel: "",
  exerciseNeeds: "",
  groomingNeeds: "",
  goodFor: "",
  highlights: "",
};

const AdminPetInfoBreeds = () => {
  const queryClient = useQueryClient();
  const [typeFilter, setTypeFilter] = useState("all");
  const [selected, setSelected] = useState(emptyBreed);

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
    mutationFn: adminUpsertPetInfoBreed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "pet-info-breeds"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminDeletePetInfoBreed,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "pet-info-breeds"] });
      setSelected(emptyBreed);
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
    setSelected({
      ...emptyBreed,
      ...item,
      id: item?.id ?? "",
      temperament: serializeListField(item?.temperament),
    });
  };

  const handleFieldChange = (event) => {
    setSelected((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSave = async () => {
    await upsertMutation.mutateAsync({
      ...selected,
      id: normalizeNumber(selected.id),
      temperament: normalizeListField(selected.temperament),
    });
  };

  const handleDelete = async () => {
    if (!selected?.id) {
      return;
    }

    await deleteMutation.mutateAsync(selected.id);
  };

  return (
    <Box>
      <Typography variant="h3" fontWeight={900} sx={{ mb: 2 }}>
        Pet Info Breeds
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Manage breed records shown under each animal type in the Pet Library page.
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
        <Grid item xs={12} lg={7}>
          <Paper sx={{ p: 2.5, borderRadius: 4 }}>
            <Stack spacing={1.5}>
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <Typography variant="h5" fontWeight={900}>
                  Breeds
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => setSelected(emptyBreed)}
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
                      <Typography fontWeight={900}>{item.name || "Unnamed"}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        ID {item.id} • {item.type || "Unknown type"} • {item.size || "N/A"}
                      </Typography>
                    </Stack>
                  </Paper>
                ))
              ) : (
                <Typography color="text.secondary">No breeds found.</Typography>
              )}

              {totalPages > 1 ? (
                <Box display="flex" justifyContent="center" pt={2}>
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

        <Grid item xs={12} lg={5}>
          <Paper sx={{ p: 2.5, borderRadius: 4 }}>
            <Typography variant="h5" fontWeight={900} sx={{ mb: 2 }}>
              Edit Breed
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Stack spacing={2}>
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
              <TextField
                name="origin"
                label="Origin"
                value={selected.origin}
                onChange={handleFieldChange}
              />
              <TextField
                name="size"
                label="Size"
                value={selected.size}
                onChange={handleFieldChange}
              />
              <TextField
                name="lifespan"
                label="Lifespan"
                value={selected.lifespan}
                onChange={handleFieldChange}
              />
              <TextField
                name="careLevel"
                label="Care level"
                value={selected.careLevel}
                onChange={handleFieldChange}
              />
              <TextField
                name="exerciseNeeds"
                label="Exercise needs"
                value={selected.exerciseNeeds}
                onChange={handleFieldChange}
              />
              <TextField
                name="groomingNeeds"
                label="Grooming needs"
                value={selected.groomingNeeds}
                onChange={handleFieldChange}
              />
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

              <Stack direction="row" spacing={1.5} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  color="error"
                  disabled={!selected?.id || deleteMutation.isPending}
                  onClick={handleDelete}
                  sx={{ borderRadius: 3, fontWeight: 800 }}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  disabled={upsertMutation.isPending}
                  onClick={handleSave}
                  sx={{ borderRadius: 3, fontWeight: 800 }}
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

