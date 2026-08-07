import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Pagination,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { Link as RouterLink, useSearchParams } from "react-router-dom";

import AdminFilterToolbar from "../components/AdminFilterToolbar";
import AdminStatusChip from "../components/AdminStatusChip";
import { adminListOrders, adminUpdateOrder } from "../lib/adminApi";
import { useAdminListQueryState } from "../lib/useAdminListQueryState";

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

const normalizePaymentStatusFilter = (value) => {
  const normalizedValue = String(value || "").trim();

  if (!normalizedValue || normalizedValue === "all") {
    return "all";
  }

  return paymentStatuses.includes(normalizedValue) ? normalizedValue : "all";
};

const AdminOrders = () => {
  const [searchParams] = useSearchParams();
  const [paymentStatusFilter, setPaymentStatusFilter] = useState(() =>
    normalizePaymentStatusFilter(searchParams.get("paymentStatus"))
  );

  const {
    page,
    setPage,
    q: searchTerm,
    setQ: setSearchTerm,
    status: statusFilter,
    setStatus: setStatusFilter,
  } = useAdminListQueryState({
    statusOptions: orderStatuses,
    staticParams: useMemo(
      () => ({
        paymentStatus:
          paymentStatusFilter === "all" ? undefined : paymentStatusFilter,
      }),
      [paymentStatusFilter]
    ),
  });
  const [edits, setEdits] = useState({});
  const queryClient = useQueryClient();

  useEffect(() => {
    const nextValue = normalizePaymentStatusFilter(searchParams.get("paymentStatus"));

    if (nextValue === paymentStatusFilter) {
      return;
    }

    setPaymentStatusFilter(nextValue);
  }, [paymentStatusFilter, searchParams]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "admin",
      "orders",
      { page, q: searchTerm, status: statusFilter, paymentStatus: paymentStatusFilter },
    ],
    queryFn: () =>
      adminListOrders({
        page,
        limit: 20,
        q: searchTerm.trim() || undefined,
        orderStatus: statusFilter === "all" ? undefined : statusFilter,
        paymentStatus:
          paymentStatusFilter === "all" ? undefined : paymentStatusFilter,
      }),
    keepPreviousData: true,
  });

  const updateMutation = useMutation({
    mutationFn: adminUpdateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
    },
  });

  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;
  const errorMessage =
    error?.response?.data?.message || "Could not load orders.";

  const handleUpdate = async (order) => {
    const edit = edits[order._id] || {};

    await updateMutation.mutateAsync({
      id: order._id,
      orderStatus: edit.orderStatus || order.orderStatus,
      paymentStatus: edit.paymentStatus || order.paymentStatus,
    });
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 900 }}>
        Orders
      </Typography>
      <Typography sx={{ mb: 3, color: "text.secondary" }}>
        Review checkout submissions and update statuses.
      </Typography>

      {isError ? (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      ) : null}

      <AdminFilterToolbar
        searchValue={searchTerm}
        onSearchChange={(value) => {
          setSearchTerm(value);
          setPage(1);
        }}
        searchPlaceholder="Search by order id, customer, email, phone, or payment method"
        statusValue={statusFilter}
        onStatusChange={(value) => {
          setStatusFilter(value);
          setPage(1);
        }}
        statusOptions={orderStatuses}
        resultCount={data?.total ?? 0}
        helperText="Matched orders across all pages"
        onReset={() => {
          setSearchTerm("");
          setStatusFilter("all");
          setPaymentStatusFilter("all");
          setPage(1);
        }}
      >
        <TextField
          select
          label="Payment"
          value={paymentStatusFilter}
          onChange={(event) => {
            setPaymentStatusFilter(event.target.value);
            setPage(1);
          }}
          sx={{ minWidth: { xs: "100%", md: 200 } }}
        >
          <MenuItem value="all">All payments</MenuItem>
          {paymentStatuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
      </AdminFilterToolbar>

      <Paper sx={{ p: 2.5 }}>
        <Stack spacing={2}>
          {isLoading ? (
            <Typography sx={{ color: "text.secondary" }}>Loading...</Typography>
          ) : items.length ? (
            items.map((order) => (
              <Paper
                key={order._id}
                variant="outlined"
                sx={{ p: 2 }}
              >
                <Stack spacing={1.5}>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    sx={{
                      justifyContent: "space-between",
                      alignItems: { xs: "flex-start", md: "center" },
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 900 }}>
                        Order #{order._id?.slice(-6)}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {order.deliveryInfo?.name || "Customer"} • ৳
                        {order.orderSummary?.total ?? 0} •{" "}
                        {order.paymentMethod || ""}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {order.deliveryInfo?.email || ""} •{" "}
                        {order.deliveryInfo?.phone || ""}
                      </Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      component={RouterLink}
                      to={`/admin/requests/orders/${order._id}`}
                      endIcon={<ArrowForwardOutlinedIcon />}
                      sx={{ fontWeight: 800 }}
                    >
                      View Details
                    </Button>
                  </Stack>

                  <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                    <AdminStatusChip
                      status={edits[order._id]?.orderStatus || order.orderStatus}
                      labelPrefix="Order"
                    />
                    <AdminStatusChip
                      status={
                        edits[order._id]?.paymentStatus || order.paymentStatus
                      }
                      labelPrefix="Payment"
                    />
                  </Stack>

                  <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <TextField
                      select
                      label="Order Status"
                      value={
                        edits[order._id]?.orderStatus ||
                        order.orderStatus ||
                        "created"
                      }
                      onChange={(event) => {
                        setEdits((current) => ({
                          ...current,
                          [order._id]: {
                            ...current[order._id],
                            orderStatus: event.target.value,
                          },
                        }));
                      }}
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
                      value={
                        edits[order._id]?.paymentStatus ||
                        order.paymentStatus ||
                        "unpaid"
                      }
                      onChange={(event) => {
                        setEdits((current) => ({
                          ...current,
                          [order._id]: {
                            ...current[order._id],
                            paymentStatus: event.target.value,
                          },
                        }));
                      }}
                      sx={{ minWidth: 220 }}
                    >
                      {paymentStatuses.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </TextField>

                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleUpdate(order)}
                      disabled={updateMutation.isPending}
                      sx={{ fontWeight: 800, alignSelf: "center" }}
                    >
                      Save Inline
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            ))
          ) : (
            <Typography sx={{ color: "text.secondary" }}>
              No orders matched your current filters.
            </Typography>
          )}

          {totalPages > 1 ? (
            <Box sx={{ display: "flex", pt: 2, justifyContent: "center" }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, nextPage) => setPage(nextPage)}
                color="success"
              />
            </Box>
          ) : null}
        </Stack>
      </Paper>
    </Box>
  );
};

export default AdminOrders;
