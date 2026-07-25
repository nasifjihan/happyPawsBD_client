import React, { useEffect, useMemo, useState } from "react";
import { Alert, Box, Grid, Snackbar } from "@mui/material";
import DeliveryInformation from ".//DeliveryInformation";
import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";
import { createPaymentSession, orders } from "../../../API/api";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { appEnv } from "../../../config/env";

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

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [deliveryInfo, setDeliveryInfo] = useState(initialDeliveryInfo);
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const [feedback, setFeedback] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const paymentStatus = useMemo(
    () => new URLSearchParams(location.search).get("payment"),
    [location.search]
  );

  const handleRemoveItem = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const validateFields = () => {
    let newErrors = {};
    if (!deliveryInfo.name) newErrors.name = "Name is required.";
    if (!deliveryInfo.phone) newErrors.phone = "Mobile number is required.";
    if (!deliveryInfo.email) newErrors.email = "Email is required.";
    if (!deliveryInfo.address) newErrors.address = "Address is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
  }, []);

  useEffect(() => {
    if (!paymentStatus) {
      return;
    }

    if (paymentStatus === "success") {
      setDeliveryInfo(initialDeliveryInfo);
      setCartItems([]);
      localStorage.removeItem("cartItems");
      setPaymentMethod("cash_on_delivery");
      setShowSuccess(true);
    } else if (paymentStatus === "cancelled") {
      setFeedback({
        open: true,
        severity: "info",
        message: "Payment was cancelled. Your cart is still saved.",
      });
    }

    navigate("/cart", { replace: true });
  }, [navigate, paymentStatus]);

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) {
      handleRemoveItem(productId);
      return;
    }

    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const handleOrderConfirm = async () => {
    if (!validateFields()) {
      setFeedback({
        open: true,
        severity: "error",
        message: "Please fill in all required delivery information.",
      });
      return;
    }

    if (paymentMethod === "cash_on_delivery") {
      try {
        const orderDetails = {
          deliveryInfo,
          orderSummary: {
            items: cartItems,
            total: calculateTotal(),
          },
          paymentMethod,
        };

        await orders(orderDetails);

        setFeedback({
          open: true,
          severity: "success",
          message: "Order placed successfully!",
        });

        // Clear form and cart data after placing order
        setDeliveryInfo(initialDeliveryInfo);
        setCartItems([]);
        localStorage.removeItem("cartItems");
        setPaymentMethod("cash_on_delivery");
      } catch (error) {
        setFeedback({
          open: true,
          severity: "error",
          message: "Could not place the order. Please try again.",
        });
      }
    } else if (paymentMethod === "online_payment") {
      try {
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

        const { sessionId } = await createPaymentSession(
          cartItems,
          deliveryInfo
        );

        const result = await stripe.redirectToCheckout({ sessionId });
        if (result?.error) {
          throw new Error(result.error.message);
        }
      } catch (error) {
        setFeedback({
          open: true,
          severity: "error",
          message:
            error.message ||
            "Could not start online payment. Please try again.",
        });
      }
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <Box className="myContainer" sx={{ padding: 3 }}>
      {feedback.open ? (
        <Alert
          severity={feedback.severity}
          onClose={() =>
            setFeedback((current) => ({ ...current, open: false }))
          }
          sx={{ mb: 3 }}
        >
          {feedback.message}
        </Alert>
      ) : null}

      {showSuccess ? (
        <Alert
          severity="success"
          onClose={() => setShowSuccess(false)}
          sx={{ mb: 3 }}
        >
          Your order has been placed successfully.
        </Alert>
      ) : null}

      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <DeliveryInformation
            deliveryInfo={deliveryInfo}
            setDeliveryInfo={setDeliveryInfo}
            errors={errors}
            setErrors={setErrors}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <OrderSummary
            cartItems={cartItems}
            handleQuantityChange={handleQuantityChange}
            handleRemoveItem={handleRemoveItem}
          />
        </Grid>
      </Grid>

      <PaymentMethod
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        handleOrderConfirm={handleOrderConfirm}
      />

      <Snackbar
        open={feedback.open && feedback.severity === "success"}
        autoHideDuration={4000}
        onClose={() => setFeedback((current) => ({ ...current, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setFeedback((current) => ({ ...current, open: false }))}
          severity={feedback.severity}
          sx={{ width: "100%" }}
        >
          {feedback.message}
        </Alert>
      </Snackbar>

      <Snackbar
        open={showSuccess}
        autoHideDuration={4000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Your Order has been placed successfully
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Cart;
