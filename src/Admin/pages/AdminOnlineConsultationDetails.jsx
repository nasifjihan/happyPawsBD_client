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
import {
  adminGetOnlineConsultation,
  adminUpdateOnlineConsultation,
} from "../lib/adminApi";

const statuses = ["new", "reviewed", "confirmed", "completed", "cancelled"];

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

const AdminOnlineConsultationDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [draftStatus, setDraftStatus] = useState(null);
  const [draftNotes, setDraftNotes] = useState(null);

  const { data: consultation, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["admin", "online-consultation", id],
    queryFn: () => adminGetOnlineConsultation(id),
    enabled: Boolean(id),
  });

  const updateMutation = useMutation({
    mutationFn: adminUpdateOnlineConsultation,
    onSuccess: (updated) => {
      queryClient.setQueryData(["admin", "online-consultation", id], updated);
      queryClient.invalidateQueries({ queryKey: ["admin", "online-consultations"] });
      setDraftStatus(null);
      setDraftNotes(null);
    },
  });

  const effectiveStatus = draftStatus || consultation?.status || "new";
  const effectiveNotes =
    draftNotes !== null ? draftNotes : consultation?.adminNotes || "";

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
            Online Consultation Details
          </Typography>
          <Typography color="text.secondary">
            Confirm schedule, contact the client, and track status.
          </Typography>
        </Box>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
          <Button
            variant="outlined"
            component={RouterLink}
            to="/admin/requests/consultations/online"
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
            disabled={updateMutation.isPending || !consultation}
          >
            Save
          </Button>
        </Stack>
      </Stack>

      {isError ? (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error?.response?.data?.message ||
            "Could not load this consultation request."}
        </Alert>
      ) : null}

      {updateMutation.isSuccess ? (
        <Alert severity="success" sx={{ mb: 3 }}>
          Consultation updated successfully.
        </Alert>
      ) : null}

      {updateMutation.isError ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          {updateMutation.error?.response?.data?.message ||
            "Could not update this consultation request."}
        </Alert>
      ) : null}

      {isLoading ? (
        <Paper sx={{ p: 3, borderRadius: 4 }}>
          <Typography color="text.secondary">
            Loading consultation request...
          </Typography>
        </Paper>
      ) : null}

      {consultation ? (
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
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
                        {consultation.fullName || "Client"}
                      </Typography>
                      <Typography color="text.secondary">
                        {consultation.petType || "Pet"}{" "}
                        {consultation.petName ? `• ${consultation.petName}` : ""}
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
                    {consultation.concern || "No concern provided."}
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

          <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
              <Paper sx={{ p: 3, borderRadius: 4 }}>
                <Stack spacing={1.25}>
                  <Typography variant="h6" fontWeight={800}>
                    Contact
                  </Typography>
                  <Divider />
                  <Typography fontWeight={700}>
                    {consultation.contactPhone || "No phone"}
                  </Typography>
                  <Typography color="text.secondary">
                    {consultation.contactEmail || "No email"}
                  </Typography>
                </Stack>
              </Paper>

              <Paper sx={{ p: 3, borderRadius: 4 }}>
                <Stack spacing={1.25}>
                  <Typography variant="h6" fontWeight={800}>
                    Appointment
                  </Typography>
                  <Divider />
                  <Typography>
                    <strong>Mode:</strong>{" "}
                    {consultation.consultationMode || "video"}
                  </Typography>
                  <Typography>
                    <strong>Preferred Doctor:</strong>{" "}
                    {consultation.preferredDoctor || "Any available"}
                  </Typography>
                  <Typography>
                    <strong>Preferred Slot:</strong>{" "}
                    {consultation.preferredSlot || "Not provided"}
                  </Typography>
                  <Typography color="text.secondary">
                    <strong>Pet age:</strong>{" "}
                    {consultation.petAge || "Not provided"}
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
                    Created: {formatDateTime(consultation.createdAt) || "—"}
                  </Typography>
                  <Typography color="text.secondary">
                    Updated: {formatDateTime(consultation.updatedAt) || "—"}
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

export default AdminOnlineConsultationDetails;
