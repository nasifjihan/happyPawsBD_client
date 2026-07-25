import React, { useEffect, useMemo, useState } from "react";
import { Alert, Box, Grid } from "@mui/material";
import DeliveryInformation from ".//DeliveryInformation";
import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";
import { createPaymentSession, orders } from "../../../API/api";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { appEnv } from "../../../config/env";
import { useCart } from "../../../context/CartContext";
import ContentState from "../../../Components/Common/ContentState";

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
  const { cartItems, clearCart, removeFromCart, updateCartItemQuantity } =
    useCart();
  const [deliveryInfo, setDeliveryInfo] = useState(initialDeliveryInfo);
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const [feedback, setFeedback] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const paymentStatus = useMemo(
    () => new URLSearchParams(location.search).get("payment"),
    [location.search]
  );
  const hasCartItems = cartItems.length > 0;

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
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
    if (!paymentStatus) {
      return;
    }

    if (paymentStatus === "success") {
      setDeliveryInfo(initialDeliveryInfo);
      clearCart();
      setPaymentMethod("cash_on_delivery");
      setFeedback({
        open: true,
        severity: "success",
        message: "Your order has been placed successfully.",
      });
    } else if (paymentStatus === "cancelled") {
      setFeedback({
        open: true,
        severity: "info",
        message: "Payment was cancelled. Your cart is still saved.",
      });
    }

    navigate("/cart", { replace: true });
  }, [clearCart, navigate, paymentStatus]);

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

    setIsSubmitting(true);

    try {
      if (paymentMethod === "cash_on_delivery") {
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
          message: "Order placed successfully! We will contact you soon.",
        });

        // Clear form and cart data after placing order
        setDeliveryInfo(initialDeliveryInfo);
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

        const { sessionId } = await createPaymentSession(
          cartItems,
          deliveryInfo
        );

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

      {hasCartItems ? (
        <>
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
            disabled={!hasCartItems}
            isSubmitting={isSubmitting}
          />
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
