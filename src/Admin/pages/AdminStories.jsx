import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Pagination,
  Paper,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";

import AdminFilterToolbar from "../components/AdminFilterToolbar";
import AdminStatusChip from "../components/AdminStatusChip";
import {
  adminDeleteStory,
  adminListStories,
  adminUpsertStory,
} from "../lib/adminApi";
import { useAdminListQueryState } from "../lib/useAdminListQueryState";
import { sanitizeImageUrl } from "../../lib/media";

const categories = [
  { value: "success", label: "Success Stories" },
  { value: "remembrance", label: "Remembrance" },
  { value: "community", label: "Community Submissions" },
];

const statuses = ["new", "draft", "published", "rejected", "archived"];

const normalizeCategory = (value) => {
  const normalizedValue = String(value || "").trim();
  const exists = categories.some((entry) => entry.value === normalizedValue);
  return exists ? normalizedValue : "success";
};

const normalizeNumber = (value) => (value === "" ? undefined : Number(value));

const serializeTags = (value) => {
  if (!value) {
    return "";
  }

  return Array.isArray(value) ? value.join("\n") : String(value);
};

const normalizeTags = (value) =>
  String(value || "")
    .split(/[\n,]+/g)
    .map((item) => item.trim())
    .filter(Boolean);

const emptyStory = {
  id: "",
  category: "success",
  status: "draft",
  featured: false,
  title: "",
  excerpt: "",
  story: "",
  authorName: "",
  contactEmail: "",
  contactPhone: "",
  petName: "",
  location: "",
  image: "",
  tags: "",
};

