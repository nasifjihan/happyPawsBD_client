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
import PetGroomingAPI from "./../../../API/petGrooming.json";

const PetGroomingAll = () => {
  const navigate = useNavigate();

  const handleGrooming = (id) => {
    navigate(`/petcare/grooming/${id}`);
  };

  return (
    <Box className="myContainer" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Paper elevation={2} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
          <Stack spacing={2} textAlign="center" alignItems="center">
            <Typography variant="h3" fontWeight={800}>
              Pet Grooming
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760 }}>
              Explore grooming services that help pets stay clean, comfortable,
              and healthy. Choose a focused treatment or a full grooming package
              based on your pet&apos;s needs.
            </Typography>
          </Stack>
        </Paper>

        <Grid container spacing={3}>
          {PetGroomingAPI.map((item) => (
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
                  onClick={() => handleGrooming(item.id)}
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
                      {item.dis1}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Duration: {item.Duration} | Price: {item.Price}
                    </Typography>
                    <Box sx={{ mt: "auto" }}>
                      <Button variant="outlined" color="success" fullWidth>
                        View Grooming Details
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

export default PetGroomingAll;
