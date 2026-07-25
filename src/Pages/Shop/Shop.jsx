import React, { useEffect, useState } from "react";
import { Badge, Box, Button, Grid, IconButton, Stack, Typography } from "@mui/material";
import products from "./../../API/shopItems.json";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import ProductList from "./ProductList";
import ProductDetailDialog from "./ProductDetailDialog";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShopBanner from "./ShopBanner";
import { Link } from "react-router-dom";
import ContentState from "../../Components/Common/ContentState";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    productTypes: [],
    priceRange: [0, 2000],
  });
  const [filtersKey, setFiltersKey] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  // Load cart items from Local Storage on initial render
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
  }, []);

  // Save cart items to Local Storage whenever they change
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cartItems");
    }
  }, [cartItems]);

  const handleAddToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      const newItem = { ...product, quantity };
      return [...prevItems, newItem];
    });
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
    setFilters({
      categories: [],
      productTypes: [],
      priceRange: [0, 2000],
    });
    setFiltersKey((current) => current + 1);
  };

  const filteredProducts = products.filter(
    (product) =>
      (filters.categories.length === 0 ||
        filters.categories.includes(product.category)) &&
      (filters.productTypes.length === 0 ||
        filters.productTypes.includes(product.type)) &&
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1] &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
          <Badge badgeContent={cartItems.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Box>

      <Grid container spacing={5} pt={2} id="ShopProducts">
        <Grid item xs={12} sm={4} md={2}>
          <Filters
            key={filtersKey}
            categories={[...new Set(products.map((p) => p.category))]}
            productTypes={[...new Set(products.map((p) => p.type))]}
            priceRange={[0, 2000]}
            setFilters={setFilters}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={10}>
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

          {filteredProducts.length ? (
            <ProductList
              products={filteredProducts}
              onAddToCart={handleAddToCart}
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
          onAddToCart={handleAddToCart}
        />
      )}
    </Box>
  );
};

export default Shop;
