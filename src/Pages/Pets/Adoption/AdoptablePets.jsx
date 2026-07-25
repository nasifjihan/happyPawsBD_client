import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import adoptableAnimals from "./../../../API/adoptableAnimals.json";
import { useNavigate } from "react-router-dom";
import ContentState from "../../../Components/Common/ContentState";

const AdoptablePets = () => {
  const navigate = useNavigate();

  const handleCardClick = (code) => {
    navigate(`/adoption/adoptable_pets/${code}`);
  };

  return (
    <Box className="myContainer" mt={5} textAlign={"center"}>
      <Box mb={5}>
        <Typography
          variant="h4"
          color="primary.headline"
          sx={{ lineHeight: 1.2, fontWeight: "900" }}
        >
          OUR AVAILABLE PETS
        </Typography>

        <Typography
          mt={1}
          variant="body1"
          color="primary.green"
          fontWeight={700}
          textAlign={"center"}
        >
          Browse available companions and open a full profile to review their
          details and adoption requirements.
        </Typography>
      </Box>
      {/* Card Section Starts ----------------------------------------------------  */}
      <Stack my={3}>
        {adoptableAnimals.length ? (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {adoptableAnimals.map((item) => (
              <Grid item xs={2} sm={4} md={4} key={item.code}>
                <Card
                  sx={{
                    boxShadow: "none",
                    backgroundColor: "#FBFBFB",
                    "&:hover": {
                      boxShadow: "10px 10px 10px 0px rgba(82,82,82,0.2)",
                    },
                  }}
                >
                  <CardActionArea onClick={() => handleCardClick(item.code)}>
                    <CardMedia
                      component="img"
                      image={item.photos}
                      alt={item.name}
                      height={250}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" fontWeight={700}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" fontSize={12}>
                        {item.breed} - {item.origin}
                      </Typography>
                      <Typography variant="body2" pt={2} color="primary.para">
                        {item.age} Year{" "}
                        <span style={{ color: "green" }}>|</span> {item.gender}{" "}
                        <span style={{ color: "green" }}>|</span> {item.weight}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="primary.para"
                        maxHeight="140px"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        wordWrap="break-word"
                      >
                        {item.breeddescription}
                      </Typography>

                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                        mt={2}
                      >
                        <Typography
                          variant="body2"
                          color="primary.green"
                          textAlign={"left"}
                        >
                          Code: {item.code}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="primary.green"
                          textAlign={"right"}
                          fontWeight={700}
                        >
                          View details
                        </Typography>
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <ContentState
            title="No adoptable pets are listed right now"
            description="Please check back soon for new adoption listings and updated pet profiles."
            actionLabel="Back to Adoption"
            actionTo="/adoption"
            severity="info"
          />
        )}
      </Stack>

      {/* All Animal Button --------------------------------------------------------------  */}
      {/* <Button variant="outlined" color="success" href="./">
          <Typography variant="button" fontWeight="bold">
            View All Adoptable Animals
          </Typography>
        </Button> */}
    </Box>
  );
};

export default AdoptablePets;
