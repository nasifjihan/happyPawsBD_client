import { useMutation } from "@tanstack/react-query";
import { volunteerApplication } from "../../API/api";

export const useVolunteerMutation = () =>
  useMutation({
    mutationFn: volunteerApplication,
  });
