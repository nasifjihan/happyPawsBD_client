import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import vetData from "../../../API/veterinary.json";
import DataGrid from "./DataGrid";
import Filters from "./Filters";
import Pagination from "./Pagination";
import ContentState from "../../../Components/Common/ContentState";

const VetFinder = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [division, setDivision] = useState("");
  const [city, setCity] = useState("");

  const itemsPerPage = 20;

  useEffect(() => {
    setFilteredData(vetData);
  }, []);

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
              <Typography variant="h3" fontWeight={800}>
                Vet Finder
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 780 }}>
                Search veterinary clinics, hospitals, and professionals across
                Bangladesh. Use the filters below to narrow the list and open any
                result for more details, contact information, and location links.
              </Typography>
            </Stack>
          </Paper>

          <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3 }}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", md: "center" }}
            >
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  {filteredData.length} result{filteredData.length === 1 ? "" : "s"} found
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

            <Filters
              division={division}
              city={city}
              handleDivisionChange={handleDivisionChange}
              handleCityChange={handleCityChange}
            />
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
