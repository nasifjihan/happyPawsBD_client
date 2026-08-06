import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Typography,
  Divider,
} from "@mui/material";

const Filters = ({
  categories,
  productTypes,
  priceRange,
  setFilters,
  initialSelectedCategories = [],
}) => {
  const [selectedCategories, setSelectedCategories] = useState(
    initialSelectedCategories
  );
  const [selectedProductTypes, setSelectedProductTypes] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRange);

  useEffect(() => {
    setSelectedCategories(initialSelectedCategories);
  }, [initialSelectedCategories]);

  const handleCategoryChange = (category) => {
    const newSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newSelectedCategories);
    setFilters({
      categories: newSelectedCategories,
      productTypes: selectedProductTypes,
      priceRange: selectedPriceRange,
    });
  };

  const handleProductTypeChange = (type) => {
    const newSelectedProductTypes = selectedProductTypes.includes(type)
      ? selectedProductTypes.filter((t) => t !== type)
      : [...selectedProductTypes, type];
    setSelectedProductTypes(newSelectedProductTypes);
    setFilters({
      categories: selectedCategories,
      productTypes: newSelectedProductTypes,
      priceRange: selectedPriceRange,
    });
  };

  const handlePriceRangeChange = (event, newValue) => {
    setSelectedPriceRange(newValue);
    setFilters({
      categories: selectedCategories,
      productTypes: selectedProductTypes,
      priceRange: newValue,
    });
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Filters
        <Divider />
      </Typography>

      <FormControl component="fieldset">
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Categories
        </Typography>
        <FormGroup>
          {categories.map((category) => (
            <FormControlLabel
              key={category}
              sx={{}}
              control={
                <Checkbox
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  size="small"
                />
              }
              label={category}
            />
          ))}
        </FormGroup>
      </FormControl>

      <br />

      <FormControl component="fieldset">
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 3 }}>
          Product Types
        </Typography>
        <FormGroup>
          {productTypes.map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  checked={selectedProductTypes.includes(type)}
                  onChange={() => handleProductTypeChange(type)}
                  size="small"
                />
              }
              label={type}
            />
          ))}
        </FormGroup>
      </FormControl>

      <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 3 }}>
        Price Range
      </Typography>
      <Slider
        value={selectedPriceRange}
        onChange={handlePriceRangeChange}
        valueLabelDisplay="auto"
        min={0}
        max={2000}
      />
      <Box sx={{ mt: 2 }}></Box>
    </Box>
  );
};

export default Filters;
