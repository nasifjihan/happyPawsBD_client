import axiosInstance from "../../API/axiosInstance";

const getAdminToken = () => sessionStorage.getItem("hpbd_admin_token") || "";

const adminRequestConfig = () => {
  const token = getAdminToken();

  return token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};
};

export const adminLoginRequest = async ({ username, password }) => {
  const response = await axiosInstance.post("/api/v1/admin/login", {
    username,
    password,
  });

  return response.data;
};

export const adminUpdateCredentials = async ({ username, password }) => {
  const response = await axiosInstance.put(
    "/api/v1/admin/credentials",
    { username, password },
    adminRequestConfig()
  );

  return response.data;
};

export const adminGetDashboardCounts = async () => {
  const config = {
    ...adminRequestConfig(),
    params: { page: 1, limit: 1 },
  };

  const [
    shopItems,
    vets,
    animals,
    trainingPrograms,
    groomingPrograms,
    boardingPrograms,
    orders,
    consultations,
    volunteers,
    adoptions,
    reviews,
    training,
    grooming,
    boarding,
    lostPets,
    foundPets,
  ] = await Promise.all([
    axiosInstance.get("/api/v1/admin/catalog/shop-items", config),
    axiosInstance.get("/api/v1/admin/catalog/vets", config),
    axiosInstance.get("/api/v1/admin/adoption/animals", config),
    axiosInstance.get("/api/v1/admin/catalog/programs/training", config),
    axiosInstance.get("/api/v1/admin/catalog/programs/grooming", config),
    axiosInstance.get("/api/v1/admin/catalog/programs/boarding", config),
    axiosInstance.get("/api/v1/admin/orders", config),
    axiosInstance.get("/api/v1/admin/requests/consultations/online", config),
    axiosInstance.get("/api/v1/admin/requests/volunteers", config),
    axiosInstance.get("/api/v1/admin/requests/adoptions", config),
    axiosInstance.get("/api/v1/admin/requests/reviews", config),
    axiosInstance.get("/api/v1/admin/requests/enrollments/training", config),
    axiosInstance.get("/api/v1/admin/requests/enrollments/grooming", config),
    axiosInstance.get("/api/v1/admin/requests/enrollments/boarding", config),
    axiosInstance.get("/api/v1/admin/requests/lost-found/lost-pets", config),
    axiosInstance.get("/api/v1/admin/requests/lost-found/found-pets", config),
  ]);

  return {
    shopItems: shopItems.data.total,
    vetProviders: vets.data.total,
    adoptableAnimals: animals.data.total,
    trainingPrograms: trainingPrograms.data.total,
    groomingPrograms: groomingPrograms.data.total,
    boardingPrograms: boardingPrograms.data.total,
    orders: orders.data.total,
    onlineConsultations: consultations.data.total,
    volunteerApplications: volunteers.data.total,
    adoptionApplications: adoptions.data.total,
    reviews: reviews.data.total,
    trainingEnrollments: training.data.total,
    groomingEnrollments: grooming.data.total,
    boardingEnrollments: boarding.data.total,
    lostPets: lostPets.data.total,
    foundPets: foundPets.data.total,
  };
};

export const adminGetRecentRequests = async () => {
  const config = {
    ...adminRequestConfig(),
    params: { page: 1, limit: 5 },
  };

  const [
    orders,
    consultations,
    volunteers,
    adoptions,
    training,
    grooming,
    boarding,
    lostPets,
    foundPets,
  ] = await Promise.all([
    axiosInstance.get("/api/v1/admin/orders", config),
    axiosInstance.get("/api/v1/admin/requests/consultations/online", config),
    axiosInstance.get("/api/v1/admin/requests/volunteers", config),
    axiosInstance.get("/api/v1/admin/requests/adoptions", config),
    axiosInstance.get("/api/v1/admin/requests/enrollments/training", config),
    axiosInstance.get("/api/v1/admin/requests/enrollments/grooming", config),
    axiosInstance.get("/api/v1/admin/requests/enrollments/boarding", config),
    axiosInstance.get("/api/v1/admin/requests/lost-found/lost-pets", config),
    axiosInstance.get("/api/v1/admin/requests/lost-found/found-pets", config),
  ]);

  return {
    orders: orders.data.items ?? [],
    consultations: consultations.data.items ?? [],
    volunteers: volunteers.data.items ?? [],
    adoptions: adoptions.data.items ?? [],
    enrollments: {
      training: training.data.items ?? [],
      grooming: grooming.data.items ?? [],
      boarding: boarding.data.items ?? [],
    },
    lostFound: {
      lostPets: lostPets.data.items ?? [],
      foundPets: foundPets.data.items ?? [],
    },
  };
};

