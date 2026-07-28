import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { adminGetDashboardCounts } from "../lib/adminApi";

const dashboardQueryKey = ["admin", "dashboard"];

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
    </Box>
  );
};

export default AdminDashboard;

