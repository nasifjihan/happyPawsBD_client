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

import {
  adminListLostFoundReports,
  adminUpdateLostFoundReport,
} from "../lib/adminApi";

const reportTypes = [
  { value: "lost-pets", label: "Lost Pets" },
  { value: "found-pets", label: "Found Pets" },
];

const statuses = ["new", "reviewed", "resolved", "closed"];

const AdminLostFound = () => {
  const [type, setType] = useState("lost-pets");
  const [page, setPage] = useState(1);
  const [edits, setEdits] = useState({});
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "lost-found", type, page],
    queryFn: () => adminListLostFoundReports({ type, page, limit: 20 }),
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
            setEdits({});
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {reportTypes.map((tab) => (
            <Tab key={tab.value} label={tab.label} />
          ))}
        </Tabs>
      </Paper>

      {isError ? (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      ) : null}

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
                  </Box>

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
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
            <Typography color="text.secondary">No reports found.</Typography>
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

