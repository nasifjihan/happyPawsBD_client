import React, { useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import { useLostFoundOverviewQuery } from "../../../features/lost-found/hooks";
import LostFoundPreviewSection from "./LostFoundPreviewSection";
import LostFoundReportPanel from "./LostFoundReportPanel";

const LostFoundRedesign = () => {
  const { data, isLoading, isError, error } = useLostFoundOverviewQuery();
  const [activeTab, setActiveTab] = useState("found");
  const reportSectionRef = useRef(null);

  if (isLoading) {
    return (
      <Box py={20} sx={{ textAlign: "center" }}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  const lostPets = data?.lostPets || [];
  const foundPets = data?.foundPets || [];
  const lostPetsTotal = data?.lostPetsTotal || 0;
  const foundPetsTotal = data?.foundPetsTotal || 0;
  const errorMessage =
    error?.response?.data?.message ||
    "We could not load the latest lost and found listings right now.";
  const totalReports = lostPetsTotal + foundPetsTotal;

  const jumpToReport = (tab) => {
    setActiveTab(tab);
    reportSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Box
      className="myContainer"
      sx={{
        py: { xs: 3, md: 5 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4.5 },
          borderRadius: 6,
          border: "1px solid rgba(122, 178, 89, 0.14)",
          background:
            "linear-gradient(135deg, rgba(122,178,89,0.18) 0%, rgba(255,255,255,1) 50%, rgba(167,209,142,0.18) 100%)",
          boxShadow: "0 24px 48px rgba(15, 23, 42, 0.08)",
        }}
      >
        <Stack spacing={2}>
          <Chip
            icon={<PetsOutlinedIcon />}
            label="Community Reunite Hub"
            variant="outlined"
            sx={{
              alignSelf: "flex-start",
              borderRadius: 2,
              color: "#4d7337",
              borderColor: "rgba(122, 178, 89, 0.28)",
              backgroundColor: "rgba(255, 255, 255, 0.56)",
            }}
          />
          <Typography variant="h2" fontWeight={800} color="#333332">
            Lost & Found Pets
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 760 }}>
            Browse the latest lost and found reports first, then submit a clear
            report in the right format when you are ready.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25} sx={{ pt: 1 }}>
            <Chip
              label={`${lostPetsTotal} lost reports`}
              sx={{
                borderRadius: 2,
                backgroundColor: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(122, 178, 89, 0.16)",
              }}
            />
            <Chip
              label={`${foundPetsTotal} found reports`}
              sx={{
                borderRadius: 2,
                backgroundColor: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(122, 178, 89, 0.16)",
              }}
            />
            <Chip
              label={`${totalReports} total active listings`}
              sx={{
                borderRadius: 2,
                backgroundColor: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(122, 178, 89, 0.16)",
              }}
            />
          </Stack>
        </Stack>
      </Paper>

      {isError ? (
        <Alert severity="warning" sx={{ mt: 3, borderRadius: 3 }}>
          {errorMessage} You can still browse the page and submit a report.
        </Alert>
      ) : null}

      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 5,
              height: "100%",
              border: "1px solid rgba(122, 178, 89, 0.14)",
              boxShadow: "0 18px 38px rgba(15, 23, 42, 0.06)",
            }}
          >
            <Stack spacing={1.5}>
              <SearchOutlinedIcon sx={{ color: "#7AB259", fontSize: 30 }} />
              <Typography variant="h5" fontWeight={800} color="#333332">
                Found a pet?
              </Typography>
              <Typography color="text.secondary">
                Start by checking recent lost pet reports. If you do not find a
                match, create a found pet report with a photo and contact
                details.
              </Typography>
              <Button
                variant="outlined"
                color="success"
                sx={{ alignSelf: "flex-start", borderRadius: 3, textTransform: "none" }}
                onClick={() => jumpToReport("found")}
              >
                Open Found Pet Report
              </Button>
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 5,
              height: "100%",
              border: "1px solid rgba(122, 178, 89, 0.14)",
              boxShadow: "0 18px 38px rgba(15, 23, 42, 0.06)",
            }}
          >
            <Stack spacing={1.5}>
              <CampaignOutlinedIcon sx={{ color: "#7AB259", fontSize: 30 }} />
              <Typography variant="h5" fontWeight={800} color="#333332">
                Lost a pet?
              </Typography>
              <Typography color="text.secondary">
                Check recent found pet reports first. If your pet is not there,
                publish a lost pet report so others can help identify and
                contact you quickly.
              </Typography>
              <Button
                variant="outlined"
                color="success"
                sx={{ alignSelf: "flex-start", borderRadius: 3, textTransform: "none" }}
                onClick={() => jumpToReport("lost")}
              >
                Open Lost Pet Report
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Stack spacing={1.25} sx={{ mb: 3 }}>
          <Chip
            label="Browse Recent Reports"
            variant="outlined"
            sx={{
              alignSelf: "flex-start",
              borderRadius: 2,
              color: "#4d7337",
              borderColor: "rgba(122, 178, 89, 0.28)",
              backgroundColor: "rgba(122, 178, 89, 0.08)",
            }}
          />
          <Typography variant="h3" fontWeight={800} color="#333332">
            Start with the Latest Listings
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 760 }}>
            Separating browsing from reporting makes it easier to scan current
            listings first and submit the right kind of report afterward.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, xl: 6 }}>
            <LostFoundPreviewSection
              variant="lost"
              title="Recent Lost Pets"
              description="Review the newest lost pet reports and compare location, color, and contact details."
              listings={lostPets}
              actionTo="/lost_found/lost_pets"
            />
          </Grid>
          <Grid size={{ xs: 12, xl: 6 }}>
            <LostFoundPreviewSection
              variant="found"
              title="Recent Found Pets"
              description="Check whether any recently found pet matches what you have seen or what you are missing."
              listings={foundPets}
              actionTo="/lost_found/found_pets"
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 4.5 }}>
        <LostFoundReportPanel
          ref={reportSectionRef}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </Box>
    </Box>
  );
};

export default LostFoundRedesign;
