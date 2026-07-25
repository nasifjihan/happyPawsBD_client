import styled from "@emotion/styled";
import { Box, Button, Stack, Typography } from "@mui/material";
import VatCare from "./../../images/optimized/vat-care.webp";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import OptimizedImage from "../../Components/Common/OptimizedImage";

const Vat_Care = () => {
  const BrandingWrapper = styled(Box)(({ theme }) => ({
    // height: "70vh",
    backgroundColor: "rgba(122, 178, 89, 0.15)",
    padding: theme.spacing(4),
    display: "flex",
    justifyContent: "space-between",
    borderRadius: ".6rem",
    flexDirection: "column", // Flex direction column for mobile view
    [theme.breakpoints.up("md")]: {
      flexDirection: "row", // Change to row for larger screens
    },
  }));

  return (
    <Box className="myContainer" my={10}>
      <BrandingWrapper>
        <Stack
          spacing={5}
          sx={{ p: 4 }}
          flex={1.4}
          alignItems={{ xs: "center", md: "flex-start" }}
          textAlign={{ xs: "center", md: "left" }}
        >
          <Typography
            variant="h3"
            color="primary.headline"
            sx={{ lineHeight: 1.2, fontWeight: "900" }}
          >
            Great Pet Care at your fingertips
          </Typography>

          <Typography
            variant="body1"
            color="primary.para"
            sx={{ lineHeight: 1.5 }}
          >
            With vet-backed petcare products, guidance, and Rewards – <br />
            we’re here to support your pet’s health in every way we can.
          </Typography>

          <Button
            variant="contained"
            color="success"
            size="large"
            component={RouterLink}
            to="/petcare"
            sx={{ width: "50%" }}
          >
            Pet Care
          </Button>
        </Stack>

        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <OptimizedImage
            src={VatCare}
            alt="Pet care illustration"
            style={{ width: "80%" }}
          />
        </Box>
      </BrandingWrapper>
    </Box>
  );
};

export default Vat_Care;
