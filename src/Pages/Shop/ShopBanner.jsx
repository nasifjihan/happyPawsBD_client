import React from "react";
import { Box, Button, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import shopBannerImage from "../../images/optimized/banner2.webp";

const ShopBanner = () => {
  return (
    <Box
      my={3}
      sx={{
        height: "400px",
        backgroundImage: `url(${shopBannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom right, rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
          zIndex: 1,
        }}
      />
      {/* Text Content */}
      <Box
        sx={{
          zIndex: 2,
          p: 3,
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
          Welcome to Pet Shop
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Your one-stop destination for all pet needs
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            backgroundColor: "#f50057", // Custom color for the button
            "&:hover": {
              backgroundColor: "#d4004c", // Darken on hover
            },
          }}
          onClick={() =>
            document
              .getElementById("ShopProducts")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          Shop Now <KeyboardArrowDownIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default ShopBanner;