export const adminGetNewRequestCounts = async () => {
  const [
    orders,
    consultations,
    volunteers,
    adoptions,
    reviews,
    training,
    grooming,
    boarding,
    lostPets,
    foundPets,
  ] = await Promise.all([
    axiosInstance.get("/api/v1/admin/orders", {
      ...adminRequestConfig(),
      params: { page: 1, limit: 1, orderStatus: "created" },
    }),
    axiosInstance.get("/api/v1/admin/requests/consultations/online", {
      ...adminRequestConfig(),
      params: { page: 1, limit: 1, status: "new" },
    }),
    axiosInstance.get("/api/v1/admin/requests/volunteers", {
      ...adminRequestConfig(),
      params: { page: 1, limit: 1, status: "new" },
    }),
    axiosInstance.get("/api/v1/admin/requests/adoptions", {
      ...adminRequestConfig(),
      params: { page: 1, limit: 1, status: "new" },
    }),
    axiosInstance.get("/api/v1/admin/requests/reviews", {
      ...adminRequestConfig(),
      params: { page: 1, limit: 1, status: "new" },
    }),
    axiosInstance.get("/api/v1/admin/requests/enrollments/training", {
      ...adminRequestConfig(),
      params: { page: 1, limit: 1, status: "new" },
    }),
    axiosInstance.get("/api/v1/admin/requests/enrollments/grooming", {
      ...adminRequestConfig(),
      params: { page: 1, limit: 1, status: "new" },
    }),
    axiosInstance.get("/api/v1/admin/requests/enrollments/boarding", {
      ...adminRequestConfig(),
      params: { page: 1, limit: 1, status: "new" },
    }),
    axiosInstance.get("/api/v1/admin/requests/lost-found/lost-pets", {
      ...adminRequestConfig(),
      params: { page: 1, limit: 1, status: "new" },
    }),
    axiosInstance.get("/api/v1/admin/requests/lost-found/found-pets", {
      ...adminRequestConfig(),
      params: { page: 1, limit: 1, status: "new" },
    }),
  ]);

  return {
    orders: orders.data.total ?? 0,
    consultations: consultations.data.total ?? 0,
    volunteers: volunteers.data.total ?? 0,
    adoptions: adoptions.data.total ?? 0,
    reviews: reviews.data.total ?? 0,
    enrollments:
      (training.data.total ?? 0) +
      (grooming.data.total ?? 0) +
      (boarding.data.total ?? 0),
    lostFound: (lostPets.data.total ?? 0) + (foundPets.data.total ?? 0),
  };
};

export const adminListShopItems = async ({ page, limit, q }) => {
  const response = await axiosInstance.get("/api/v1/admin/catalog/shop-items", {
    ...adminRequestConfig(),
    params: { page, limit, q },
  });

  return response.data;
};

export const adminListVetProviders = async ({
  page,
  limit,
  division,
  city,
  district,
  q,
}) => {
  const response = await axiosInstance.get("/api/v1/admin/catalog/vets", {
    ...adminRequestConfig(),
    params: {
      page,
      limit,
      division,
      city,
      district,
      q,
    },
  });

  return response.data;
};

export const adminGetVetProvider = async (id) => {
  const response = await axiosInstance.get(
    `/api/v1/admin/catalog/vets/${id}`,
    adminRequestConfig()
  );

  return response.data;
};

