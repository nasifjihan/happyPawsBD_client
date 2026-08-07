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
import { useNavigate } from "react-router-dom";
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
          error?.response?.data?.message || "Could not load boarding programs.",
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
        <Paper elevation={2} sx={{ p: { xs: 3, md: 5 } }}>
          <Stack spacing={2} sx={{ textAlign: "center", alignItems: "center" }}>
            <Typography variant="h3" sx={{ fontWeight: 800 }}>
              Pet Boarding
            </Typography>
            <Typography
              variant="body1"
              sx={{ maxWidth: 760, color: "text.secondary" }}
            >
              Browse boarding services designed for safe, comfortable stays.
              Whether you need basic care, extra playtime, or medical support,
              you can review the options and choose the right fit for your pet.
            </Typography>
          </Stack>
        </Paper>

        <Grid container spacing={3}>
          {isLoading ? (
            <Grid size={{ xs: 12 }}>
              <Paper>
                <Typography sx={{ color: "text.secondary" }}>
                  Loading boarding services...
                </Typography>
              </Paper>
            </Grid>
          ) : loadError ? (
            <Grid size={{ xs: 12 }}>
              <Alert severity="warning">{loadError}</Alert>
            </Grid>
          ) : programs.length ? (
            programs.map((item) => (
              <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  sx={{
                    height: "100%",
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
                      image={item.picture}
                      alt={item.title}
                      sx={{ height: 220 }}
                    />
                    <CardContent
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {item.shortDescription}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
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
            <Grid size={{ xs: 12 }}>
              <Alert severity="info">No boarding programs available yet.</Alert>
            </Grid>
          )}
        </Grid>
      </Stack>
    </Box>
  );
};

export default PetBoardingAll;
