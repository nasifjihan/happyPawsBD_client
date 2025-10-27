import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { Box, Button, Dialog } from "@mui/material";
import { Link } from "react-router-dom";

const DataGrid = ({ data }) => {
  const [selectedVet, setSelectedVet] = useState(null);

  const handleVetClick = (item) => {
    setSelectedVet(item);
  };

  const handleClose = () => {
    setSelectedVet(null);
  };

  return (
    <Grid container spacing={4}>
      {data.map((item) => (
        <Grid item key={item.id} xs={12} sm={6} md={3}>
          <Card
            onClick={() => handleVetClick(item)}
            sx={{
              position: "relative",
              height: 360,
              // width: "100%", // Ensure full width within the grid item
              // boxShadow: "none",
              backgroundColor: "#FBFBFB",
              "&:hover": {
                boxShadow: "10px 10px 10px 0px rgba(82,82,82,0.2)",
                cursor: "pointer", // Change cursor to pointer on hover
              },
            }}
          >
            {/* <CardActionArea onClick={() => handleCardClick(item.id)}> */}
            <CardMedia
              component="img"
              height="140"
              width="100%"
              image={item.image || "https://i.ibb.co/KwkX3N7/4809708.jpg"}
              alt={item.title}
            />

            <CardContent sx={{ lineHeight: "1" }}>
              <Typography variant="body1" component="div" fontWeight={700}>
                {item.title}
              </Typography>

              {item.position && (
                <Typography variant="caption" sx={{ lineHeight: "1" }}>
                  {item.position}
                </Typography>
              )}

              <Typography variant="body2" color="text.secondary" mt={1}>
                {item.location}
              </Typography>

              <Typography variant="body2" sx={{ pt: 1 }}>
                <strong>Contact:</strong>{" "}
                {Array.isArray(item.contact)
                  ? item.contact.join(", ")
                  : item.contact}
              </Typography>

              <Box display={"flex"} justifyContent={"space-between"}>
                <Button
                  // variant="outlined"
                  color="error"
                  href={item.map_link}
                  target="_blank"
                  startIcon={<LocationOnIcon />}
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                    // color: "#555",
                  }}
                ></Button>

                <Button
                  // variant="contained"
                  color="info"
                  href={item.website}
                  target="_blank"
                  startIcon={<LanguageIcon />}
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    // color: "#555",
                  }}
                ></Button>
              </Box>
            </CardContent>
            {/* </CardActionArea> */}
          </Card>
        </Grid>
      ))}

      {/* Pop Up Box */}

      {selectedVet && (
        <Dialog open={true} onClose={handleClose}>
          <Box p={2}>
            <CardMedia
              component="img"
              // height="200"
              // width="100%"
              image={
                selectedVet.image || "https://i.ibb.co/KwkX3N7/4809708.jpg"
              }
              alt={selectedVet.title}
            />
            <Box p={2}>
              <Typography
                variant="h5"
                component="div"
                gutterBottom
                fontWeight={700}
              >
                {selectedVet.title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "4px",
                }}
              >
                <LocationOnIcon
                  fontSize="small"
                  style={{ marginRight: "8px" }}
                />{" "}
                {selectedVet.location}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "4px",
                }}
              >
                <EmailIcon fontSize="small" style={{ marginRight: "8px" }} />
                <Link
                  href={`mailto:${selectedVet.email}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {selectedVet.email}
                </Link>
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "4px",
                }}
              >
                <PhoneIcon fontSize="small" style={{ marginRight: "8px" }} />
                {Array.isArray(selectedVet.contact)
                  ? selectedVet.contact.join(", ")
                  : selectedVet.contact}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "4px",
                }}
              >
                <ScheduleIcon fontSize="small" style={{ marginRight: "8px" }} />
                {selectedVet.hours}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                <strong>Services:</strong> {selectedVet.services}
              </Typography>

              <Box mt={2}>
                <Button
                  variant="contained"
                  color="info"
                  href={selectedVet.website}
                  target="_blank"
                  startIcon={<LanguageIcon />}
                >
                  Visit Website
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  href={selectedVet.map_link}
                  target="_blank"
                  startIcon={<LocationOnIcon />}
                  sx={{ ml: 2 }}
                >
                  View on Map
                </Button>
              </Box>
            </Box>
          </Box>
        </Dialog>
      )}
    </Grid>
  );
};

export default DataGrid;
