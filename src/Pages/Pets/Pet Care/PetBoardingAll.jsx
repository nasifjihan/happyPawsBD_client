import React from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PetBoardingAPI from "./../../../API/petBoarding.json";

const PetBoardingAll = () => {
  const navigate = useNavigate();

  const handleBoarding = (id) => {
    navigate(`/petcare/boarding/${id}`);
  };

  return (
    <Box className="myContainer" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Paper elevation={2} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
          <Stack spacing={2} textAlign="center" alignItems="center">
            <Typography variant="h3" fontWeight={800}>
              Pet Boarding
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760 }}>
              Browse boarding services designed for safe, comfortable stays.
              Whether you need basic care, extra playtime, or medical support,
              you can review the options and choose the right fit for your pet.
            </Typography>
          </Stack>
        </Paper>

        <Grid container spacing={3}>
          {PetBoardingAPI.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "0px 12px 24px rgba(82,82,82,0.12)",
                  },
                }}
              >
                <CardActionArea
                  onClick={() => handleBoarding(item.id)}
                  sx={{ height: "100%", alignItems: "stretch" }}
                >
                  <CardMedia
                    component="img"
                    height="220"
                    image={item.picture}
                    alt={item.title}
                  />
                  <CardContent
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                    }}
                  >
                    <Typography variant="h6" fontWeight={700}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.shortDescription}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Duration: {item.duration} | Price: {item.price}
                    </Typography>
                    <Box sx={{ mt: "auto" }}>
                      <Button variant="outlined" color="success" fullWidth>
                        View Boarding Details
                      </Button>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};

export default PetBoardingAll;
