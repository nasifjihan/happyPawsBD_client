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
            <Typography variant="h6" fontWeight={700} lineHeight={1.4}>
              {product.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
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
        <Typography variant="body1" fontWeight={700} color="text.primary">
          ৳{product.price}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {product.rating} star rating
        </Typography>
      </Box>

      <CardActions sx={{ px: 2, pb: 2, pt: 1, gap: 1 }}>
        <Button
          variant="outlined"
          color="success"
          fullWidth
          onClick={() => onViewDetails(product)}
          sx={{ fontWeight: 700, fontSize: 10 }}
        >
          View Details
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={() => onAddToCart(product)}
          sx={{
            backgroundColor: "#f50057",
            fontWeight: 700,
            fontSize: 10,
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
