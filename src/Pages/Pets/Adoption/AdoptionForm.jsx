import React, { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useUserAuth } from "../../../context/UserAuthContext";
import { useAdoptionMutation } from "../../../features/adoption/hooks";
import {
  adoptionFormSchema,
  createAdoptionDefaultValues,
} from "../../../features/adoption/schemas";

const AdoptionForm = ({ animalCode, animalType }) => {
  const { user } = useUserAuth();
  const [showSuccess, setShowSuccess] = useState(false);
  const adoptionMutation = useAdoptionMutation();
  const defaultValues = useMemo(
    () =>
      createAdoptionDefaultValues({
        animalCode,
        animalType,
        user,
      }),
    [animalCode, animalType, user]
  );
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(adoptionFormSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = async (adoption) => {
    try {
      await adoptionMutation.mutateAsync({
        adoption,
        code: adoption.animalCode,
      });
      reset(createAdoptionDefaultValues({ animalCode, animalType, user }));
      setShowSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box className="myContainer">
      <Box
        sx={{
          background: "linear-gradient(135deg, #f0f4f8, #d9e4f5)",
          p: 5,
          my: 3,
          borderRadius: "12px",
          // maxWidth: 600,
          mx: "auto",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={900}
          color="#34495e"
          pb={2}
          gutterBottom
        >
          Adoption Application Form
        </Typography>

        {Object.keys(errors).length > 0 && (
          <Alert severity="error" sx={{ mb: 3, textAlign: "left" }}>
            Please review the highlighted fields before submitting the
            application.
          </Alert>
        )}

        {adoptionMutation.isError && (
          <Alert severity="error" sx={{ mb: 3, textAlign: "left" }}>
            {adoptionMutation.error?.response?.data?.message ||
              "Could not submit the adoption application."}
          </Alert>
        )}

        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                variant="outlined"
                label="Animal Code"
                size="medium"
                required
                fullWidth
                margin="normal"
                color="success"
                error={Boolean(errors.animalCode)}
                helperText={errors.animalCode?.message}
                focused
                {...register("animalCode")}
                sx={{
                  borderRadius: "8px",
                  background: "#f8f9fa",
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl
                variant="outlined"
                name="animalType"
                size="medium"
                required
                fullWidth
                margin="normal"
                color="success"
                focused
                sx={{
                  background: "#f8f9fa",
                  borderRadius: "8px",
                }}
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
                      label="Type of Animal"
                      sx={{
                        textAlign: "left",
                      }}
                    >
                      <MenuItem value="Cat">Cat</MenuItem>
                      <MenuItem value="Dog">Dog</MenuItem>
                      <MenuItem value="Bird">Bird</MenuItem>
                      <MenuItem value="Rabbit">Rabbit</MenuItem>
                      <MenuItem value="GuineaPig">Guinea Pig</MenuItem>
                      <MenuItem value="Horse">Horse</MenuItem>
                      <MenuItem value="Turtle">Turtle</MenuItem>
                      <MenuItem value="Hamster">Hamster</MenuItem>
                      <MenuItem value="Hedgehog">Hedgehog</MenuItem>
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

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                variant="outlined"
                label="Your Name"
                size="medium"
                required
                fullWidth
                margin="normal"
                color="success"
                error={Boolean(errors.adopterName)}
                helperText={errors.adopterName?.message}
                focused
                autoComplete="name"
                {...register("adopterName")}
                sx={{
                  borderRadius: "8px",
                  background: "#f8f9fa",
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                variant="outlined"
                label="Email"
                type="email"
                size="medium"
                required
                fullWidth
                margin="normal"
                color="success"
                error={Boolean(errors.contactEmail)}
                helperText={errors.contactEmail?.message}
                focused
                autoComplete="email"
                {...register("contactEmail")}
                sx={{
                  borderRadius: "8px",
                  background: "#f8f9fa",
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                variant="outlined"
                label="Contact Number"
                type="tel"
                size="medium"
                required
                fullWidth
                margin="normal"
                color="success"
                error={Boolean(errors.contactPhone)}
                helperText={errors.contactPhone?.message}
                focused
                autoComplete="tel"
                {...register("contactPhone")}
                sx={{
                  borderRadius: "8px",
                  background: "#f8f9fa",
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                variant="outlined"
                label="Your Address"
                size="medium"
                required
                fullWidth
                margin="normal"
                color="success"
                error={Boolean(errors.address)}
                helperText={errors.address?.message}
                focused
                autoComplete="street-address"
                {...register("address")}
                sx={{
                  borderRadius: "8px",
                  background: "#f8f9fa",
                }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                variant="outlined"
                label="Experience with Pets"
                size="medium"
                fullWidth
                multiline
                rows={2}
                margin="normal"
                color="success"
                error={Boolean(errors.experience)}
                helperText={errors.experience?.message}
                focused
                {...register("experience")}
                sx={{
                  borderRadius: "8px",
                  background: "#f8f9fa",
                }}
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="success"
            fullWidth
            type="submit"
            size="large"
            sx={{
              fontWeight: "bold",
              borderRadius: "8px",
              my: 3,
            }}
            disabled={adoptionMutation.isPending}
          >
            {adoptionMutation.isPending
              ? "Submitting..."
              : "Submit Adoption Application"}
          </Button>
        </Box>

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
            Your application has been submitted successfully!
          </Alert>
        </Snackbar>

      </Box>
    </Box>
  );
};

export default AdoptionForm;
