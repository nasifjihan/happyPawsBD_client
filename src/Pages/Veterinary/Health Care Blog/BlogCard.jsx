import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const BlogCard = ({ title, excerpt, link, to, image }) => {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "none",
        overflow: "hidden",
        "&:hover": {
          boxShadow: "0px 12px 24px rgba(82,82,82,0.12)",
        },
      }}
    >
      {image ? (
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            width: "100%",
            height: 220,
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : null}
      <CardContent
        sx={{
          backgroundColor: "#f9f9f9",
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          height: "100%",
          p: 2.5,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "primary.headline",
            mb: 0,
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2" sx={{ flexGrow: 1, color: "text.secondary" }}>
          {excerpt}
        </Typography>
        <Box>
          {to ? (
            <Button
              variant="outlined"
              color="success"
              component={RouterLink}
              to={to}
            >
              Read
            </Button>
          ) : link ? (
            <Button
              variant="outlined"
              color="success"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Article
            </Button>
          ) : null}
        </Box>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
