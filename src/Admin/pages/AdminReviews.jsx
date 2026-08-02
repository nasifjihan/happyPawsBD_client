import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Pagination,
  Paper,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { Link as RouterLink } from "react-router";

import AdminFilterToolbar from "../components/AdminFilterToolbar";
import AdminStatusChip from "../components/AdminStatusChip";
import { adminListReviews, adminUpdateReview } from "../lib/adminApi";
import { useAdminListQueryState } from "../lib/useAdminListQueryState";

const statuses = ["new", "approved", "rejected"];

const AdminReviews = () => {
  const {
    page,
    setPage,
    q: searchTerm,
    setQ: setSearchTerm,
    status: statusFilter,
    setStatus: setStatusFilter,
  } = useAdminListQueryState({ statusOptions: statuses });
  const [edits, setEdits] = useState({});
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "reviews", { page, q: searchTerm, status: statusFilter }],
    queryFn: () =>
      adminListReviews({
        page,
        limit: 20,
        status: statusFilter === "all" ? undefined : statusFilter,
        q: searchTerm.trim() || undefined,
      }),
    keepPreviousData: true,
  });

  const updateMutation = useMutation({
    mutationFn: adminUpdateReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "reviews"] });
    },
  });

  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;
  const errorMessage = error?.response?.data?.message || "Could not load reviews.";

  const handleSave = async (item) => {
    const status = edits[item._id] || item.status || "new";
    await updateMutation.mutateAsync({ id: item._id, status });
  };

  return (
    <Box>
      <Typography variant="h3" fontWeight={900} sx={{ mb: 2 }}>
        Reviews
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Approve trusted community reviews and reject spam or irrelevant submissions.
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
        searchPlaceholder="Search by name, email, title, or message"
        statusValue={statusFilter}
        onStatusChange={(value) => {
          setStatusFilter(value);
          setPage(1);
        }}
        statusOptions={statuses}
        resultCount={data?.total ?? 0}
        helperText="Matched review submissions across all pages"
        onReset={() => {
          setSearchTerm("");
          setStatusFilter("all");
          setPage(1);
        }}
      />

      <Paper sx={{ p: 2.5, borderRadius: 4 }}>
        <Stack spacing={2}>
          {isLoading ? (
            <Typography color="text.secondary">Loading...</Typography>
          ) : items.length ? (
            items.map((item) => (
              <Paper key={item._id} variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", md: "center" }}
                  spacing={2}
                >
                  <Box>
                    <Typography fontWeight={900}>
                      {item.title || "Review"} • {item.fullName || "Community member"}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Rating value={Number(item.rating || 0)} readOnly size="small" />
                      <Typography variant="body2" color="text.secondary">
                        {item.contactEmail ? item.contactEmail : "No email"}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {String(item.message || "").slice(0, 140)}
                      {String(item.message || "").length > 140 ? "…" : ""}
                    </Typography>
                  </Box>

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <AdminStatusChip status={edits[item._id] || item.status} />
                    <Button
                      variant="outlined"
                      component={RouterLink}
                      to={`/admin/requests/reviews/${item._id}`}
                      endIcon={<ArrowForwardOutlinedIcon />}
                      sx={{ borderRadius: 3, fontWeight: 800 }}
                    >
                      View Details
                    </Button>
                    <TextField
                      select
                      label="Status"
                      value={edits[item._id] || item.status || "new"}
                      onChange={(event) =>
                        setEdits((current) => ({
                          ...current,
                          [item._id]: event.target.value,
                        }))
                      }
                      sx={{ minWidth: 220 }}
                    >
                      {statuses.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </TextField>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleSave(item)}
                      disabled={updateMutation.isPending}
                      sx={{ borderRadius: 3, fontWeight: 800 }}
                    >
                      Save
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            ))
          ) : (
            <Typography color="text.secondary">No reviews matched your filters.</Typography>
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
    </Box>
  );
};

export default AdminReviews;
