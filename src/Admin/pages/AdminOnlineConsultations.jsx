import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Pagination,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { Link as RouterLink } from "react-router-dom";

import AdminFilterToolbar from "../components/AdminFilterToolbar";
import AdminStatusChip from "../components/AdminStatusChip";
import {
  adminListOnlineConsultations,
  adminUpdateOnlineConsultation,
} from "../lib/adminApi";
import { useAdminListQueryState } from "../lib/useAdminListQueryState";

const statuses = ["new", "reviewed", "confirmed", "completed", "cancelled"];

const AdminOnlineConsultations = () => {
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
    queryKey: ["admin", "online-consultations", { page, q: searchTerm, status: statusFilter }],
    queryFn: () =>
      adminListOnlineConsultations({
        page,
        limit: 20,
        status: statusFilter === "all" ? undefined : statusFilter,
        q: searchTerm.trim() || undefined,
      }),
    keepPreviousData: true,
  });

  const updateMutation = useMutation({
    mutationFn: adminUpdateOnlineConsultation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "online-consultations"] });
    },
  });

  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;
  const errorMessage =
    error?.response?.data?.message || "Could not load online consultations.";

  const handleSave = async (item) => {
    const status = edits[item._id] || item.status || "new";
    await updateMutation.mutateAsync({ id: item._id, status });
  };

  return (
    <Box>
      <Typography variant="h3" fontWeight={900} sx={{ mb: 2 }}>
        Online Consultations
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Review appointment requests and confirm the schedule.
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
        searchPlaceholder="Search by name, phone, pet type, doctor, or concern"
        statusValue={statusFilter}
        onStatusChange={(value) => {
          setStatusFilter(value);
          setPage(1);
        }}
        statusOptions={statuses}
        resultCount={data?.total ?? 0}
        helperText="Matched online consultation requests across all pages"
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
                  spacing={2}
                  sx={{
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", md: "center" },
                  }}
                >
                  <Box>
                    <Typography fontWeight={900}>
                      {item.fullName || "Client"} • {item.petType || "Pet"}
                      {item.petName ? ` (${item.petName})` : ""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.contactPhone || ""}{" "}
                      {item.contactEmail ? `• ${item.contactEmail}` : ""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {[
                        item.consultationMode ? `Mode: ${item.consultationMode}` : null,
                        item.preferredDoctor ? `Doctor: ${item.preferredDoctor}` : null,
                        item.preferredSlot ? `Slot: ${item.preferredSlot}` : null,
                      ]
                        .filter(Boolean)
                        .join(" • ")}
                    </Typography>
                  </Box>

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <AdminStatusChip status={edits[item._id] || item.status} />
                    <Button
                      variant="outlined"
                      component={RouterLink}
                      to={`/admin/requests/consultations/online/${item._id}`}
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
            <Typography color="text.secondary">
              No online consultations matched your filters.
            </Typography>
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
    </Box>
  );
};

export default AdminOnlineConsultations;
