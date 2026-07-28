import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import { useSearchParams } from "react-router-dom";
import vetData from "../../../API/veterinary.json";
import DataGrid from "./DataGrid";
import Filters from "./Filters";
import Pagination from "./Pagination";
import ContentState from "../../../Components/Common/ContentState";

const VetFinder = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [division, setDivision] = useState("");
  const [city, setCity] = useState("");
  const [userCoords, setUserCoords] = useState(null);
  const [geoError, setGeoError] = useState("");

  const itemsPerPage = 20;
  const isNearestMode = searchParams.get("mode") === "nearest";

  useEffect(() => {
    setFilteredData(vetData);
  }, []);

  useEffect(() => {
    if (isNearestMode) {
      setDivision((current) => current || "Dhaka");
      setCity("");
    }
  }, [isNearestMode]);

  useEffect(() => {
    let filtered = vetData;
    if (division) {
      filtered = filtered.filter((item) => item.Division === division);
    }
    if (division === "Dhaka" && city) {
      filtered = filtered.filter((item) => item.City === city);
    }
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [division, city]);

  const handleDivisionChange = (newDivision) => {
    setDivision(newDivision);
    setCity("");
  };

  const handleCityChange = (newCity) => {
    setCity(newCity);
  };

  const handleResetFilters = () => {
    setDivision("");
    setCity("");
    setCurrentPage(1);
  };

  const handleUseMyLocation = () => {
    setGeoError("");

    if (!navigator.geolocation) {
      setGeoError(
        "Your browser does not support location access. Use the filters or open Google Maps search instead."
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setGeoError(
          "Could not access your location. Please allow location permission or open Google Maps search."
        );
      },
      { timeout: 8000 }
    );
  };

  const handleExitNearestMode = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("mode");
    setSearchParams(nextParams, { replace: true });
    setUserCoords(null);
    setGeoError("");
  };

  const nearMeHref = useMemo(() => {
    if (userCoords) {
      const lat = userCoords.lat.toFixed(6);
      const lng = userCoords.lng.toFixed(6);
      return `https://www.google.com/maps/search/veterinary%20clinic/@${lat},${lng},13z`;
    }

    return "https://www.google.com/maps/search/?api=1&query=veterinary%20clinic%20near%20me";
  }, [userCoords]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const hasActiveFilters = Boolean(division || city);

  const locationSummary = useMemo(() => {
    if (division && city) {
      return `${city}, ${division}`;
    }

    if (division) {
      return division;
    }

    return "all available locations";
  }, [city, division]);

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", py: { xs: 4, md: 6 } }}>
      <Container className="myContainer">
        <Stack spacing={3}>
          <Paper elevation={2} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
            <Stack spacing={2} textAlign="center" alignItems="center">
              <Typography variant="h4" fontWeight={800}>
                Vet Finder
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: 780 }}
              >
                Search veterinary clinics, hospitals, and professionals across
                Bangladesh. Use the filters below to narrow the list and open
                any result for more details, contact information, and location
                links.
              </Typography>
            </Stack>

            {isNearestMode ? (
              <Stack spacing={1.5} sx={{ mt: 3 }}>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={1.5}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", md: "center" }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      label="Nearest Clinic Mode"
                      color="success"
                      variant="outlined"
                      sx={{ fontWeight: 700 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Use your location to quickly open nearby clinics in Google Maps.
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<MyLocationOutlinedIcon />}
                      onClick={handleUseMyLocation}
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Use My Location
                    </Button>
                    <Button
                      component="a"
                      href={nearMeHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outlined"
                      color="success"
                      startIcon={<OpenInNewOutlinedIcon />}
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Open Nearby in Maps
                    </Button>
                    <Button
                      variant="text"
                      color="success"
                      onClick={handleExitNearestMode}
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Exit
                    </Button>
                  </Stack>
                </Stack>

                {geoError ? <Alert severity="info">{geoError}</Alert> : null}
              </Stack>
            ) : null}

            <Filters
              division={division}
              city={city}
              handleDivisionChange={handleDivisionChange}
              handleCityChange={handleCityChange}
            />

            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", md: "center" }}
            >
              <Box>
                <Typography variant="body1" fontWeight={500}>
                  {filteredData.length} result
                  {filteredData.length === 1 ? "" : "s"} found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Currently showing providers in {locationSummary}.
                </Typography>
              </Box>

              <Button
                variant="outlined"
                color="success"
                onClick={handleResetFilters}
                disabled={!hasActiveFilters}
              >
                Reset Filters
              </Button>
            </Stack>
          </Paper>

          {filteredData.length ? (
            <>
              <DataGrid data={currentItems} />
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={filteredData.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </>
          ) : (
            <ContentState
              title="No vets match these filters"
              description="Try clearing the active filters or selecting a broader location to see more veterinary providers."
              actionLabel="Reset Filters"
              onAction={handleResetFilters}
              severity="info"
            />
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default VetFinder;
