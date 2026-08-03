import React from "react";
import { Box, Typography, Stack, Grid } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SmsFailedOutlinedIcon from "@mui/icons-material/SmsFailedOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";

const Make_Difference = () => {
  const items = [
    {
      title: "Donate",
      description:
        "Every dollar can make a difference for an animal in need. Join the Happy Paws BD by making a gift today.",
      backgroundColor: "#DDB5F9",
      icon: <PetsOutlinedIcon sx={{ width: 65, height: 75, margin: 1 }} />,
      iconBgColor: "#6C00AE",
    },
    {
      title: "Advocate",
      description:
        "Speak up for animals and learn how to be a strong, effective advocate.",
      backgroundColor: "white",
      icon: (
        <SmsFailedOutlinedIcon sx={{ width: 60, height: 60, margin: 2.7 }} />
      ),
      iconBgColor: "#B9FFF7",
    },
    {
      title: "Give Monthly",
      description:
        "Monthly giving is the easiest and most efficient way to make a difference for animals.",
      backgroundColor: "#ABB6FF",
      icon: (
        <CalendarMonthOutlinedIcon sx={{ width: 65, height: 65, margin: 2 }} />
      ),
      iconBgColor: "#002776",
    },
  ];

  return (
    <Box
      className="myContainer"
      sx={{
        backgroundColor: "primary.back",
        my: "10px",
        borderRadius: ".3rem",
        textAlign: "center",
      }}
    >
      <Box padding={10}>
        <Typography
          variant="h4"
          color="primary.headline"
          pb={6}
          sx={{ lineHeight: 1.2, fontWeight: "900" }}
        >
          You Can Make a Difference
        </Typography>

        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {items.map((item, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <a style={{ textDecoration: "none" }}>
                <Stack
                  spacing={3}
                  p={3}
                  sx={{
                    height: 320,
                    backgroundColor: item.backgroundColor,
                    opacity: 1,
                    alignItems: "center",
                    color: item.backgroundColor === "white" ? "black" : "white",
                    "&:hover": {
                      boxShadow: "10px 10px 10px 0px rgba(82,82,82,0.2)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: "100%",
                      backgroundColor: item.iconBgColor,
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Typography
                    variant="h4"
                    sx={{ lineHeight: 1.2, fontWeight: "bold" }}
                  >
                    {item.title}
                  </Typography>

                  <Typography variant="body1">{item.description}</Typography>
                </Stack>
              </a>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Make_Difference;
