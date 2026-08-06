import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import CloseIcon from "@mui/icons-material/Close";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";

import fallbackVetImage from "../../../images/vat.png";
import { sanitizeImageUrl } from "../../../lib/media";

const getContactText = (contact) =>
  Array.isArray(contact) ? contact.join(", ") : contact || "Not available";

const getPhoneNumber = (contact) => {
  const text = Array.isArray(contact) ? contact.join(" ") : contact || "";
  const match = text.match(/(\+?\d[\d\s-]{7,}\d)/);
  if (!match) return null;
  return match[1].replace(/[^\d+]/g, "");
};

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
          <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            {(() => {
              const phoneNumber = getPhoneNumber(item.contact);

              return (
            <Card
              sx={{
                position: "relative",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                background: "linear-gradient(180deg, #ffffff 0%, #f7fbf8 100%)",
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0px 10px 24px rgba(15, 23, 42, 0.06)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0px 18px 36px rgba(15, 23, 42, 0.12)",
                  cursor: "pointer",
                },
              }}
              onClick={() => handleVetClick(item)}
            >
              <CardMedia
                component="img"
                image={sanitizeImageUrl(item.image) || fallbackVetImage}
                alt={item.title}
                sx={{ height: 180 }}
              />

              <CardContent
                sx={{
                  p: 1.5,
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <Stack spacing={1} sx={{ height: "100%" }}>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, mb: 1, lineHeight: 1.3 }}
                    >
                      {item.title}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={1}
                      useFlexGap
                      sx={{ flexWrap: "wrap" }}
                    >
                      {item.position ? (
                        <Chip
                          label={item.position}
                          size="small"
                          sx={{
                            fontWeight: 500,
                            color: "#1b5e20",
                            backgroundColor: "rgba(46, 125, 50, 0.12)",
                          }}
                        />
                      ) : null}
                      {/* {item.services ? (
                        <Chip
                          icon={<MedicalServicesOutlinedIcon />}
                          label={
                            Array.isArray(item.services)
                              ? `${item.services.length} services`
                              : "Services available"
                          }
                          size="small"
                          variant="outlined"
                          sx={{
                            px: 1,
                            fontWeight: 500,
                            color: "success.dark",
                            backgroundColor: "rgba(46, 125, 50, 0.12)",
                          }}
                        />
                      ) : null} */}
                    </Stack>
                  </Box>

                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                      <Avatar
                        sx={{
                          width: 24,
                          height: 24,
                          bgcolor: "rgba(211, 47, 47, 0.08)",
                          color: "error.main",
                        }}
                      >
                        <LocationOnIcon fontSize="small" />
                      </Avatar>

                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                          Location
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.primary",
                            fontWeight: 500,
                            display: "-webkit-box",
                            fontSize: 12,
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {item.location || "Location details unavailable"}
                        </Typography>
                      </Box>
                    </Stack>

                    <Box
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor: "rgba(46, 125, 50, 0.06)",
                        border: "1px solid rgba(46, 125, 50, 0.12)",
                      }}
                    >
                      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                        <PhoneOutlinedIcon
                          sx={{ fontSize: 20, color: "success.dark" }}
                        />
                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              color: "text.primary",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {getContactText(item.contact)}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Stack>
                </Stack>
              </CardContent>

              <CardActions
                sx={{ px: 2.5, pb: 2.5, pt: 0 }}    
              >
                <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    sx={{
                      fontWeight: 700,
                      borderRadius: 2.5,
                      textTransform: "none",
                      boxShadow: "none",
                    }}
                  >
                    View Details
                  </Button>
                  {phoneNumber ? (
                    <IconButton
                      component="a"
                      href={`tel:${phoneNumber}`}
                      aria-label={`Call ${item.title}`}
                      color="success"
                      onClick={(event) => event.stopPropagation()}
                      sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 2.5,
                      }}
                    >
                      <PhoneOutlinedIcon />
                    </IconButton>
                  ) : null}
                  {item.map_link ? (
                    <IconButton
                      component="a"
                      href={item.map_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open map for ${item.title}`}
                      color="error"
                      onClick={(event) => event.stopPropagation()}
                      sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 2.5,
                      }}
                    >
                      <LocationOnIcon />
                    </IconButton>
                  ) : null}
                </Stack>
              </CardActions>
            </Card>
              );
            })()}
          </Grid>
        ))}
      </Grid>

      {selectedVet ? (
        (() => {
          const phoneNumber = getPhoneNumber(selectedVet.contact);

          return (
        <Dialog open onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>
            {selectedVet.title}
            <IconButton
              aria-label="Close vet details"
              onClick={handleClose}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <Stack>
              <CardMedia
                component="img"
                image={sanitizeImageUrl(selectedVet.image) || fallbackVetImage}
                alt={selectedVet.title}
                sx={{ borderRadius: 2 }}
              />

              {selectedVet.position ? (
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  {selectedVet.position}
                </Typography>
              ) : null}

              <Divider />

              <List disablePadding sx={{ px: 0 }}>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText
                    primary="Location"
                    secondary={selectedVet.location || "Not available"}
                  />
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemText
                    primary="Contact"
                    secondary={getContactText(selectedVet.contact)}
                  />
                </ListItem>
                {selectedVet.email ? (
                  <ListItem sx={{ py: 0 }}>
                    <EmailOutlinedIcon
                      sx={{ mr: 1.5, color: "text.secondary" }}
                    />
                    <ListItemText
                      primary="Email"
                      secondary={selectedVet.email}
                    />
                  </ListItem>
                ) : null}
                {selectedVet.hours ? (
                  <ListItem sx={{ py: 0 }}>
                    <AccessTimeOutlinedIcon
                      sx={{ mr: 1.5, color: "text.secondary" }}
                    />
                    <ListItemText
                      primary="Hours"
                      secondary={selectedVet.hours}
                    />
                  </ListItem>
                ) : null}
                {selectedVet.services ? (
                  <ListItem sx={{ py: 0 }}>
                    <MedicalServicesOutlinedIcon
                      sx={{ mr: 1.5, color: "text.secondary" }}
                    />
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
                {phoneNumber ? (
                  <Button
                    variant="contained"
                    color="success"
                    href={`tel:${phoneNumber}`}
                    startIcon={<PhoneOutlinedIcon />}
                  >
                    Call
                  </Button>
                ) : null}
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
          );
        })()
      ) : null}
    </>
  );
};

export default DataGrid;
