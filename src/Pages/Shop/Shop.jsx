import React, { useEffect, useState } from "react";
import { Badge, Box, Grid, IconButton, Typography } from "@mui/material";
import products from "./../../API/shopItems.json";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import ProductList from "./ProductList";
import ProductDetailDialog from "./ProductDetailDialog";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShopBanner from "./ShopBanner";
import { Link } from "react-router-dom";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    productTypes: [],
    priceRange: [0, 2000],
  });
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

  const handleRemoveItem = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) {
      handleRemoveItem(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setDetailDialogOpen(true);
  };
  const handleDetailDialogClose = () => {
    setDetailDialogOpen(false);
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
            categories={[...new Set(products.map((p) => p.category))]}
            productTypes={[...new Set(products.map((p) => p.type))]}
            priceRange={[0, 2000]}
            setFilters={setFilters}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={10}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Products
          </Typography>
          <ProductList
            products={filteredProducts}
            onAddToCart={handleAddToCart}
            onViewDetails={handleViewDetails}
          />
        </Grid>
      </Grid>
      {selectedProduct && (
        <ProductDetailDialog
          product={selectedProduct}
          open={detailDialogOpen}
          onClose={handleDetailDialogClose}
          onAddToCart={handleAddToCart}
          handleQuantityChange={handleQuantityChange}
        />
      )}
    </Box>
  );
};

export default Shop;
