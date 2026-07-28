import { useState } from "react";
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

import { adminListOrders, adminUpdateOrder } from "../lib/adminApi";

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

const AdminOrders = () => {
  const [page, setPage] = useState(1);
  const [edits, setEdits] = useState({});
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "orders", page],
    queryFn: () => adminListOrders({ page, limit: 20 }),
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
      <Typography variant="h3" fontWeight={900} sx={{ mb: 2 }}>
        Orders
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Review checkout submissions and update statuses.
      </Typography>

      {isError ? (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      ) : null}

      <Paper sx={{ p: 2.5, borderRadius: 4 }}>
        <Stack spacing={2}>
          {isLoading ? (
            <Typography color="text.secondary">Loading...</Typography>
          ) : items.length ? (
            items.map((order) => (
              <Paper
                key={order._id}
                variant="outlined"
                sx={{ p: 2, borderRadius: 3 }}
              >
                <Stack spacing={1.5}>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", md: "center" }}
                    spacing={2}
                  >
                    <Box>
                      <Typography fontWeight={900}>
                        Order #{order._id?.slice(-6)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {order.deliveryInfo?.name || "Customer"} • ৳
                        {order.orderSummary?.total ?? 0} •{" "}
                        {order.paymentMethod || ""}
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleUpdate(order)}
                      disabled={updateMutation.isPending}
                      sx={{ borderRadius: 3, fontWeight: 800 }}
                    >
                      Save
                    </Button>
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
                  </Stack>
                </Stack>
              </Paper>
            ))
          ) : (
            <Typography color="text.secondary">No orders found.</Typography>
          )}

          {totalPages > 1 ? (
            <Box display="flex" justifyContent="center" pt={2}>
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
