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
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import { Link as RouterLink, useParams } from "react-router-dom";

import AdminStatusChip from "../components/AdminStatusChip";
import { adminGetReview, adminUpdateReview } from "../lib/adminApi";

const statuses = ["new", "approved", "rejected"];

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

const AdminReviewDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [draftStatus, setDraftStatus] = useState(null);
  const [draftNotes, setDraftNotes] = useState(null);

  const { data: review, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["admin", "review", id],
    queryFn: () => adminGetReview(id),
    enabled: Boolean(id),
  });

  const updateMutation = useMutation({
    mutationFn: adminUpdateReview,
    onSuccess: (updated) => {
      queryClient.setQueryData(["admin", "review", id], updated);
      queryClient.invalidateQueries({ queryKey: ["admin", "reviews"] });
      setDraftStatus(null);
      setDraftNotes(null);
    },
  });

  const effectiveStatus = draftStatus || review?.status || "new";
  const effectiveNotes = draftNotes ?? review?.adminNotes ?? "";

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
          <Typography variant="h3" sx={{ mb: 1, fontWeight: 900 }}>
            Review Details
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Approve trusted feedback and keep internal notes for moderation decisions.
          </Typography>
        </Box>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
          <Button
            variant="outlined"
            component={RouterLink}
            to="/admin/requests/reviews"
            startIcon={<ArrowBackOutlinedIcon />}
          >
            Back to Reviews
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
            disabled={updateMutation.isPending || !review}
          >
            Save
          </Button>
        </Stack>
      </Stack>

      {isError ? (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error?.response?.data?.message || "Could not load this review."}
        </Alert>
      ) : null}

      {updateMutation.isSuccess ? (
        <Alert severity="success" sx={{ mb: 3 }}>
          Review updated successfully.
        </Alert>
      ) : null}

      {updateMutation.isError ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          {updateMutation.error?.response?.data?.message ||
            "Could not update this review."}
        </Alert>
      ) : null}

      {isLoading ? (
        <Paper sx={{ p: 3 }}>
          <Typography sx={{ color: "text.secondary" }}>Loading review...</Typography>
        </Paper>
      ) : null}

      {review ? (
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
                        {review.title || "Review"}
                      </Typography>
                      <Typography sx={{ color: "text.secondary" }}>
                        {review.fullName || "Community member"}
                        {review.contactEmail ? ` • ${review.contactEmail}` : ""}
                      </Typography>
                    </Box>
                    <AdminStatusChip status={effectiveStatus} />
                  </Stack>

                  <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <Rating value={Number(review.rating || 0)} readOnly />
                    <Typography sx={{ color: "text.secondary" }}>
                      {Number(review.rating || 0)}/5
                    </Typography>
                  </Stack>

                  <TextField
                    select
                    label="Status"
                    value={effectiveStatus}
                    onChange={(event) => setDraftStatus(event.target.value)}
                    sx={{ maxWidth: 260 }}
                  >
                    {statuses.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Review Message
                  </Typography>
                  <Divider />
                  <Typography sx={{ color: "text.secondary", whiteSpace: "pre-line" }}>
                    {review.message || "No message provided."}
                  </Typography>
                </Stack>
              </Paper>

              <Paper sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Admin Notes
                  </Typography>
                  <Divider />
                  <TextField
                    label="Notes (private)"
                    multiline
                    minRows={4}
                    value={effectiveNotes}
                    onChange={(event) => setDraftNotes(event.target.value)}
                  />
                </Stack>
              </Paper>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <Stack spacing={3}>
              <Paper sx={{ p: 3 }}>
                <Stack spacing={1.25}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Timeline
                  </Typography>
                  <Divider />
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <RateReviewOutlinedIcon color="success" fontSize="small" />
                    <Typography>{formatDateTime(review.createdAt)}</Typography>
                  </Stack>
                  <Typography sx={{ color: "text.secondary" }}>
                    Updated {formatDateTime(review.updatedAt)}
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

export default AdminReviewDetails;

