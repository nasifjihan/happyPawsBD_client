import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

const BlogCard = ({ title, excerpt, link, image }) => {
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
      <CardMedia
        component="img"
        height="220"
        image={image}
        alt={title}
        sx={{
          objectFit: "cover",
        }}
      />
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
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "primary.headline",
            mb: 0,
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
          {excerpt}
        </Typography>
        <Box>
          <Button
            variant="outlined"
            color="success"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Article
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
