import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

import AdminStatusChip from "../components/AdminStatusChip";
import {
  adminGetDashboardCounts,
  adminGetNewRequestCounts,
  adminGetNewRequestsFeed,
  adminGetRecentRequests,
} from "../lib/adminApi";

const dashboardQueryKey = ["admin", "dashboard"];
const recentRequestsQueryKey = ["admin", "recent-requests"];
const newCountsQueryKey = ["admin", "new-counts"];
const newRequestsFeedQueryKey = ["admin", "new-requests-feed"];

const quickActions = [
  {
    title: "Review Orders",
    description: "Update payment and order statuses from one place.",
    to: "/admin/requests/orders",
  },
  {
    title: "Review Online Consultations",
    description: "Confirm appointments and follow up with clients quickly.",
    to: "/admin/requests/consultations/online",
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

const getCatalogChecklist = (counts) => {
  const tasks = [];
  const addTask = ({ title, description, to }) => {
    tasks.push({ title, description, to });
  };

  if ((counts?.shopItems ?? 0) === 0) {
    addTask({
      title: "Add Shop Items",
      description: "Your shop catalog is empty. Add items so customers can browse and buy.",
      to: "/admin/catalog/shop-items",
    });
  }

  if ((counts?.vetProviders ?? 0) === 0) {
    addTask({
      title: "Add Vet Directory Entries",
      description: "Vet Finder has no providers. Add clinics and specialists for the public search page.",
      to: "/admin/catalog/vets",
    });
  }

  if ((counts?.trainingPrograms ?? 0) === 0) {
    addTask({
      title: "Add Training Programs",
      description: "Training programs are missing. Add records to show real service details.",
      to: "/admin/catalog/programs?type=training",
    });
  }

  if ((counts?.groomingPrograms ?? 0) === 0) {
    addTask({
      title: "Add Grooming Programs",
      description: "Grooming programs are missing. Add records to populate the grooming pages.",
      to: "/admin/catalog/programs?type=grooming",
    });
  }

  if ((counts?.boardingPrograms ?? 0) === 0) {
    addTask({
      title: "Add Boarding Programs",
      description: "Boarding programs are missing. Add records to populate the boarding pages.",
      to: "/admin/catalog/programs?type=boarding",
    });
  }

  if ((counts?.adoptableAnimals ?? 0) === 0) {
    addTask({
      title: "Add Adoptable Animals",
      description: "Adoption listings are empty. Add animals so applications can start flowing.",
      to: "/admin/adoption/animals",
    });
  }

  return tasks;
};

const StatCard = ({ label, value, helper }) => (
  <Card sx={{ borderRadius: 4 }}>
    <CardContent>
      <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h4" fontWeight={900}>
          {value}
        </Typography>
        {helper ? (
          <Typography variant="body2" fontWeight={800} color="success.dark">
            {helper}
          </Typography>
        ) : null}
      </Stack>
    </CardContent>
  </Card>
);

const formatDateTime = (value) => {
  if (!value) {
    return "";
  }

  try {
    return new Date(value).toLocaleString("en-BD", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    return String(value);
  }
};

const RecentRow = ({ title, subtitle, status, to }) => (
  <Paper
    component={RouterLink}
    to={to}
    variant="outlined"
    sx={{
      p: 1.75,
      borderRadius: 3,
      textDecoration: "none",
      color: "inherit",
      display: "block",
      "&:hover": {
        borderColor: "success.main",
        backgroundColor: (theme) => alpha(theme.palette.success.main, 0.06),
      },
    }}
  >
    <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between" }}>
      <Box>
        <Typography fontWeight={900}>{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
      <Box display="flex" sx={{ alignItems: "center" }}>
        <AdminStatusChip status={status} />
      </Box>
    </Stack>
  </Paper>
);

const AdminDashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: dashboardQueryKey,
    queryFn: adminGetDashboardCounts,
  });
  const { data: newCounts } = useQuery({
    queryKey: newCountsQueryKey,
    queryFn: adminGetNewRequestCounts,
  });
  const { data: newRequestsFeed } = useQuery({
    queryKey: newRequestsFeedQueryKey,
    queryFn: adminGetNewRequestsFeed,
  });
  const { data: recentRequests } = useQuery({
    queryKey: recentRequestsQueryKey,
    queryFn: adminGetRecentRequests,
  });
  const catalogChecklist = useMemo(() => getCatalogChecklist(data), [data]);

  const programsTotal =
    (data?.trainingPrograms ?? 0) +
    (data?.groomingPrograms ?? 0) +
    (data?.boardingPrograms ?? 0);

  if (isLoading) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
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
          <StatCard label="Vet Providers" value={data?.vetProviders ?? 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Adoptable Animals" value={data?.adoptableAnimals ?? 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Programs" value={programsTotal} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Stories"
            value={data?.stories ?? 0}
            helper={
              (newCounts?.stories ?? 0) > 0 ? `New: ${newCounts.stories}` : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Blog Posts" value={data?.blogPosts ?? 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Rescue Alerts"
            value={data?.rescueAlerts ?? 0}
            helper={
              (newCounts?.rescueAlerts ?? 0) > 0
                ? `New: ${newCounts.rescueAlerts}`
                : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Orders"
            value={data?.orders ?? 0}
            helper={
              (newCounts?.orders ?? 0) > 0 ? `New: ${newCounts.orders}` : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Online Consultations"
            value={data?.onlineConsultations ?? 0}
            helper={
              (newCounts?.consultations ?? 0) > 0
                ? `New: ${newCounts.consultations}`
                : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Volunteer Requests"
            value={data?.volunteerApplications ?? 0}
            helper={
              (newCounts?.volunteers ?? 0) > 0
                ? `New: ${newCounts.volunteers}`
                : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Adoption Requests"
            value={data?.adoptionApplications ?? 0}
            helper={
              (newCounts?.adoptions ?? 0) > 0 ? `New: ${newCounts.adoptions}` : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Reviews"
            value={data?.reviews ?? 0}
            helper={
              (newCounts?.reviews ?? 0) > 0 ? `New: ${newCounts.reviews}` : ""
            }
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
          <StatCard
            label="Enrollments (New)"
            value={newCounts?.enrollments ?? 0}
            helper={
              (newCounts?.enrollments ?? 0) > 0
                ? "Needs follow-up"
                : "All caught up"
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Lost Pets Reports" value={data?.lostPets ?? 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Found Pets Reports" value={data?.foundPets ?? 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Lost & Found (New)"
            value={newCounts?.lostFound ?? 0}
            helper={
              (newCounts?.lostFound ?? 0) > 0 ? "Needs review" : "All caught up"
            }
          />
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
                Content Checklist
              </Typography>

              {isLoading ? (
                <Box display="flex" py={4} sx={{ justifyContent: "center" }}>
                  <CircularProgress size={28} />
                </Box>
              ) : catalogChecklist.length ? (
                <Stack spacing={1.25}>
                  {catalogChecklist.map((task) => (
                    <Paper
                      key={task.to}
                      component={RouterLink}
                      to={task.to}
                      variant="outlined"
                      sx={{
                        p: 1.5,
                        borderRadius: 3,
                        textDecoration: "none",
                        color: "inherit",
                        display: "block",
                        "&:hover": {
                          borderColor: "success.main",
                          backgroundColor: (theme) =>
                            alpha(theme.palette.success.main, 0.06),
                        },
                      }}
                    >
                      <Stack spacing={0.5}>
                        <Typography fontWeight={900}>{task.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {task.description}
                        </Typography>
                        <Box pt={0.5}>
                          <Button size="small" color="success">
                            Open
                          </Button>
                        </Box>
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  All core catalogs have content. Use Quick Actions to review new requests.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2.5} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                sx={{
                  mb: 2,
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", md: "center" },
                }}
              >
                <Box>
                  <Typography variant="h5" fontWeight={900}>
                    New Requests
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Items that still have a new/created status.
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1.25}>
                  <Button
                    component={RouterLink}
                    to="/admin/requests/orders"
                    color="success"
                    variant="outlined"
                    sx={{ borderRadius: 3, fontWeight: 800 }}
                  >
                    Orders
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/admin/requests/consultations/online"
                    color="success"
                    variant="outlined"
                    sx={{ borderRadius: 3, fontWeight: 800 }}
                  >
                    Online Consultations
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/admin/requests/consultations/in-person"
                    color="success"
                    variant="outlined"
                    sx={{ borderRadius: 3, fontWeight: 800 }}
                  >
                    In-Person
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/admin/requests/consultations/house-calls"
                    color="success"
                    variant="outlined"
                    sx={{ borderRadius: 3, fontWeight: 800 }}
                  >
                    House Calls
                  </Button>
                </Stack>
              </Stack>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={4}>
                  <Stack spacing={1.5}>
                    <Typography fontWeight={900}>Orders</Typography>
                    {(newRequestsFeed?.orders ?? []).slice(0, 3).map((order) => (
                      <RecentRow
                        key={order._id}
                        title={order.deliveryInfo?.name || "Order"}
                        subtitle={`৳${order.orderSummary?.total ?? 0} • ${formatDateTime(order.createdAt)}`}
                        status={order.orderStatus || "created"}
                        to={`/admin/requests/orders/${order._id}`}
                      />
                    ))}
                    {(newRequestsFeed?.orders ?? []).length ? null : (
                      <Typography variant="body2" color="text.secondary">
                        No new orders.
                      </Typography>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <Stack spacing={1.5}>
                    <Typography fontWeight={900}>Online Consultations</Typography>
                    {(newRequestsFeed?.onlineConsultations ?? []).slice(0, 3).map((consultation) => (
                      <RecentRow
                        key={consultation._id}
                        title={consultation.fullName || "Consultation"}
                        subtitle={`${consultation.petType || "Pet"} • ${formatDateTime(consultation.createdAt)}`}
                        status={consultation.status || "new"}
                        to={`/admin/requests/consultations/online/${consultation._id}`}
                      />
                    ))}
                    {(newRequestsFeed?.onlineConsultations ?? []).length ? null : (
                      <Typography variant="body2" color="text.secondary">
                        No new online consultations.
                      </Typography>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <Stack spacing={1.5}>
                    <Typography fontWeight={900}>In-Person Consultations</Typography>
                    {(newRequestsFeed?.inPersonConsultations ?? []).slice(0, 3).map((consultation) => (
                      <RecentRow
                        key={consultation._id}
                        title={consultation.fullName || "In-person Consultation"}
                        subtitle={`${consultation.city || "City"} • ${consultation.petType || "Pet"} • ${formatDateTime(consultation.createdAt)}`}
                        status={consultation.status || "new"}
                        to={`/admin/requests/consultations/in-person/${consultation._id}`}
                      />
                    ))}
                    {(newRequestsFeed?.inPersonConsultations ?? []).length ? null : (
                      <Typography variant="body2" color="text.secondary">
                        No new in-person consultation requests.
                      </Typography>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <Stack spacing={1.5}>
                    <Typography fontWeight={900}>House Calls</Typography>
                    {(newRequestsFeed?.houseCalls ?? []).slice(0, 3).map((item) => (
                      <RecentRow
                        key={item._id}
                        title={item.fullName || "House Call"}
                        subtitle={`${item.urgency ? `Urgency: ${item.urgency}` : item.city || "City"} • ${item.petType || "Pet"} • ${formatDateTime(item.createdAt)}`}
                        status={item.status || "new"}
                        to={`/admin/requests/consultations/house-calls/${item._id}`}
                      />
                    ))}
                    {(newRequestsFeed?.houseCalls ?? []).length ? null : (
                      <Typography variant="body2" color="text.secondary">
                        No new house call requests.
                      </Typography>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <Stack spacing={1.5}>
                    <Typography fontWeight={900}>Volunteer Requests</Typography>
                    {(newRequestsFeed?.volunteers ?? []).slice(0, 3).map((volunteer) => (
                      <RecentRow
                        key={volunteer._id}
                        title={volunteer.fullName || "Volunteer"}
                        subtitle={`${volunteer.city || "City"} • ${formatDateTime(volunteer.createdAt)}`}
                        status={volunteer.status || "new"}
                        to={`/admin/requests/volunteers/${volunteer._id}`}
                      />
                    ))}
                    {(newRequestsFeed?.volunteers ?? []).length ? null : (
                      <Typography variant="body2" color="text.secondary">
                        No new volunteer requests.
                      </Typography>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <Stack spacing={1.5}>
                    <Typography fontWeight={900}>Adoption Requests</Typography>
                    {(newRequestsFeed?.adoptions ?? []).slice(0, 3).map((adoption) => (
                      <RecentRow
                        key={adoption._id}
                        title={adoption.fullName || "Adoption Request"}
                        subtitle={`${adoption.animalCode || adoption.petName || "Pet"} • ${formatDateTime(adoption.createdAt)}`}
                        status={adoption.status || "new"}
                        to={`/admin/requests/adoptions/${adoption._id}`}
                      />
                    ))}
                    {(newRequestsFeed?.adoptions ?? []).length ? null : (
                      <Typography variant="body2" color="text.secondary">
                        No new adoption requests.
                      </Typography>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <Stack spacing={1.5}>
                    <Typography fontWeight={900}>Reviews</Typography>
                    {(newRequestsFeed?.reviews ?? []).slice(0, 3).map((review) => (
                      <RecentRow
                        key={review._id}
                        title={review.title || "Review"}
                        subtitle={`${review.fullName || "Community member"} • ${formatDateTime(review.createdAt)}`}
                        status={review.status || "new"}
                        to={`/admin/requests/reviews/${review._id}`}
                      />
                    ))}
                    {(newRequestsFeed?.reviews ?? []).length ? null : (
                      <Typography variant="body2" color="text.secondary">
                        No new reviews.
                      </Typography>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <Stack spacing={1.5}>
                    <Typography fontWeight={900}>Stories</Typography>
                    {(newRequestsFeed?.stories ?? []).slice(0, 3).map((story) => (
                      <RecentRow
                        key={story._id || story.id}
                        title={story.title || "Story"}
                        subtitle={`${story.authorName || "Community"} • ${formatDateTime(story.createdAt)}`}
                        status={story.status || "new"}
                        to={`/admin/content/stories?category=${story.category || "community"}&status=new`}
                      />
                    ))}
                    {(newRequestsFeed?.stories ?? []).length ? null : (
                      <Typography variant="body2" color="text.secondary">
                        No new story submissions.
                      </Typography>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <Stack spacing={1.5}>
                    <Typography fontWeight={900}>Rescue Alerts</Typography>
                    {(newRequestsFeed?.rescueAlerts ?? []).slice(0, 3).map((item) => (
                      <RecentRow
                        key={item._id}
                        title={item.reporterName || "Rescue Alert"}
                        subtitle={`${item.animalType || "Animal"} • ${formatDateTime(item.createdAt)}`}
                        status={item.status || "new"}
                        to={`/admin/requests/rescue-alerts/${item._id}`}
                      />
                    ))}
                    {(newRequestsFeed?.rescueAlerts ?? []).length ? null : (
                      <Typography variant="body2" color="text.secondary">
                        No new rescue alerts.
                      </Typography>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <Stack spacing={1.5}>
                    <Typography fontWeight={900}>Enrollments</Typography>
                    {(newRequestsFeed?.enrollments?.training ?? []).slice(0, 1).map((item) => (
                      <RecentRow
                        key={item._id}
                        title={item.name || "Training Enrollment"}
                        subtitle={`${item.contactPhone || ""} • ${formatDateTime(item.createdAt)}`}
                        status={item.status || "new"}
                        to="/admin/requests/enrollments?type=training"
                      />
                    ))}
                    {(newRequestsFeed?.enrollments?.grooming ?? []).slice(0, 1).map((item) => (
                      <RecentRow
                        key={item._id}
                        title={item.name || "Grooming Enrollment"}
                        subtitle={`${item.contactPhone || ""} • ${formatDateTime(item.createdAt)}`}
                        status={item.status || "new"}
                        to="/admin/requests/enrollments?type=grooming"
                      />
                    ))}
                    {(newRequestsFeed?.enrollments?.boarding ?? []).slice(0, 1).map((item) => (
                      <RecentRow
                        key={item._id}
                        title={item.name || "Boarding Enrollment"}
                        subtitle={`${item.contactPhone || ""} • ${formatDateTime(item.createdAt)}`}
                        status={item.status || "new"}
                        to="/admin/requests/enrollments?type=boarding"
                      />
                    ))}
                    {(newCounts?.enrollments ?? 0) > 0 ? null : (
                      <Typography variant="body2" color="text.secondary">
                        No new enrollments.
                      </Typography>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <Stack spacing={1.5}>
                    <Typography fontWeight={900}>Lost & Found</Typography>
                    {(newRequestsFeed?.lostFound?.lostPets ?? []).slice(0, 1).map((item) => (
                      <RecentRow
                        key={item._id}
                        title={item.petName || "Lost Pet"}
                        subtitle={`${item.contactPhone || ""} • ${formatDateTime(item.createdAt)}`}
                        status={item.status || "new"}
                        to="/admin/requests/lost-found?type=lost-pets"
                      />
                    ))}
                    {(newRequestsFeed?.lostFound?.foundPets ?? []).slice(0, 1).map((item) => (
                      <RecentRow
                        key={item._id}
                        title={item.breed || item.animalType || "Found Pet"}
                        subtitle={`${item.contactPhone || ""} • ${formatDateTime(item.createdAt)}`}
                        status={item.status || "new"}
                        to="/admin/requests/lost-found?type=found-pets"
                      />
                    ))}
                    {(newCounts?.lostFound ?? 0) > 0 ? null : (
                      <Typography variant="body2" color="text.secondary">
                        No new reports.
                      </Typography>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2.5} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                sx={{
                  mb: 2,
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", md: "center" },
                }}
              >
                <Box>
                  <Typography variant="h5" fontWeight={900}>
                    Recent Requests
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Latest items across orders, requests, and stories.
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1.25}>
                  <Button
                    component={RouterLink}
                    to="/admin/requests/orders"
                    color="success"
                    variant="outlined"
                    sx={{ borderRadius: 3, fontWeight: 800 }}
                  >
                    Orders
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/admin/requests/consultations/online"
                    color="success"
                    variant="outlined"
                    sx={{ borderRadius: 3, fontWeight: 800 }}
                  >
                    Consultations
                  </Button>
                </Stack>
              </Stack>

              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Stack spacing={1.5}>
                    <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
                      <Avatar sx={{ bgcolor: "success.main", width: 34, height: 34 }}>
                        <Typography fontWeight={900} color="common.white">
                          O
                        </Typography>
                      </Avatar>
                      <Box>
                        <Typography fontWeight={900}>Orders</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Latest checkout activity
                        </Typography>
                      </Box>
                    </Stack>
                    {(recentRequests?.orders ?? []).slice(0, 3).map((order) => (
                      <RecentRow
                        key={order._id}
                        title={order.deliveryInfo?.name || "Order"}
                        subtitle={`৳${order.orderSummary?.total ?? 0} • ${formatDateTime(order.createdAt)}`}
                        status={order.orderStatus || "created"}
                        to={`/admin/requests/orders/${order._id}`}
                      />
                    ))}
                    {(recentRequests?.orders ?? []).length ? null : (
                      <Typography variant="body2" color="text.secondary">
                        No recent orders yet.
                      </Typography>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12} md={3}>
                  <Stack spacing={1.5}>
                    <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
                      <Avatar sx={{ bgcolor: "success.main", width: 34, height: 34 }}>
                        <Typography fontWeight={900} color="common.white">
                          C
                        </Typography>
                      </Avatar>
                      <Box>
                        <Typography fontWeight={900}>Consultations</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Latest appointment requests
                        </Typography>
                      </Box>
                    </Stack>
                    {(recentRequests?.onlineConsultations ?? []).slice(0, 1).map((consultation) => (
                      <RecentRow
                        key={consultation._id}
                        title={consultation.fullName || "Online Consultation"}
                        subtitle={`Online • ${consultation.petType || "Pet"} • ${formatDateTime(consultation.createdAt)}`}
                        status={consultation.status || "new"}
                        to={`/admin/requests/consultations/online/${consultation._id}`}
                      />
                    ))}
                    {(recentRequests?.inPersonConsultations ?? []).slice(0, 1).map((consultation) => (
                      <RecentRow
                        key={consultation._id}
                        title={consultation.fullName || "In-person Consultation"}
                        subtitle={`In-person • ${consultation.city || "City"} • ${formatDateTime(consultation.createdAt)}`}
                        status={consultation.status || "new"}
                        to={`/admin/requests/consultations/in-person/${consultation._id}`}
                      />
                    ))}
                    {(recentRequests?.houseCalls ?? []).slice(0, 1).map((item) => (
                      <RecentRow
                        key={item._id}
                        title={item.fullName || "House Call"}
                        subtitle={`House call • ${item.urgency ? `Urgency: ${item.urgency}` : item.city || "City"} • ${formatDateTime(item.createdAt)}`}
                        status={item.status || "new"}
                        to={`/admin/requests/consultations/house-calls/${item._id}`}
                      />
                    ))}
                    {(recentRequests?.onlineConsultations ?? []).length ||
                    (recentRequests?.inPersonConsultations ?? []).length ||
                    (recentRequests?.houseCalls ?? []).length ? null : (
                      <Typography variant="body2" color="text.secondary">
                        No consultation requests yet.
                      </Typography>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12} md={3}>
                  <Stack spacing={1.5}>
                    <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
                      <Avatar sx={{ bgcolor: "success.main", width: 34, height: 34 }}>
                        <Typography fontWeight={900} color="common.white">
                          S
                        </Typography>
                      </Avatar>
                      <Box>
                        <Typography fontWeight={900}>Stories</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Latest submissions and updates
                        </Typography>
                      </Box>
                    </Stack>
                    {(recentRequests?.stories ?? []).slice(0, 3).map((story) => (
                      <RecentRow
                        key={story._id || story.id}
                        title={story.title || "Story"}
                        subtitle={`${story.authorName || "Community"} • ${formatDateTime(story.createdAt)}`}
                        status={story.status || "draft"}
                        to={`/admin/content/stories?category=${story.category || "community"}`}
                      />
                    ))}
                    {(recentRequests?.stories ?? []).length ? null : (
                      <Typography variant="body2" color="text.secondary">
                        No stories yet.
                      </Typography>
                    )}
                  </Stack>
                </Grid>

                <Grid item xs={12} md={3}>
                  <Stack spacing={1.5}>
                    <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
                      <Avatar sx={{ bgcolor: "success.main", width: 34, height: 34 }}>
                        <Typography fontWeight={900} color="common.white">
                          R
                        </Typography>
                      </Avatar>
                      <Box>
                        <Typography fontWeight={900}>Rescue Alerts</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Latest rescue reports
                        </Typography>
                      </Box>
                    </Stack>
                    {(recentRequests?.rescueAlerts ?? []).slice(0, 3).map((item) => (
                      <RecentRow
                        key={item._id}
                        title={item.reporterName || "Rescue Alert"}
                        subtitle={`${item.animalType || "Animal"} • ${formatDateTime(item.createdAt)}`}
                        status={item.status || "new"}
                        to={`/admin/requests/rescue-alerts/${item._id}`}
                      />
                    ))}
                    {(recentRequests?.rescueAlerts ?? []).length ? null : (
                      <Typography variant="body2" color="text.secondary">
                        No rescue alerts yet.
                      </Typography>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
