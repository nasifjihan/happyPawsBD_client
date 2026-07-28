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
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";

import AdminFilterToolbar from "../components/AdminFilterToolbar";
import AdminStatusChip from "../components/AdminStatusChip";
import { adminListEnrollments, adminUpdateEnrollment } from "../lib/adminApi";

const enrollmentTypes = [
  { value: "training", label: "Training" },
  { value: "grooming", label: "Grooming" },
  { value: "boarding", label: "Boarding" },
];

const statuses = ["new", "reviewed", "contacted", "scheduled", "closed"];

const AdminEnrollments = () => {
  const [type, setType] = useState("training");
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [edits, setEdits] = useState({});
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "enrollments", type, page],
    queryFn: () => adminListEnrollments({ type, page, limit: 20 }),
    keepPreviousData: true,
  });

  const updateMutation = useMutation({
    mutationFn: adminUpdateEnrollment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "enrollments", type] });
    },
  });

  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;
  const errorMessage =
    error?.response?.data?.message || "Could not load enrollments.";
  const filteredItems = items.filter((item) => {
    const normalizedQuery = searchTerm.trim().toLowerCase();
    const effectiveStatus = edits[item._id] || item.status || "new";
    const matchesQuery =
      !normalizedQuery ||
      [item.name, item.contactEmail, item.contactPhone, item.address, item.programId]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedQuery));

    return matchesQuery && (statusFilter === "all" || effectiveStatus === statusFilter);
  });

  const handleSave = async (item) => {
    const status = edits[item._id] || item.status || "new";
    await updateMutation.mutateAsync({ type, id: item._id, status });
  };

  const tabIndex = enrollmentTypes.findIndex((tab) => tab.value === type);

  return (
    <Box>
      <Typography variant="h3" fontWeight={900} sx={{ mb: 2 }}>
        Enrollments
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Review training, grooming, and boarding enrollments.
      </Typography>

      <Paper sx={{ borderRadius: 4, overflow: "hidden", mb: 3 }}>
        <Tabs
          value={Math.max(0, tabIndex)}
          onChange={(_, nextIndex) => {
            const nextType = enrollmentTypes[nextIndex]?.value || "training";
            setType(nextType);
            setPage(1);
            setEdits({});
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {enrollmentTypes.map((tab) => (
            <Tab key={tab.value} label={tab.label} />
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
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search by applicant, email, phone, address, or program id"
        statusValue={statusFilter}
        onStatusChange={setStatusFilter}
        statusOptions={statuses}
        resultCount={filteredItems.length}
        helperText={`${type} enrollments on the current page`}
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
                      {item.name || "Applicant"} • Program {item.programId ?? ""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.contactEmail || ""} • {item.contactPhone || ""} •{" "}
                      {item.address || ""}
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
              No enrollments matched your filters.
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

export default AdminEnrollments;