const AdminStories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramCategory = searchParams.get("category");
  const [category, setCategory] = useState(() => normalizeCategory(paramCategory));
  const [selected, setSelected] = useState({ ...emptyStory, category });
  const queryClient = useQueryClient();

  const {
    page,
    setPage,
    q: searchTerm,
    setQ: setSearchTerm,
    status: statusFilter,
    setStatus: setStatusFilter,
  } = useAdminListQueryState({
    statusOptions: statuses,
    staticParams: useMemo(() => ({ category }), [category]),
  });

  useEffect(() => {
    const nextCategory = normalizeCategory(paramCategory);
    if (nextCategory !== category) {
      setCategory(nextCategory);
      setSelected({ ...emptyStory, category: nextCategory });
      setPage(1);
      setSearchTerm("");
      setStatusFilter("all");
    }
  }, [
    category,
    paramCategory,
    setPage,
    setSearchTerm,
    setStatusFilter,
    setSelected,
  ]);

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams);

    if (category) {
      nextParams.set("category", category);
    } else {
      nextParams.delete("category");
    }

    if (nextParams.toString() === searchParams.toString()) {
      return;
    }

    setSearchParams(nextParams, { replace: true });
  }, [category, searchParams, setSearchParams]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "stories", category, { page, q: searchTerm, status: statusFilter }],
    queryFn: () =>
      adminListStories({
        category,
        page,
        limit: 20,
        q: searchTerm.trim() || undefined,
        status: statusFilter === "all" ? undefined : statusFilter,
      }),
    keepPreviousData: true,
  });

  const upsertMutation = useMutation({
    mutationFn: adminUpsertStory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "stories"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminDeleteStory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "stories"] });
      setSelected({ ...emptyStory, category });
    },
  });

  const rows = useMemo(() => data?.items ?? [], [data?.items]);
  const totalPages = data?.totalPages ?? 1;
  const errorMessage = error?.response?.data?.message || "Could not load stories.";

  const selectedImage = sanitizeImageUrl(selected.image);

  const handleSelect = (item) => {
    setSelected({
      ...emptyStory,
      ...item,
      id: item?.id ?? "",
      category: item?.category || category,
      tags: serializeTags(item?.tags),
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
      category,
      tags: normalizeTags(selected.tags),
      image: sanitizeImageUrl(selected.image),
    });
  };

  const handleDelete = async () => {
    if (!selected?.id) {
      return;
    }

    await deleteMutation.mutateAsync(selected.id);
  };

  const handleReset = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setPage(1);
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 900 }}>
        Stories & Tributes
      </Typography>
      <Typography sx={{ mb: 2, color: "text.secondary" }}>
        Publish success stories, manage remembrance tributes, and review community
        submissions.
      </Typography>

      <Paper sx={{ p: 1.5, borderRadius: 4, mb: 3 }}>
        <Tabs
          value={category}
          onChange={(_, nextCategory) => {
            setCategory(nextCategory);
          }}
          variant="scrollable"
        >
          {categories.map((entry) => (
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
        searchPlaceholder="Search by title, author, pet name, tag, or location"
        statusValue={statusFilter}
        onStatusChange={(value) => {
          setStatusFilter(value);
          setPage(1);
        }}
        statusOptions={statuses}
        resultCount={data?.total ?? 0}
        helperText="Matched stories across all pages"
        onReset={handleReset}
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
                  {categories.find((entry) => entry.value === category)?.label}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => setSelected({ ...emptyStory, category })}
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
                    <Stack spacing={0.75}>
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ justifyContent: "space-between" }}
                      >
                        <Typography sx={{ fontWeight: 900 }}>
                          {item.title || "Untitled"}
                        </Typography>
                        <AdminStatusChip status={item.status} />
                      </Stack>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        ID {item.id}
                        {item.petName ? ` • ${item.petName}` : ""}
                        {item.authorName ? ` • ${item.authorName}` : ""}
                      </Typography>
                      {item.featured ? (
                        <Typography variant="caption" sx={{ color: "success.main", fontWeight: 800 }}>
                          Featured
                        </Typography>
                      ) : null}
                    </Stack>
                  </Paper>
                ))
              ) : (
                <Typography sx={{ color: "text.secondary" }}>No stories found.</Typography>
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
              Edit Story
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Stack spacing={2}>
              {selectedImage ? (
                <Box
                  component="img"
                  src={selectedImage}
                  alt={selected.title || "Story"}
                  sx={{
                    width: "100%",
                    height: 200,
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

              <TextField select label="Status" name="status" value={selected.status} onChange={handleFieldChange}>
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>

              <FormControlLabel
                control={
                  <Switch
                    checked={Boolean(selected.featured)}
                    onChange={(event) =>
                      setSelected((current) => ({
                        ...current,
                        featured: event.target.checked,
                      }))
                    }
                    color="success"
                  />
                }
                label="Featured"
              />

              <TextField
                name="title"
                label="Title"
                value={selected.title}
                onChange={handleFieldChange}
                required
              />
              <TextField
                name="petName"
                label="Pet Name"
                value={selected.petName}
                onChange={handleFieldChange}
              />
              <TextField
                name="authorName"
                label="Author Name"
                value={selected.authorName}
                onChange={handleFieldChange}
              />
              <TextField
                name="contactEmail"
                label="Contact Email"
                value={selected.contactEmail}
                onChange={handleFieldChange}
              />
              <TextField
                name="contactPhone"
                label="Contact Phone"
                value={selected.contactPhone}
                onChange={handleFieldChange}
              />
              <TextField
                name="location"
                label="Location"
                value={selected.location}
                onChange={handleFieldChange}
              />
              <TextField
                name="image"
                label="Image URL"
                value={selected.image}
                onChange={handleFieldChange}
              />
              <TextField
                name="excerpt"
                label="Short Summary"
                value={selected.excerpt}
                onChange={handleFieldChange}
                multiline
                minRows={2}
              />
              <TextField
                name="story"
                label="Story"
                value={selected.story}
                onChange={handleFieldChange}
                multiline
                minRows={6}
                required
              />
              <TextField
                name="tags"
                label="Tags (newline or comma separated)"
                value={selected.tags}
                onChange={handleFieldChange}
                multiline
                minRows={2}
              />

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSave}
                  disabled={upsertMutation.isPending || !selected.title || !selected.story}
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

export default AdminStories;
