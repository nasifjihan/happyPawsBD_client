import React from "react";
import {
  Card,
  Chip,
  Divider,
  Stack,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ResilientProductImage from "../ResilientProductImage";

const OrderSummary = ({
  cartItems,
  handleQuantityChange,
  handleRemoveItem,
}) => {
  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  const calculateTotal = () => subtotal.toFixed(2);

  return (
    <Card
      sx={{
        overflow: "hidden",
        borderRadius: 5,
        border: "1px solid",
        borderColor: "rgba(122, 178, 89, 0.16)",
        boxShadow: "0 20px 44px rgba(15, 23, 42, 0.08)",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          p: { xs: 2.25, md: 2.75 },
          background:
            "linear-gradient(135deg, rgba(122,178,89,0.16) 0%, rgba(167,209,142,0.28) 100%)",
          borderBottom: "1px solid rgba(122, 178, 89, 0.12)",
        }}
      >
        <Stack spacing={1.25}>
          <Chip
            icon={<ShoppingBagOutlinedIcon />}
            label="Cart Review"
            variant="outlined"
            sx={{
              alignSelf: "flex-start",
              borderRadius: 2,
              color: "#4d7337",
              borderColor: "rgba(122, 178, 89, 0.28)",
              backgroundColor: "rgba(255, 255, 255, 0.45)",
            }}
          />
          <Typography variant="h5" fontWeight={800} color="#333332">
            Order Summary
          </Typography>
          <Typography variant="body2" color="#4f4f4f">
            {cartItems.length} item{cartItems.length === 1 ? "" : "s"} ready
            for checkout.
          </Typography>
        </Stack>
      </Box>

      <Stack
        spacing={1.5}
        sx={{
          p: { xs: 2, md: 2.5 },
          maxHeight: { xs: "none", lg: 440 },
          overflowY: { xs: "visible", lg: "auto" },
          pr: { lg: 0.5 },
        }}
      >
        {cartItems.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              gap: 1.5,
              p: 1.5,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "rgba(122, 178, 89, 0.14)",
              backgroundColor: "rgba(122, 178, 89, 0.05)",
            }}
          >
            <Box
              sx={{
                width: 72,
                height: 72,
                overflow: "hidden",
                borderRadius: 3,
                flexShrink: 0,
                backgroundColor: "#fff",
              }}
            >
              <ResilientProductImage
                image={item.image}
                alt={item.name}
                height="72"
                sx={{ objectFit: "cover" }}
              />
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Stack
                direction="row"
                spacing={1}
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography fontWeight={700} noWrap>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ৳{Number(item.price || 0).toFixed(2)} each
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => handleRemoveItem(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                  size="small"
                  sx={{ color: "text.secondary" }}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                justifyContent="space-between"
                alignItems="center"
                sx={{ mt: 1.25 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid",
                    borderColor: "rgba(122, 178, 89, 0.16)",
                    borderRadius: 999,
                    px: 0.5,
                    backgroundColor: "#fff",
                  }}
                >
                  <IconButton
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity === 1}
                    aria-label={`Decrease quantity for ${item.name}`}
                    size="small"
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    sx={{ minWidth: 28, textAlign: "center" }}
                  >
                    {item.quantity}
                  </Typography>
                  <IconButton
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    aria-label={`Increase quantity for ${item.name}`}
                    size="small"
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>

                <Typography fontWeight={700}>
                  ৳{(Number(item.price || 0) * Number(item.quantity || 0)).toFixed(2)}
                </Typography>
              </Stack>
            </Box>
          </Box>
        ))}
      </Stack>

      <Divider sx={{ mx: { xs: 2, md: 2.5 } }} />

      <Stack spacing={1.25} sx={{ p: { xs: 2, md: 2.5 } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Subtotal</Typography>
          <Typography fontWeight={600}>৳{calculateTotal()}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="text.secondary">Delivery</Typography>
          <Chip
            icon={<LocalShippingOutlinedIcon fontSize="small" />}
            label="Free"
            size="small"
            variant="outlined"
            sx={{
              borderRadius: 2,
              color: "#4d7337",
              borderColor: "rgba(122, 178, 89, 0.28)",
              backgroundColor: "rgba(122, 178, 89, 0.08)",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight={700}>
            Total
          </Typography>
          <Typography variant="h6" fontWeight={700}>
            ৳{calculateTotal()}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
};

export default OrderSummary;
