import { useEffect, useMemo, useState } from "react";
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
import { useSearchParams } from "react-router-dom";

import AdminFilterToolbar from "../components/AdminFilterToolbar";
import {
  adminDeleteVetProvider,
  adminGetVetDirectoryMeta,
  adminListVetProviders,
  adminUpsertVetProvider,
} from "../lib/adminApi";
import { sanitizeImageUrl } from "../../lib/media";

const queryKeys = {
  vets: ({ page, q, division, city, district }) => [
    "admin",
    "vet-providers",
    {
      page,
      q: q || "",
      division: division || "",
      city: city || "",
      district: district || "",
    },
  ],
};

const emptyProvider = {
  id: "",
  title: "",
  position: "",
  Division: "",
  District: "",
  City: "",
  location: "",
  contact: "",
  email: "",
  hours: "",
  services: "",
  website: "",
  map_link: "",
  image: "",
};

const normalizeNumber = (value) => (value === "" ? "" : Number(value));

const normalizeListField = (value) => {
  const normalized = String(value || "")
    .split(/[\n,]+/g)
    .map((item) => item.trim())
    .filter(Boolean);

  if (normalized.length === 0) {
    return "";
  }

  if (normalized.length === 1) {
    return normalized[0];
  }

  return normalized;
};

const serializeListField = (value) => {
  if (!value) {
    return "";
  }

  return Array.isArray(value) ? value.join(", ") : String(value);
};

const normalizePositiveInteger = (value, fallback) => {
  const normalizedValue = Number.parseInt(value, 10);

  if (Number.isNaN(normalizedValue) || normalizedValue <= 0) {
    return fallback;
  }

  return normalizedValue;
};

