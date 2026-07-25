import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addFoundPet,
  addLostPet,
  getFoundPets,
  getLostPets,
} from "../../API/api";
import { lostFoundQueryKeys } from "./queryKeys";

export const useLostPetsQuery = () =>
  useQuery({
    queryKey: lostFoundQueryKeys.lostPets(),
    queryFn: getLostPets,
  });

export const useFoundPetsQuery = () =>
  useQuery({
    queryKey: lostFoundQueryKeys.foundPets(),
    queryFn: getFoundPets,
  });

export const useLostFoundOverviewQuery = () =>
  useQuery({
    queryKey: lostFoundQueryKeys.overview(),
    queryFn: async () => {
      const [lostPets, foundPets] = await Promise.all([
        getLostPets(),
        getFoundPets(),
      ]);

      return { lostPets, foundPets };
    },
  });

export const useCreateLostPetMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addLostPet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lostFoundQueryKeys.all });
    },
  });
};

export const useCreateFoundPetMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFoundPet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lostFoundQueryKeys.all });
    },
  });
};
