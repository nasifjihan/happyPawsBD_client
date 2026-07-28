import { Chip } from "@mui/material";

const statusMeta = {
  new: { label: "New", color: "warning" },
  reviewed: { label: "Reviewed", color: "info" },
  contacted: { label: "Contacted", color: "secondary" },
  approved: { label: "Approved", color: "success" },
  rejected: { label: "Rejected", color: "error" },
  resolved: { label: "Resolved", color: "success" },
  scheduled: { label: "Scheduled", color: "success" },
  closed: { label: "Closed", color: "default" },
  created: { label: "Created", color: "info" },
  pending_payment: { label: "Pending Payment", color: "warning" },
  checkout_started: { label: "Checkout Started", color: "info" },
  payment_setup_failed: { label: "Setup Failed", color: "error" },
  payment_failed: { label: "Payment Failed", color: "error" },
  paid: { label: "Paid", color: "success" },
  cancelled: { label: "Cancelled", color: "default" },
  unpaid: { label: "Unpaid", color: "warning" },
  failed: { label: "Failed", color: "error" },
};

const toStartCase = (value) =>
  String(value || "")
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const AdminStatusChip = ({ status, labelPrefix }) => {
  const meta = statusMeta[status] || {
    label: toStartCase(status) || "Unknown",
    color: "default",
  };

  return (
    <Chip
      size="small"
      color={meta.color}
      variant={meta.color === "default" ? "outlined" : "filled"}
      label={labelPrefix ? `${labelPrefix}: ${meta.label}` : meta.label}
      sx={{ fontWeight: 700, borderRadius: 2 }}
    />
  );
};

export default AdminStatusChip;
