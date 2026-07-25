export const lostFoundQueryKeys = {
  all: ["lost-found"],
  lostPets: () => [...lostFoundQueryKeys.all, "lost-pets"],
  foundPets: () => [...lostFoundQueryKeys.all, "found-pets"],
  overview: () => [...lostFoundQueryKeys.all, "overview"],
};
