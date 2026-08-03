import { Box, Typography } from "@mui/material";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import PetsIcon from "@mui/icons-material/Pets";
import BGImage from "./../../../src/images/BackgroundCurve.png";
import { getSiteSettings } from "../../API/api";

const Adopted = () => {
  const { data: siteSettings } = useQuery({
    queryKey: ["site-settings"],
    queryFn: getSiteSettings,
    staleTime: 300_000,
  });

  const adoptedCount = siteSettings?.homeAdoptedCount || "1,040";
  const adoptedLabel = siteSettings?.homeAdoptedLabel || "Animals Adopted";

  return (
    <Box
      className="myContainer"
      my={10}
      p={6}
      sx={{
        backgroundImage: `url(${BGImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "450px",
      }}
    >
      <Box
        sx={{
          border: "4px solid #FBD062",
          position: "relative",
          p: 5,
          my: 5,
          textAlign: "center",
        }}
      >
        {/* Logo Starts --------------------------------------------------- */}
        <PetsIcon
          sx={{
            position: "absolute",
            color: "white",
            background: "#FBD062",
            top: "-35px",
            p: "8px",
            right: "550px",
            // mx: "auto",
            width: 65,
            height: 65,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        ></PetsIcon>

        <Typography
          variant="h3"
          color="green"
          fontWeight={900}
          sx={{ lineHeight: 1.5 }}
        >
          {adoptedCount}
        </Typography>

        <Typography
          variant="h5"
          color="green"
          fontWeight={700}
          sx={{ lineHeight: 1.5 }}
        >
          {adoptedLabel}
        </Typography>
      </Box>
    </Box>
  );
};

export default Adopted;
