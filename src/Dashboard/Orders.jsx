import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

import AccountShell from "./AccountShell";
import ContentState from "../Components/Common/ContentState";
import { useUserAuth } from "../context/UserAuthContext";
import { getPublicOrder } from "../API/api";
import {
  getOrderHistoryTokens,
  removeOrderHistoryToken,
} from "../lib/orderHistoryStorage";
import {
  formatOrderDateTime,
  formatOrderMethodLabel,
  getOrderStatusChipColor,
} from "./orderPresentation";

const Orders = () => {
  const { user } = useUserAuth();
  const [tokens, setTokens] = useState(() => getOrderHistoryTokens());
  const [ordersState, setOrdersState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const tokenCount = tokens.length;

  const refreshTokens = useCallback(() => {
    setTokens(getOrderHistoryTokens());
  }, []);

  const fetchOrders = useCallback(async () => {
    if (!tokens.length) {
      setOrdersState([]);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const results = await Promise.allSettled(
        tokens.map(async (token) => {
          const response = await getPublicOrder(token);
          return { token, order: response?.order || null };
        })
      );

      const nextState = results.map((result, index) => {
        const token = tokens[index];

        if (result.status === "fulfilled") {
          return {
            token,
            order: result.value.order,
            error: "",
          };
        }

        return {
          token,
          order: null,
          error: result.reason?.message || "Could not load this order.",
        };
      });

      setOrdersState(nextState);
    } catch (error) {
      setErrorMessage(error?.message || "Could not load your orders.");
      setOrdersState([]);
    } finally {
      setIsLoading(false);
    }
  }, [tokens]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const hasOrders = ordersState.some((entry) => entry.order);

  const headerDescription = useMemo(() => {
    if (!tokenCount) {
      return "No stored checkout tokens yet. Place an order to start tracking your history.";
    }

    return `${tokenCount} saved order${tokenCount === 1 ? "" : "s"} from this browser.`;
  }, [tokenCount]);

  if (!user) {
    return (
      <AccountShell
        activeSection="orders"
        title="Orders"
        description="Review your recent checkouts and payment statuses."
      >
        <ContentState
          title="Sign in to view orders"
          description="Please sign in again to access your saved journeys."
          actionLabel="Sign In"
          actionTo="/sign_in"
          severity="warning"
        />
      </AccountShell>
    );
  }

  return (
    <AccountShell
      activeSection="orders"
      title="Orders"
      description={headerDescription}
    >
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mb: 3 }}>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            refreshTokens();
          }}
          startIcon={<RefreshOutlinedIcon />}
        >
          Refresh tokens
        </Button>
        <Button
          variant="outlined"
          onClick={fetchOrders}
          startIcon={<RefreshOutlinedIcon />}
          disabled={!tokenCount || isLoading}
        >
          Reload orders
        </Button>
        <Button
          variant="outlined"
          component={RouterLink}
          to="/shop"
          startIcon={<ShoppingBagOutlinedIcon />}
        >
          Shop
        </Button>
      </Stack>

      {errorMessage ? (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      ) : null}

      {isLoading ? (
        <Box textAlign="center" py={6}>
          <CircularProgress color="success" />
          <Typography sx={{ mt: 2 }} color="text.secondary">
            Loading orders…
          </Typography>
        </Box>
      ) : null}

      {!isLoading && !tokenCount ? (
        <ContentState
          title="No orders stored yet"
          description="Place a cash on delivery order or complete a Stripe checkout to see it here."
          actionLabel="Browse Shop"
          actionTo="/shop"
          severity="info"
        />
      ) : null}

      {!isLoading && tokenCount && !hasOrders ? (
        <ContentState
          title="We could not load your saved orders"
          description="Your browser has stored checkout tokens, but the API did not return order data. Try reloading or place a new order."
          actionLabel="Reload"
          onAction={fetchOrders}
          severity="warning"
        />
      ) : null}

      {!isLoading && hasOrders ? (
        <Grid container spacing={2.5}>
          {ordersState.map((entry) => {
            const order = entry.order;
            const token = entry.token;

            if (!order) {
              return (
                <Grid item xs={12} md={6} key={token}>
                  <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
                    <Stack spacing={1}>
                      <Typography variant="h6" fontWeight={800}>
                        Order unavailable
                      </Typography>
                      <Typography color="text.secondary">
                        {entry.error || "This order could not be loaded."}
                      </Typography>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteOutlineOutlinedIcon />}
                        onClick={() => {
                          removeOrderHistoryToken(token);
                          refreshTokens();
                        }}
                      >
                        Remove token
                      </Button>
                    </Stack>
                  </Paper>
                </Grid>
              );
            }

            const orderIdSuffix = String(order._id || "").slice(-6);
            const itemCount = order.orderSummary?.items?.length || 0;
            const total = order.orderSummary?.total;

            return (
              <Grid item xs={12} md={6} key={token}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    height: "100%",
                  }}
                >
                  <Stack spacing={2} height="100%">
                    <Box>
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="space-between"
                        alignItems="flex-start"
                      >
                        <Box>
                          <Typography variant="h6" fontWeight={900}>
                            Order #{orderIdSuffix || "—"}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formatOrderDateTime(order.createdAt)}
                          </Typography>
                        </Box>
                        <Button
                          variant="text"
                          color="error"
                          startIcon={<DeleteOutlineOutlinedIcon />}
                          onClick={() => {
                            removeOrderHistoryToken(token);
                            refreshTokens();
                          }}
                        >
                          Remove
                        </Button>
                      </Stack>
                    </Box>

                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      <Chip
                        label={`Order: ${order.orderStatus || "unknown"}`}
                        color={getOrderStatusChipColor(order.orderStatus)}
                        size="small"
                      />
                      <Chip
                        label={`Payment: ${order.paymentStatus || "unknown"}`}
                        color={getOrderStatusChipColor(order.paymentStatus)}
                        size="small"
                      />
                      <Chip
                        label={`Method: ${formatOrderMethodLabel(order.paymentMethod)}`}
                        size="small"
                        variant="outlined"
                      />
                    </Stack>

                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Items
                      </Typography>
                      <Typography fontWeight={700}>
                        {itemCount} item{itemCount === 1 ? "" : "s"} · ৳
                        {Number(total || 0).toFixed(2)}
                      </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Delivery
                      </Typography>
                      <Typography>
                        {order.deliveryInfo?.city || "—"}
                        {order.deliveryInfo?.address
                          ? ` · ${order.deliveryInfo.address}`
                          : ""}
                      </Typography>
                    </Box>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
                      <Button variant="outlined" onClick={fetchOrders}>
                        Refresh status
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        component={RouterLink}
                        to={`/orders/${token}`}
                        endIcon={<ArrowForwardOutlinedIcon />}
                      >
                        View details
                      </Button>
                    </Stack>
                  </Stack>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      ) : null}
    </AccountShell>
  );
};

export default Orders;
