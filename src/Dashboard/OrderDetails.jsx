import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import AccountShell from "./AccountShell";
import ContentState from "../Components/Common/ContentState";
import { useUserAuth } from "../context/UserAuthContext";
import { getPublicOrder } from "../API/api";
import {
  addOrderHistoryToken,
  getOrderHistoryTokens,
} from "../lib/orderHistoryStorage";
import {
  formatOrderDateTime,
  formatOrderMethodLabel,
  getOrderStatusChipColor,
} from "./orderPresentation";

const OrderDetails = () => {
  const { user } = useUserAuth();
  const { token } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const knownTokens = useMemo(() => getOrderHistoryTokens(), []);
  const hasToken = Boolean(String(token || "").trim());
  const isKnownToken = knownTokens.includes(String(token || "").trim());

  useEffect(() => {
    const loadOrder = async () => {
      if (!hasToken) {
        setErrorMessage("Order token is missing.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await getPublicOrder(token);
        const nextOrder = response?.order || null;
        setOrder(nextOrder);
        if (nextOrder?.publicToken) {
          addOrderHistoryToken(nextOrder.publicToken);
        }
      } catch (error) {
        setOrder(null);
        setErrorMessage(error?.message || "Could not load this order.");
      } finally {
        setIsLoading(false);
      }
    };

    loadOrder();
  }, [hasToken, token]);

  if (!user) {
    return (
      <AccountShell
        activeSection="orders"
        title="Order Details"
        description="Review a saved order and its checkout status."
      >
        <ContentState
          title="Sign in to view order details"
          description="Please sign in again to access your saved journeys."
          actionLabel="Sign In"
          actionTo="/sign_in"
          severity="warning"
        />
      </AccountShell>
    );
  }

  const orderIdSuffix = String(order?._id || "").slice(-6);
  const items = order?.orderSummary?.items || [];
  const total = Number(order?.orderSummary?.total || 0).toFixed(2);

  return (
    <AccountShell
      activeSection="orders"
      title="Order Details"
      description="Open one order to review items, delivery details, and payment progress."
    >
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mb: 3 }}>
        <Button
          variant="outlined"
          component={RouterLink}
          to="/orders"
          startIcon={<ArrowBackOutlinedIcon />}
        >
          Back to Orders
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate(0)}
          startIcon={<RefreshOutlinedIcon />}
          disabled={isLoading}
        >
          Reload
        </Button>
        <Button
          variant="contained"
          color="success"
          component={RouterLink}
          to="/shop"
          startIcon={<ShoppingBagOutlinedIcon />}
        >
          Shop Again
        </Button>
      </Stack>

      {!isKnownToken && hasToken ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          This order token is not in your saved browser history, but we can still
          show the order details when the token is valid.
        </Alert>
      ) : null}

      {isLoading ? (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <CircularProgress color="success" />
          <Typography sx={{ mt: 2, color: "text.secondary" }}>
            Loading order details…
          </Typography>
        </Box>
      ) : null}

      {!isLoading && errorMessage ? (
        <ContentState
          title="We could not load this order"
          description={errorMessage}
          actionLabel="Back to Orders"
          actionTo="/orders"
          severity="warning"
        />
      ) : null}

      {!isLoading && order ? (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 4 }}>
              <Stack spacing={2.5}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 900 }}>
                    Order #{orderIdSuffix || "—"}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    Placed {formatOrderDateTime(order.createdAt)}
                  </Typography>
                </Box>

                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ flexWrap: "wrap" }}
                >
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
                    variant="outlined"
                    size="small"
                  />
                </Stack>

                <Divider />

                <Stack spacing={1.5}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Items
                  </Typography>
                  {items.length ? (
                    items.map((item, index) => {
                      const quantity = Number(item.quantity || 0);
                      const price = Number(item.price || 0);
                      const lineTotal = (quantity * price).toFixed(2);

                      return (
                        <Paper
                          key={`${item.id || item.name || "item"}-${index}`}
                          variant="outlined"
                          sx={{ p: 2, borderRadius: 3 }}
                        >
                          <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={1.5}
                            sx={{ justifyContent: "space-between" }}
                          >
                            <Box>
                              <Typography sx={{ fontWeight: 700 }}>
                                {item.name || "Unnamed item"}
                              </Typography>
                              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                Product ID: {item.id || "—"}
                              </Typography>
                            </Box>
                            <Box sx={{ textAlign: { sm: "right" } }}>
                              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                {quantity} x ৳{price.toFixed(2)}
                              </Typography>
                              <Typography sx={{ fontWeight: 700 }}>৳{lineTotal}</Typography>
                            </Box>
                          </Stack>
                        </Paper>
                      );
                    })
                  ) : (
                    <Alert severity="info">No order items were returned for this order.</Alert>
                  )}
                </Stack>
              </Stack>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, lg: 5 }}>
            <Stack spacing={3}>
              <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 4 }}>
                <Stack spacing={1.5}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Summary
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ color: "text.secondary" }}>Items</Typography>
                    <Typography sx={{ fontWeight: 700 }}>
                      {items.length} item{items.length === 1 ? "" : "s"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ color: "text.secondary" }}>Total</Typography>
                    <Typography sx={{ fontWeight: 800 }}>৳{total}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ color: "text.secondary" }}>Updated</Typography>
                    <Typography sx={{ fontWeight: 600 }}>
                      {formatOrderDateTime(order.updatedAt)}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>

              <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 4 }}>
                <Stack spacing={1.5}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Delivery Details
                  </Typography>
                  <Typography sx={{ fontWeight: 700 }}>
                    {order.deliveryInfo?.name || "Customer"}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {order.deliveryInfo?.address || "Address unavailable"}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {[order.deliveryInfo?.city, order.deliveryInfo?.state, order.deliveryInfo?.zip]
                      .filter(Boolean)
                      .join(", ") || "Location unavailable"}
                  </Typography>
                </Stack>
              </Paper>

              <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 4 }}>
                <Stack spacing={1.5}>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Tracking Token
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    This browser uses a saved order token to load the order history
                    without exposing email or phone details in the public response.
                  </Typography>
                  <Typography
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor: "rgba(122, 178, 89, 0.08)",
                      fontFamily: "monospace",
                      wordBreak: "break-all",
                    }}
                  >
                    {order.publicToken || token}
                  </Typography>
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      ) : null}
    </AccountShell>
  );
};

export default OrderDetails;
