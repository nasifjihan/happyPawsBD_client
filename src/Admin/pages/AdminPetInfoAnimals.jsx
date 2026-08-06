import { useMemo, useState } from "react";
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
  TextField,
  Typography,
} from "@mui/material";

import AdminFilterToolbar from "../components/AdminFilterToolbar";
import {
  adminDeletePetInfoAnimal,
  adminListPetInfoAnimals,
  adminUpsertPetInfoAnimal,
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
  summary: "",
  idealFor: "",
  commonNeeds: "",
};

const AdminPetInfoAnimals = () => {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(emptyAnimal);

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
    mutationFn: adminUpsertPetInfoAnimal,
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
    },
  });

  const rows = useMemo(() => data?.items ?? [], [data?.items]);
  const totalPages = data?.totalPages ?? 1;
  const errorMessage =
    error?.response?.data?.message || "Could not load pet info animals.";

  const handleSelect = (item) => {
    setSelected({
      ...emptyAnimal,
      ...item,
      type: item?.type || "",
      summary: item?.summary || "",
      idealFor: item?.idealFor || "",
      commonNeeds: serializeListField(item?.commonNeeds),
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
      commonNeeds: normalizeListField(selected.commonNeeds),
    });
  };

  const handleDelete = async () => {
    if (!selected?.type) {
      return;
    }

    await deleteMutation.mutateAsync(selected.type);
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 900 }}>
        Pet Info Animals
      </Typography>
      <Typography sx={{ mb: 2, color: "text.secondary" }}>
        Manage animal type group summaries shown in the Pet Library page.
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
          <Paper sx={{ p: 2.5, borderRadius: 4 }}>
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
                  onClick={() => setSelected(emptyAnimal)}
                  sx={{ borderRadius: 3, fontWeight: 800 }}
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
                      p: 2,
                      borderRadius: 3,
                      cursor: "pointer",
                      borderColor:
                        selected?.type === item.type
                          ? "success.main"
                          : "rgba(15, 23, 42, 0.12)",
                    }}
                    onClick={() => handleSelect(item)}
                  >
                    <Stack spacing={0.5}>
                      <Typography sx={{ fontWeight: 900 }}>{item.type || "Untitled"}</Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", whiteSpace: "nowrap" }}>
                        {item.summary || ""}
                      </Typography>
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
          <Paper sx={{ p: 2.5, borderRadius: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 900 }}>
              Edit Animal
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Stack spacing={2}>
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

export default AdminPetInfoAnimals;
