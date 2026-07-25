import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";

const OrderSummary = ({
  cartItems,
  handleQuantityChange,
  handleRemoveItem,
}) => {
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <Box sx={{ padding: 2, border: "1px solid #ddd", borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {cartItems.length} item{cartItems.length === 1 ? "" : "s"} ready for
        checkout.
      </Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem
            key={item.id}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <ListItemText
              primary={item.name}
              secondary={`৳${item.price.toFixed(2)} x ${item.quantity}`}
            />
            <Box>
              <IconButton
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                disabled={item.quantity === 1}
                aria-label={`Decrease quantity for ${item.name}`}
              >
                <Remove />
              </IconButton>
              <Typography variant="body2" display="inline" sx={{ mx: 1 }}>
                {item.quantity}
              </Typography>
              <IconButton
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                aria-label={`Increase quantity for ${item.name}`}
              >
                <Add />
              </IconButton>
              <IconButton
                onClick={() => handleRemoveItem(item.id)}
                aria-label={`Remove ${item.name} from cart`}
              >
                <Delete />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" gutterBottom>
        Subtotal: ৳{calculateTotal()}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Total: ৳{calculateTotal()}
      </Typography>
    </Box>
  );
};

export default OrderSummary;
