import { useMemo, useState } from "react";
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
  TextField,
  Typography,
} from "@mui/material";

import AdminFilterToolbar from "../components/AdminFilterToolbar";
import AdminStatusChip from "../components/AdminStatusChip";
import {
  adminDeleteBlogPost,
  adminListBlogPosts,
  adminUpsertBlogPost,
} from "../lib/adminApi";
import { useAdminListQueryState } from "../lib/useAdminListQueryState";
import { sanitizeImageUrl } from "../../lib/media";

const statuses = ["draft", "published", "archived"];

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

const emptyPost = {
  id: "",
  status: "draft",
  featured: false,
  category: "",
  title: "",
  excerpt: "",
  content: "",
  authorName: "",
  coverImageUrl: "",
  coverImageAlt: "",
  externalUrl: "",
  tags: "",
  publishedAt: "",
};

const AdminBlogPosts = () => {
  const queryClient = useQueryClient();
  const [categoryFilter, setCategoryFilter] = useState("");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [selected, setSelected] = useState(emptyPost);

  const staticParams = useMemo(
    () => ({
      category: categoryFilter.trim() || undefined,
      featured: featuredOnly ? "1" : undefined,
    }),
    [categoryFilter, featuredOnly]
  );

  const {
    page,
    setPage,
    q: searchTerm,
    setQ: setSearchTerm,
    status: statusFilter,
    setStatus: setStatusFilter,
  } = useAdminListQueryState({
    statusOptions: statuses,
    staticParams,
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "admin",
      "blog-posts",
      { page, q: searchTerm, status: statusFilter, ...staticParams },
    ],
    queryFn: () =>
      adminListBlogPosts({
        page,
        limit: 20,
        q: searchTerm.trim() || undefined,
        status: statusFilter === "all" ? undefined : statusFilter,
        category: categoryFilter.trim() || undefined,
        featured: featuredOnly ? "1" : undefined,
      }),
    keepPreviousData: true,
  });

  const upsertMutation = useMutation({
    mutationFn: adminUpsertBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "blog-posts"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminDeleteBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "blog-posts"] });
      setSelected(emptyPost);
    },
  });

  const rows = useMemo(() => data?.items ?? [], [data?.items]);
  const totalPages = data?.totalPages ?? 1;
  const errorMessage = error?.response?.data?.message || "Could not load blog posts.";

  const selectedImage = sanitizeImageUrl(selected.coverImageUrl);

  const handleReset = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCategoryFilter("");
    setFeaturedOnly(false);
    setPage(1);
  };

  const handleSelect = (item) => {
    setSelected({
      ...emptyPost,
      ...item,
      id: item?.id ?? "",
      tags: serializeTags(item?.tags),
      coverImageUrl: sanitizeImageUrl(item?.coverImageUrl),
      publishedAt: item?.publishedAt ? String(item.publishedAt) : "",
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
      category: selected.category.trim(),
      tags: normalizeTags(selected.tags),
      coverImageUrl: sanitizeImageUrl(selected.coverImageUrl),
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
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 900 }}>
        Blog Posts
      </Typography>
      <Typography sx={{ mb: 2, color: "text.secondary" }}>
        Manage articles shown on the Health Care Blog page.
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
        searchPlaceholder="Search by title, category, author, or tags"
        statusValue={statusFilter}
        onStatusChange={(value) => {
          setStatusFilter(value);
          setPage(1);
        }}
        statusOptions={statuses}
        resultCount={data?.total ?? 0}
        helperText="Matched blog posts across all pages"
        onReset={handleReset}
      >
        <TextField
          label="Category"
          value={categoryFilter}
          onChange={(event) => {
            setCategoryFilter(event.target.value);
            setPage(1);
          }}
          sx={{ minWidth: { xs: "100%", md: 200 } }}
        />
        <TextField
          select
          label="Featured"
          value={featuredOnly ? "featured" : "all"}
          onChange={(event) => {
            setFeaturedOnly(event.target.value === "featured");
            setPage(1);
          }}
          sx={{ minWidth: { xs: "100%", md: 160 } }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="featured">Featured</MenuItem>
        </TextField>
      </AdminFilterToolbar>

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
                  Posts
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => setSelected(emptyPost)}
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
                    <Stack spacing={0.5}>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: "center" }}
                      >
                        <Typography sx={{ fontWeight: 900 }}>
                          {item.title || "Untitled"}
                        </Typography>
                        {item.status ? <AdminStatusChip status={item.status} /> : null}
                      </Stack>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        ID {item.id} • {item.category || "Uncategorized"}
                        {item.featured ? " • Featured" : ""}
                      </Typography>
                    </Stack>
                  </Paper>
                ))
              ) : (
                <Typography sx={{ color: "text.secondary" }}>No blog posts found.</Typography>
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
              Edit Post
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Stack spacing={2}>
              {selectedImage ? (
                <Box
                  component="img"
                  src={selectedImage}
                  alt={selected.coverImageAlt || selected.title || "Blog post"}
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
              />

              <TextField
                name="status"
                label="Status"
                select
                value={selected.status}
                onChange={handleFieldChange}
              >
                {statuses.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
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
                name="category"
                label="Category"
                value={selected.category}
                onChange={handleFieldChange}
              />
              <TextField
                name="title"
                label="Title"
                value={selected.title}
                onChange={handleFieldChange}
                required
              />
              <TextField
                name="authorName"
                label="Author"
                value={selected.authorName}
                onChange={handleFieldChange}
              />
              <TextField
                name="excerpt"
                label="Excerpt"
                value={selected.excerpt}
                onChange={handleFieldChange}
                multiline
                minRows={2}
              />
              <TextField
                name="content"
                label="Content"
                value={selected.content}
                onChange={handleFieldChange}
                multiline
                minRows={8}
                required
              />
              <TextField
                name="coverImageUrl"
                label="Cover Image URL (optional)"
                value={selected.coverImageUrl}
                onChange={handleFieldChange}
              />
              <TextField
                name="coverImageAlt"
                label="Cover Image Alt"
                value={selected.coverImageAlt}
                onChange={handleFieldChange}
              />
              <TextField
                name="externalUrl"
                label="External URL (optional)"
                value={selected.externalUrl}
                onChange={handleFieldChange}
              />
              <TextField
                name="tags"
                label="Tags"
                value={selected.tags}
                onChange={handleFieldChange}
                multiline
                minRows={2}
                helperText="One tag per line"
              />
              <TextField
                name="publishedAt"
                label="Published At (optional)"
                value={selected.publishedAt}
                onChange={handleFieldChange}
              />

              {upsertMutation.isError ? (
                <Alert severity="error">
                  {upsertMutation.error?.response?.data?.message ||
                    "Could not save blog post."}
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

export default AdminBlogPosts;
