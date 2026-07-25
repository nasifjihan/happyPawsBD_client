import React from "react";
import { Box, Container, Typography, Paper, Grid } from "@mui/material";
import aboutImage from "./../../images/optimized/about-us.webp";
import OptimizedImage from "../../Components/Common/OptimizedImage";

const About_Us = () => {
  return (
    <Box
      className="myContainer"
      sx={{
        my: 5,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            p: 10,
            backgroundColor: "#e5e5e5",
            borderRadius: "10",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography
                variant="h4"
                textAlign={"center"}
                fontWeight={700}
                gutterBottom
              >
                About Us
              </Typography>

              <Typography paragraph>
                Welcome to Happy Paws BD! We are a passionate team of animal
                lovers dedicated to making a positive impact on the lives of
                pets in Bangladesh.
              </Typography>

              <Typography paragraph>
                Our mission is to rescue and provide shelter, care, and love to
                animals in need. Whether they are lost, abandoned, or facing
                mistreatment, we are here to help. We believe that every animal
                deserves a loving home and a chance at a happy life.
              </Typography>

              <Typography paragraph>
                At Happy Paws BD, we provide a platform for pet adoption,
                connecting loving families with animals in need of forever
                homes. We also offer resources and education to promote
                responsible pet ownership and animal welfare.
              </Typography>

              <Typography paragraph>
                Join us in our journey to create a world where every animal is
                valued and cared for. Together, we can make a difference and
                bring happiness to the lives of these wonderful creatures.
              </Typography>
            </Grid>

            <Grid item xs={12} md={4} textAlign={"center"} mt={4}>
              <OptimizedImage
                src={aboutImage}
                alt="About Happy Paws BD"
                style={{ width: "80%" }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default About_Us;
