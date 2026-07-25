import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Snackbar,
  Alert,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import {
  useCreateLostPetMutation,
} from "../../../features/lost-found/hooks";
import {
  lostPetDefaultValues,
  lostPetFormSchema,
} from "../../../features/lost-found/schemas";

const LostForm = ({ hideHeading = false }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const createLostPetMutation = useCreateLostPetMutation();
  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(lostPetFormSchema),
    defaultValues: lostPetDefaultValues,
  });
  const petPicture = watch("petPicture");

  const onSubmit = async (lostPet) => {
    const formData = new FormData();

    Object.entries(lostPet).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await createLostPetMutation.mutateAsync(formData);
      reset(lostPetDefaultValues);
      setShowSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box>
      {!hideHeading ? (
        <Box mx={"auto"} textAlign={"center"}>
          <Typography variant="h5" fontWeight={700}>
            LOST PET REGISTRATION
          </Typography>
        </Box>
      ) : null}

      <Box>
        <Box
          component="form"
          mx={"auto"}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            p: hideHeading ? 0 : 2,
          }}
        >
          {Object.keys(errors).length > 0 && (
            <Alert severity="error" sx={{ mb: 3, textAlign: "left" }}>
              Please review the highlighted fields before submitting the lost
              pet form.
            </Alert>
          )}

          {createLostPetMutation.isError && (
            <Alert severity="error" sx={{ mb: 3, textAlign: "left" }}>
              {createLostPetMutation.error?.response?.data?.message ||
                "Could not submit the lost pet form."}
            </Alert>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Pet's Name"
                size="small"
                required
                fullWidth
                margin="normal"
                color="success"
                error={Boolean(errors.petName)}
                helperText={errors.petName?.message}
                focused
                {...register("petName")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl
                variant="outlined"
                name="animalType"
                size="small"
                required
                fullWidth
                margin="normal"
                color="success"
                focused
              >
                <InputLabel id="animalType">Type of Animal</InputLabel>
                <Controller
                  name="animalType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="animalType"
                      id="animalType"
                      label="animalType"
                    >
                      <MenuItem value="Cat">Cat</MenuItem>
                      <MenuItem value="Dog">Dog</MenuItem>
                      <MenuItem value="Bird">Bird</MenuItem>
                      <MenuItem value="Rabbits">Rabbits</MenuItem>
                      <MenuItem value="GuineaPig">Guinea Pig</MenuItem>
                      <MenuItem value="Horse">Horse</MenuItem>
                      <MenuItem value="Turtle">Turtle</MenuItem>
                      <MenuItem value="Hamsters">Hamsters</MenuItem>
                      <MenuItem value="Hedgehogs">Hedgehogs</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
              {errors.animalType && (
                <Typography variant="caption" color="error">
                  {errors.animalType.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Pet's Colors"
                size="small"
                required
                fullWidth
                margin="normal"
                color="success"
                error={Boolean(errors.colors)}
                helperText={errors.colors?.message}
                focused
                {...register("colors")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Owner Name"
                size="small"
                required
                fullWidth
                margin="normal"
                color="success"
                error={Boolean(errors.ownerName)}
                helperText={errors.ownerName?.message}
                focused
                autoComplete="name"
                {...register("ownerName")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Contact Number"
                type="tel"
                size="small"
                required
                fullWidth
                margin="normal"
                color="success"
                error={Boolean(errors.contactPhone)}
                helperText={errors.contactPhone?.message}
                focused
                autoComplete="tel"
                {...register("contactPhone")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Email"
                type="email"
                size="small"
                fullWidth
                margin="normal"
                color="success"
                error={Boolean(errors.contactEmail)}
                helperText={errors.contactEmail?.message}
                focused
                autoComplete="email"
                {...register("contactEmail")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Last Seen Area"
                size="small"
                required
                fullWidth
                margin="normal"
                color="success"
                error={Boolean(errors.lastSeenLocation)}
                helperText={errors.lastSeenLocation?.message}
                focused
                {...register("lastSeenLocation")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Date of Lost"
                type="date"
                size="small"
                required
                fullWidth
                margin="normal"
                color="success"
                error={Boolean(errors.lostDate)}
                helperText={errors.lostDate?.message}
                focused
                InputLabelProps={{ shrink: true }}
                {...register("lostDate")}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Description of Circumstances"
                size="small"
                fullWidth
                multiline
                rows={2}
                margin="normal"
                color="success"
                error={Boolean(errors.description)}
                helperText={errors.description?.message}
                focused
                {...register("description")}
              />
            </Grid>

            {/* Picture Upload */}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Button
                  variant="contained"
                  component="label"
                  color="success"
                  sx={{ textTransform: "none", fontWeight: 600 }}
                >
                  Upload Picture
                  <input
                    aria-label="Upload lost pet picture"
                    type="file"
                    hidden
                    accept=".jpeg, .png, .jpg"
                    onChange={(event) => {
                      setValue("petPicture", event.target.files?.[0], {
                        shouldValidate: true,
                      });
                    }}
                  />
                </Button>

                {petPicture && (
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    aria-live="polite"
                  >
                    Picture attached
                  </Typography>
                )}
              </Box>
              {errors.petPicture && (
                <Typography variant="caption" color="error">
                  {errors.petPicture.message}
                </Typography>
              )}
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Button
            variant="contained"
            color="success"
            sx={{ my: 3, fontWeight: "700" }}
            fullWidth
            type="submit"
            disabled={createLostPetMutation.isPending}
          >
            {createLostPetMutation.isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Submit Lost Pet Application"
            )}
          </Button>

          {/* Snackbar for showing the success message */}
          <Snackbar
            open={showSuccess}
            autoHideDuration={4000}
            onClose={() => setShowSuccess(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={() => setShowSuccess(false)}
              severity="success"
              sx={{ width: "100%" }}
            >
              Your form has been submitted successfully!
            </Alert>
          </Snackbar>

        </Box>
      </Box>
    </Box>
  );
};

export default LostForm;
