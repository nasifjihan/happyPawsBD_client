import React, { useEffect, useMemo, useState } from "react";
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

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
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

          <Grid item xs={12} sm={4}>
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

          <Grid item xs={12} sm={4}>
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
              {...register("adopterName")}
              sx={{
                borderRadius: "8px",
                background: "#f8f9fa",
              }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              variant="outlined"
              label="Email"
              size="medium"
              required
              fullWidth
              margin="normal"
              color="success"
              error={Boolean(errors.contactEmail)}
              helperText={errors.contactEmail?.message}
              focused
              {...register("contactEmail")}
              sx={{
                borderRadius: "8px",
                background: "#f8f9fa",
              }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              variant="outlined"
              label="Contact Number"
              size="medium"
              required
              fullWidth
              margin="normal"
              color="success"
              error={Boolean(errors.contactPhone)}
              helperText={errors.contactPhone?.message}
              focused
              {...register("contactPhone")}
              sx={{
                borderRadius: "8px",
                background: "#f8f9fa",
              }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
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
              {...register("address")}
              sx={{
                borderRadius: "8px",
                background: "#f8f9fa",
              }}
            />
          </Grid>

          <Grid item xs={12}>
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

        <Snackbar
          open={adoptionMutation.isError}
          autoHideDuration={4000}
          onClose={() => adoptionMutation.reset()}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => adoptionMutation.reset()}
            severity="error"
            sx={{ width: "100%" }}
          >
            {adoptionMutation.error?.response?.data?.message ||
              "Could not submit the adoption application."}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default AdoptionForm;
