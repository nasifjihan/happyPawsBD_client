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
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import { Link as RouterLink, useParams } from "react-router-dom";

import AdminStatusChip from "../components/AdminStatusChip";
import {
  adminGetAdoptionApplication,
  adminUpdateAdoptionApplication,
} from "../lib/adminApi";

const statuses = [
  "new",
  "reviewed",
  "contacted",
  "approved",
  "rejected",
  "closed",
];

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

const AdminAdoptionRequestDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [draftStatus, setDraftStatus] = useState(null);

  const {
    data: application,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["admin", "adoption-request", id],
    queryFn: () => adminGetAdoptionApplication(id),
    enabled: Boolean(id),
  });

  const updateMutation = useMutation({
    mutationFn: adminUpdateAdoptionApplication,
    onSuccess: (updated) => {
      queryClient.setQueryData(["admin", "adoption-request", id], updated);
      queryClient.invalidateQueries({ queryKey: ["admin", "adoptions"] });
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
            Adoption Request Details
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Review applicant details, the requested animal code, and adoption
            background before updating the case status.
          </Typography>
        </Box>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
          <Button
            variant="outlined"
            component={RouterLink}
            to="/admin/requests/adoptions"
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
            "Could not load this adoption request."}
        </Alert>
      ) : null}

      {updateMutation.isSuccess ? (
        <Alert severity="success" sx={{ mb: 3 }}>
          Adoption request updated successfully.
        </Alert>
      ) : null}

      {updateMutation.isError ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          {updateMutation.error?.response?.data?.message ||
            "Could not update this adoption request."}
        </Alert>
      ) : null}

      {isLoading ? (
        <Paper sx={{ p: 3 }}>
          <Typography sx={{ color: "text.secondary" }}>
            Loading adoption request...
          </Typography>
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
                        {application.adopterName || "Applicant"}
                      </Typography>
                      <Typography sx={{ color: "text.secondary" }}>
                        {application.animalCode || "No code"} •{" "}
                        {application.animalType || "Animal type not provided"}
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
                    Adoption Background
                  </Typography>
                  <Divider />
                  <Typography sx={{ color: "text.secondary" }}>
                    {application.experience ||
                      "No adoption experience was shared."}
                  </Typography>
                </Stack>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Applicant Contact
                  </Typography>
                  <Divider />
                  <Typography>
                    <strong>Email:</strong>{" "}
                    {application.contactEmail || "No email provided"}
                  </Typography>
                  <Typography>
                    <strong>Phone:</strong>{" "}
                    {application.contactPhone || "No phone provided"}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {application.address || "No address provided"}
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
                    Animal Request
                  </Typography>
                  <Divider />
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center" }}
                  >
                    <PetsOutlinedIcon color="success" fontSize="small" />
                    <Typography sx={{ fontWeight: 700 }}>
                      {application.animalCode || "No code"}
                    </Typography>
                  </Stack>
                  <Typography sx={{ color: "text.secondary" }}>
                    {application.animalType || "Animal type not provided"}
                  </Typography>
                </Stack>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Stack spacing={1.25}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Timeline
                  </Typography>
                  <Divider />
                  <Typography>
                    <strong>Created:</strong>{" "}
                    {formatDateTime(application.createdAt)}
                  </Typography>
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

export default AdminAdoptionRequestDetails;
