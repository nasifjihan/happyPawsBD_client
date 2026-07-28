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

import AdminFilterToolbar from "../components/AdminFilterToolbar";
import AdminStatusChip from "../components/AdminStatusChip";
import {
  adminListAdoptionApplications,
  adminUpdateAdoptionApplication,
} from "../lib/adminApi";

const statuses = ["new", "reviewed", "contacted", "approved", "rejected", "closed"];

const AdoptionRequestsAdmin = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [edits, setEdits] = useState({});
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "adoptions", page],
    queryFn: () => adminListAdoptionApplications({ page, limit: 20 }),
    keepPreviousData: true,
  });

  const updateMutation = useMutation({
    mutationFn: adminUpdateAdoptionApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "adoptions"] });
    },
  });

  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;
  const errorMessage =
    error?.response?.data?.message || "Could not load adoption applications.";
  const filteredItems = items.filter((item) => {
    const normalizedQuery = searchTerm.trim().toLowerCase();
    const effectiveStatus = edits[item._id] || item.status || "new";
    const matchesQuery =
      !normalizedQuery ||
      [
        item.adopterName,
        item.animalCode,
        item.animalType,
        item.contactEmail,
        item.contactPhone,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedQuery));

    return matchesQuery && (statusFilter === "all" || effectiveStatus === statusFilter);
  });

  const handleSave = async (item) => {
    const status = edits[item._id] || item.status || "new";
    await updateMutation.mutateAsync({ id: item._id, status });
  };

  return (
    <Box>
      <Typography variant="h3" fontWeight={900} sx={{ mb: 2 }}>
        Adoption Requests
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Review adoption applications and update status.
      </Typography>

      {isError ? (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      ) : null}

      <AdminFilterToolbar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search by applicant, animal code, email, phone, or animal type"
        statusValue={statusFilter}
        onStatusChange={setStatusFilter}
        statusOptions={statuses}
        resultCount={filteredItems.length}
        helperText="Adoption requests on the current page"
      />

      <Paper sx={{ p: 2.5, borderRadius: 4 }}>
        <Stack spacing={2}>
          {isLoading ? (
            <Typography color="text.secondary">Loading...</Typography>
          ) : filteredItems.length ? (
            filteredItems.map((item) => (
              <Paper
                key={item._id}
                variant="outlined"
                sx={{ p: 2, borderRadius: 3 }}
              >
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", md: "center" }}
                  spacing={2}
                >
                  <Box>
                    <Typography fontWeight={900}>
                      {item.adopterName || "Applicant"} • {item.animalCode || ""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.contactEmail || ""} • {item.contactPhone || ""} •{" "}
                      {item.animalType || ""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.address || ""} • {item.experience || "No adoption experience added"}
                    </Typography>
                  </Box>

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <AdminStatusChip status={edits[item._id] || item.status} />
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
              No adoption applications matched your filters.
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
    </Box>
  );
};

export default AdoptionRequestsAdmin;
