import { useQuery } from "@tanstack/react-query";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";

import { getBlogPost } from "../../../API/api";

const BlogPostDetails = () => {
  const params = useParams();
  const id = params.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog-post", id],
    queryFn: () => getBlogPost(id),
    enabled: Boolean(id),
    staleTime: 300_000,
  });

  return (
    <Box className="myContainer" sx={{ maxWidth: "lg", py: 4 }}>
      <Stack spacing={2.5}>
        <Button
          component={RouterLink}
          to="/health_care_blog"
          variant="outlined"
          color="success"
          sx={{ alignSelf: "flex-start" }}
        >
          Back to Blog
        </Button>

        {isLoading ? (
          <Typography sx={{ color: "text.secondary" }}>Loading...</Typography>
        ) : isError ? (
          <Typography sx={{ color: "text.secondary" }}>Could not load blog post.</Typography>
        ) : data ? (
          <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 4 }}>
            <Stack spacing={1.5}>
              <Typography variant="overline" sx={{ color: "success.main", fontWeight: 700 }}>
                {data.category || "Health Care Blog"}
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 900, color: "primary.headline" }}>
                {data.title || "Untitled"}
              </Typography>
              {data.authorName ? (
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  By {data.authorName}
                </Typography>
              ) : null}
              {data.excerpt ? (
                <Typography variant="h6" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                  {data.excerpt}
                </Typography>
              ) : null}
              <Box>
                <Typography
                  variant="body1"
                  sx={{ whiteSpace: "pre-line", lineHeight: 1.8 }}
                >
                  {data.content}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        ) : null}
      </Stack>
    </Box>
  );
};

export default BlogPostDetails;

