import React from "react";
import { Box, Typography } from "@mui/material";
import OurService from "./../../../images/optimized/our-service.webp";

const PetCareBanner = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "600px",
        backgroundImage: `url(${OurService})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      />

      {/* Text content */}
      <Box
        sx={{
          position: "absolute",
          // p: "4%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white", // Change to white for better contrast
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <Typography
          variant="h3"
          component="div"
          sx={{
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)", // Add shadow to make text pop
            fontSize: { xs: "2rem", md: "3rem" }, // Adjust size for responsiveness
          }}
        >
          We Provide the Best Services for Our Customers <br />
          That Put Your Pet’s Health First
        </Typography>
      </Box>

      {/* Decorative SVG */}
      <Box
        component="svg"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100px",
          zIndex: "10",
        }}
      >
        <path
          d="M0,0 C300,150 900,150 1200,0 L1200,200 L0,200 Z"
          fill="#DCDCDC"
        ></path>
        <path
          d="M0,30 C300,180 900,180 1200,30 L1200,200 L0,200 Z"
          fill="#f5f5f5"
        ></path>
        <path
          d="M0,60 C300,210 900,210 1200,60 L1200,200 L0,200 Z"
          fill="#DCDCDC"
        ></path>
      </Box>
    </Box>
  );
};

export default PetCareBanner;
