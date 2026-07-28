import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { adminUpdateCredentials } from "../lib/adminApi";

const AdminSettings = () => {
  const [form, setForm] = useState({ username: "", password: "" });

  const updateMutation = useMutation({
    mutationFn: adminUpdateCredentials,
  });

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateMutation.mutateAsync({
      username: form.username || undefined,
      password: form.password || undefined,
    });
    setForm({ username: "", password: "" });
  };

  return (
    <Box>
      <Typography variant="h3" fontWeight={900} sx={{ mb: 2 }}>
        Settings
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Change the admin username or password.
      </Typography>

      <Paper sx={{ p: 3, borderRadius: 4, maxWidth: 520 }}>
        <Stack spacing={2}>
          {updateMutation.isError ? (
            <Alert severity="error">
              {updateMutation.error?.response?.data?.message ||
                "Could not update credentials."}
            </Alert>
          ) : null}

          {updateMutation.isSuccess ? (
            <Alert severity="success">Credentials updated.</Alert>
          ) : null}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2}>
              <TextField
                label="New Username (optional)"
                name="username"
                value={form.username}
                onChange={handleChange}
                autoComplete="username"
              />
              <TextField
                label="New Password (optional)"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
              />

              <Button
                type="submit"
                variant="contained"
                color="success"
                disabled={updateMutation.isPending}
                sx={{ borderRadius: 3, fontWeight: 800, py: 1.25 }}
              >
                Save Changes
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AdminSettings;

