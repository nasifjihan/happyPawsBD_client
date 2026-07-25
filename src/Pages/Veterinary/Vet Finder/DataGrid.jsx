import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import CloseIcon from "@mui/icons-material/Close";

const placeholderImage = "https://i.ibb.co/KwkX3N7/4809708.jpg";

const DataGrid = ({ data }) => {
  const [selectedVet, setSelectedVet] = useState(null);

  const handleVetClick = (item) => {
    setSelectedVet(item);
  };

  const handleClose = () => {
    setSelectedVet(null);
  };

  return (
    <>
      <Grid container spacing={3}>
        {data.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                position: "relative",
                height: "100%",
                backgroundColor: "#FBFBFB",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                "&:hover": {
                  boxShadow: "0px 12px 24px rgba(82,82,82,0.12)",
                  cursor: "pointer",
                },
              }}
              onClick={() => handleVetClick(item)}
            >
              <CardMedia
                component="img"
                height="180"
                image={item.image || placeholderImage}
                alt={item.title}
              />

              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  {item.title}
                </Typography>

                {item.position ? (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {item.position}
                  </Typography>
                ) : null}

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {item.location || "Location details unavailable"}
                </Typography>

                <Typography variant="body2">
                  <strong>Contact:</strong>{" "}
                  {Array.isArray(item.contact) ? item.contact.join(", ") : item.contact || "Not available"}
                </Typography>
              </CardContent>

              <CardActions sx={{ px: 2, pb: 2, pt: 0, gap: 1 }}>
                <Button variant="outlined" color="success" fullWidth>
                  View Details
                </Button>
                {item.map_link ? (
                  <Button
                    component="a"
                    href={item.map_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="error"
                    startIcon={<LocationOnIcon />}
                    onClick={(event) => event.stopPropagation()}
                  >
                    Map
                  </Button>
                ) : null}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedVet ? (
        <Dialog open onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle sx={{ pr: 6 }}>
            {selectedVet.title}
            <IconButton
              aria-label="Close vet details"
              onClick={handleClose}
              sx={{ position: "absolute", top: 12, right: 12 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2.5}>
              <CardMedia
                component="img"
                image={selectedVet.image || placeholderImage}
                alt={selectedVet.title}
                sx={{ borderRadius: 2 }}
              />

              {selectedVet.position ? (
                <Typography variant="body1" color="text.secondary">
                  {selectedVet.position}
                </Typography>
              ) : null}

              <List disablePadding>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary="Location"
                    secondary={selectedVet.location || "Not available"}
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary="Contact"
                    secondary={
                      Array.isArray(selectedVet.contact)
                        ? selectedVet.contact.join(", ")
                        : selectedVet.contact || "Not available"
                    }
                  />
                </ListItem>
                {selectedVet.email ? (
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText primary="Email" secondary={selectedVet.email} />
                  </ListItem>
                ) : null}
                {selectedVet.hours ? (
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText primary="Hours" secondary={selectedVet.hours} />
                  </ListItem>
                ) : null}
                {selectedVet.services ? (
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText
                      primary="Services"
                      secondary={
                        Array.isArray(selectedVet.services)
                          ? selectedVet.services.join(", ")
                          : selectedVet.services
                      }
                    />
                  </ListItem>
                ) : null}
              </List>

              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                {selectedVet.website ? (
                  <Button
                    variant="contained"
                    color="info"
                    href={selectedVet.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<LanguageIcon />}
                  >
                    Visit Website
                  </Button>
                ) : null}
                {selectedVet.map_link ? (
                  <Button
                    variant="outlined"
                    color="error"
                    href={selectedVet.map_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<LocationOnIcon />}
                  >
                    View on Map
                  </Button>
                ) : null}
              </Box>
            </Stack>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
};

export default DataGrid;
