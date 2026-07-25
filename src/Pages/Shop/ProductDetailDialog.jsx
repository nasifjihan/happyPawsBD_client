import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  TextField,
  Box,
  CardMedia,
  IconButton,
  Tooltip,
  Grid,
  Menu,
  MenuItem,
  Snackbar,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import Rating from "@mui/material/Rating";

const ProductDetailDialog = ({
  product,
  open,
  onClose,
  onAddToCart,
  handleQuantityChange,
  onBookmark,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [bookmarked, setBookmarked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAddToCart = () => {
    // Retrieve existing cart items from localStorage
    const existingCartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];

    // Add the new product with updated quantity
    const updatedProduct = { ...product, quantity };
    const newCartItems = [...existingCartItems, updatedProduct];

    // Save updated cart items back to localStorage
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));

    console.log("Updated Cart Items:", newCartItems);

    // Reset the quantity and close the dialog
    setQuantity(1);
    onClose();
  };

  const handleBookmarkClick = () => {
    setBookmarked(!bookmarked);
    onBookmark(product);
  };

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleShareClose = () => {
    setAnchorEl(null);
  };

  const handleShareOptionClick = (platform) => {
    setAnchorEl(null);
    // Implement sharing logic here
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent sx={{ display: "flex", p: 1 }}>
        <Grid container>
          <Grid item xs={12} md={6} sx={{ p: 2 }}>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
              sx={{ borderRadius: "16px" }}
            />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", m: 1 }}
            >
              <Typography
                variant="subtitle2"
                color="textSecondary"
                sx={{ mt: 1, textAlign: "right" }}
              >
                CODE: {product.id}
              </Typography>

              <Typography>
                <Tooltip title="Share">
                  <IconButton onClick={handleShareClick}>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleShareClose}
                >
                  <MenuItem onClick={() => handleShareOptionClick("facebook")}>
                    <FacebookIcon sx={{ mr: 1 }} /> Share on Facebook
                  </MenuItem>
                  <MenuItem onClick={() => handleShareOptionClick("twitter")}>
                    <TwitterIcon sx={{ mr: 1 }} /> Share on Twitter
                  </MenuItem>
                  <MenuItem onClick={() => handleShareOptionClick("email")}>
                    <EmailIcon sx={{ mr: 1 }} /> Share via Email
                  </MenuItem>
                </Menu>
                <Tooltip title="Bookmark">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmarkClick();
                    }}
                    sx={{
                      color: bookmarked ? "#f50057" : "textSecondary",
                    }}
                  >
                    {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  </IconButton>
                </Tooltip>
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} sx={{ p: 2 }}>
            <Typography variant="h5" fontWeight={900} color={"#f50057"}>
              {product.name}
            </Typography>

            <Typography variant="caption">{product.brand}</Typography>

            <Typography variant="body2" sx={{ my: 2 }}>
              {product.description}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CheckCircleIcon color="action" />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {product.status}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 1,
                width: 200,
              }}
            >
              <Rating
                name="text-feedback"
                value={product.rating}
                size="small"
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <Typography variant="caption" sx={{ ml: 1, pt: 0.3 }}>
                42 reviews
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <LocalShippingIcon color="action" />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {product.deliveryTime} (Delivery Charge:{" "}
                {product.deliveryCharge}৳ )
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <ShoppingCartIcon color="action" />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Sold: {product.sold}
              </Typography>
            </Box>

            <Typography
              variant="body1"
              color="text.primary"
              fontWeight={700}
              sx={{ my: 2 }}
            >
              ৳{product.price}
            </Typography>

            <TextField
              type="number"
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              InputProps={{ inputProps: { min: 1 } }}
              sx={{ mb: 2 }}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                borderRadius: "16px",
                borderBottomLeftRadius: 0,
                borderTopRightRadius: 0,
                backgroundColor: "#f50057", // Custom color for the button
                "&:hover": {
                  backgroundColor: "#d4004c", // Darken on hover
                },
              }}
              // onClick={handleAddToCart}
              onClick={() => {
                onAddToCart(product, quantity);
                setQuantity(1);
                onClose();
              }}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Product shared successfully!"
      />
    </Dialog>
  );
};

export default ProductDetailDialog;
