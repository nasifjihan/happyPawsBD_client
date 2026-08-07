import { useMemo, useState } from "react";
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
  adminListRescueAlerts,
  adminUpdateRescueAlert,
} from "../lib/adminApi";
import { useAdminListQueryState } from "../lib/useAdminListQueryState";

const statuses = ["new", "reviewing", "dispatched", "resolved", "archived"];
const urgencies = ["low", "medium", "high", "critical"];

const formatDateTime = (value) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleString();
};

const AdminRescueAlerts = () => {
  const {
    page,
    setPage,
    q: searchTerm,
    setQ: setSearchTerm,
    status: statusFilter,
    setStatus: setStatusFilter,
  } = useAdminListQueryState({ statusOptions: statuses });
  const [urgencyFilter, setUrgencyFilter] = useState("all");
  const [edits, setEdits] = useState({});
  const queryClient = useQueryClient();

  const staticParams = useMemo(
    () => ({
      urgency: urgencyFilter === "all" ? undefined : urgencyFilter,
    }),
    [urgencyFilter]
  );

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "admin",
      "rescue-alerts",
      { page, q: searchTerm, status: statusFilter, ...staticParams },
    ],
    queryFn: () =>
      adminListRescueAlerts({
        page,
        limit: 20,
        status: statusFilter === "all" ? undefined : statusFilter,
        urgency: urgencyFilter === "all" ? undefined : urgencyFilter,
        q: searchTerm.trim() || undefined,
      }),
    keepPreviousData: true,
  });

  const updateMutation = useMutation({
    mutationFn: adminUpdateRescueAlert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "rescue-alerts"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "new-counts"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "new-requests-feed"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "recent-requests"] });
    },
  });

  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;
  const errorMessage =
    error?.response?.data?.message || "Could not load rescue alerts.";

  const handleSave = async (item) => {
    const status = edits[item._id] || item.status || "new";
    await updateMutation.mutateAsync({ id: item._id, status });
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 900 }}>
        Rescue Alerts
      </Typography>
      <Typography sx={{ mb: 3, color: "text.secondary" }}>
        Review rescue reports and coordinate follow-up actions.
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
        searchPlaceholder="Search by name, phone, animal type, location, or notes"
        statusValue={statusFilter}
        onStatusChange={(value) => {
          setStatusFilter(value);
          setPage(1);
        }}
        statusOptions={statuses}
        resultCount={data?.total ?? 0}
        helperText="Matched rescue alerts across all pages"
        onReset={() => {
          setSearchTerm("");
          setStatusFilter("all");
          setUrgencyFilter("all");
          setPage(1);
        }}
      >
        <TextField
          select
          label="Urgency"
          value={urgencyFilter}
          onChange={(event) => {
            setUrgencyFilter(event.target.value);
            setPage(1);
          }}
          sx={{ minWidth: { xs: "100%", md: 180 } }}
        >
          <MenuItem value="all">All</MenuItem>
          {urgencies.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
      </AdminFilterToolbar>

      <Paper sx={{ p: 2.5 }}>
        <Stack spacing={2}>
          {isLoading ? (
            <Typography sx={{ color: "text.secondary" }}>Loading...</Typography>
          ) : items.length ? (
            items.map((item) => (
              <Paper key={item._id} variant="outlined" sx={{ p: 2 }}>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={2}
                  sx={{
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", md: "center" },
                  }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: 900 }}>
                      {item.reporterName || "Reporter"} • {item.animalType || "Animal"}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {item.contactPhone || ""}{" "}
                      {item.contactEmail ? `• ${item.contactEmail}` : ""}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {[item.location, item.landmark].filter(Boolean).join(" • ")}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {item.urgency ? `Urgency: ${item.urgency}` : ""}{" "}
                      {item.createdAt ? `• ${formatDateTime(item.createdAt)}` : ""}
                    </Typography>
                  </Box>

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <AdminStatusChip status={edits[item._id] || item.status} />
                    <Button
                      variant="outlined"
                      component={RouterLink}
                      to={`/admin/requests/rescue-alerts/${item._id}`}
                      endIcon={<ArrowForwardOutlinedIcon />}
                      sx={{ fontWeight: 800 }}
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
                      sx={{ fontWeight: 800 }}
                    >
                      Save
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            ))
          ) : (
            <Typography sx={{ color: "text.secondary" }}>
              No rescue alerts matched your filters.
            </Typography>
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
    </Box>
  );
};

export default AdminRescueAlerts;

