import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  Divider,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";

import AdminStatusChip from "../components/AdminStatusChip";
import { adminGetRescueAlert, adminUpdateRescueAlert } from "../lib/adminApi";
import { sanitizeImageUrl } from "../../lib/media";

const statuses = ["new", "reviewing", "dispatched", "resolved", "archived"];

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

const AdminRescueAlertDetails = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const id = params.id;
  const [status, setStatus] = useState("new");
  const [adminNotes, setAdminNotes] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "rescue-alerts", id],
    queryFn: () => adminGetRescueAlert(id),
    enabled: Boolean(id),
    onSuccess: (payload) => {
      setStatus(payload?.status || "new");
      setAdminNotes(payload?.adminNotes || "");
    },
  });

  const mutation = useMutation({
    mutationFn: adminUpdateRescueAlert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "rescue-alerts"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "rescue-alerts", id] });
      queryClient.invalidateQueries({ queryKey: ["admin", "new-counts"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "new-requests-feed"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "recent-requests"] });
    },
  });

  const imageUrl = useMemo(() => sanitizeImageUrl(data?.photo), [data?.photo]);
  const errorMessage =
    error?.response?.data?.message || "Could not load rescue alert.";

  return (
    <Box>
      <Stack
        direction="row"
        sx={{ mb: 2, justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="h3" sx={{ fontWeight: 900 }}>
          Rescue Alert
        </Typography>
        <Button
          component={RouterLink}
          to="/admin/requests/rescue-alerts"
          variant="outlined"
          color="success"
          sx={{ fontWeight: 800 }}
        >
          Back
        </Button>
      </Stack>

      {isError ? (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      ) : null}

      {isLoading ? (
        <Typography sx={{ color: "text.secondary" }}>Loading...</Typography>
      ) : data ? (
        <Paper sx={{ p: { xs: 2.5, md: 4 } }}>
          <Stack spacing={2}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              sx={{ justifyContent: "space-between" }}
            >
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>
                  {data.reporterName || "Reporter"} • {data.animalType || "Animal"}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  ID {data.id} • {data.contactPhone || ""}{" "}
                  {data.contactEmail ? `• ${data.contactEmail}` : ""}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {[data.location, data.landmark].filter(Boolean).join(" • ")}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {data.urgency ? `Urgency: ${data.urgency}` : ""}{" "}
                  {data.createdAt ? `• ${formatDateTime(data.createdAt)}` : ""}
                </Typography>
              </Box>
              <Stack
                spacing={1}
                sx={{ alignItems: { xs: "flex-start", md: "flex-end" } }}
              >
                <AdminStatusChip status={data.status || status} />
              </Stack>
            </Stack>

            {imageUrl ? (
              <Box
                component="img"
                src={imageUrl}
                alt="Rescue report"
                sx={{
                  width: "100%",
                  maxHeight: 320,
                  objectFit: "cover",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              />
            ) : null}

            <Divider />

            <Box>
              <Typography sx={{ fontWeight: 900, mb: 1 }}>
                Description
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                {data.description || ""}
              </Typography>
            </Box>

            <Divider />

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                label="Status"
                select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                sx={{ minWidth: { xs: "100%", md: 240 } }}
              >
                {statuses.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Admin Notes"
                value={adminNotes}
                onChange={(event) => setAdminNotes(event.target.value)}
                multiline
                minRows={3}
                fullWidth
              />
            </Stack>

            {mutation.isError ? (
              <Alert severity="error">
                {mutation.error?.response?.data?.message || "Could not update rescue alert."}
              </Alert>
            ) : null}

            {mutation.isSuccess ? <Alert severity="success">Saved.</Alert> : null}

            <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                color="success"
                disabled={mutation.isPending}
                onClick={() => mutation.mutate({ id, status, adminNotes })}
                sx={{ fontWeight: 800 }}
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </Paper>
      ) : null}
    </Box>
  );
};

export default AdminRescueAlertDetails;

