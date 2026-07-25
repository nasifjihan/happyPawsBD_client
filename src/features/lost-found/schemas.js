import { z } from "zod";

const fileIsPresent = (value) => value instanceof File;

export const lostPetFormSchema = z.object({
  petName: z.string().trim().min(1, "Pet name is required."),
  animalType: z.string().trim().min(1, "Animal type is required."),
  colors: z.string().trim().min(1, "Color information is required."),
  ownerName: z.string().trim().min(1, "Owner name is required."),
  contactPhone: z.string().trim().min(1, "Contact number is required."),
  contactEmail: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .or(z.literal("")),
  lastSeenLocation: z
    .string()
    .trim()
    .min(1, "Last seen location is required."),
  lostDate: z.string().trim().min(1, "Lost date is required."),
  description: z.string().trim().min(1, "Description is required."),
  petPicture: z.any().refine(fileIsPresent, "A pet picture is required."),
});

export const foundPetFormSchema = z.object({
  animalType: z.string().trim().min(1, "Animal type is required."),
  breed: z.string().trim().optional(),
  colors: z.string().trim().min(1, "Color information is required."),
  gender: z.string().trim().min(1, "Gender is required."),
  founderName: z.string().trim().min(1, "Your name is required."),
  contactPhone: z.string().trim().min(1, "Contact number is required."),
  foundLocation: z.string().trim().min(1, "Found location is required."),
  foundDate: z.string().trim().min(1, "Found date is required."),
  description: z.string().trim().min(1, "Description is required."),
  petPicture: z.any().refine(fileIsPresent, "A pet picture is required."),
});

export const lostPetDefaultValues = {
  petName: "",
  animalType: "",
  colors: "",
  ownerName: "",
  contactPhone: "",
  contactEmail: "",
  lastSeenLocation: "",
  lostDate: "",
  description: "",
  petPicture: null,
};

export const foundPetDefaultValues = {
  animalType: "",
  breed: "",
  colors: "",
  gender: "",
  founderName: "",
  contactPhone: "",
  foundLocation: "",
  foundDate: "",
  description: "",
  petPicture: null,
};
