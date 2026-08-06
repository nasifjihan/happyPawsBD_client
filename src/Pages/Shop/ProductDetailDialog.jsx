import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  TextField,
  Box,
  Grid,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
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
import CloseIcon from "@mui/icons-material/Close";
import Rating from "@mui/material/Rating";
import ResilientProductImage from "./ResilientProductImage";

const ProductDetailDialog = ({
  product,
  open,
  onClose,
  onAddToCart,
  onBookmark,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [bookmarked, setBookmarked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleBookmarkClick = () => {
    setBookmarked(!bookmarked);
    onBookmark?.(product);
  };

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleShareClose = () => {
    setAnchorEl(null);
  };

  const handleShareOptionClick = async (platform) => {
    setAnchorEl(null);
    const shareText = `Check out ${product.name} on Happy Paws BD.`;
    const shareUrl = `${window.location.origin}/shop`;

    try {
      if (platform === "email") {
        window.open(
          `mailto:?subject=${encodeURIComponent(
            product.name,
          )}&body=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`,
        );
      } else if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: shareText,
          url: shareUrl,
        });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      }

      setSnackbarState({
        open: true,
        message:
          platform === "email"
            ? "Your email app is ready with the product details."
            : "Product details are ready to share.",
        severity: "success",
      });
    } catch (error) {
      setSnackbarState({
        open: true,
        message: "Could not share this product right now.",
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarState((current) => ({ ...current, open: false }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pb: 0 }}>
        {product.name}
        <IconButton
          aria-label="Close product details"
          onClick={onClose}
          sx={{ position: "absolute", right: 12, top: 12 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: "flex", p: 1 }}>
        <Grid container>
          <Grid sx={{ p: 2 }} size={{ xs: 12, md: 6 }}>
            <ResilientProductImage
              image={product.image}
              alt={product.name}
              sx={{ borderRadius: "16px", objectFit: "cover" }}
            />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", m: 1 }}
            >
              <Typography
                variant="subtitle2"
                sx={{ color: "text.secondary", mt: 1, textAlign: "right" }}
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
                    aria-label={
                      bookmarked
                        ? `Remove ${product.name} from saved products`
                        : `Save ${product.name} for later`
                    }
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

          <Grid sx={{ p: 2 }} size={{ xs: 12, md: 6 }}>
            <Typography variant="h5" sx={{ fontWeight: 900, color: "#f50057" }}>
              {product.name}
            </Typography>

            <Typography variant="caption">
              {product.brand} | Product code: {product.id}
            </Typography>

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
                  <StarIcon sx={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <Typography variant="caption" sx={{ ml: 1, pt: 0.3 }}>
                42 reviews
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <LocalShippingIcon color="action" />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {product.deliveryTime} (Delivery charge:{" "}
                {product.deliveryCharge}
                ৳)
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
              sx={{ color: "text.primary", fontWeight: 700, my: 2 }}
            >
              ৳{product.price}
            </Typography>

            <TextField
              type="number"
              label="Quantity"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, Number(e.target.value) || 1))
              }
              size="small"
              InputProps={{ inputProps: { min: 1 } }}
              sx={{ mr: 2 }}
            />

            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: "16px",
                borderBottomLeftRadius: 0,
                borderTopRightRadius: 0,
                backgroundColor: "#f50057",
                "&:hover": {
                  backgroundColor: "#d4004c",
                },
              }}
              onClick={() => {
                onAddToCart(product, quantity);
                setQuantity(1);
                setSnackbarState({
                  open: true,
                  message: `${quantity} ${product.name} added to cart.`,
                  severity: "success",
                });
                onClose();
              }}
            >
              Add {quantity} to Cart
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarState.severity}
          sx={{ width: "100%" }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default ProductDetailDialog;
