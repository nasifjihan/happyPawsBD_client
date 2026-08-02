import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  Chip,
  MenuItem,
  Pagination,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";

import AdminFilterToolbar from "../components/AdminFilterToolbar";
import AdminStatusChip from "../components/AdminStatusChip";
import {
  adminGetNewLostFoundCounts,
  adminListLostFoundReports,
  adminUpdateLostFoundReport,
} from "../lib/adminApi";

const reportTypes = [
  { value: "lost-pets", label: "Lost Pets" },
  { value: "found-pets", label: "Found Pets" },
];

const statuses = ["new", "reviewed", "resolved", "closed"];

const normalizeLostFoundType = (value) => {
  const normalizedValue = String(value || "").trim();
  const exists = reportTypes.some((entry) => entry.value === normalizedValue);
  return exists ? normalizedValue : "lost-pets";
};

const normalizePositiveInteger = (value, fallback) => {
  const normalizedValue = Number.parseInt(value, 10);

  if (Number.isNaN(normalizedValue) || normalizedValue <= 0) {
    return fallback;
  }

  return normalizedValue;
};

const normalizeStatusFilter = (value) => {
  const normalizedValue = String(value || "").trim();

  if (!normalizedValue || normalizedValue === "all") {
    return "all";
  }

  return statuses.includes(normalizedValue) ? normalizedValue : "all";
};

const AdminLostFound = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramType = searchParams.get("type");
  const paramPage = searchParams.get("page");
  const paramQuery = searchParams.get("q");
  const paramStatus = searchParams.get("status");
  const [type, setType] = useState(() => normalizeLostFoundType(paramType));
  const [page, setPage] = useState(() => normalizePositiveInteger(paramPage, 1));
  const [searchTerm, setSearchTerm] = useState(() => paramQuery || "");
  const [statusFilter, setStatusFilter] = useState(() =>
    normalizeStatusFilter(paramStatus)
  );
  const [edits, setEdits] = useState({});
  const queryClient = useQueryClient();

  const { data: newCounts } = useQuery({
    queryKey: ["admin", "lost-found", "new-counts"],
    queryFn: adminGetNewLostFoundCounts,
  });

  useEffect(() => {
    const nextType = normalizeLostFoundType(paramType);
    if (nextType !== type) {
      setType(nextType);
      setPage(1);
      setSearchTerm("");
      setStatusFilter("all");
      setEdits({});
    }
  }, [paramType, type]);

  useEffect(() => {
    const nextParams = {};

    if (type) {
      nextParams.type = type;
    }

    if (page > 1) {
      nextParams.page = String(page);
    }

    const trimmedQuery = searchTerm.trim();
    if (trimmedQuery) {
      nextParams.q = trimmedQuery;
    }

    if (statusFilter && statusFilter !== "all") {
      nextParams.status = statusFilter;
    }

    setSearchParams(nextParams, { replace: true });
  }, [page, searchTerm, setSearchParams, statusFilter, type]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "lost-found", type, { page, q: searchTerm, status: statusFilter }],
    queryFn: () =>
      adminListLostFoundReports({
        type,
        page,
        limit: 20,
        status: statusFilter === "all" ? undefined : statusFilter,
        q: searchTerm.trim() || undefined,
      }),
    keepPreviousData: true,
  });

  const updateMutation = useMutation({
    mutationFn: adminUpdateLostFoundReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "lost-found", type] });
    },
  });

  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;
  const errorMessage =
    error?.response?.data?.message || "Could not load lost & found reports.";

  const handleSave = async (item) => {
    const status = edits[item._id] || item.status || "new";
    await updateMutation.mutateAsync({ type, id: item._id, status });
  };

  const tabIndex = reportTypes.findIndex((tab) => tab.value === type);

  return (
    <Box>
      <Typography variant="h3" fontWeight={900} sx={{ mb: 2 }}>
        Lost & Found
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Review community reports and mark them resolved when appropriate.
      </Typography>

      <Paper sx={{ borderRadius: 4, overflow: "hidden", mb: 3 }}>
        <Tabs
          value={Math.max(0, tabIndex)}
          onChange={(_, nextIndex) => {
            const nextType = reportTypes[nextIndex]?.value || "lost-pets";
            setType(nextType);
            setPage(1);
            setSearchTerm("");
            setStatusFilter("all");
            setEdits({});
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {reportTypes.map((tab) => (
            <Tab
              key={tab.value}
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <span>{tab.label}</span>
                  {(tab.value === "lost-pets" ? newCounts?.lostPets : newCounts?.foundPets) >
                  0 ? (
                    <Chip
                      label={
                        tab.value === "lost-pets"
                          ? newCounts?.lostPets ?? 0
                          : newCounts?.foundPets ?? 0
                      }
                      size="small"
                      color="success"
                      sx={{ fontWeight: 900 }}
                    />
                  ) : null}
                </Stack>
              }
            />
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
        searchPlaceholder="Search by pet name, report owner/finder, phone, type, or location"
        statusValue={statusFilter}
        onStatusChange={(value) => {
          setStatusFilter(value);
          setPage(1);
        }}
        statusOptions={statuses}
        resultCount={data?.total ?? 0}
        helperText={`Matched ${type} reports across all pages`}
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
                      {type === "lost-pets"
                        ? item.petName || "Lost pet"
                        : item.breed || item.animalType || "Found pet"}{" "}
                      • {item.animalType || ""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {type === "lost-pets"
                        ? `${item.ownerName || ""} • ${item.contactPhone || ""}`
                        : `${item.founderName || ""} • ${item.contactPhone || ""}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.lastSeenLocation || item.foundLocation || ""} •{" "}
                      {item.lostDate || item.foundDate || ""}
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
              No reports matched your filters.
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

export default AdminLostFound;
