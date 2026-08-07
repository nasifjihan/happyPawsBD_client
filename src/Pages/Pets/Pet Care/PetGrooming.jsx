import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  CardActionArea,
  Grid,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getPrograms } from "../../../API/api";

const PetGrooming = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const handleViewAll = () => {
    window.scrollTo(0, 0); // Scroll to top
    navigate("/petcare/grooming");
  };

  const handledaycare = (id) => {
    navigate(`/petcare/grooming/${id}`);
  };

  useEffect(() => {
    let isActive = true;

    (async () => {
      try {
        setIsLoading(true);
        const response = await getPrograms("grooming", { page: 1, limit: 50 });

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
          error?.response?.data?.message || "Could not load grooming programs.",
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
    <Box sx={{ my: 6 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 900 }}>
          Grooming
        </Typography>

        <Typography
          component="button"
          onClick={handleViewAll}
          variant="body1"
          sx={{
            mb: 1,
            fontWeight: 700,
            textDecoration: "none",
            color: "inherit",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          View All
        </Typography>

        {/* <Typography
          component={Link}
          to="/petcare/grooming"
          variant="body1"
          sx={{ gutterBottom: true, fontWeight: 700, textDecoration: "none", color: "inherit" }} // Optional: to remove underline and inherit text color
        >
          View All
        </Typography> */}
      </Box>
      <Divider />

      <Grid container spacing={4} sx={{ pt: 3 }}>
        {isLoading ? (
          <Grid size={{ xs: 12 }}>
            <Paper sx={{ p: 3 }}>
              <Typography sx={{ color: "text.secondary" }}>
                Loading grooming programs...
              </Typography>
            </Paper>
          </Grid>
        ) : loadError ? (
          <Grid size={{ xs: 12 }}>
            <Alert severity="warning">{loadError}</Alert>
          </Grid>
        ) : programs.length ? (
          <>
            {/* Main Article */}
            {programs.slice(0, 1).map((item) => (
              <Grid key={item.id} size={{ xs: 12, md: 6 }}>
                <Card
                  sx={{
                    boxShadow: "none",
                  }}
                >
                  <CardActionArea onClick={() => handledaycare(item.id)}>
                    <CardMedia
                      component="img"
                      image={item.picture}
                      alt="Main Article"
                      sx={{ height: 420 }}
                    />
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "primary.para" }}
                      >
                        {item.dis1}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}

            {/* Side Articles */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Grid container spacing={4}>
                {programs.slice(1, 5).map((item) => (
                  <Grid key={item.id} size={{ xs: 6 }}>
                    <Card
                      sx={{
                        boxShadow: "none",
                      }}
                    >
                      <CardActionArea onClick={() => handledaycare(item.id)}>
                        <CardMedia
                          component="img"
                          image={item.picture}
                          alt="Side Article 1"
                          sx={{
                            height: 150,
                          }}
                        />
                        <CardContent>
                          <Typography variant="body1" sx={{ fontWeight: 700 }}>
                            {item.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "primary.para" }}
                          >
                            {item.dis1}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid size={{ xs: 12 }}>
            <Alert severity="info">No grooming programs available yet.</Alert>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
export default PetGrooming;
