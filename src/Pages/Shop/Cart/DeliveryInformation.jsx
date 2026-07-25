import React from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";

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
  return (
    <Box
      component="section"
      aria-labelledby="delivery-information-heading"
      sx={{
        padding: 2,
        border: "1px solid #ddd",
        borderRadius: 1,
        marginBottom: 2,
      }}
    >
      <Typography id="delivery-information-heading" variant="h6" gutterBottom>
        Delivery Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            name="name"
            value={deliveryInfo.name}
            // defaultValue={name}
            required
            autoComplete="name"
            error={Boolean(errors.name)}
            helperText={errors.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            variant="outlined"
            name="city"
            value={deliveryInfo.city}
            autoComplete="address-level2"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="State"
            variant="outlined"
            name="state"
            value={deliveryInfo.state}
            autoComplete="address-level1"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="ZIP"
            variant="outlined"
            name="zip"
            inputProps={{ inputMode: "numeric" }}
            value={deliveryInfo.zip}
            autoComplete="postal-code"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
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
