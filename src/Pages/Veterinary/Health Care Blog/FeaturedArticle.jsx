import React from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";
import { sanitizeImageUrl } from "../../../lib/media";

const FeaturedArticle = ({ post }) => {
  if (!post) {
    return null;
  }

  const coverImageUrl = sanitizeImageUrl(post.coverImageUrl);
  const title = post.title || "Featured Article";
  const excerpt = post.excerpt || "";
  const actionTo = post.id ? `/health_care_blog/posts/${post.id}` : null;
  const actionHref = post.externalUrl ? sanitizeImageUrl(post.externalUrl) : null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        p: { xs: 3, md: 4 },
      }}
    >
      <Grid container spacing={3}>
        {coverImageUrl ? (
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={coverImageUrl}
              alt={post.coverImageAlt || title}
              sx={{
                width: "100%",
                borderRadius: 4,
              }}
            />
          </Grid>
        ) : null}
        <Grid item xs={12} md={coverImageUrl ? 6 : 12}>
          <Stack spacing={2}>
            <Typography
              variant="overline"
              color="success.main"
              sx={{ fontWeight: 700, letterSpacing: 1 }}
            >
              Featured Article
            </Typography>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 800,
                color: "primary.headline",
                mb: 0,
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", lineHeight: 1.7 }}
            >
              {excerpt}
            </Typography>
            <Box>
              {actionHref ? (
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  href={actionHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ px: 4, fontWeight: 700 }}
                >
                  View Article
                </Button>
              ) : actionTo ? (
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  component={RouterLink}
                  to={actionTo}
                  sx={{ px: 4, fontWeight: 700 }}
                >
                  Read
                </Button>
              ) : null}
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeaturedArticle;
