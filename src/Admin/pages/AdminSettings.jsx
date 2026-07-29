import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  adminGetSiteSettings,
  adminUpdateCredentials,
  adminUpdateSiteSettings,
} from "../lib/adminApi";

const AdminSettings = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [siteForm, setSiteForm] = useState({
    brandName: "",
    contactEmail: "",
    contactPhone: "",
    whatsapp: "",
    address: "",
    city: "",
    mapUrl: "",
    mapEmbedUrl: "",
    facebookUrl: "",
    instagramUrl: "",
    youtubeUrl: "",
    donationBkashNumber: "",
    donationEmail: "",
    homeHeroBadge: "",
    homeHeroTitle: "",
    homeHeroSubtitle: "",
    homeHeroImageUrl: "",
    homeHeroImageAlt: "",
    homeAdoptedCount: "",
    homeAdoptedLabel: "",
  });

  const updateMutation = useMutation({
    mutationFn: adminUpdateCredentials,
  });

  const { data: siteSettings, isError: isSiteError, error: siteError } = useQuery({
    queryKey: ["admin", "site-settings"],
    queryFn: adminGetSiteSettings,
  });

  const updateSiteMutation = useMutation({
    mutationFn: adminUpdateSiteSettings,
  });

  useEffect(() => {
    if (!siteSettings) {
      return;
    }

    setSiteForm({
      brandName: siteSettings.brandName || "",
      contactEmail: siteSettings.contactEmail || "",
      contactPhone: siteSettings.contactPhone || "",
      whatsapp: siteSettings.whatsapp || "",
      address: siteSettings.address || "",
      city: siteSettings.city || "",
      mapUrl: siteSettings.mapUrl || "",
      mapEmbedUrl: siteSettings.mapEmbedUrl || "",
      facebookUrl: siteSettings.facebookUrl || "",
      instagramUrl: siteSettings.instagramUrl || "",
      youtubeUrl: siteSettings.youtubeUrl || "",
      donationBkashNumber: siteSettings.donationBkashNumber || "",
      donationEmail: siteSettings.donationEmail || "",
      homeHeroBadge: siteSettings.homeHeroBadge || "",
      homeHeroTitle: siteSettings.homeHeroTitle || "",
      homeHeroSubtitle: siteSettings.homeHeroSubtitle || "",
      homeHeroImageUrl: siteSettings.homeHeroImageUrl || "",
      homeHeroImageAlt: siteSettings.homeHeroImageAlt || "",
      homeAdoptedCount: siteSettings.homeAdoptedCount || "",
      homeAdoptedLabel: siteSettings.homeAdoptedLabel || "",
    });
  }, [siteSettings]);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSiteChange = (event) => {
    setSiteForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateMutation.mutateAsync({
      username: form.username || undefined,
      password: form.password || undefined,
    });
    setForm({ username: "", password: "" });
  };

  const handleSubmitSite = async (event) => {
    event.preventDefault();
    await updateSiteMutation.mutateAsync(siteForm);
  };

  return (
    <Box>
      <Typography variant="h3" fontWeight={900} sx={{ mb: 2 }}>
        Settings
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Manage admin credentials and public site settings.
      </Typography>

      <Stack spacing={3} sx={{ maxWidth: 820 }}>
        <Paper sx={{ p: 3, borderRadius: 4 }}>
          <Typography variant="h5" fontWeight={900} sx={{ mb: 2 }}>
            Admin Credentials
          </Typography>
          <Stack spacing={2}>
            {updateMutation.isError ? (
              <Alert severity="error">
                {updateMutation.error?.response?.data?.message ||
                  "Could not update credentials."}
              </Alert>
            ) : null}

            {updateMutation.isSuccess ? (
              <Alert severity="success">Credentials updated.</Alert>
            ) : null}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={2}>
                <TextField
                  label="New Username (optional)"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  autoComplete="username"
                />
                <TextField
                  label="New Password (optional)"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  disabled={updateMutation.isPending}
                  sx={{ borderRadius: 3, fontWeight: 800, py: 1.25 }}
                >
                  Save Credentials
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Paper>

        <Paper sx={{ p: 3, borderRadius: 4 }}>
          <Typography variant="h5" fontWeight={900} sx={{ mb: 2 }}>
            Site Settings
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            These values are used on Footer, Contact Us, and Donation pages.
          </Typography>

          <Stack spacing={2}>
            {isSiteError ? (
              <Alert severity="warning">
                {siteError?.response?.data?.message ||
                  "Could not load site settings."}
              </Alert>
            ) : null}

            {updateSiteMutation.isError ? (
              <Alert severity="error">
                {updateSiteMutation.error?.response?.data?.message ||
                  "Could not update site settings."}
              </Alert>
            ) : null}

            {updateSiteMutation.isSuccess ? (
              <Alert severity="success">Site settings updated.</Alert>
            ) : null}

            <Box component="form" onSubmit={handleSubmitSite} noValidate>
              <Stack spacing={2}>
                <TextField
                  label="Brand Name"
                  name="brandName"
                  value={siteForm.brandName}
                  onChange={handleSiteChange}
                />

                <Divider />

                <Typography variant="subtitle1" fontWeight={900}>
                  Home Page
                </Typography>

                <TextField
                  label="Home Hero Badge"
                  name="homeHeroBadge"
                  value={siteForm.homeHeroBadge}
                  onChange={handleSiteChange}
                />
                <TextField
                  label="Home Hero Title"
                  name="homeHeroTitle"
                  value={siteForm.homeHeroTitle}
                  onChange={handleSiteChange}
                  multiline
                  minRows={2}
                />
                <TextField
                  label="Home Hero Subtitle"
                  name="homeHeroSubtitle"
                  value={siteForm.homeHeroSubtitle}
                  onChange={handleSiteChange}
                  multiline
                  minRows={3}
                />
                <TextField
                  label="Home Hero Image URL (optional)"
                  name="homeHeroImageUrl"
                  value={siteForm.homeHeroImageUrl}
                  onChange={handleSiteChange}
                />
                <TextField
                  label="Home Hero Image Alt"
                  name="homeHeroImageAlt"
                  value={siteForm.homeHeroImageAlt}
                  onChange={handleSiteChange}
                />
                <TextField
                  label="Home Adopted Count"
                  name="homeAdoptedCount"
                  value={siteForm.homeAdoptedCount}
                  onChange={handleSiteChange}
                />
                <TextField
                  label="Home Adopted Label"
                  name="homeAdoptedLabel"
                  value={siteForm.homeAdoptedLabel}
                  onChange={handleSiteChange}
                />

                <Divider />

                <TextField
                  label="Contact Email"
                  name="contactEmail"
                  value={siteForm.contactEmail}
                  onChange={handleSiteChange}
                />
                <TextField
                  label="Contact Phone"
                  name="contactPhone"
                  value={siteForm.contactPhone}
                  onChange={handleSiteChange}
                />
                <TextField
                  label="WhatsApp"
                  name="whatsapp"
                  value={siteForm.whatsapp}
                  onChange={handleSiteChange}
                />
                <TextField
                  label="Address"
                  name="address"
                  value={siteForm.address}
                  onChange={handleSiteChange}
                />
                <TextField
                  label="City"
                  name="city"
                  value={siteForm.city}
                  onChange={handleSiteChange}
                />

                <Divider />

                <TextField
                  label="Google Maps Link"
                  name="mapUrl"
                  value={siteForm.mapUrl}
                  onChange={handleSiteChange}
                />
                <TextField
                  label="Google Maps Embed URL"
                  name="mapEmbedUrl"
                  value={siteForm.mapEmbedUrl}
                  onChange={handleSiteChange}
                />
                <TextField
                  label="Facebook URL"
                  name="facebookUrl"
                  value={siteForm.facebookUrl}
                  onChange={handleSiteChange}
                />
                <TextField
                  label="Instagram URL"
                  name="instagramUrl"
                  value={siteForm.instagramUrl}
                  onChange={handleSiteChange}
                />
                <TextField
                  label="YouTube URL"
                  name="youtubeUrl"
                  value={siteForm.youtubeUrl}
                  onChange={handleSiteChange}
                />

                <Divider />

                <TextField
                  label="Donation bKash Number"
                  name="donationBkashNumber"
                  value={siteForm.donationBkashNumber}
                  onChange={handleSiteChange}
                />
                <TextField
                  label="Donation Email"
                  name="donationEmail"
                  value={siteForm.donationEmail}
                  onChange={handleSiteChange}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  disabled={updateSiteMutation.isPending}
                  sx={{ borderRadius: 3, fontWeight: 800, py: 1.25 }}
                >
                  Save Site Settings
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
};

export default AdminSettings;
