import { z } from "zod";

export const adoptionFormSchema = z.object({
  animalCode: z.string().trim().min(1, "Animal code is required."),
  animalType: z.string().trim().min(1, "Animal type is required."),
  adopterName: z.string().trim().min(1, "Your name is required."),
  contactEmail: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .or(z.literal("")),
  contactPhone: z.string().trim().min(1, "Contact number is required."),
  address: z.string().trim().min(1, "Address is required."),
  experience: z.string().trim().optional(),
});

export const createAdoptionDefaultValues = ({
  animalCode,
  animalType,
  user,
}) => ({
  animalCode,
  animalType,
  adopterName: user?.displayName || "",
  contactEmail: user?.email || "",
  contactPhone: "",
  address: "",
  experience: "",
});
