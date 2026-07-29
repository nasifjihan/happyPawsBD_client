import { Button, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";

const AdminFilterToolbar = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search records",
  statusValue = "all",
  onStatusChange,
  statusOptions = [],
  resultCount,
  helperText,
  onReset,
  resetLabel = "Reset",
  children,
}) => (
  <Paper sx={{ p: 2, mb: 3, borderRadius: 4 }}>
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      alignItems={{ xs: "stretch", md: "center" }}
      justifyContent="space-between"
    >
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ flex: 1 }}>
        <TextField
          label="Search"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          fullWidth
        />

        {onStatusChange ? (
          <TextField
            select
            label="Status"
            value={statusValue}
            onChange={(event) => onStatusChange(event.target.value)}
            sx={{ minWidth: { xs: "100%", md: 220 } }}
          >
            <MenuItem value="all">All statuses</MenuItem>
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        ) : null}

        {children}
      </Stack>

      <Stack spacing={0.25} textAlign={{ xs: "left", md: "right" }}>
        {onReset ? (
          <Button
            variant="outlined"
            onClick={onReset}
            color="success"
            sx={{ alignSelf: { xs: "flex-start", md: "flex-end" }, borderRadius: 3, fontWeight: 800 }}
          >
            {resetLabel}
          </Button>
        ) : null}
        <Typography variant="body2" color="text.secondary">
          Showing {resultCount} result{resultCount === 1 ? "" : "s"}
        </Typography>
        {helperText ? (
          <Typography variant="caption" color="text.secondary">
            {helperText}
          </Typography>
        ) : null}
      </Stack>
    </Stack>
  </Paper>
);

export default AdminFilterToolbar;