export const adminUpsertVetProvider = async (payload) => {
  const response = await axiosInstance.post(
    "/api/v1/admin/catalog/vets",
    payload,
    adminRequestConfig()
  );

  return response.data;
};

export const adminDeleteVetProvider = async (id) => {
  const response = await axiosInstance.delete(
    `/api/v1/admin/catalog/vets/${id}`,
    adminRequestConfig()
  );

  return response.data;
};

export const adminGetVetDirectoryMeta = async ({ division, city } = {}) => {
  const response = await axiosInstance.get("/api/v1/vets/meta", {
    params: {
      division,
      city,
    },
  });

  return response.data;
};

export const adminListPrograms = async ({ type, page, limit, q }) => {
  const response = await axiosInstance.get(`/api/v1/admin/catalog/programs/${type}`, {
    ...adminRequestConfig(),
    params: { page, limit, q },
  });

  return response.data;
};

export const adminGetProgram = async ({ type, id }) => {
  const response = await axiosInstance.get(
    `/api/v1/admin/catalog/programs/${type}/${id}`,
    adminRequestConfig()
  );

  return response.data;
};

export const adminUpsertProgram = async ({ type, payload }) => {
  const response = await axiosInstance.post(
    `/api/v1/admin/catalog/programs/${type}`,
    payload,
    adminRequestConfig()
  );

  return response.data;
};

export const adminDeleteProgram = async ({ type, id }) => {
  const response = await axiosInstance.delete(
    `/api/v1/admin/catalog/programs/${type}/${id}`,
    adminRequestConfig()
  );

  return response.data;
};

export const adminUpsertShopItem = async (payload) => {
  const response = await axiosInstance.post(
    "/api/v1/admin/catalog/shop-items",
    payload,
    adminRequestConfig()
  );

  return response.data;
};

export const adminDeleteShopItem = async (id) => {
  const response = await axiosInstance.delete(
    `/api/v1/admin/catalog/shop-items/${id}`,
    adminRequestConfig()
  );

  return response.data;
};

export const adminListAdoptableAnimals = async ({ page, limit, q }) => {
  const response = await axiosInstance.get("/api/v1/admin/adoption/animals", {
    ...adminRequestConfig(),
    params: { page, limit, q },
  });

  return response.data;
};

export const adminUpsertAdoptableAnimal = async (payload) => {
  const response = await axiosInstance.post(
    "/api/v1/admin/adoption/animals",
    payload,
    adminRequestConfig()
  );

  return response.data;
};

export const adminDeleteAdoptableAnimal = async (code) => {
  const response = await axiosInstance.delete(
    `/api/v1/admin/adoption/animals/${code}`,
    adminRequestConfig()
  );

  return response.data;
};

export const adminListOrders = async ({ page, limit, q, orderStatus, paymentStatus }) => {
  const response = await axiosInstance.get("/api/v1/admin/orders", {
    ...adminRequestConfig(),
    params: { page, limit, q, orderStatus, paymentStatus },
  });

  return response.data;
};

export const adminGetOrder = async (id) => {
  const response = await axiosInstance.get(
    `/api/v1/admin/orders/${id}`,
    adminRequestConfig()
  );

  return response.data;
};

export const adminUpdateOrder = async ({ id, orderStatus, paymentStatus }) => {
  const response = await axiosInstance.put(
    `/api/v1/admin/orders/${id}`,
    { orderStatus, paymentStatus },
    adminRequestConfig()
  );

  return response.data;
};

export const adminListVolunteerApplications = async ({ page, limit, status, q }) => {
  const response = await axiosInstance.get("/api/v1/admin/requests/volunteers", {
    ...adminRequestConfig(),
    params: { page, limit, status, q },
  });

  return response.data;
};

export const adminGetVolunteerApplication = async (id) => {
  const response = await axiosInstance.get(
    `/api/v1/admin/requests/volunteers/${id}`,
    adminRequestConfig()
  );

  return response.data;
};

