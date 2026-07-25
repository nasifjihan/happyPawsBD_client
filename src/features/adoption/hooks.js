import { useMutation } from "@tanstack/react-query";
import { adoptionApplication } from "../../API/api";

export const useAdoptionMutation = () =>
  useMutation({
    mutationFn: ({ adoption, code }) => adoptionApplication(adoption, code),
  });
