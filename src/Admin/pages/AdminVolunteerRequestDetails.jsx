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
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import { Link as RouterLink, useParams } from "react-router-dom";

import AdminStatusChip from "../components/AdminStatusChip";
import {
  adminGetVolunteerApplication,
  adminUpdateVolunteerApplication,
} from "../lib/adminApi";

const statuses = ["new", "reviewed", "contacted", "closed"];

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

const AdminVolunteerRequestDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [draftStatus, setDraftStatus] = useState(null);

  const { data: application, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["admin", "volunteer-request", id],
    queryFn: () => adminGetVolunteerApplication(id),
    enabled: Boolean(id),
  });

  const updateMutation = useMutation({
    mutationFn: adminUpdateVolunteerApplication,
    onSuccess: (updated) => {
      queryClient.setQueryData(["admin", "volunteer-request", id], updated);
      queryClient.invalidateQueries({ queryKey: ["admin", "volunteers"] });
      setDraftStatus(null);
    },
  });

  const effectiveStatus = draftStatus || application?.status || "new";

  const handleSave = async () => {
    await updateMutation.mutateAsync({ id, status: effectiveStatus });
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
          <Typography variant="h3" sx={{ mb: 1, fontWeight: 900 }}>
            Volunteer Request Details
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Review motivation, availability, contact preferences, and follow-up
            status from one page.
          </Typography>
        </Box>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
          <Button
            variant="outlined"
            component={RouterLink}
            to="/admin/requests/volunteers"
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
            disabled={updateMutation.isPending || !application}
          >
            Save Status
          </Button>
        </Stack>
      </Stack>

      {isError ? (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error?.response?.data?.message ||
            "Could not load this volunteer request."}
        </Alert>
      ) : null}

      {updateMutation.isSuccess ? (
        <Alert severity="success" sx={{ mb: 3 }}>
          Volunteer request updated successfully.
        </Alert>
      ) : null}

      {updateMutation.isError ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          {updateMutation.error?.response?.data?.message ||
            "Could not update this volunteer request."}
        </Alert>
      ) : null}

      {isLoading ? (
        <Paper sx={{ p: 3 }}>
          <Typography sx={{ color: "text.secondary" }}>Loading volunteer request...</Typography>
        </Paper>
      ) : null}

      {application ? (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Stack spacing={3}>
              <Paper sx={{ p: 3 }}>
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
                      <Typography variant="h5" sx={{ fontWeight: 900 }}>
                        {application.fullName || "Volunteer"}
                      </Typography>
                      <Typography sx={{ color: "text.secondary" }}>
                        {application.preferredRole || "Role not provided"} •{" "}
                        {application.city || "City not provided"}
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

              <Paper sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Motivation
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {application.motivation || "No motivation provided."}
                  </Typography>
                </Stack>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Experience and Availability
                  </Typography>
                  <Divider />
                  <Typography>
                    <strong>Availability:</strong>{" "}
                    {application.availability || "Not provided"}
                  </Typography>
                  <Typography>
                    <strong>Time Commitment:</strong>{" "}
                    {application.timeCommitment || "Not provided"}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {application.experience || "No experience shared."}
                  </Typography>
                </Stack>
              </Paper>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <Stack spacing={3}>
              <Paper sx={{ p: 3 }}>
                <Stack spacing={1.25}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Contact
                  </Typography>
                  <Divider />
                  <Typography sx={{ fontWeight: 700 }}>
                    {application.contactEmail || "No email"}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {application.contactPhone || "No phone"}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    Preferred method:{" "}
                    {application.preferredContactMethod || "Not provided"}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    Preferred time:{" "}
                    {application.preferredContactTime || "Not provided"}
                  </Typography>
                </Stack>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Stack spacing={1.25}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Summary
                  </Typography>
                  <Divider />
                  <Typography>
                    <strong>City:</strong> {application.city || "Not provided"}
                  </Typography>
                  <Typography>
                    <strong>Role:</strong>{" "}
                    {application.preferredRole || "Not provided"}
                  </Typography>
                </Stack>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Stack spacing={1.25}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Timeline
                  </Typography>
                  <Divider />
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <VolunteerActivismOutlinedIcon color="success" fontSize="small" />
                    <Typography>{formatDateTime(application.createdAt)}</Typography>
                  </Stack>
                  <Typography sx={{ color: "text.secondary" }}>
                    Updated {formatDateTime(application.updatedAt)}
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

export default AdminVolunteerRequestDetails;
