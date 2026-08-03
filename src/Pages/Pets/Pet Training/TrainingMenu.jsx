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
import ContentState from "../../../Components/Common/ContentState";

const TrainingMenu = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const handleCardClick = (id) => {
    navigate(`/training/${id}`);
  };

  useEffect(() => {
    let isActive = true;

    (async () => {
      try {
        setIsLoading(true);
        const response = await getPrograms("training", { page: 1, limit: 200 });

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
          error?.response?.data?.message || "Could not load training programs."
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
    <Box bgcolor={"rgba(122, 178, 89, 0.15)"} p={{ xs: 3, md: 5 }}>
      <Stack
        spacing={1.5}
        mb={4}
        sx={{ alignItems: "center", textAlign: "center" }}
      >
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
        sx={{ justifyContent: "center", alignItems: "stretch" }}
      >
        {isLoading ? (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 4 }}>
              <Typography color="text.secondary">
                Loading training programs...
              </Typography>
            </Paper>
          </Grid>
        ) : loadError ? (
          <Grid item xs={12}>
            <ContentState
              title="Could not load training programs"
              description={loadError}
              severity="warning"
            />
          </Grid>
        ) : programs.length ? (
          programs.map((item) => (
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
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ textAlign: "center" }}
                  >
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
          ))
        ) : (
          <Grid item xs={12}>
            <Alert severity="info">No training programs available yet.</Alert>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default TrainingMenu;
