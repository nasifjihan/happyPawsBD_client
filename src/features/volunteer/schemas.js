import { z } from "zod";

export const volunteerFormSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required."),
  contactEmail: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  contactPhone: z.string().trim().min(1, "Phone number is required."),
  city: z.string().trim().min(1, "City or area is required."),
  preferredRole: z.string().trim().min(1, "Select a volunteer role."),
  availability: z.string().trim().min(1, "Select your availability."),
  experience: z.string().trim().optional(),
  motivation: z
    .string()
    .trim()
    .min(10, "Tell us a little about why you want to volunteer."),
});

export const volunteerRoleOptions = [
  "Rescue support",
  "Foster care",
  "Event support",
  "Community outreach",
  "Transport assistance",
  "Social media support",
];

export const volunteerAvailabilityOptions = [
  "Weekdays",
  "Weekends",
  "Evenings",
  "Flexible",
];

export const createVolunteerDefaultValues = (user) => ({
  fullName: user?.displayName || "",
  contactEmail: user?.email || "",
  contactPhone: "",
  city: "",
  preferredRole: "",
  availability: "",
  experience: "",
  motivation: "",
});
