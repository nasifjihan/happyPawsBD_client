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

const lostFoundQueryOptions = {
  retry: 2,
  retryDelay: (attemptIndex) => Math.min(1500 * 2 ** attemptIndex, 6000),
};

export const useLostPetsQuery = () =>
  useQuery({
    queryKey: lostFoundQueryKeys.lostPets(),
    queryFn: getLostPets,
    ...lostFoundQueryOptions,
  });

export const useFoundPetsQuery = () =>
  useQuery({
    queryKey: lostFoundQueryKeys.foundPets(),
    queryFn: getFoundPets,
    ...lostFoundQueryOptions,
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
    ...lostFoundQueryOptions,
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