export const adminUpdateVolunteerApplication = async ({ id, status }) => {
  const response = await axiosInstance.put(
    `/api/v1/admin/requests/volunteers/${id}`,
    { status },
    adminRequestConfig()
  );

  return response.data;
};

export const adminListAdoptionApplications = async ({ page, limit, status, q }) => {
  const response = await axiosInstance.get("/api/v1/admin/requests/adoptions", {
    ...adminRequestConfig(),
    params: { page, limit, status, q },
  });

  return response.data;
};

export const adminGetAdoptionApplication = async (id) => {
  const response = await axiosInstance.get(
    `/api/v1/admin/requests/adoptions/${id}`,
    adminRequestConfig()
  );

  return response.data;
};

export const adminUpdateAdoptionApplication = async ({ id, status }) => {
  const response = await axiosInstance.put(
    `/api/v1/admin/requests/adoptions/${id}`,
    { status },
    adminRequestConfig()
  );

  return response.data;
};

export const adminListEnrollments = async ({ type, page, limit, status, q }) => {
  const response = await axiosInstance.get(
    `/api/v1/admin/requests/enrollments/${type}`,
    {
      ...adminRequestConfig(),
      params: { page, limit, status, q },
    }
  );

  return response.data;
};

export const adminUpdateEnrollment = async ({ type, id, status }) => {
  const response = await axiosInstance.put(
    `/api/v1/admin/requests/enrollments/${type}/${id}`,
    { status },
    adminRequestConfig()
  );

  return response.data;
};

export const adminListLostFoundReports = async ({ type, page, limit, status, q }) => {
  const response = await axiosInstance.get(
    `/api/v1/admin/requests/lost-found/${type}`,
    {
      ...adminRequestConfig(),
      params: { page, limit, status, q },
    }
  );

  return response.data;
};

export const adminUpdateLostFoundReport = async ({ type, id, status }) => {
  const response = await axiosInstance.put(
    `/api/v1/admin/requests/lost-found/${type}/${id}`,
    { status },
    adminRequestConfig()
  );

  return response.data;
};

export const adminListOnlineConsultations = async ({ page, limit, status, q }) => {
  const response = await axiosInstance.get(
    "/api/v1/admin/requests/consultations/online",
    {
      ...adminRequestConfig(),
      params: { page, limit, status, q },
    }
  );

  return response.data;
};

export const adminGetOnlineConsultation = async (id) => {
  const response = await axiosInstance.get(
    `/api/v1/admin/requests/consultations/online/${id}`,
    adminRequestConfig()
  );

  return response.data;
};

export const adminUpdateOnlineConsultation = async ({ id, status, adminNotes }) => {
  const response = await axiosInstance.put(
    `/api/v1/admin/requests/consultations/online/${id}`,
    { status, adminNotes },
    adminRequestConfig()
  );

  return response.data;
};

export const adminListReviews = async ({ page, limit, status, q }) => {
  const response = await axiosInstance.get("/api/v1/admin/requests/reviews", {
    ...adminRequestConfig(),
    params: { page, limit, status, q },
  });

  return response.data;
};

export const adminGetReview = async (id) => {
  const response = await axiosInstance.get(
    `/api/v1/admin/requests/reviews/${id}`,
    adminRequestConfig()
  );

  return response.data;
};

export const adminUpdateReview = async ({ id, status, adminNotes }) => {
  const response = await axiosInstance.put(
    `/api/v1/admin/requests/reviews/${id}`,
    { status, adminNotes },
    adminRequestConfig()
  );

  return response.data;
};

