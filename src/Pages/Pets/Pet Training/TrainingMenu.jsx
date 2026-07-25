import React from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Training from "./../../../API/training.json";

const TrainingMenu = () => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/training/${id}`);
  };

  return (
    <Box bgcolor={"rgba(122, 178, 89, 0.15)"} p={{ xs: 3, md: 5 }}>
      <Stack spacing={1.5} alignItems="center" textAlign="center" mb={4}>
        <Typography
          variant="h4"
          color="primary.headline"
          sx={{ lineHeight: 1.3, fontWeight: 900 }}
        >
          Training Programs at Happy Paws BD
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760 }}>
          Explore training options designed to improve everyday behavior,
          confidence, and communication between pets and their families.
        </Typography>
      </Stack>

      <Grid
        id="TrainingMenu"
        container
        spacing={{ xs: 2, md: 3 }}
        justifyContent="center"
        alignItems="stretch"
      >
        {Training.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id} sx={{ display: "flex" }}>
            <Card
              sx={{
                width: "100%",
                boxShadow: "none",
                backgroundColor: "#FBFBFB",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                "&:hover": {
                  boxShadow: "0px 12px 24px rgba(82,82,82,0.12)",
                },
              }}
            >
              <CardActionArea
                onClick={() => handleCardClick(item.id)}
                sx={{ height: "100%", alignItems: "stretch" }}
              >
                <CardMedia
                  component="img"
                  image={item.picture}
                  alt={item.title}
                  height="220"
                />
                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                  }}
                >
                  <Typography variant="h6" textAlign="center" fontWeight={700}>
                    {item.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {item.dis1}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {item.dis2}
                  </Typography>

                  <Box sx={{ mt: "auto", pt: 1 }}>
                    <Button variant="outlined" color="success" fullWidth>
                      View Program Details
                    </Button>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TrainingMenu;
