import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Pagination,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  adminDeleteShopItem,
  adminListShopItems,
  adminUpsertShopItem,
} from "../lib/adminApi";

const queryKeys = {
  shopItems: (page) => ["admin", "shop-items", page],
};

const emptyItem = {
  id: "",
  name: "",
  type: "",
  brand: "",
  category: "",
  price: "",
  status: "",
  rating: "",
  image: "",
  description: "",
};

const normalizeNumber = (value) => (value === "" ? "" : Number(value));

const ShopItemsAdmin = () => {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(emptyItem);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.shopItems(page),
    queryFn: () => adminListShopItems({ page, limit: 20 }),
    keepPreviousData: true,
  });

  const upsertMutation = useMutation({
    mutationFn: adminUpsertShopItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "shop-items"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminDeleteShopItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "shop-items"] });
      setSelected(emptyItem);
    },
  });

  const totalPages = data?.totalPages ?? 1;
  const errorMessage =
    error?.response?.data?.message || "Could not load shop items.";

  const rows = useMemo(
    () => (data?.items ?? []).map((item) => ({ ...item, key: item._id || item.id })),
    [data?.items]
  );

  const handleSelect = (item) => {
    setSelected({
      ...emptyItem,
      ...item,
      id: item?.id ?? "",
      price: item?.price ?? "",
      rating: item?.rating ?? "",
    });
  };

  const handleFieldChange = (event) => {
    setSelected((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSave = async () => {
    await upsertMutation.mutateAsync({
      ...selected,
      id: normalizeNumber(selected.id),
      price: normalizeNumber(selected.price),
      rating: normalizeNumber(selected.rating),
    });
  };

  const handleDelete = async () => {
    if (!selected?.id) {
      return;
    }

    await deleteMutation.mutateAsync(selected.id);
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h3" fontWeight={900}>
            Shop Items
          </Typography>
          <Typography color="text.secondary">
            Manage product catalog items used by the shop.
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="success"
          onClick={() => setSelected(emptyItem)}
          sx={{ borderRadius: 3, fontWeight: 800 }}
        >
          New Item
        </Button>
      </Stack>

      {isError ? (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      ) : null}

      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <Paper sx={{ p: 2.5, borderRadius: 4 }}>
            <Stack spacing={1.5}>
              {isLoading ? (
                <Typography color="text.secondary">Loading...</Typography>
              ) : rows.length ? (
                rows.map((item) => (
                  <Paper
                    key={item.key}
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      cursor: "pointer",
                      borderColor:
                        selected?.id === item.id
                          ? "success.main"
                          : "rgba(15, 23, 42, 0.12)",
                    }}
                    onClick={() => handleSelect(item)}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                    >
                      <Box>
                        <Typography fontWeight={800}>
                          {item.name || "Unnamed item"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ID {item.id} • {item.category || "Uncategorized"} • ৳
                          {item.price ?? 0}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {item.status || ""}
                      </Typography>
                    </Stack>
                  </Paper>
                ))
              ) : (
                <Typography color="text.secondary">
                  No shop items found.
                </Typography>
              )}

              {totalPages > 1 ? (
                <Box display="flex" justifyContent="center" pt={2}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, nextPage) => setPage(nextPage)}
                    color="success"
                  />
                </Box>
              ) : null}
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Paper sx={{ p: 2.5, borderRadius: 4 }}>
            <Typography variant="h5" fontWeight={900} sx={{ mb: 2 }}>
              Edit Item
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {upsertMutation.isError ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {upsertMutation.error?.response?.data?.message ||
                  "Could not save item."}
              </Alert>
            ) : null}

            <Stack spacing={2}>
              <TextField
                label="ID"
                name="id"
                value={selected.id}
                onChange={handleFieldChange}
                required
              />
              <TextField
                label="Name"
                name="name"
                value={selected.name}
                onChange={handleFieldChange}
              />
              <TextField
                label="Category"
                name="category"
                value={selected.category}
                onChange={handleFieldChange}
              />
              <TextField
                label="Type"
                name="type"
                value={selected.type}
                onChange={handleFieldChange}
              />
              <TextField
                label="Brand"
                name="brand"
                value={selected.brand}
                onChange={handleFieldChange}
              />
              <TextField
                label="Price"
                name="price"
                value={selected.price}
                onChange={handleFieldChange}
              />
              <TextField
                label="Status"
                name="status"
                value={selected.status}
                onChange={handleFieldChange}
              />
              <TextField
                label="Rating"
                name="rating"
                value={selected.rating}
                onChange={handleFieldChange}
              />
              <TextField
                label="Image URL"
                name="image"
                value={selected.image}
                onChange={handleFieldChange}
              />
              <TextField
                label="Description"
                name="description"
                value={selected.description}
                onChange={handleFieldChange}
                multiline
                minRows={3}
              />

              <Stack direction="row" spacing={1.5}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSave}
                  disabled={upsertMutation.isPending}
                  sx={{ flex: 1, borderRadius: 3, fontWeight: 800 }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending || !selected?.id}
                  sx={{ borderRadius: 3, fontWeight: 800 }}
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShopItemsAdmin;
