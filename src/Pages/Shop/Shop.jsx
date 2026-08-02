import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Badge,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import ProductList from "./ProductList";
import ProductDetailDialog from "./ProductDetailDialog";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShopBanner from "./ShopBanner";
import { Link, useSearchParams } from "react-router-dom";
import ContentState from "../../Components/Common/ContentState";
import { useCart } from "../../context/CartContext";
import { useShopItemsQuery } from "../../features/catalog/hooks";

const normalizeValue = (value) => String(value ?? "").trim().toLowerCase();

const resolveCategoriesFromQuery = ({ rawValue, availableCategories }) => {
  if (!rawValue) return [];

  const requested = rawValue
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (!requested.length) return [];

  if (!availableCategories.length) {
    return requested;
  }

  return requested.map((requestedCategory) => {
    const match = availableCategories.find(
      (category) => normalizeValue(category) === normalizeValue(requestedCategory)
    );
    return match || requestedCategory;
  });
};

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFiltersState] = useState({
    categories: [],
    productTypes: [],
    priceRange: [0, 2000],
  });
  const [filtersKey, setFiltersKey] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const { addToCart, cartItemsCount } = useCart();
  const { data: products = [], isLoading, isError, error } = useShopItemsQuery();

  const availableCategories = useMemo(
    () => [...new Set(products.map((p) => p.category).filter(Boolean))],
    [products]
  );
  const availableProductTypes = useMemo(
    () => [...new Set(products.map((p) => p.type).filter(Boolean))],
    [products]
  );

  const initialSelectedCategories = useMemo(() => {
    const rawCategory = searchParams.get("category");
    return resolveCategoriesFromQuery({
      rawValue: rawCategory,
      availableCategories,
    });
  }, [availableCategories, searchParams]);

  useEffect(() => {
    if (!initialSelectedCategories.length) {
      if (filters.categories.length) {
        setFiltersState((current) => ({ ...current, categories: [] }));
      }
      return;
    }

    const nextSignature = initialSelectedCategories
      .map((value) => normalizeValue(value))
      .sort()
      .join("|");
    const currentSignature = filters.categories
      .map((value) => normalizeValue(value))
      .sort()
      .join("|");

    if (nextSignature !== currentSignature) {
      setFiltersState((current) => ({
        ...current,
        categories: initialSelectedCategories,
      }));
      setFiltersKey((current) => current + 1);
    }
  }, [filters.categories, initialSelectedCategories]);

  const handleSetFilters = (nextFilters) => {
    setFiltersState(nextFilters);

    const nextParams = new URLSearchParams(searchParams);
    if (nextFilters.categories?.length) {
      nextParams.set("category", nextFilters.categories.join(","));
    } else {
      nextParams.delete("category");
    }
    setSearchParams(nextParams, { replace: true });
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setDetailDialogOpen(true);
  };
  const handleDetailDialogClose = () => {
    setDetailDialogOpen(false);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setFiltersState({
      categories: [],
      productTypes: [],
      priceRange: [0, 2000],
    });
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("category");
    setSearchParams(nextParams, { replace: true });
    setFiltersKey((current) => current + 1);
  };

  const filteredProducts = products.filter(
    (product) =>
      (filters.categories.length === 0 ||
        filters.categories.some(
          (category) =>
            normalizeValue(category) === normalizeValue(product.category)
        )) &&
      (filters.productTypes.length === 0 ||
        filters.productTypes.some(
          (type) => normalizeValue(type) === normalizeValue(product.type)
        )) &&
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1] &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const errorMessage =
    error?.response?.data?.message || "Could not load shop items right now.";

  return (
    <Box className="myContainer">
      <ShopBanner />

      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Typography variant="h6" color="initial">
          Search
        </Typography>
        <Box mx={5} sx={{ flexGrow: 1 }}>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Box>

        <IconButton color="inherit" component={Link} to="/cart">
          <Badge badgeContent={cartItemsCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Box>

      <Grid container spacing={5} pt={2} id="ShopProducts">
        <Grid item xs={12} sm={4} md={2}>
          <Filters
            key={filtersKey}
            categories={availableCategories}
            productTypes={availableProductTypes}
            priceRange={[0, 2000]}
            setFilters={handleSetFilters}
            initialSelectedCategories={filters.categories}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={10}>
          {isError ? (
            <Alert severity="warning" sx={{ mb: 2.5 }}>
              {errorMessage}
            </Alert>
          ) : null}

          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
            mb={2}
          >
            <Box>
              <Typography variant="h5" fontWeight={700}>
                Products
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {filteredProducts.length} item
                {filteredProducts.length === 1 ? "" : "s"} match your current
                filters.
              </Typography>
            </Box>

            <Button variant="outlined" color="success" onClick={handleResetFilters}>
              Reset Filters
            </Button>
          </Stack>

          {isLoading ? (
            <Box textAlign="center" py={6}>
              <CircularProgress color="success" />
            </Box>
          ) : filteredProducts.length ? (
            <ProductList
              products={filteredProducts}
              onAddToCart={addToCart}
              onViewDetails={handleViewDetails}
            />
          ) : (
            <ContentState
              title="No products match these filters"
              description="Try a broader search term or reset the active filters to see more products."
              actionLabel="Reset Filters"
              onAction={handleResetFilters}
              severity="info"
            />
          )}
        </Grid>
      </Grid>
      {selectedProduct && (
        <ProductDetailDialog
          product={selectedProduct}
          open={detailDialogOpen}
          onClose={handleDetailDialogClose}
          onAddToCart={addToCart}
        />
      )}
    </Box>
  );
};

export default Shop;
