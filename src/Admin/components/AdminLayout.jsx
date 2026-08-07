import {
  AppBar,
  Box,
  Button,
  Chip,
  Collapse,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import VideoChatOutlinedIcon from "@mui/icons-material/VideoChatOutlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { useAdminAuth } from "../context/AdminAuthContext";
import { adminGetNewRequestCounts } from "../lib/adminApi";
import { useColorMode } from "../../context/ColorModeContext";

const drawerWidth = 280;

const navGroups = [
  {
    key: "main",
    items: [
      {
        label: "Dashboard",
        to: "/admin",
        icon: DashboardOutlinedIcon,
      },
    ],
  },
  {
    key: "catalog",
    label: "Catalog",
    icon: CategoryOutlinedIcon,
    items: [
      {
        label: "Shop Items",
        to: "/admin/catalog/shop-items",
        icon: StorefrontOutlinedIcon,
      },
      {
        label: "Vet Providers",
        to: "/admin/catalog/vets",
        icon: LocalHospitalOutlinedIcon,
      },
      {
        label: "Programs",
        to: "/admin/catalog/programs",
        icon: CalendarMonthOutlinedIcon,
      },
    ],
  },
  {
    key: "content",
    label: "Content",
    icon: ContentPasteOutlinedIcon,
    items: [
      {
        label: "Stories",
        to: "/admin/content/stories",
        icon: AutoStoriesOutlinedIcon,
      },
      {
        label: "Blog Posts",
        to: "/admin/content/blog-posts",
        icon: ArticleOutlinedIcon,
      },
      {
        label: "Pet Info Animals",
        to: "/admin/content/pet-info/animals",
        icon: PetsOutlinedIcon,
      },
      {
        label: "Pet Info Breeds",
        to: "/admin/content/pet-info/breeds",
        icon: PetsOutlinedIcon,
      },
    ],
  },
  {
    key: "adoption",
    label: "Adoption",
    icon: FavoriteBorderOutlinedIcon,
    items: [
      {
        label: "Adoptable Animals",
        to: "/admin/adoption/animals",
        icon: PetsOutlinedIcon,
      },
    ],
  },
  {
    key: "requests",
    label: "Requests",
    icon: NotificationsActiveOutlinedIcon,
    items: [
      {
        label: "Orders",
        to: "/admin/requests/orders",
        icon: ShoppingBagOutlinedIcon,
      },
      {
        label: "Online Consultations",
        to: "/admin/requests/consultations/online",
        icon: VideoChatOutlinedIcon,
      },
      {
        label: "In-Person Consultations",
        to: "/admin/requests/consultations/in-person",
        icon: LocalHospitalOutlinedIcon,
      },
      {
        label: "House Call Requests",
        to: "/admin/requests/consultations/house-calls",
        icon: HouseOutlinedIcon,
      },
      {
        label: "Volunteer Requests",
        to: "/admin/requests/volunteers",
        icon: PersonAddAltOutlinedIcon,
      },
      {
        label: "Adoption Requests",
        to: "/admin/requests/adoptions",
        icon: FavoriteBorderOutlinedIcon,
      },
      {
        label: "Reviews",
        to: "/admin/requests/reviews",
        icon: RateReviewOutlinedIcon,
      },
      {
        label: "Enrollments",
        to: "/admin/requests/enrollments",
        icon: HowToRegOutlinedIcon,
      },
      {
        label: "Lost & Found",
        to: "/admin/requests/lost-found",
        icon: SearchOutlinedIcon,
      },
      {
        label: "Rescue Alerts",
        to: "/admin/requests/rescue-alerts",
        icon: NotificationsActiveOutlinedIcon,
      },
    ],
  },
  {
    key: "settings",
    items: [
      {
        label: "Settings",
        to: "/admin/settings",
        icon: SettingsOutlinedIcon,
      },
    ],
  },
];

const newCountsQueryKey = ["admin", "new-counts"];

const AdminLayout = () => {
  const auth = useAdminAuth();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { mode, toggleMode } = useColorMode();

  const [openGroups, setOpenGroups] = useState(() => {
    const initial = {};
    navGroups.forEach((group) => {
      if (!group.label) {
        return;
      }
      const hasActiveChild = group.items.some((item) =>
        item.to === "/admin"
          ? location.pathname === "/admin"
          : location.pathname.startsWith(item.to),
      );
      if (hasActiveChild) {
        initial[group.key] = true;
      }
    });
    return initial;
  });

  const toggleGroup = (key) => {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const { data: newCounts } = useQuery({
    queryKey: newCountsQueryKey,
    queryFn: adminGetNewRequestCounts,
    enabled: auth.isAuthenticated,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });

  const getItemBadgeCount = (to) => {
    if (!newCounts) {
      return 0;
    }

    if (to === "/admin/requests/orders") {
      return newCounts.orders ?? 0;
    }

    if (to === "/admin/requests/consultations/online") {
      return newCounts.onlineConsultations ?? 0;
    }

    if (to === "/admin/requests/consultations/in-person") {
      return newCounts.inPersonConsultations ?? 0;
    }

    if (to === "/admin/requests/consultations/house-calls") {
      return newCounts.houseCalls ?? 0;
    }

    if (to === "/admin/requests/volunteers") {
      return newCounts.volunteers ?? 0;
    }

    if (to === "/admin/requests/adoptions") {
      return newCounts.adoptions ?? 0;
    }

    if (to === "/admin/requests/reviews") {
      return newCounts.reviews ?? 0;
    }

    if (to === "/admin/content/stories") {
      return newCounts.stories ?? 0;
    }

    if (to === "/admin/requests/enrollments") {
      return newCounts.enrollments ?? 0;
    }

    if (to === "/admin/requests/lost-found") {
      return newCounts.lostFound ?? 0;
    }

    if (to === "/admin/requests/rescue-alerts") {
      return newCounts.rescueAlerts ?? 0;
    }

    return 0;
  };

  const getGroupBadgeCount = (items) => {
    return items.reduce((sum, item) => sum + getItemBadgeCount(item.to), 0);
  };

  const findActiveItem = () => {
    for (const group of navGroups) {
      const found = group.items.find((item) =>
        item.to === "/admin"
          ? location.pathname === "/admin"
          : location.pathname.startsWith(item.to),
      );
      if (found) {
        return found;
      }
    }
    return null;
  };

  useEffect(() => {
    if (!auth.isAuthenticated) {
      return;
    }

    queryClient.invalidateQueries({ queryKey: newCountsQueryKey });
  }, [auth.isAuthenticated, location.pathname, queryClient]);

  const activeItem = findActiveItem();

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid",
            borderColor: "divider",
          },
        }}
      >
        <Box
          sx={{
            px: 2.5,
            py: 1,
            borderBottom: "1px solid",
            borderColor: "divider",
            background: (theme) =>
              `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.08)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.primary.main} 100%)`,
                color: "#fff",
                boxShadow: 2,
              }}
            >
              <PetsOutlinedIcon fontSize="medium" />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Happy Paws
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", fontWeight: 500 }}
              >
                Admin Console
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ overflowY: "auto", flex: 1, py: 1 }}>
          {navGroups.map((group, groupIdx) => {
            const groupBadgeCount = group.label
              ? getGroupBadgeCount(group.items)
              : 0;
            const GroupIcon = group.icon;
            const isGroupOpen = openGroups[group.key];

            return (
              <Box
                key={group.key}
                sx={{ mb: groupIdx === navGroups.length - 1 ? 0 : 0.5 }}
              >
                {group.label ? (
                  <>
                    <ListItemButton
                      onClick={() => toggleGroup(group.key)}
                      sx={{
                        px: 2.25,
                        py: 0.875,
                        mx: 1.25,
                        mb: 0.25,
                        borderRadius: 1.75,
                        "&:hover": {
                          backgroundColor: (theme) =>
                            alpha(theme.palette.action.hover, 0.2),
                        },
                      }}
                    >
                      {GroupIcon && (
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: 1.5,
                            color: "text.secondary",
                            fontSize: 20,
                          }}
                        >
                          <GroupIcon sx={{ fontSize: 20 }} />
                        </ListItemIcon>
                      )}
                      <ListItemText
                        primary={
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 700,
                              color: "text.secondary",
                              letterSpacing: "0.01em",
                              textTransform: "none",
                              fontSize: 13,
                            }}
                          >
                            {group.label}
                          </Typography>
                        }
                      />
                      {groupBadgeCount > 0 && (
                        <Chip
                          label={groupBadgeCount}
                          size="small"
                          color="error"
                          sx={{
                            mr: 0.5,
                            height: 20,
                            minWidth: 20,
                            "& .MuiChip-label": {
                              px: 0.75,
                              fontSize: 11,
                              fontWeight: 700,
                            },
                          }}
                        />
                      )}
                      {isGroupOpen ? (
                        <ExpandLess
                          sx={{ color: "text.secondary", fontSize: 20 }}
                        />
                      ) : (
                        <ExpandMore
                          sx={{ color: "text.secondary", fontSize: 20 }}
                        />
                      )}
                    </ListItemButton>
                    <Collapse in={isGroupOpen} timeout="auto" unmountOnExit>
                      <List
                        component="div"
                        disablePadding
                        sx={{ px: 1.25, ml: 0.5 }}
                      >
                        {group.items.map((item) => {
                          const ItemIcon = item.icon;
                          const badgeCount = getItemBadgeCount(item.to);
                          const isSelected =
                            item.to === "/admin"
                              ? location.pathname === "/admin"
                              : location.pathname.startsWith(item.to);

                          return (
                            <ListItemButton
                              key={item.to}
                              component={Link}
                              to={item.to}
                              selected={isSelected}
                              sx={{
                                mx: 0.5,
                                pl: 3.75,
                                pr: 1.5,
                                py: 0.875,
                                mb: 0.25,
                                borderRadius: 1.5,
                                position: "relative",
                                "&.Mui-selected": {
                                  backgroundColor: (theme) =>
                                    alpha(theme.palette.success.main, 0.15),
                                  "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    left: 14,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    width: 3,
                                    height: 18,
                                    borderRadius: 3,
                                    backgroundColor: "success.main",
                                  },
                                  "& .MuiListItemText-primary": {
                                    color: "success.dark",
                                    fontWeight: 700,
                                  },
                                  "& .MuiListItemIcon-root": {
                                    color: "success.main",
                                  },
                                },
                                "&.Mui-selected:hover": {
                                  backgroundColor: (theme) =>
                                    alpha(theme.palette.success.main, 0.2),
                                },
                              }}
                            >
                              {ItemIcon && (
                                <ListItemIcon
                                  sx={{
                                    minWidth: 0,
                                    mr: 1.25,
                                    color: isSelected
                                      ? "success.main"
                                      : "text.secondary",
                                  }}
                                >
                                  <ItemIcon sx={{ fontSize: 18 }} />
                                </ListItemIcon>
                              )}
                              <ListItemText
                                primary={
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      fontWeight: isSelected ? 700 : 500,
                                      fontSize: 13.5,
                                    }}
                                  >
                                    {item.label}
                                  </Typography>
                                }
                              />
                              {badgeCount > 0 ? (
                                <Chip
                                  label={badgeCount}
                                  size="small"
                                  color="success"
                                  sx={{
                                    ml: 0.5,
                                    height: 20,
                                    minWidth: 20,
                                    "& .MuiChip-label": {
                                      px: 0.75,
                                      fontSize: 11,
                                      fontWeight: 700,
                                    },
                                  }}
                                />
                              ) : null}
                            </ListItemButton>
                          );
                        })}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <List disablePadding sx={{ px: 1.25 }}>
                    {group.items.map((item) => {
                      const ItemIcon = item.icon;
                      const badgeCount = getItemBadgeCount(item.to);
                      const isSelected =
                        item.to === "/admin"
                          ? location.pathname === "/admin"
                          : location.pathname.startsWith(item.to);

                      return (
                        <ListItemButton
                          key={item.to}
                          component={Link}
                          to={item.to}
                          selected={isSelected}
                          sx={{
                            mx: 0.5,
                            px: 1.75,
                            py: 1,
                            mb: 0.25,
                            borderRadius: 1.75,
                            position: "relative",
                            "&.Mui-selected": {
                              backgroundColor: (theme) =>
                                alpha(theme.palette.success.main, 0.15),
                              "&::before": {
                                content: '""',
                                position: "absolute",
                                left: 12,
                                top: "50%",
                                transform: "translateY(-50%)",
                                width: 3,
                                height: 20,
                                borderRadius: 3,
                                backgroundColor: "success.main",
                              },
                              "& .MuiListItemText-primary": {
                                color: "success.dark",
                                fontWeight: 700,
                              },
                              "& .MuiListItemIcon-root": {
                                color: "success.main",
                              },
                            },
                            "&.Mui-selected:hover": {
                              backgroundColor: (theme) =>
                                alpha(theme.palette.success.main, 0.2),
                            },
                          }}
                        >
                          {ItemIcon && (
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: 1.5,
                                color: isSelected
                                  ? "success.main"
                                  : "text.secondary",
                              }}
                            >
                              <ItemIcon sx={{ fontSize: 20 }} />
                            </ListItemIcon>
                          )}
                          <ListItemText
                            primary={
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: isSelected ? 700 : 600,
                                  fontSize: 14,
                                }}
                              >
                                {item.label}
                              </Typography>
                            }
                          />
                          {badgeCount > 0 ? (
                            <Chip
                              label={badgeCount}
                              size="small"
                              color="success"
                              sx={{
                                ml: 0.5,
                                height: 22,
                                minWidth: 22,
                                "& .MuiChip-label": {
                                  px: 0.875,
                                  fontSize: 11.5,
                                  fontWeight: 700,
                                },
                              }}
                            />
                          ) : null}
                        </ListItemButton>
                      );
                    })}
                  </List>
                )}
              </Box>
            );
          })}
        </Box>

        <Box
          sx={{
            p: 2,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Button
            variant="outlined"
            color="success"
            fullWidth
            onClick={auth.logout}
            startIcon={<LogoutOutlinedIcon />}
            sx={{
              borderRadius: 1.5,
              py: 1,
              fontWeight: 600,
              textTransform: "none",
              "& .MuiButton-startIcon": { mr: 0.75 },
              backgroundColor: (theme) =>
                alpha(theme.palette.action.hover, 0.1),
            }}
          >
            Sign out
          </Button>
        </Box>
      </Drawer>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            backgroundColor: (theme) =>
              alpha(theme.palette.background.paper, 0.9),
            color: "text.primary",
            backdropFilter: "blur(12px)",
          }}
        >
          <Toolbar>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
              {activeItem?.icon && (
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: (theme) =>
                      alpha(theme.palette.success.main, 0.12),
                    color: "success.main",
                  }}
                >
                  <activeItem.icon sx={{ fontSize: 20 }} />
                </Box>
              )}
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {activeItem?.label || "Admin Panel"}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Tooltip
              title={
                mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              <IconButton
                color="inherit"
                aria-label="Toggle color mode"
                onClick={toggleMode}
                sx={{
                  borderRadius: 2,
                  backgroundColor: (theme) =>
                    alpha(theme.palette.action.hover, 0.4),
                  "&:hover": {
                    backgroundColor: (theme) =>
                      alpha(theme.palette.action.hover, 0.7),
                  },
                }}
              >
                {mode === "dark" ? (
                  <LightModeOutlinedIcon />
                ) : (
                  <DarkModeOutlinedIcon />
                )}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        <Container maxWidth="2xl" sx={{ py: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default AdminLayout;
