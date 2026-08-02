import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  CardActionArea,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getPrograms } from "../../../API/api";

const PetBoarding = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const handleViewAll = () => {
    window.scrollTo(0, 0); // Scroll to top
    navigate("/petcare/boarding");
  };

  const handledaycare = (id) => {
    navigate(`/petcare/boarding/${id}`);
  };

  useEffect(() => {
    let isActive = true;

    (async () => {
      try {
        setIsLoading(true);
        const response = await getPrograms("boarding", { page: 1, limit: 50 });

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
    <Box my={6}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom fontWeight={900}>
          Boarding
        </Typography>

        <Typography
          component="button"
          onClick={handleViewAll}
          variant="body1"
          gutterBottom
          fontWeight={700}
          sx={{
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
          to="/petcare/boarding"
          variant="body1"
          gutterBottom
          fontWeight={700}
          sx={{ textDecoration: "none", color: "inherit" }} // Optional: to remove underline and inherit text color
        >
          View All
        </Typography> */}
      </Box>
      <Divider />

      <Grid container spacing={4} pt={3}>
        {isLoading ? (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 4 }}>
              <Typography color="text.secondary">
                Loading boarding programs...
              </Typography>
            </Paper>
          </Grid>
        ) : loadError ? (
          <Grid item xs={12}>
            <Alert severity="warning">{loadError}</Alert>
          </Grid>
        ) : programs.length ? (
          <>
        {/* Main Article */}
        {programs.slice(0, 1).map((item) => (
          <Grid item xs={12} md={6} key={item.id}>
            <Card
              sx={{
                borderRadius: "2%",
                boxShadow: "none",
              }}
            >
              <CardActionArea onClick={() => handledaycare(item.id)}>
                <CardMedia
                  component="img"
                  height="420"
                  image={item.picture}
                  alt="Main Article"
                />
                <CardContent sx={{ padding: "0 !important" }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom pt={2}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" color="primary.para">
                    {item.shortDescription}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}

        {/* Side Articles */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={4}>
            {programs.slice(1, 5).map((item) => (
              <Grid item xs={6} key={item.id}>
                <Card
                  sx={{
                    borderRadius: "2%",
                    boxShadow: "none",
                  }}
                >
                  <CardActionArea onClick={() => handledaycare(item.id)}>
                    <CardMedia
                      component="img"
                      height="150"
                      image={item.picture}
                      alt="Side Article 1"
                      sx={{
                        borderRadius: "2%",
                      }}
                    />
                    <CardContent sx={{ padding: "0 !important" }}>
                      <Typography
                        variant="body1"
                        fontWeight={700}
                        gutterBottom
                        pt={2}
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="primary.para">
                        {item.shortDescription}
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
          <Grid item xs={12}>
            <Alert severity="info">No boarding programs available yet.</Alert>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default PetBoarding;
