import React from "react";
import {
  Alert,
  Button,
  Box,
  Chip,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const PaymentMethod = ({
  paymentMethod,
  setPaymentMethod,
  handleOrderConfirm,
  disabled = false,
  isSubmitting = false,
}) => {
  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <Box component="section" aria-labelledby="payment-method-heading">
      <Stack spacing={1.25} sx={{ mb: 3 }}>
        <Chip
          icon={<LockOutlinedIcon />}
          label="Secure Checkout"
          variant="outlined"
          sx={{
            alignSelf: "flex-start",
            borderRadius: 2,
            color: "#7AB259",
            borderColor: "rgba(122, 178, 89, 0.28)",
            backgroundColor: "rgba(122, 178, 89, 0.08)",
          }}
        />
        <Typography
          id="payment-method-heading"
          variant="h5"
          sx={{ fontWeight: 800, color: "#333332" }}
        >
          Payment Method
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Choose how you would like to complete this order.
        </Typography>
      </Stack>

      <FormControl component="fieldset" disabled={disabled || isSubmitting} fullWidth>
        <RadioGroup value={paymentMethod} onChange={handleChange} sx={{ gap: 1.5 }}>
          <FormControlLabel
            value="online_payment"
            control={<Radio />}
            sx={{
              m: 0,
              alignItems: "flex-start",
              border: "1px solid",
              borderColor:
                paymentMethod === "online_payment"
                  ? "rgba(122, 178, 89, 0.55)"
                  : "rgba(122, 178, 89, 0.16)",
              backgroundColor:
                paymentMethod === "online_payment"
                  ? "rgba(122, 178, 89, 0.10)"
                  : "#fff",
              borderRadius: 3,
              px: 1.5,
              py: 1.25,
            }}
            label={
              <Box sx={{ py: 0.25 }}>
                <Stack direction="row" spacing={1} sx={{ mb: 0.5, alignItems: "center" }}>
                  <CreditCardOutlinedIcon fontSize="small" sx={{ color: "#7AB259" }} />
                  <Typography sx={{ fontWeight: 700 }}>Online Payment</Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Pay securely with Stripe and complete checkout instantly.
                </Typography>
              </Box>
            }
          />
          <FormControlLabel
            value="cash_on_delivery"
            control={<Radio />}
            sx={{
              m: 0,
              alignItems: "flex-start",
              border: "1px solid",
              borderColor:
                paymentMethod === "cash_on_delivery"
                  ? "rgba(122, 178, 89, 0.55)"
                  : "rgba(122, 178, 89, 0.16)",
              backgroundColor:
                paymentMethod === "cash_on_delivery"
                  ? "rgba(122, 178, 89, 0.10)"
                  : "#fff",
              borderRadius: 3,
              px: 1.5,
              py: 1.25,
            }}
            label={
              <Box sx={{ py: 0.25 }}>
                <Stack direction="row" spacing={1} sx={{ mb: 0.5, alignItems: "center" }}>
                  <LocalShippingOutlinedIcon
                    fontSize="small"
                    sx={{ color: "#7AB259" }}
                  />
                  <Typography sx={{ fontWeight: 700 }}>Cash on Delivery</Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Pay when your order reaches your doorstep.
                </Typography>
              </Box>
            }
          />
        </RadioGroup>
      </FormControl>

      <Alert
        severity={paymentMethod === "online_payment" ? "info" : "success"}
        sx={{ mt: 2.5, borderRadius: 3 }}
      >
        {paymentMethod === "online_payment"
          ? "You will be redirected to Stripe to finish payment securely."
          : "We will confirm your order first and collect payment at delivery."}
      </Alert>

      <Button
        variant="contained"
        onClick={handleOrderConfirm}
        disabled={disabled || isSubmitting}
        fullWidth
        sx={{
          mt: 3,
          minHeight: 52,
          borderRadius: 3,
          fontWeight: 700,
          textTransform: "none",
          backgroundColor: "#7AB259",
          boxShadow: "0 14px 28px rgba(122, 178, 89, 0.24)",
          "&:hover": {
            backgroundColor: "#69994b",
          },
        }}
      >
        {isSubmitting
          ? "Processing Order..."
          : paymentMethod === "online_payment"
            ? "Continue to Secure Payment"
            : "Place Cash on Delivery Order"}
      </Button>
    </Box>
  );
};

export default PaymentMethod;
