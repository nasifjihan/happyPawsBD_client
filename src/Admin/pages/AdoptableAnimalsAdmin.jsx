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
  adminDeleteAdoptableAnimal,
  adminListAdoptableAnimals,
  adminUpsertAdoptableAnimal,
} from "../lib/adminApi";

const queryKeys = {
  animals: (page) => ["admin", "adoption-animals", page],
};

const emptyAnimal = {
  code: "",
  name: "",
  species: "",
  breed: "",
  age: "",
  gender: "",
  location: "",
  photos: "",
  temperament: "",
  adoptionfee: "",
};

const normalizeNumber = (value) => (value === "" ? "" : Number(value));

const AdoptableAnimalsAdmin = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(emptyAnimal);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.animals(page),
    queryFn: () => adminListAdoptableAnimals({ page, limit: 20 }),
    keepPreviousData: true,
  });

  const upsertMutation = useMutation({
    mutationFn: adminUpsertAdoptableAnimal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "adoption-animals"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminDeleteAdoptableAnimal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "adoption-animals"] });
      setSelected(emptyAnimal);
    },
  });

  const totalPages = data?.totalPages ?? 1;
  const errorMessage =
    error?.response?.data?.message || "Could not load adoptable animals.";

  const rows = useMemo(
    () =>
      (data?.items ?? []).map((animal) => ({
        ...animal,
        key: animal._id || animal.code,
      })),
    [data?.items]
  );
  const filteredRows = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    if (!normalizedQuery) {
      return rows;
    }

    return rows.filter((animal) =>
      [
        animal.code,
        animal.name,
        animal.species,
        animal.breed,
        animal.location,
        animal.gender,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value).toLowerCase().includes(normalizedQuery)
        )
    );
  }, [rows, searchTerm]);

  const handleSelect = (animal) => {
    setSelected({
      ...emptyAnimal,
      ...animal,
      code: animal?.code ?? "",
      age: animal?.age ?? "",
      adoptionfee: animal?.adoptionfee ?? "",
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
      age: normalizeNumber(selected.age),
      adoptionfee: String(selected.adoptionfee ?? ""),
    });
  };

  const handleDelete = async () => {
    if (!selected?.code) {
      return;
    }

    await deleteMutation.mutateAsync(selected.code);
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h3" fontWeight={900}>
            Adoptable Animals
          </Typography>
          <Typography color="text.secondary">
            Manage adoption listings shown on the public site.
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="success"
          onClick={() => setSelected(emptyAnimal)}
          sx={{ borderRadius: 3, fontWeight: 800 }}
        >
          New Animal
        </Button>
      </Stack>

      {isError ? (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      ) : null}

      <AdminFilterToolbar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search by code, animal name, species, breed, or location"
        resultCount={filteredRows.length}
        helperText="Adoption listings on the current page"
      />

      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <Paper sx={{ p: 2.5, borderRadius: 4 }}>
            <Stack spacing={1.5}>
              {isLoading ? (
                <Typography color="text.secondary">Loading...</Typography>
              ) : filteredRows.length ? (
                filteredRows.map((animal) => (
                  <Paper
                    key={animal.key}
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      cursor: "pointer",
                      borderColor:
                        selected?.code === animal.code
                          ? "success.main"
                          : "rgba(15, 23, 42, 0.12)",
                    }}
                    onClick={() => handleSelect(animal)}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                    >
                      <Box>
                        <Typography fontWeight={800}>
                          {animal.name || "Unnamed animal"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Code {animal.code} • {animal.species || ""} •{" "}
                          {animal.location || ""}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {animal.gender || ""}
                      </Typography>
                    </Stack>
                  </Paper>
                ))
              ) : (
                <Typography color="text.secondary">
                  No adoptable animals matched your search.
                </Typography>
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
              Edit Animal
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {upsertMutation.isError ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {upsertMutation.error?.response?.data?.message ||
                  "Could not save animal."}
              </Alert>
            ) : null}

            <Stack spacing={2}>
              <TextField
                label="Code"
                name="code"
                value={selected.code}
                onChange={handleFieldChange}
                required
              />
              <TextField
                label="Name"
                name="name"
                value={selected.name}
                onChange={handleFieldChange}
              />
              <TextField
                label="Species"
                name="species"
                value={selected.species}
                onChange={handleFieldChange}
              />
              <TextField
                label="Breed"
                name="breed"
                value={selected.breed}
                onChange={handleFieldChange}
              />
              <TextField
                label="Age"
                name="age"
                value={selected.age}
                onChange={handleFieldChange}
              />
              <TextField
                label="Gender"
                name="gender"
                value={selected.gender}
                onChange={handleFieldChange}
              />
              <TextField
                label="Location"
                name="location"
                value={selected.location}
                onChange={handleFieldChange}
              />
              <TextField
                label="Photo URL"
                name="photos"
                value={selected.photos}
                onChange={handleFieldChange}
              />
              <TextField
                label="Temperament"
                name="temperament"
                value={selected.temperament}
                onChange={handleFieldChange}
              />
              <TextField
                label="Adoption Fee"
                name="adoptionfee"
                value={selected.adoptionfee}
                onChange={handleFieldChange}
              />

              <Stack direction="row" spacing={1.5}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSave}
                  disabled={upsertMutation.isPending}
                  sx={{ flex: 1, borderRadius: 3, fontWeight: 800 }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending || !selected?.code}
                  sx={{ borderRadius: 3, fontWeight: 800 }}
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

export default AdoptableAnimalsAdmin;
