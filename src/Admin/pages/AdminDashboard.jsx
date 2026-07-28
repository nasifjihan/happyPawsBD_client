import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { adminGetDashboardCounts } from "../lib/adminApi";

const dashboardQueryKey = ["admin", "dashboard"];

const quickActions = [
  {
    title: "Review Orders",
    description: "Update payment and order statuses from one place.",
    to: "/admin/requests/orders",
  },
  {
    title: "Manage Shop Items",
    description: "Add products and clean up catalog content.",
    to: "/admin/catalog/shop-items",
  },
  {
    title: "Review Adoption Requests",
    description: "Triage adoption applications and follow-ups faster.",
    to: "/admin/requests/adoptions",
  },
];

const buildQueue = [
  "Fill content-first public pages like success stories, remembrance, and share-your-story.",
  "Replace static service detail content with real CMS/admin-managed records over time.",
  "Prioritize empty menu items that already have routes but still show placeholder-level content.",
];

const StatCard = ({ label, value }) => (
  <Card sx={{ borderRadius: 4 }}>
    <CardContent>
      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h4" fontWeight={900}>
          {value}
        </Typography>
      </Stack>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: dashboardQueryKey,
    queryFn: adminGetDashboardCounts,
  });

  if (isLoading) {
    return (
      <Box textAlign="center" py={8}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h3" fontWeight={900} sx={{ mb: 3 }}>
        Overview
      </Typography>

      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Shop Items" value={data?.shopItems ?? 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Adoptable Animals" value={data?.adoptableAnimals ?? 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Orders" value={data?.orders ?? 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Volunteer Requests"
            value={data?.volunteerApplications ?? 0}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Adoption Requests"
            value={data?.adoptionApplications ?? 0}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Training Enrollments"
            value={data?.trainingEnrollments ?? 0}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Grooming Enrollments"
            value={data?.groomingEnrollments ?? 0}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Boarding Enrollments"
            value={data?.boardingEnrollments ?? 0}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Lost Pets Reports" value={data?.lostPets ?? 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Found Pets Reports" value={data?.foundPets ?? 0} />
        </Grid>
      </Grid>

      <Grid container spacing={2.5} sx={{ mt: 1 }}>
        <Grid item xs={12} lg={7}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h5" fontWeight={900} sx={{ mb: 2 }}>
                Quick Actions
              </Typography>

              <Grid container spacing={2}>
                {quickActions.map((action) => (
                  <Grid item xs={12} md={4} key={action.to}>
                    <Card
                      variant="outlined"
                      sx={{ height: "100%", borderRadius: 3 }}
                    >
                      <CardContent>
                        <Typography fontWeight={800} sx={{ mb: 1 }}>
                          {action.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {action.description}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ px: 2, pb: 2 }}>
                        <Button
                          component={RouterLink}
                          to={action.to}
                          size="small"
                          color="success"
                        >
                          Open
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h5" fontWeight={900} sx={{ mb: 2 }}>
                Build Queue
              </Typography>

              <Stack spacing={1.25}>
                {buildQueue.map((item) => (
                  <Typography key={item} variant="body2" color="text.secondary">
                    - {item}
                  </Typography>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
