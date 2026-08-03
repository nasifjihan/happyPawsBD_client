import React from "react";
import { Typography, Button, Box, Paper, Stack, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import FeaturedArticle from "./FeaturedArticle";
import HealthTips from "./HealthTips";
import Testimonials from "./Testimonials";
import Newsletter from "./Newsletter";
import BlogCard from "./BlogCard";
import { getBlogPosts } from "../../../API/api";
import { sanitizeImageUrl } from "../../../lib/media";

const Health_Care_Blog = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog-posts", { page: 1, limit: 6 }],
    queryFn: () => getBlogPosts({ page: 1, limit: 6 }),
    staleTime: 300_000,
  });

  const posts = data?.items ?? [];
  const featuredPost = posts.find((post) => post.featured) || posts[0] || null;
  const recentPosts = posts
    .filter((post) => (featuredPost ? post.id !== featuredPost.id : true))
    .slice(0, 3);

  return (
    <Box maxWidth="lg" className="myContainer">
      {/* Hero Section */}
      <Box
        py={8}
        sx={{
          textAlign: "center",
          backgroundColor: "rgba(122, 178, 89, 0.15)",
          borderRadius: 4,
          color: "text.primary",
          border: "1px solid",
          borderColor: "divider",
          mb: 6,
        }}
      >
        <Typography
          variant="overline"
          color="success.main"
          sx={{ fontWeight: 700, letterSpacing: 1 }}
        >
          Health Care Blog
        </Typography>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 800 }}>
          Caring for Your Pets <br /> One Step at a Time
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ mb: 4, color: "text.secondary" }}>
          Get expert advice, tips, and tricks to keep your furry friends healthy
          and happy.
        </Typography>
        <Button
          variant="outlined"
          color="success"
          size="large"
          href="#recent-blog-posts"
          sx={{ fontWeight: 700 }}
        >
          Browse Articles
        </Button>
      </Box>

      {/* Recent Blog Posts */}
      <Box py={5}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 800, color: "primary.headline", mb: 4 }}
        >
          Recent Blog Posts
        </Typography>
        <Box id="recent-blog-posts" />
        {isLoading ? (
          <Typography color="text.secondary">Loading...</Typography>
        ) : isError ? (
          <Typography color="text.secondary">
            Could not load blog posts right now.
          </Typography>
        ) : recentPosts.length ? (
          <Grid container spacing={3}>
            {recentPosts.map((post) => (
              <Grid key={post._id || post.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <BlogCard
                  title={post.title}
                  excerpt={post.excerpt}
                  to={`/health_care_blog/posts/${post.id}`}
                  link={post.externalUrl}
                  image={sanitizeImageUrl(post.coverImageUrl)}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography color="text.secondary">
            No published blog posts yet.
          </Typography>
        )}
      </Box>

      {/* Featured Article */}
      <Box pb={6}>
        <FeaturedArticle post={featuredPost} />
      </Box>

      {/* Health Tips */}
      <Paper
        variant="outlined"
        sx={{
          p: 4,
          borderRadius: 4,
          mb: 6,
          backgroundColor: "#f9f9f9",
        }}
      >
        <HealthTips />
      </Paper>

      {/* Testimonials */}
      <Paper
        variant="outlined"
        sx={{
          py: 6,
          borderRadius: 4,
          mb: 6,
          p: 5,
          backgroundColor: "#fffdf5",
        }}
      >
        <Testimonials />
      </Paper>

      {/* Newsletter */}
      <Paper
        variant="outlined"
        sx={{ p: 6, borderRadius: 4, backgroundColor: "#faf7ff" }}
      >
        <Newsletter />
      </Paper>
    </Box>
  );
};

export default Health_Care_Blog;
