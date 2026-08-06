import React from "react";
import {
  Box,
  Chip,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import FoundForm from "./FoundForm";
import LostForm from "./LostForm";

const reportTabs = [
  {
    value: "found",
    label: "Report a Found Pet",
    description:
      "Use this when you have found a pet and want to help reconnect it with its family.",
    icon: <SearchOutlinedIcon fontSize="small" />,
  },
  {
    value: "lost",
    label: "Report a Lost Pet",
    description:
      "Use this when your pet is missing and you want others to be able to identify it quickly.",
    icon: <PetsOutlinedIcon fontSize="small" />,
  },
];

const LostFoundReportPanel = React.forwardRef(
  ({ activeTab, onChange }, ref) => {
    const currentTab =
      reportTabs.find((tab) => tab.value === activeTab) || reportTabs[0];

    return (
      <Paper
        ref={ref}
        elevation={0}
        sx={{
          borderRadius: 6,
          overflow: "hidden",
          border: "1px solid rgba(122, 178, 89, 0.16)",
          boxShadow: "0 20px 44px rgba(15, 23, 42, 0.08)",
          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            px: { xs: 2.5, md: 3.5 },
            py: { xs: 2.5, md: 3 },
            background:
              "linear-gradient(135deg, rgba(122,178,89,0.16) 0%, rgba(255,255,255,1) 100%)",
            borderBottom: "1px solid rgba(122, 178, 89, 0.12)",
          }}
        >
          <Stack spacing={1.25}>
            <Chip
              icon={<CampaignOutlinedIcon />}
              label="Report a Pet"
              variant="outlined"
              sx={{
                alignSelf: "flex-start",
                borderRadius: 2,
                color: "#4d7337",
                borderColor: "rgba(122, 178, 89, 0.28)",
                backgroundColor: "rgba(255, 255, 255, 0.56)",
              }}
            />
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#333332" }}>
              Create a Clear, Useful Report
            </Typography>
            <Typography sx={{ maxWidth: 760, color: "text.secondary" }}>
              Pick the report type that matches your situation, then fill out
              the form with accurate details and a recent photo.
            </Typography>
          </Stack>
        </Box>

        <Box sx={{ p: { xs: 2.25, md: 3.5 } }}>
          <Tabs
            value={activeTab}
            onChange={(_, value) => onChange(value)}
            variant="scrollable"
            allowScrollButtonsMobile
            sx={{
              mb: 3,
              "& .MuiTabs-indicator": {
                height: 3,
                borderRadius: 999,
                backgroundColor: "#7AB259",
              },
            }}
          >
            {reportTabs.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                iconPosition="start"
                label={tab.label}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  minHeight: 56,
                  alignItems: "flex-start",
                }}
              />
            ))}
          </Tabs>

          <Box
            sx={{
              mb: 3,
              p: 2,
              borderRadius: 4,
              backgroundColor: "rgba(122, 178, 89, 0.05)",
              border: "1px solid rgba(122, 178, 89, 0.12)",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#333332" }}>
              {currentTab.label}
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5, color: "text.secondary" }}>
              {currentTab.description}
            </Typography>
          </Box>

          {activeTab === "found" ? (
            <FoundForm hideHeading />
          ) : (
            <LostForm hideHeading />
          )}
        </Box>
      </Paper>
    );
  }
);

LostFoundReportPanel.displayName = "LostFoundReportPanel";

export default LostFoundReportPanel;
