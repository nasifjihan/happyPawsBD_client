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

export const useLostPetsQuery = (params = {}) =>
  useQuery({
    queryKey: [...lostFoundQueryKeys.lostPets(), params],
    queryFn: () => getLostPets(params),
    ...lostFoundQueryOptions,
  });

export const useFoundPetsQuery = (params = {}) =>
  useQuery({
    queryKey: [...lostFoundQueryKeys.foundPets(), params],
    queryFn: () => getFoundPets(params),
    ...lostFoundQueryOptions,
  });

export const useLostFoundOverviewQuery = () =>
  useQuery({
    queryKey: lostFoundQueryKeys.overview(),
    queryFn: async () => {
      const [lostPetsResponse, foundPetsResponse] = await Promise.all([
        getLostPets({ page: 1, limit: 2 }),
        getFoundPets({ page: 1, limit: 2 }),
      ]);

      return {
        lostPets: lostPetsResponse.items,
        foundPets: foundPetsResponse.items,
        lostPetsTotal: lostPetsResponse.total,
        foundPetsTotal: foundPetsResponse.total,
      };
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
