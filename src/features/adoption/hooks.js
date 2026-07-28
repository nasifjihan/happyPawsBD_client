import { useMutation, useQuery } from "@tanstack/react-query";
import {
  adoptionApplication,
  getAdoptableAnimal,
  getAdoptableAnimals,
} from "../../API/api";

export const adoptionQueryKeys = {
  all: ["adoption"],
  animals: () => [...adoptionQueryKeys.all, "animals"],
  animal: (code) => [...adoptionQueryKeys.animals(), code],
};

export const useAdoptableAnimalsQuery = () =>
  useQuery({
    queryKey: adoptionQueryKeys.animals(),
    queryFn: getAdoptableAnimals,
  });

export const useAdoptableAnimalQuery = (code) =>
  useQuery({
    queryKey: adoptionQueryKeys.animal(code),
    queryFn: () => getAdoptableAnimal(code),
    enabled: Boolean(code),
  });

export const useAdoptionMutation = () =>
  useMutation({
    mutationFn: ({ adoption, code }) => adoptionApplication(adoption, code),
  });
