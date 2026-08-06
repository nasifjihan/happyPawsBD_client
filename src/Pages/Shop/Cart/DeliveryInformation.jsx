import React from "react";
import {
  Box,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

const DeliveryInformation = ({
  deliveryInfo,
  setDeliveryInfo,
  errors,
  setErrors,
}) => {
  // const name = user.displayName;
  // const email = user.email;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo({ ...deliveryInfo, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error for this field
  };

  const inputStyles = {
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#7AB259",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      backgroundColor: "#fff",
      "& fieldset": {
        borderColor: "rgba(122, 178, 89, 0.22)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(122, 178, 89, 0.42)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#7AB259",
        borderWidth: 2,
      },
    },
  };

  return (
    <Box
      component="section"
      aria-labelledby="delivery-information-heading"
    >
      <Stack spacing={1.25} sx={{ mb: 3 }}>
        <Chip
          icon={<LocalShippingOutlinedIcon />}
          label="Checkout Details"
          variant="outlined"
          sx={{
            alignSelf: "flex-start",
            borderRadius: 2,
            color: "#7AB259",
            borderColor: "rgba(122, 178, 89, 0.28)",
            backgroundColor: "rgba(122, 178, 89, 0.08)",
          }}
        />
        <Typography
          id="delivery-information-heading"
          variant="h5"
          sx={{ fontWeight: 800, color: "#333332" }}
        >
          Delivery Information
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Add your contact and address details so we can deliver your order
          smoothly.
        </Typography>
      </Stack>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            name="name"
            value={deliveryInfo.name}
            // defaultValue={name}
            required
            autoComplete="name"
            error={Boolean(errors.name)}
            helperText={errors.name}
            onChange={handleChange}
            sx={inputStyles}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Mobile Number"
            variant="outlined"
            name="phone"
            value={deliveryInfo.phone}
            type="tel"
            required
            autoComplete="tel"
            error={Boolean(errors.phone)}
            helperText={errors.phone}
            onChange={handleChange}
            sx={inputStyles}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            name="email"
            type="email"
            value={deliveryInfo.email}
            required
            // defaultValue={email}
            autoComplete="email"
            error={Boolean(errors.email)}
            helperText={errors.email}
            onChange={handleChange}
            sx={inputStyles}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="City or Area"
            variant="outlined"
            name="city"
            value={deliveryInfo.city}
            required
            autoComplete="address-level2"
            error={Boolean(errors.city)}
            helperText={errors.city}
            onChange={handleChange}
            sx={inputStyles}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="State"
            variant="outlined"
            name="state"
            value={deliveryInfo.state}
            autoComplete="address-level1"
            onChange={handleChange}
            sx={inputStyles}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="ZIP"
            variant="outlined"
            name="zip"
            inputProps={{ inputMode: "numeric" }}
            value={deliveryInfo.zip}
            autoComplete="postal-code"
            onChange={handleChange}
            sx={inputStyles}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            name="address"
            value={deliveryInfo.address}
            required
            autoComplete="street-address"
            error={Boolean(errors.address)}
            helperText={errors.address}
            onChange={handleChange}
            multiline
            minRows={3}
            sx={inputStyles}
          />
        </Grid>
      </Grid>
      {/* <Box sx={{ marginTop: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Schedule Delivery
        </Typography>
        <Switch
          checked={scheduleDelivery}
          onChange={() => setScheduleDelivery(!scheduleDelivery)}
        />
        {scheduleDelivery && (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select Date"
              value={deliveryDate}
              onChange={(newValue) => setDeliveryDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        )}
      </Box> */}
    </Box>
  );
};

export default DeliveryInformation;
