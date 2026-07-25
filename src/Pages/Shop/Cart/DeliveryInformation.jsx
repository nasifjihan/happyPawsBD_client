import React, { useState } from "react";
import { Box, Grid, TextField, Switch, Typography } from "@mui/material";
// import { LocalizationProvider,DatePicker}"@mui/x-date-pickers/AdapterDateFns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useUserAuth } from "../../../context/UserAuthContext";

const DeliveryInformation = ({
  deliveryInfo,
  setDeliveryInfo,
  errors,
  setErrors,
}) => {
  const { user } = useUserAuth();
  const [scheduleDelivery, setScheduleDelivery] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  // const name = user.displayName;
  // const email = user.email;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo({ ...deliveryInfo, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error for this field
  };
  return (
    <Box
      sx={{
        padding: 2,
        border: "1px solid #ddd",
        borderRadius: 1,
        marginBottom: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
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
            required
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
            value={deliveryInfo.email}
            required
            // defaultValue={email}
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
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="ZIP"
            variant="outlined"
            name="zip"
            value={deliveryInfo.zip}
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
