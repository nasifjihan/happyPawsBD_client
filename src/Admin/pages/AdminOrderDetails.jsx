import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  Chip,
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
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import { Link as RouterLink, useParams } from "react-router-dom";

import AdminStatusChip from "../components/AdminStatusChip";
import { adminGetOrder, adminUpdateOrder } from "../lib/adminApi";

const orderStatuses = [
  "created",
  "pending_payment",
  "checkout_started",
  "payment_setup_failed",
  "payment_failed",
  "paid",
  "cancelled",
];

const paymentStatuses = ["unpaid", "paid", "failed", "cancelled"];

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

const formatMoney = (value) => `৳${Number(value || 0).toFixed(2)}`;

const formatPaymentMethod = (value) => {
  if (value === "cash_on_delivery") {
    return "Cash on Delivery";
  }

  if (value === "online_payment") {
    return "Online Payment";
  }

  return value || "Unknown";
};

const AdminOrderDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [draftStatus, setDraftStatus] = useState(null);
  const [draftPaymentStatus, setDraftPaymentStatus] = useState(null);

  const { data: order, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["admin", "order", id],
    queryFn: () => adminGetOrder(id),
    enabled: Boolean(id),
  });

  const updateMutation = useMutation({
    mutationFn: adminUpdateOrder,
    onSuccess: (updatedOrder) => {
      queryClient.setQueryData(["admin", "order", id], updatedOrder);
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
      setDraftStatus(null);
      setDraftPaymentStatus(null);
    },
  });

  const effectiveOrderStatus = draftStatus || order?.orderStatus || "created";
  const effectivePaymentStatus =
    draftPaymentStatus || order?.paymentStatus || "unpaid";
  const orderItems = order?.orderSummary?.items;
  const totalQuantity = useMemo(
    () =>
      (orderItems ?? []).reduce(
        (sum, item) => sum + Number(item.quantity || 0),
        0
      ),
    [orderItems]
  );

  const handleSave = async () => {
    await updateMutation.mutateAsync({
      id,
      orderStatus: effectiveOrderStatus,
      paymentStatus: effectivePaymentStatus,
    });
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h3" fontWeight={900} sx={{ mb: 1 }}>
            Order Details
          </Typography>
          <Typography color="text.secondary">
            Review the full checkout record, line items, delivery details, and
            payment status from one page.
          </Typography>
        </Box>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
          <Button
            variant="outlined"
            component={RouterLink}
            to="/admin/requests/orders"
            startIcon={<ArrowBackOutlinedIcon />}
          >
            Back to Orders
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
            disabled={updateMutation.isPending || !order}
          >
            Save Statuses
          </Button>
        </Stack>
      </Stack>

      {isError ? (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error?.response?.data?.message || "Could not load this order."}
        </Alert>
      ) : null}

      {updateMutation.isSuccess ? (
        <Alert severity="success" sx={{ mb: 3 }}>
          Order statuses updated successfully.
        </Alert>
      ) : null}

      {updateMutation.isError ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          {updateMutation.error?.response?.data?.message ||
            "Could not update this order."}
        </Alert>
      ) : null}

      {isLoading ? (
        <Paper sx={{ p: 3, borderRadius: 4 }}>
          <Typography color="text.secondary">Loading order details...</Typography>
        </Paper>
      ) : null}

      {order ? (
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Stack spacing={3}>
              <Paper sx={{ p: 3, borderRadius: 4 }}>
                <Stack spacing={2}>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", md: "center" }}
                    spacing={2}
                  >
                    <Box>
                      <Typography variant="h5" fontWeight={900}>
                        Order #{order._id?.slice(-6)}
                      </Typography>
                      <Typography color="text.secondary">
                        {order.deliveryInfo?.name || "Customer"} •{" "}
                        {formatPaymentMethod(order.paymentMethod)}
                      </Typography>
                    </Box>
                    <Chip
                      icon={<ReceiptLongOutlinedIcon />}
                      label={`${totalQuantity} item${totalQuantity === 1 ? "" : "s"} • ${formatMoney(
                        order.orderSummary?.total
                      )}`}
                      sx={{ borderRadius: 2 }}
                    />
                  </Stack>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <AdminStatusChip
                      status={effectiveOrderStatus}
                      labelPrefix="Order"
                    />
                    <AdminStatusChip
                      status={effectivePaymentStatus}
                      labelPrefix="Payment"
                    />
                  </Stack>

                  <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                      select
                      label="Order Status"
                      value={effectiveOrderStatus}
                      onChange={(event) => setDraftStatus(event.target.value)}
                      sx={{ minWidth: 220 }}
                    >
                      {orderStatuses.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      select
                      label="Payment Status"
                      value={effectivePaymentStatus}
                      onChange={(event) =>
                        setDraftPaymentStatus(event.target.value)
                      }
                      sx={{ minWidth: 220 }}
                    >
                      {paymentStatuses.map((status) => (
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
                    Line Items
                  </Typography>
                  {orderItems.length ? (
                    orderItems.map((item, index) => {
                      const quantity = Number(item.quantity || 0);
                      const unitPrice = Number(item.price || 0);

                      return (
                        <Paper
                          key={`${item.id || item.name || "item"}-${index}`}
                          variant="outlined"
                          sx={{ p: 2, borderRadius: 3 }}
                        >
                          <Stack
                            direction={{ xs: "column", md: "row" }}
                            justifyContent="space-between"
                            spacing={1.5}
                          >
                            <Box>
                              <Typography fontWeight={800}>
                                {item.name || "Unnamed item"}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Product ID: {item.id || "N/A"}
                              </Typography>
                            </Box>
                            <Box sx={{ textAlign: { md: "right" } }}>
                              <Typography variant="body2" color="text.secondary">
                                {quantity} x {formatMoney(unitPrice)}
                              </Typography>
                              <Typography fontWeight={800}>
                                {formatMoney(quantity * unitPrice)}
                              </Typography>
                            </Box>
                          </Stack>
                        </Paper>
                      );
                    })
                  ) : (
                    <Alert severity="info">This order has no saved line items.</Alert>
                  )}
                </Stack>
              </Paper>
            </Stack>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
              <Paper sx={{ p: 3, borderRadius: 4 }}>
                <Stack spacing={1.25}>
                  <Typography variant="h6" fontWeight={800}>
                    Customer
                  </Typography>
                  <Divider />
                  <Typography fontWeight={700}>
                    {order.deliveryInfo?.name || "Customer"}
                  </Typography>
                  <Typography color="text.secondary">
                    {order.deliveryInfo?.email || "No email provided"}
                  </Typography>
                  <Typography color="text.secondary">
                    {order.deliveryInfo?.phone || "No phone provided"}
                  </Typography>
                </Stack>
              </Paper>

              <Paper sx={{ p: 3, borderRadius: 4 }}>
                <Stack spacing={1.25}>
                  <Typography variant="h6" fontWeight={800}>
                    Delivery
                  </Typography>
                  <Divider />
                  <Typography color="text.secondary">
                    {order.deliveryInfo?.address || "No address provided"}
                  </Typography>
                  <Typography color="text.secondary">
                    {[
                      order.deliveryInfo?.city,
                      order.deliveryInfo?.state,
                      order.deliveryInfo?.zip,
                    ]
                      .filter(Boolean)
                      .join(", ") || "No location details provided"}
                  </Typography>
                </Stack>
              </Paper>

              <Paper sx={{ p: 3, borderRadius: 4 }}>
                <Stack spacing={1.25}>
                  <Typography variant="h6" fontWeight={800}>
                    Tracking
                  </Typography>
                  <Divider />
                  <Typography variant="body2" color="text.secondary">
                    Created
                  </Typography>
                  <Typography>{formatDateTime(order.createdAt)}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Updated
                  </Typography>
                  <Typography>{formatDateTime(order.updatedAt)}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Public Token
                  </Typography>
                  <Typography sx={{ fontFamily: "monospace", wordBreak: "break-all" }}>
                    {order.publicToken || "Not generated"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Stripe Session
                  </Typography>
                  <Typography sx={{ fontFamily: "monospace", wordBreak: "break-all" }}>
                    {order.stripeCheckoutSessionId || "Not started"}
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

export default AdminOrderDetails;
