import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const divisions = [
  "Dhaka",
  "Barishal",
  "Chattogram",
  "Khulna",
  "Rajshahi",
  "Rangpur",
  "Mymensingh",
  "Sylhet",
];
const cities = [
  // "Panthopath",
  // "Azimpur",
  // "Nilkhet",
  // "Lalbagh",
  "Gulistan",
  // "Paltan",
  // "Shantinagar",
  "Shahbag",
  "Khilgaon",
  "Bashabo",
  "Elephant Road",
  // "Farmgate",
  // "Motijheel",
  // "Shymoli",
  "Mohammadpur",
  "Gazipur",
  "Bashundhara R/A",
  // "Kuril",
  // "Banani",
  "Khilkhet",
  // "Natun Bazar",
  "Badda",
  "Banglamotor",
  // "Tongi",
  "Khilgaon",
  // "Rampura",
  // "Niketon",
  // "Tejgaon",
  "Mohakhali",
  "Puran Dhaka",
  // "Malibag",
  // "Jatrabari",
  "Banasree",
  "Dhanmondi",
  "Uttara",
  "Demra",
  // "Keraniganj",
  "Mohammadpur",
  "Mirpur",
  // "Nikunja",
  "Baridhara",
  "Lalmatia",
  // "Gulshan-1",
  "Gulshan-2",
];

const Filters = ({
  division,
  city,
  handleDivisionChange,
  handleCityChange,
}) => {
  return (
    <Box sx={{ my: 4, display: "flex", justifyContent: "center", gap: 2 }}>
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
          {divisions.map((div) => (
            <MenuItem key={div} value={div}>
              {div}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }} disabled={division !== "Dhaka"}>
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
          {cities.map((cty) => (
            <MenuItem key={cty} value={cty}>
              {cty}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filters;
