import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import { Link as RouterLink, useParams } from "react-router-dom";

import AdminStatusChip from "../components/AdminStatusChip";
import { adminGetHouseCallRequest, adminUpdateHouseCallRequest } from "../lib/adminApi";

const statuses = ["new", "reviewed", "dispatched", "completed", "cancelled"];

const formatDateTime = (value) => {
  if (!value) {
    return "";
  }

  try {
    return new Date(value).toLocaleString("en-BD", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    return String(value);
  }
};

const AdminHouseCallRequestDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [draftStatus, setDraftStatus] = useState(null);
  const [draftNotes, setDraftNotes] = useState(null);

  const { data: request, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["admin", "house-call-request", id],
    queryFn: () => adminGetHouseCallRequest(id),
    enabled: Boolean(id),
  });

  const updateMutation = useMutation({
    mutationFn: adminUpdateHouseCallRequest,
    onSuccess: (updated) => {
      queryClient.setQueryData(["admin", "house-call-request", id], updated);
      queryClient.invalidateQueries({ queryKey: ["admin", "house-calls"] });
      setDraftStatus(null);
      setDraftNotes(null);
    },
  });

  const effectiveStatus = draftStatus || request?.status || "new";
  const effectiveNotes = draftNotes !== null ? draftNotes : request?.adminNotes || "";

  const handleSave = async () => {
    await updateMutation.mutateAsync({
      id,
      status: effectiveStatus,
      adminNotes: effectiveNotes,
    });
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{
          mb: 3,
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
        }}
      >
        <Box>
          <Typography variant="h3" fontWeight={900} sx={{ mb: 1 }}>
            House Call Details
          </Typography>
          <Typography color="text.secondary">
            Confirm the visit, dispatch a team member, and track status.
          </Typography>
        </Box>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
          <Button
            variant="outlined"
            component={RouterLink}
            to="/admin/requests/consultations/house-calls"
            startIcon={<ArrowBackOutlinedIcon />}
          >
            Back to Requests
          </Button>
          <Button
            variant="outlined"
            onClick={() => refetch()}
            disabled={isLoading}
            startIcon={<RefreshOutlinedIcon />}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleSave}
            disabled={updateMutation.isPending || !request}
          >
            Save
          </Button>
        </Stack>
      </Stack>

      {isError ? (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error?.response?.data?.message || "Could not load this house call request."}
        </Alert>
      ) : null}

      {updateMutation.isSuccess ? (
        <Alert severity="success" sx={{ mb: 3 }}>
          House call request updated successfully.
        </Alert>
      ) : null}

      {updateMutation.isError ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          {updateMutation.error?.response?.data?.message ||
            "Could not update this house call request."}
        </Alert>
      ) : null}

      {isLoading ? (
        <Paper sx={{ p: 3, borderRadius: 4 }}>
          <Typography color="text.secondary">Loading house call request...</Typography>
        </Paper>
      ) : null}

      {request ? (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Stack spacing={3}>
              <Paper sx={{ p: 3, borderRadius: 4 }}>
                <Stack spacing={2}>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    sx={{
                      justifyContent: "space-between",
                      alignItems: { xs: "flex-start", md: "center" },
                    }}
                  >
                    <Box>
                      <Typography variant="h5" fontWeight={900}>
                        {request.fullName || "Client"}
                      </Typography>
                      <Typography color="text.secondary">
                        {request.petType || "Pet"}{" "}
                        {request.petName ? `• ${request.petName}` : ""}
                      </Typography>
                    </Box>
                    <AdminStatusChip status={effectiveStatus} />
                  </Stack>

                  <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                      select
                      label="Status"
                      value={effectiveStatus}
                      onChange={(event) => setDraftStatus(event.target.value)}
                      sx={{ minWidth: 220 }}
                    >
                      {statuses.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>
                </Stack>
              </Paper>

              <Paper sx={{ p: 3, borderRadius: 4 }}>
                <Stack spacing={2}>
                  <Typography variant="h6" fontWeight={800}>
                    Concern
                  </Typography>
                  <Typography color="text.secondary">
                    {request.concern || "No concern provided."}
                  </Typography>
                </Stack>
              </Paper>

              <Paper sx={{ p: 3, borderRadius: 4 }}>
                <Stack spacing={2}>
                  <Typography variant="h6" fontWeight={800}>
                    Admin Notes
                  </Typography>
                  <TextField
                    value={effectiveNotes}
                    onChange={(event) => setDraftNotes(event.target.value)}
                    multiline
                    minRows={4}
                  />
                </Stack>
              </Paper>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <Stack spacing={3}>
              <Paper sx={{ p: 3, borderRadius: 4 }}>
                <Stack spacing={1.25}>
                  <Typography variant="h6" fontWeight={800}>
                    Contact
                  </Typography>
                  <Divider />
                  <Typography fontWeight={700}>{request.contactPhone || "No phone"}</Typography>
                  <Typography color="text.secondary">{request.contactEmail || "No email"}</Typography>
                </Stack>
              </Paper>

              <Paper sx={{ p: 3, borderRadius: 4 }}>
                <Stack spacing={1.25}>
                  <Typography variant="h6" fontWeight={800}>
                    Visit Details
                  </Typography>
                  <Divider />
                  <Typography>
                    <strong>Urgency:</strong> {request.urgency || "medium"}
                  </Typography>
                  <Typography>
                    <strong>City:</strong> {request.city || "—"}
                  </Typography>
                  <Typography>
                    <strong>Address:</strong> {request.address || "—"}
                  </Typography>
                  <Typography>
                    <strong>Preferred Date:</strong> {request.preferredDate || "—"}
                  </Typography>
                  <Typography>
                    <strong>Preferred Time:</strong> {request.preferredTime || "—"}
                  </Typography>
                  <Typography color="text.secondary">
                    <strong>Pet age:</strong> {request.petAge || "Not provided"}
                  </Typography>
                </Stack>
              </Paper>

              <Paper sx={{ p: 3, borderRadius: 4 }}>
                <Stack spacing={1.25}>
                  <Typography variant="h6" fontWeight={800}>
                    Metadata
                  </Typography>
                  <Divider />
                  <Typography color="text.secondary">
                    Created: {formatDateTime(request.createdAt) || "—"}
                  </Typography>
                  <Typography color="text.secondary">
                    Updated: {formatDateTime(request.updatedAt) || "—"}
                  </Typography>
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      ) : null}
    </Box>
  );
};

export default AdminHouseCallRequestDetails;

