import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useSearchParams } from "react-router-dom";
import { getVetDirectoryMeta, getVetProviders } from "../../../API/api";
import DataGrid from "./DataGrid";
import Filters from "./Filters";
import Pagination from "./Pagination";
import ContentState from "../../../Components/Common/ContentState";

const VetFinder = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(() => {
    const pageValue = Number.parseInt(searchParams.get("page") || "", 10);
    return Number.isFinite(pageValue) && pageValue > 0 ? pageValue : 1;
  });
  const [division, setDivision] = useState(() => searchParams.get("division") || "");
  const [city, setCity] = useState(() => searchParams.get("city") || "");
  const [district, setDistrict] = useState(() => searchParams.get("district") || "");
  const [query, setQuery] = useState(() => searchParams.get("q") || "");
  const [divisionOptions, setDivisionOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [isLoadingDivisions, setIsLoadingDivisions] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);
  const [userCoords, setUserCoords] = useState(null);
  const [geoError, setGeoError] = useState("");
  const [loadError, setLoadError] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(true);

  const itemsPerPage = 20;
  const isNearestMode = searchParams.get("mode") === "nearest";

  const updateSearchParams = useCallback((next) => {
    const nextParams = new URLSearchParams(searchParams);
    let didChange = false;

    Object.entries(next).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        if (nextParams.has(key)) {
          nextParams.delete(key);
          didChange = true;
        }
      } else {
        const nextValue = String(value);
        if (nextParams.get(key) !== nextValue) {
          nextParams.set(key, nextValue);
          didChange = true;
        }
      }
    });

    if (!didChange) {
      return;
    }

    setSearchParams(nextParams, { replace: true });
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    updateSearchParams({
      division,
      city,
      district,
      q: query,
      page: currentPage,
    });
  }, [city, currentPage, district, division, query, updateSearchParams]);

  useEffect(() => {
    if (isNearestMode) {
      setDivision((current) => current || "Dhaka");
      setCity("");
      setDistrict("");
    }
  }, [isNearestMode]);

  useEffect(() => {
    let isActive = true;

    (async () => {
      try {
        setIsLoadingDivisions(true);
        const response = await getVetDirectoryMeta();

        if (!isActive) {
          return;
        }

        setDivisionOptions(response?.divisions ?? []);
      } catch (error) {
        if (!isActive) {
          return;
        }

        setDivisionOptions([]);
      } finally {
        if (isActive) {
          setIsLoadingDivisions(false);
        }
      }
    })();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    let isActive = true;

    (async () => {
      try {
        if (!division) {
          setCityOptions([]);
          return;
        }

        setIsLoadingCities(true);
        const response = await getVetDirectoryMeta({
          division,
        });

        if (!isActive) {
          return;
        }

        setCityOptions(response?.cities ?? []);
      } catch (error) {
        if (!isActive) {
          return;
        }

        setCityOptions([]);
      } finally {
        if (isActive) {
          setIsLoadingCities(false);
        }
      }
    })();

    return () => {
      isActive = false;
    };
  }, [division]);

  useEffect(() => {
    let isActive = true;

    (async () => {
      try {
        if (!division || !city) {
          setDistrictOptions([]);
          return;
        }

        setIsLoadingDistricts(true);
        const response = await getVetDirectoryMeta({
          division,
          city,
        });

        if (!isActive) {
          return;
        }

        setDistrictOptions(response?.districts ?? []);
      } catch (error) {
        if (!isActive) {
          return;
        }

        setDistrictOptions([]);
      } finally {
        if (isActive) {
          setIsLoadingDistricts(false);
        }
      }
    })();

    return () => {
      isActive = false;
    };
  }, [city, division]);

  useEffect(() => {
    let isActive = true;

    (async () => {
      try {
        setIsLoadingData(true);
        const response = await getVetProviders({
          page: currentPage,
          limit: itemsPerPage,
          division: division || undefined,
          city: city || undefined,
          district: district || undefined,
          q: query || undefined,
        });

        if (!isActive) {
          return;
        }

        setItems(response?.items ?? []);
        setTotalItems(response?.total ?? 0);
        setTotalPages(response?.totalPages ?? 1);
        setLoadError("");
      } catch (error) {
        if (!isActive) {
          return;
        }

        setItems([]);
        setTotalItems(0);
        setTotalPages(1);
        setLoadError(
          error?.response?.data?.message || "Could not load vet directory."
        );
      } finally {
        if (isActive) {
          setIsLoadingData(false);
        }
      }
    })();

    return () => {
      isActive = false;
    };
  }, [city, currentPage, district, division, query]);

  const handleDivisionChange = (newDivision) => {
    setDivision(newDivision);
    setCity("");
    setDistrict("");
    setCurrentPage(1);
  };

  const handleCityChange = (newCity) => {
    setCity(newCity);
    setDistrict("");
    setCurrentPage(1);
  };

  const handleDistrictChange = (newDistrict) => {
    setDistrict(newDistrict);
    setCurrentPage(1);
  };

  const handleQueryChange = (nextQuery) => {
    setQuery(nextQuery);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setDivision("");
    setCity("");
    setDistrict("");
    setQuery("");
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

  const hasActiveFilters = Boolean(division || city || district);
  const hasSearch = Boolean(query.trim());

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
            <Stack spacing={2} sx={{ textAlign: "center", alignItems: "center" }}>
              <Typography variant="h4" sx={{ fontWeight: 800 }}>
                Vet Finder
              </Typography>
              <Typography
                variant="body2"
                sx={{ maxWidth: 780, color: "text.secondary" }}
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
                  sx={{
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", md: "center" },
                  }}
                >
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <Chip
                      label="Nearest Clinic Mode"
                      color="success"
                      variant="outlined"
                      sx={{ fontWeight: 700 }}
                    />
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      Use your location to quickly open nearby clinics in Google Maps.
                    </Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    sx={{ flexWrap: "wrap" }}
                  >
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
              divisions={divisionOptions}
              cities={cityOptions}
              districts={districtOptions}
              division={division}
              city={city}
              district={district}
              isLoadingDivisions={isLoadingDivisions}
              isLoadingCities={isLoadingCities}
              isLoadingDistricts={isLoadingDistricts}
              handleDivisionChange={handleDivisionChange}
              handleCityChange={handleCityChange}
              handleDistrictChange={handleDistrictChange}
            />

            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              <TextField
                label="Search clinics or doctors"
                value={query}
                onChange={(event) => handleQueryChange(event.target.value)}
                fullWidth
                sx={{ maxWidth: 520 }}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ display: "flex", alignItems: "center", pl: 1 }}>
                      <SearchOutlinedIcon fontSize="small" />
                    </Box>
                  ),
                  endAdornment: query ? (
                    <IconButton
                      size="small"
                      onClick={() => handleQueryChange("")}
                      aria-label="Clear search"
                    >
                      <CloseOutlinedIcon fontSize="small" />
                    </IconButton>
                  ) : null,
                }}
              />
            </Box>

            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              sx={{
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", md: "center" },
              }}
            >
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {totalItems} result{totalItems === 1 ? "" : "s"} found
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Currently showing providers in {locationSummary}.
                </Typography>
              </Box>

              <Button
                variant="outlined"
                color="success"
                onClick={handleResetFilters}
                disabled={!hasActiveFilters && !hasSearch}
              >
                Reset Filters
              </Button>
            </Stack>
          </Paper>

          {isLoadingData ? (
            <Paper sx={{ p: 3, borderRadius: 4 }}>
              <Typography sx={{ color: "text.secondary" }}>Loading vet directory...</Typography>
            </Paper>
          ) : loadError ? (
            <ContentState
              title="Could not load vet directory"
              description={loadError}
              actionLabel="Retry"
              onAction={() => window.location.reload()}
              severity="warning"
            />
          ) : items.length ? (
            <>
              <DataGrid data={items} />
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                totalPages={totalPages}
                paginate={paginate}
                currentPage={currentPage}
              />
            </>
          ) : (
            <ContentState
              title="No vets match these filters"
              description="Try clearing the active filters or search keyword, or select a broader location to see more veterinary providers."
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