export const adminGetNewRequestsFeed = async () => {
  const [
    orders,
    consultations,
    volunteers,
    adoptions,
    reviews,
    training,
    grooming,
    boarding,
    lostPets,
    foundPets,
  ] = await Promise.all([
    axiosInstance.get("/api/v1/admin/orders", {
      ...adminRequestConfig(),
      params: { page: 1, limit: 3, orderStatus: "created" },
    }),
    axiosInstance.get("/api/v1/admin/requests/consultations/online", {
      ...adminRequestConfig(),
      params: { page: 1, limit: 3, status: "new" },
    }),
    axiosInstance.get("/api/v1/admin/requests/volunteers", {
      ...adminRequestConfig(),
      params: { page: 1, limit: 3, status: "new" },
    }),
    axiosInstance.get("/api/v1/admin/requests/adoptions", {
      ...adminRequestConfig(),
      params: { page: 1, limit: 3, status: "new" },
    }),
    axiosInstance.get("/api/v1/admin/requests/reviews", {
      ...adminRequestConfig(),
      params: { page: 1, limit: 3, status: "new" },
    }),
    axiosInstance.get("/api/v1/admin/requests/enrollments/training", {
      ...adminRequestConfig(),
      params: { page: 1, limit: 3, status: "new" },
    }),
    axiosInstance.get("/api/v1/admin/requests/enrollments/grooming", {
      ...adminRequestConfig(),
      params: { page: 1, limit: 3, status: "new" },
    }),
    axiosInstance.get("/api/v1/admin/requests/enrollments/boarding", {
      ...adminRequestConfig(),
      params: { page: 1, limit: 3, status: "new" },
    }),
    axiosInstance.get("/api/v1/admin/requests/lost-found/lost-pets", {
      ...adminRequestConfig(),
      params: { page: 1, limit: 3, status: "new" },
    }),
    axiosInstance.get("/api/v1/admin/requests/lost-found/found-pets", {
      ...adminRequestConfig(),
      params: { page: 1, limit: 3, status: "new" },
    }),
  ]);

  return {
    orders: orders.data.items ?? [],
    consultations: consultations.data.items ?? [],
    volunteers: volunteers.data.items ?? [],
    adoptions: adoptions.data.items ?? [],
    reviews: reviews.data.items ?? [],
    enrollments: {
      training: training.data.items ?? [],
      grooming: grooming.data.items ?? [],
      boarding: boarding.data.items ?? [],
    },
    lostFound: {
      lostPets: lostPets.data.items ?? [],
      foundPets: foundPets.data.items ?? [],
    },
  };
};

export const adminGetNewEnrollmentCounts = async () => {
  const [training, grooming, boarding] = await Promise.all([
    axiosInstance.get("/api/v1/admin/requests/enrollments/training", {
      ...adminRequestConfig(),
      params: { page: 1, limit: 1, status: "new" },
    }),
    axiosInstance.get("/api/v1/admin/requests/enrollments/grooming", {
      ...adminRequestConfig(),
      params: { page: 1, limit: 1, status: "new" },
    }),
    axiosInstance.get("/api/v1/admin/requests/enrollments/boarding", {
      ...adminRequestConfig(),
      params: { page: 1, limit: 1, status: "new" },
    }),
  ]);

  const trainingCount = training.data.total ?? 0;
  const groomingCount = grooming.data.total ?? 0;
  const boardingCount = boarding.data.total ?? 0;

  return {
    training: trainingCount,
    grooming: groomingCount,
    boarding: boardingCount,
    total: trainingCount + groomingCount + boardingCount,
  };
};

export const adminGetNewLostFoundCounts = async () => {
  const [lostPets, foundPets] = await Promise.all([
    axiosInstance.get("/api/v1/admin/requests/lost-found/lost-pets", {
      ...adminRequestConfig(),
      params: { page: 1, limit: 1, status: "new" },
    }),
    axiosInstance.get("/api/v1/admin/requests/lost-found/found-pets", {
      ...adminRequestConfig(),
      params: { page: 1, limit: 1, status: "new" },
    }),
  ]);

  const lostPetsCount = lostPets.data.total ?? 0;
  const foundPetsCount = foundPets.data.total ?? 0;

  return {
    lostPets: lostPetsCount,
    foundPets: foundPetsCount,
    total: lostPetsCount + foundPetsCount,
  };
};
