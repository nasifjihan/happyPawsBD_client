import { useQuery } from "@tanstack/react-query";
import { getShopItems } from "../../API/api";

export const catalogQueryKeys = {
  all: ["catalog"],
  shopItems: () => [...catalogQueryKeys.all, "shop-items"],
};

export const useShopItemsQuery = () =>
  useQuery({
    queryKey: catalogQueryKeys.shopItems(),
    queryFn: getShopItems,
  });