const AdminVetProviders = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramPage = searchParams.get("page");
  const paramQuery = searchParams.get("q");
  const paramDivision = searchParams.get("division");
  const paramCity = searchParams.get("city");
  const paramDistrict = searchParams.get("district");

  const initialDivision = String(paramDivision || "").trim();
  const initialCity = initialDivision ? String(paramCity || "").trim() : "";
  const initialDistrict =
    initialDivision && initialCity ? String(paramDistrict || "").trim() : "";

  const [page, setPage] = useState(() => normalizePositiveInteger(paramPage, 1));
  const [searchTerm, setSearchTerm] = useState(() => paramQuery || "");
  const [divisionFilter, setDivisionFilter] = useState(() => initialDivision);
  const [cityFilter, setCityFilter] = useState(() => initialCity);
  const [districtFilter, setDistrictFilter] = useState(() => initialDistrict);
  const [selected, setSelected] = useState(emptyProvider);
  const [divisionOptions, setDivisionOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    const nextPage = normalizePositiveInteger(paramPage, 1);
    const nextQuery = paramQuery || "";
    const nextDivision = String(paramDivision || "").trim();
    const nextCity = nextDivision ? String(paramCity || "").trim() : "";
    const nextDistrict = nextDivision && nextCity ? String(paramDistrict || "").trim() : "";

    const divisionChanged = nextDivision !== divisionFilter;
    const cityChanged = nextCity !== cityFilter;
    const districtChanged = nextDistrict !== districtFilter;
    const pageChanged = nextPage !== page;
    const queryChanged = nextQuery !== searchTerm;

    if (!divisionChanged && !cityChanged && !districtChanged && !pageChanged && !queryChanged) {
      return;
    }

    setPage(nextPage);
    setSearchTerm(nextQuery);
    setDivisionFilter(nextDivision);
    setCityFilter(nextCity);
    setDistrictFilter(nextDistrict);

    if (divisionChanged) {
      setCityOptions([]);
      setDistrictOptions([]);
      return;
    }

    if (cityChanged) {
      setDistrictOptions([]);
    }
  }, [
    cityFilter,
    divisionFilter,
    districtFilter,
    page,
    paramCity,
    paramDistrict,
    paramDivision,
    paramPage,
    paramQuery,
    searchTerm,
  ]);

  useEffect(() => {
    const nextParams = {};

    if (page > 1) {
      nextParams.page = String(page);
    }

    const trimmedQuery = searchTerm.trim();
    if (trimmedQuery) {
      nextParams.q = trimmedQuery;
    }

    if (divisionFilter) {
      nextParams.division = divisionFilter;
    }

    if (divisionFilter && cityFilter) {
      nextParams.city = cityFilter;
    }

    if (divisionFilter && cityFilter && districtFilter) {
      nextParams.district = districtFilter;
    }

    const nextSerialized = new URLSearchParams(nextParams).toString();
    const currentSerialized = searchParams.toString();

    if (nextSerialized === currentSerialized) {
      return;
    }

    setSearchParams(nextParams, { replace: true });
  }, [
    cityFilter,
    districtFilter,
    divisionFilter,
    page,
    searchTerm,
    setSearchParams,
    searchParams,
  ]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.vets({
      page,
      q: searchTerm,
      division: divisionFilter,
      city: cityFilter,
      district: districtFilter,
    }),
    queryFn: () =>
      adminListVetProviders({
        page,
        limit: 20,
        q: searchTerm.trim() || undefined,
        division: divisionFilter || undefined,
        city: cityFilter || undefined,
        district: districtFilter || undefined,
      }),
    keepPreviousData: true,
  });

  useQuery({
    queryKey: ["admin", "vet-directory-meta", "divisions"],
    queryFn: () => adminGetVetDirectoryMeta(),
    onSuccess: (result) => {
      setDivisionOptions(result?.divisions ?? []);
    },
  });

  useQuery({
    queryKey: ["admin", "vet-directory-meta", "cities", divisionFilter],
    queryFn: () =>
      divisionFilter
        ? adminGetVetDirectoryMeta({ division: divisionFilter })
        : Promise.resolve({ cities: [] }),
    enabled: Boolean(divisionFilter),
    onSuccess: (result) => {
      setCityOptions(result?.cities ?? []);
    },
  });

  useQuery({
    queryKey: ["admin", "vet-directory-meta", "districts", divisionFilter, cityFilter],
    queryFn: () =>
      divisionFilter && cityFilter
        ? adminGetVetDirectoryMeta({ division: divisionFilter, city: cityFilter })
        : Promise.resolve({ districts: [] }),
    enabled: Boolean(divisionFilter && cityFilter),
    onSuccess: (result) => {
      setDistrictOptions(result?.districts ?? []);
    },
  });

  const upsertMutation = useMutation({
    mutationFn: adminUpsertVetProvider,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "vet-providers"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminDeleteVetProvider,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "vet-providers"] });
      setSelected(emptyProvider);
    },
  });

  const totalPages = data?.totalPages ?? 1;
  const errorMessage =
    error?.response?.data?.message || "Could not load vet providers.";

  const rows = useMemo(
    () =>
      (data?.items ?? []).map((item) => ({
        ...item,
        key: item._id || item.id,
      })),
    [data?.items]
  );

  const selectedImage = sanitizeImageUrl(selected.image);

  const handleDivisionFilterChange = (value) => {
    setDivisionFilter(value);
    setCityFilter("");
    setDistrictFilter("");
    setCityOptions([]);
    setDistrictOptions([]);
    setPage(1);
  };

  const handleCityFilterChange = (value) => {
    setCityFilter(value);
    setDistrictFilter("");
    setDistrictOptions([]);
    setPage(1);
  };

  const handleDistrictFilterChange = (value) => {
    setDistrictFilter(value);
    setPage(1);
  };

  const handleResetFilters = () => {
    setDivisionFilter("");
    setCityFilter("");
    setDistrictFilter("");
    setCityOptions([]);
    setDistrictOptions([]);
    setSearchTerm("");
    setPage(1);
  };

  const handleSelect = (item) => {
    setSelected({
      ...emptyProvider,
      ...item,
      id: item?.id ?? "",
      contact: serializeListField(item?.contact),
      services: serializeListField(item?.services),
      image: sanitizeImageUrl(item?.image),
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
      contact: normalizeListField(selected.contact),
      services: normalizeListField(selected.services),
      image: sanitizeImageUrl(selected.image),
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
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h3" fontWeight={900}>
            Vet Providers
          </Typography>
          <Typography color="text.secondary">
            Manage Vet Finder directory entries displayed on the public site.
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="success"
          onClick={() => setSelected(emptyProvider)}
          sx={{ borderRadius: 3, fontWeight: 800 }}
        >
          New Provider
        </Button>
      </Stack>

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
        searchPlaceholder="Search by name, location, division, city, or email"
        resultCount={data?.total ?? 0}
        helperText="Matched providers across all pages"
      >
        <TextField
          select
          label="Division"
          value={divisionFilter}
          onChange={(event) => handleDivisionFilterChange(event.target.value)}
          sx={{ minWidth: { xs: "100%", md: 200 } }}
        >
          <MenuItem value="">All divisions</MenuItem>
          {divisionOptions.map((entry) => (
            <MenuItem key={entry} value={entry}>
              {entry}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="City"
          value={cityFilter}
          onChange={(event) => handleCityFilterChange(event.target.value)}
          disabled={!divisionFilter}
          sx={{ minWidth: { xs: "100%", md: 200 } }}
        >
          <MenuItem value="">All cities</MenuItem>
          {cityOptions.map((entry) => (
            <MenuItem key={entry} value={entry}>
              {entry}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="District"
          value={districtFilter}
          onChange={(event) => handleDistrictFilterChange(event.target.value)}
          disabled={!divisionFilter || !cityFilter}
          sx={{ minWidth: { xs: "100%", md: 220 } }}
        >
          <MenuItem value="">All districts</MenuItem>
          {districtOptions.map((entry) => (
            <MenuItem key={entry} value={entry}>
              {entry}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="outlined"
          onClick={handleResetFilters}
          sx={{ borderRadius: 3, fontWeight: 800, minWidth: { xs: "100%", md: 120 } }}
        >
          Reset
        </Button>
      </AdminFilterToolbar>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <Paper sx={{ p: 2.5, borderRadius: 4 }}>
            <Stack spacing={1.5}>
              {isLoading ? (
                <Typography color="text.secondary">Loading...</Typography>
              ) : rows.length ? (
                rows.map((item) => (
                  <Paper
                    key={item.key}
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
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        {sanitizeImageUrl(item.image) ? (
                          <Box
                            component="img"
                            src={sanitizeImageUrl(item.image)}
                            alt={item.title || "Vet provider"}
                            sx={{
                              width: 64,
                              height: 64,
                              borderRadius: 2,
                              objectFit: "cover",
                              border: "1px solid",
                              borderColor: "divider",
                              flexShrink: 0,
                            }}
                          />
                        ) : null}
                        <Box>
                          <Typography fontWeight={800}>
                            {item.title || "Unnamed provider"}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ID {item.id} • {item.City || "City"} •{" "}
                            {item.Division || "Division"}
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Paper>
                ))
              ) : (
                <Typography color="text.secondary">
                  No vet providers found.
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
              Edit Provider
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Stack spacing={2}>
              {selectedImage ? (
                <Box
                  component="img"
                  src={selectedImage}
                  alt={selected.title || "Vet provider"}
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
                name="position"
                label="Position"
                value={selected.position}
                onChange={handleFieldChange}
              />
              <TextField
                name="Division"
                label="Division"
                value={selected.Division}
                onChange={handleFieldChange}
              />
              <TextField
                name="District"
                label="District"
                value={selected.District}
                onChange={handleFieldChange}
              />
              <TextField
                name="City"
                label="City"
                value={selected.City}
                onChange={handleFieldChange}
              />
              <TextField
                name="location"
                label="Location"
                value={selected.location}
                onChange={handleFieldChange}
                multiline
                minRows={2}
              />
              <TextField
                name="contact"
                label="Contact (comma or newline separated)"
                value={selected.contact}
                onChange={handleFieldChange}
                multiline
                minRows={2}
              />
              <TextField
                name="email"
                label="Email"
                value={selected.email}
                onChange={handleFieldChange}
              />
              <TextField
                name="hours"
                label="Hours"
                value={selected.hours}
                onChange={handleFieldChange}
              />
              <TextField
                name="services"
                label="Services (comma or newline separated)"
                value={selected.services}
                onChange={handleFieldChange}
                multiline
                minRows={2}
              />
              <TextField
                name="website"
                label="Website"
                value={selected.website}
                onChange={handleFieldChange}
              />
              <TextField
                name="map_link"
                label="Map Link"
                value={selected.map_link}
                onChange={handleFieldChange}
              />
              <TextField
                name="image"
                label="Image URL"
                value={selected.image}
                onChange={handleFieldChange}
              />

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

export default AdminVetProviders;
