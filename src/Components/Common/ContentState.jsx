import { Box, Button, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const ContentState = ({
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
  severity = "neutral",
}) => {
  const colorMap = {
    neutral: "text.primary",
    info: "info.main",
    warning: "warning.main",
  };

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        px: 3,
        py: 5,
        textAlign: "center",
        backgroundColor: "#fafafa",
      }}
    >
      <Stack spacing={1.5} sx={{ alignItems: "center" }}>
        <Typography variant="h5" fontWeight={800} color={colorMap[severity]}>
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 560 }}
        >
          {description}
        </Typography>
        {actionLabel ? (
          <Button
            variant="contained"
            color="success"
            component={actionTo ? RouterLink : "button"}
            to={actionTo}
            onClick={onAction}
            sx={{ mt: 1 }}
          >
            {actionLabel}
          </Button>
        ) : null}
      </Stack>
    </Box>
  );
};

export default ContentState;
