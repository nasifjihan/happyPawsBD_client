import React, { useEffect, useState } from "react";
import {
  Alert,
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
import { useNavigate } from "react-router";
import { getPrograms } from "../../../API/api";

const PetBoardingAll = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const handleBoarding = (id) => {
    navigate(`/petcare/boarding/${id}`);
  };

  useEffect(() => {
    let isActive = true;

    (async () => {
      try {
        setIsLoading(true);
        const response = await getPrograms("boarding", { page: 1, limit: 200 });

        if (!isActive) {
          return;
        }

        setPrograms(response?.items ?? []);
        setLoadError("");
      } catch (error) {
        if (!isActive) {
          return;
        }

        setLoadError(
          error?.response?.data?.message || "Could not load boarding programs."
        );
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      isActive = false;
    };
  }, []);

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
          {isLoading ? (
            <Grid item xs={12}>
              <Paper sx={{ p: 3, borderRadius: 4 }}>
                <Typography color="text.secondary">
                  Loading boarding services...
                </Typography>
              </Paper>
            </Grid>
          ) : loadError ? (
            <Grid item xs={12}>
              <Alert severity="warning">{loadError}</Alert>
            </Grid>
          ) : programs.length ? (
            programs.map((item) => (
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
            ))
          ) : (
            <Grid item xs={12}>
              <Alert severity="info">No boarding programs available yet.</Alert>
            </Grid>
          )}
        </Grid>
      </Stack>
    </Box>
  );
};

export default PetBoardingAll;
