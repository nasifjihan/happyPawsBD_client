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
} from "@mui/material";
import { useCreateFoundPetMutation } from "../../../features/lost-found/hooks";
import {
  foundPetDefaultValues,
  foundPetFormSchema,
} from "../../../features/lost-found/schemas";

const FoundForm = ({ hideHeading = false }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const createFoundPetMutation = useCreateFoundPetMutation();
  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(foundPetFormSchema),
    defaultValues: foundPetDefaultValues,
  });
  const petPicture = watch("petPicture");

  const onSubmit = async (foundPet) => {
    const formData = new FormData();

    Object.entries(foundPet).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await createFoundPetMutation.mutateAsync(formData);
      reset(foundPetDefaultValues);
      setShowSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box>
      {!hideHeading ? (
        <Box mx={"auto"} sx={{ textAlign: "center" }}>
          <Typography variant="h5" fontWeight={700}>
            FOUND PET REGISTRATION
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
              Please review the highlighted fields before submitting the found
              pet form.
            </Alert>
          )}

          {createFoundPetMutation.isError && (
            <Alert severity="error" sx={{ mb: 3, textAlign: "left" }}>
              {createFoundPetMutation.error?.response?.data?.message ||
                "Could not submit the found pet form."}
            </Alert>
          )}

          <Grid container spacing={2}>
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
                label="Breed Type"
                size="small"
                fullWidth
                margin="normal"
                color="success"
                error={Boolean(errors.breed)}
                helperText={errors.breed?.message}
                focused
                {...register("breed")}
              />
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
              <FormControl
                variant="outlined"
                name="gender"
                size="small"
                required
                fullWidth
                margin="normal"
                color="success"
                focused
              >
                <InputLabel id="gender">Gender</InputLabel>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="gender"
                      id="gender"
                      label="Gender"
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Not Sure">Not Sure</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
              {errors.gender && (
                <Typography variant="caption" color="error">
                  {errors.gender.message}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Your Name"
                size="small"
                required
                fullWidth
                margin="normal"
                color="success"
                error={Boolean(errors.founderName)}
                helperText={errors.founderName?.message}
                focused
                autoComplete="name"
                {...register("founderName")}
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
                label="Found Location"
                size="small"
                required
                fullWidth
                margin="normal"
                color="success"
                error={Boolean(errors.foundLocation)}
                helperText={errors.foundLocation?.message}
                focused
                {...register("foundLocation")}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Date of Found"
                type="date"
                size="small"
                required
                fullWidth
                margin="normal"
                color="success"
                error={Boolean(errors.foundDate)}
                helperText={errors.foundDate?.message}
                focused
                InputLabelProps={{ shrink: true }}
                {...register("foundDate")}
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
                    aria-label="Upload found pet picture"
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

          <Button
            variant="contained"
            color="success"
            sx={{ my: 3, fontWeight: "700" }}
            fullWidth
            type="submit"
            disabled={createFoundPetMutation.isPending}
          >
            {createFoundPetMutation.isPending
              ? "Submitting..."
              : "Submit Found Pet Application"}
          </Button>

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

export default FoundForm;
