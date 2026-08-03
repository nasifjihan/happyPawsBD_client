import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import DeliveryInformation from "./DeliveryInformation";
import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";
import { createPaymentSession, orders } from "../../../API/api";
import { loadStripe } from "@stripe/stripe-js";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { appEnv } from "../../../config/env";
import { useCart } from "../../../context/CartContext";
import ContentState from "../../../Components/Common/ContentState";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { useUserAuth } from "../../../context/UserAuthContext";
import {
  clearStoredCheckoutDeliveryInfo,
  getStoredCheckoutDeliveryInfo,
  saveStoredCheckoutDeliveryInfo,
} from "../../../lib/checkoutStorage";
import {
  addOrderHistoryToken,
  getLastOrderToken,
} from "../../../lib/orderHistoryStorage";

const stripePromise = loadStripe(appEnv.stripePublishableKey);

const initialDeliveryInfo = {
  name: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  zip: "",
  address: "",
};

const mergeDeliveryInfo = (...sources) =>
  sources.reduce(
    (accumulator, source) => ({
      ...accumulator,
      ...Object.fromEntries(
        Object.entries(source || {}).map(([key, value]) => [key, value ?? ""])
      ),
    }),
    { ...initialDeliveryInfo }
  );

const trimDeliveryInfo = (deliveryInfo) =>
  Object.fromEntries(
    Object.entries(mergeDeliveryInfo(deliveryInfo)).map(([key, value]) => [
      key,
      String(value || "").trim(),
    ])
  );

