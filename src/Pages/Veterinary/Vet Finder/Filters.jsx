import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Filters = ({
  divisions,
  cities,
  districts,
  division,
  city,
  district,
  isLoadingDivisions,
  isLoadingCities,
  isLoadingDistricts,
  handleDivisionChange,
  handleCityChange,
  handleDistrictChange,
}) => {
  return (
    <Box sx={{ my: 2, display: "flex", justifyContent: "center", gap: 2 }}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="division-select-label">Division</InputLabel>
        <Select
          labelId="division-select-label"
          id="division-select"
          value={division}
          label="Division"
          onChange={(e) => handleDivisionChange(e.target.value)}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 400, // Set the maximum height of the dropdown menu
              },
            },
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
          }}
        >
          <MenuItem value="">
            <strong>None</strong>
          </MenuItem>
          {isLoadingDivisions ? (
            <MenuItem value="" disabled>
              Loading...
            </MenuItem>
          ) : null}
          {(divisions ?? []).map((div) => (
            <MenuItem key={div} value={div}>
              {div}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }} disabled={!division || !(cities ?? []).length}>
        <InputLabel id="city-select-label">City</InputLabel>
        <Select
          labelId="city-select-label"
          id="city-select"
          value={city}
          label="City"
          onChange={(e) => handleCityChange(e.target.value)}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 400, // Set the maximum height of the dropdown menu
              },
            },
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
          }}
        >
          <MenuItem value="">
            <strong>None</strong>
          </MenuItem>
          {isLoadingCities ? (
            <MenuItem value="" disabled>
              Loading...
            </MenuItem>
          ) : null}
          {(cities ?? []).map((cty) => (
            <MenuItem key={cty} value={cty}>
              {cty}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 140 }} disabled={!division || !city || !(districts ?? []).length}>
        <InputLabel id="district-select-label">District</InputLabel>
        <Select
          labelId="district-select-label"
          id="district-select"
          value={district}
          label="District"
          onChange={(e) => handleDistrictChange(e.target.value)}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 400,
              },
            },
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
          }}
        >
          <MenuItem value="">
            <strong>None</strong>
          </MenuItem>
          {isLoadingDistricts ? (
            <MenuItem value="" disabled>
              Loading...
            </MenuItem>
          ) : null}
          {(districts ?? []).map((entry) => (
            <MenuItem key={entry} value={entry}>
              {entry}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filters;
