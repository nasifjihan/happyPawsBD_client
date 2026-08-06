import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  Button,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import ResilientProductImage from "./ResilientProductImage";

const ProductCard = ({ product, onAddToCart, onViewDetails, onBookmark }) => {
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmarkClick = () => {
    setBookmarked(!bookmarked);
    onBookmark?.(product);
  };

  return (
    <Card sx={{ position: "relative", height: "100%" }}>
      <Box sx={{ height: "280px" }}>
        <CardActionArea onClick={() => onViewDetails(product)}>
          <ResilientProductImage
            height="160"
            image={product.image}
            alt={product.name}
            sx={{ objectFit: "cover" }}
          />

          <Typography
            variant="caption"
            fontWeight={700}
            sx={{
              position: "absolute",
              top: 130,
              left: 8,
              borderRadius: "4px",
              borderColor: "primary.main",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              padding: "2px 5px",
            }}
          >
            {product.brand}
          </Typography>

          <Typography
            sx={{
              position: "absolute",
              top: 3,
              right: 3,
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <Tooltip title={bookmarked ? "Remove bookmark" : "Save product"}>
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  handleBookmarkClick();
                }}
                aria-label={
                  bookmarked
                    ? `Remove ${product.name} from saved products`
                    : `Save ${product.name} for later`
                }
                sx={{
                  color: bookmarked ? "#f50057" : "inherit",
                }}
              >
                {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </IconButton>
            </Tooltip>
          </Typography>

          <CardContent>
            <Typography variant="h6" sx={{ lineHeight: 1.4, fontWeight: 700 }}>
              {product.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 2,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                color: "text.secondary",
              }}
            >
              {product.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          pb: 1,
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 700, color: "text.primary" }}>
          ৳{product.price}
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {product.rating} star rating
        </Typography>
      </Box>

      <CardActions sx={{ px: 2, gap: 0, flexWrap: "nowrap" }}>
        <Button
          variant="outlined"
          color="success"
          onClick={() => onViewDetails(product)}
          aria-label={`View details for ${product.name}`}
          sx={{
            minWidth: 0,
            p: 0.5,
            flexShrink: 0,
            borderRadius: 1.5,
          }}
        >
          <VisibilityOutlinedIcon fontSize="small" />
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={() => onAddToCart(product)}
          startIcon={<AddShoppingCartOutlinedIcon fontSize="inherit" />}
          sx={{
            flex: 1,
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 10,
            px: 1,
            minWidth: 0,
            whiteSpace: "nowrap",
            textTransform: "none",
            backgroundColor: "#f50057",
            "&:hover": {
              backgroundColor: "#d4004c",
            },
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