const createUserDeliveryInfo = (user) => ({
  name: user?.displayName || "",
  email: user?.email || "",
});

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^(?:\+?88)?01[3-9]\d{8}$/;

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const { cartItems, clearCart, removeFromCart, updateCartItemQuantity } =
    useCart();
  const [deliveryInfo, setDeliveryInfo] = useState(() =>
    mergeDeliveryInfo(
      initialDeliveryInfo,
      getStoredCheckoutDeliveryInfo(),
      createUserDeliveryInfo(null)
    )
  );
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const [feedback, setFeedback] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const paymentStatus = useMemo(
    () => new URLSearchParams(location.search).get("payment"),
    [location.search]
  );
  const hasCartItems = cartItems.length > 0;
  const cartItemCount = useMemo(
    () => cartItems.reduce((total, item) => total + Number(item.quantity || 0), 0),
    [cartItems]
  );
  const cartTotal = useMemo(
    () =>
      cartItems
        .reduce(
          (total, item) => total + Number(item.price || 0) * Number(item.quantity || 0),
          0
        )
        .toFixed(2),
    [cartItems]
  );
  const orderSummary = useMemo(
    () => ({
      items: cartItems,
      total: Number(cartTotal),
    }),
    [cartItems, cartTotal]
  );

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    address: "",
  });

  const validateFields = () => {
    const normalizedDeliveryInfo = trimDeliveryInfo(deliveryInfo);
    const newErrors = {};

    if (!normalizedDeliveryInfo.name) {
      newErrors.name = "Full name is required.";
    }

    if (!normalizedDeliveryInfo.phone) {
      newErrors.phone = "Mobile number is required.";
    } else if (!phonePattern.test(normalizedDeliveryInfo.phone)) {
      newErrors.phone = "Enter a valid Bangladesh mobile number.";
    }

    if (!normalizedDeliveryInfo.email) {
      newErrors.email = "Email is required.";
    } else if (!emailPattern.test(normalizedDeliveryInfo.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!normalizedDeliveryInfo.city) {
      newErrors.city = "City or area is required.";
    }

    if (!normalizedDeliveryInfo.address) {
      newErrors.address = "Address is required.";
    }

    setDeliveryInfo(normalizedDeliveryInfo);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const userDeliveryInfo = createUserDeliveryInfo(user);

    setDeliveryInfo((current) =>
      mergeDeliveryInfo({
        ...current,
        name: current.name || userDeliveryInfo.name,
        email: current.email || userDeliveryInfo.email,
      })
    );
  }, [user]);

  useEffect(() => {
    saveStoredCheckoutDeliveryInfo(deliveryInfo);
  }, [deliveryInfo]);

  useEffect(() => {
    if (!paymentStatus) {
      return;
    }

    if (paymentStatus === "success") {
      const lastOrderToken = getLastOrderToken();
      setCompletedOrder({
        paymentMethod: "online_payment",
        itemCount: cartItemCount,
        total: cartTotal,
        token: lastOrderToken,
      });
      setDeliveryInfo(mergeDeliveryInfo(initialDeliveryInfo, createUserDeliveryInfo(user)));
      clearStoredCheckoutDeliveryInfo();
      clearCart();
      setPaymentMethod("cash_on_delivery");
      setFeedback({
        open: true,
        severity: "success",
        message: "Payment completed successfully. Your order is confirmed.",
      });
    } else if (paymentStatus === "cancelled") {
      setCompletedOrder(null);
      setFeedback({
        open: true,
        severity: "info",
        message:
          "Payment was cancelled. Your cart and delivery details are still saved.",
      });
    }

    navigate("/cart", { replace: true });
  }, [cartItemCount, cartTotal, clearCart, navigate, paymentStatus, user]);

  const handleQuantityChange = (productId, quantity) => {
    updateCartItemQuantity(productId, quantity);
  };

  const handleOrderConfirm = async () => {
    if (!hasCartItems) {
      setFeedback({
        open: true,
        severity: "info",
        message: "Your cart is empty. Add a few items before checkout.",
      });
      return;
    }

    if (!validateFields()) {
      setFeedback({
        open: true,
        severity: "error",
        message: "Please fill in all required delivery information.",
      });
      return;
    }

    const normalizedDeliveryInfo = trimDeliveryInfo(deliveryInfo);
    setDeliveryInfo(normalizedDeliveryInfo);
    setIsSubmitting(true);

    try {
      if (paymentMethod === "cash_on_delivery") {
        const orderDetails = {
          deliveryInfo: normalizedDeliveryInfo,
          orderSummary,
          paymentMethod,
        };

        const created = await orders(orderDetails);
        const publicToken = created?.order?.publicToken;
        if (publicToken) {
          addOrderHistoryToken(publicToken);
        }

        setCompletedOrder({
          paymentMethod,
          itemCount: cartItemCount,
          total: cartTotal,
          token: publicToken || null,
        });
        setFeedback({
          open: true,
          severity: "success",
          message: "Order placed successfully! We will contact you soon.",
        });

        setDeliveryInfo(mergeDeliveryInfo(initialDeliveryInfo, createUserDeliveryInfo(user)));
        clearStoredCheckoutDeliveryInfo();
        clearCart();
        setPaymentMethod("cash_on_delivery");
      } else if (paymentMethod === "online_payment") {
        const stripe = await stripePromise;

        if (!stripe) {
          throw new Error("Stripe is not configured.");
        }

        const hasInvalidPrice = cartItems.some(
          (item) => isNaN(item.price) || item.price <= 0
        );

        if (hasInvalidPrice) {
          throw new Error("One or more cart items have an invalid price.");
        }

        const session = await createPaymentSession(
          cartItems,
          normalizedDeliveryInfo,
          paymentMethod
        );
        const sessionId = session?.sessionId;
        const publicToken = session?.publicToken;

        if (!sessionId) {
          throw new Error("Could not start online payment. Please try again.");
        }

        if (publicToken) {
          addOrderHistoryToken(publicToken);
        }

        const result = await stripe.redirectToCheckout({ sessionId });
        if (result?.error) {
          throw new Error(result.error.message);
        }
      }
    } catch (error) {
      setFeedback({
        open: true,
        severity: "error",
        message:
          error.message ||
          (paymentMethod === "online_payment"
            ? "Could not start online payment. Please try again."
            : "Could not place the order. Please try again."),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      className="myContainer"
      sx={{
        px: { xs: 2, md: 3 },
        py: { xs: 2.5, md: 4 },
        background:
          "linear-gradient(180deg, rgba(122,178,89,0.05) 0%, rgba(255,255,255,1) 22%)",
      }}
    >
      <Box
        sx={{
          mb: 3,
          p: { xs: 2.5, md: 4 },
          borderRadius: 6,
          color: "text.primary",
          border: "1px solid",
          borderColor: "rgba(122, 178, 89, 0.14)",
          background:
            "linear-gradient(135deg, rgba(122,178,89,0.16) 0%, rgba(255,255,255,1) 52%, rgba(251,208,98,0.16) 100%)",
          boxShadow: "0 20px 44px rgba(15, 23, 42, 0.08)",
        }}
      >
        <Stack spacing={1.25}>
          <Chip
            icon={<VerifiedOutlinedIcon sx={{ color: "#7AB259 !important" }} />}
            label="Trusted Pet Care Checkout"
            sx={{
              alignSelf: "flex-start",
              color: "#4d7337",
              borderColor: "rgba(122, 178, 89, 0.28)",
              backgroundColor: "rgba(255, 255, 255, 0.56)",
              borderRadius: 2,
            }}
            variant="outlined"
          />
          <Typography variant="h3" fontWeight={800} color="#333332">
            Checkout
          </Typography>
          <Typography sx={{ maxWidth: 720, color: "text.secondary" }}>
            A calmer, cleaner checkout flow built around your cart, delivery
            details, and secure payment.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25} sx={{ pt: 1 }}>
            <Chip
              icon={<ShoppingBagOutlinedIcon sx={{ color: "#7AB259 !important" }} />}
              label={`${cartItemCount} item${cartItemCount === 1 ? "" : "s"} in cart`}
              sx={{
                color: "text.primary",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                border: "1px solid rgba(122, 178, 89, 0.18)",
                borderRadius: 2,
              }}
            />
            <Chip
              label={`Total ৳${cartTotal}`}
              sx={{
                color: "text.primary",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                border: "1px solid rgba(122, 178, 89, 0.18)",
                borderRadius: 2,
              }}
            />
          </Stack>
        </Stack>
      </Box>

      {feedback.open ? (
        <Alert
          severity={feedback.severity}
          onClose={() =>
            setFeedback((current) => ({ ...current, open: false }))
          }
          sx={{ mb: 3, borderRadius: 3 }}
        >
          {feedback.message}
        </Alert>
      ) : null}

      {completedOrder && !hasCartItems ? (
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 6,
            border: "1px solid rgba(122, 178, 89, 0.16)",
            boxShadow: "0 20px 44px rgba(15, 23, 42, 0.08)",
            background:
              "linear-gradient(135deg, rgba(122,178,89,0.12) 0%, rgba(255,255,255,1) 62%)",
          }}
        >
          <Stack spacing={2}>
            <Chip
              icon={<CheckCircleOutlineOutlinedIcon />}
              label="Order Confirmed"
              sx={{
                alignSelf: "flex-start",
                color: "#4d7337",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                border: "1px solid rgba(122, 178, 89, 0.2)",
                borderRadius: 2,
              }}
            />
            <Typography variant="h4" fontWeight={800} color="#333332">
              Thanks, your checkout is complete
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 720 }}>
              We have saved your order for {completedOrder.itemCount} item
              {completedOrder.itemCount === 1 ? "" : "s"} totaling ৳
              {completedOrder.total}.{" "}
              {completedOrder.paymentMethod === "online_payment"
                ? "Your online payment was completed successfully."
                : "Your cash on delivery request has been received."}
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ pt: 1 }}>
              <Button
                variant="contained"
                component={RouterLink}
                to="/shop"
                sx={{
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 700,
                  backgroundColor: "#7AB259",
                }}
              >
                Continue Shopping
              </Button>
              <Button
                variant="outlined"
                component={RouterLink}
                to="/orders"
                sx={{ borderRadius: 3, textTransform: "none", fontWeight: 700 }}
              >
                View Orders
              </Button>
              <Button
                variant="text"
                component={RouterLink}
                to="/dashboard"
                sx={{ borderRadius: 3, textTransform: "none", fontWeight: 700 }}
              >
                Open Dashboard
              </Button>
            </Stack>
          </Stack>
        </Paper>
      ) : hasCartItems ? (
        <>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, lg: 7 }}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 6,
                  overflow: "hidden",
                  border: "1px solid rgba(122, 178, 89, 0.14)",
                  boxShadow: "0 20px 44px rgba(15, 23, 42, 0.08)",
                  backgroundColor: "#fff",
                }}
              >
                <Box
                  sx={{
                    px: { xs: 2.25, md: 3 },
                    py: { xs: 2, md: 2.5 },
                    background:
                      "linear-gradient(135deg, rgba(122,178,89,0.14) 0%, rgba(255,255,255,1) 100%)",
                    borderBottom: "1px solid rgba(122, 178, 89, 0.12)",
                  }}
                >
                  <Stack spacing={0.75}>
                    <Typography variant="h5" fontWeight={800} color="#333332">
                      Complete Your Order
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Fill in delivery details, choose how you want to pay, and
                      confirm everything from one place.
                    </Typography>
                  </Stack>
                </Box>

                <Box sx={{ p: { xs: 2.25, md: 3 } }}>
                  <DeliveryInformation
                    deliveryInfo={deliveryInfo}
                    setDeliveryInfo={setDeliveryInfo}
                    errors={errors}
                    setErrors={setErrors}
                  />

                  <Divider sx={{ my: 3, borderColor: "rgba(122, 178, 89, 0.12)" }} />

                  <PaymentMethod
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    handleOrderConfirm={handleOrderConfirm}
                    disabled={!hasCartItems}
                    isSubmitting={isSubmitting}
                  />
                </Box>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, lg: 5 }}>
              <Box sx={{ position: { lg: "sticky" }, top: { lg: 24 } }}>
                <OrderSummary
                  cartItems={cartItems}
                  handleQuantityChange={handleQuantityChange}
                  handleRemoveItem={handleRemoveItem}
                />
              </Box>
            </Grid>
          </Grid>
        </>
      ) : (
        <ContentState
          title="Your cart is empty"
          description="Add food, accessories, or care essentials from the shop to start your checkout."
          actionLabel="Continue Shopping"
          actionTo="/shop"
          severity="info"
        />
      )}
    </Box>
  );
};

export default Cart;
