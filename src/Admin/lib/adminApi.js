import axiosInstance from "../../API/axiosInstance";

const getAdminToken = () => sessionStorage.getItem("hpbd_admin_token") || "";

const adminRequestConfig = () => {
  const token = getAdminToken();

  return token
    ? {
        headers: {
          "x-admin-token": token,
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
    animals,
    orders,
    volunteers,
    adoptions,
    training,
    grooming,
    boarding,
    lostPets,
    foundPets,
  ] = await Promise.all([
    axiosInstance.get("/api/v1/admin/catalog/shop-items", config),
    axiosInstance.get("/api/v1/admin/adoption/animals", config),
    axiosInstance.get("/api/v1/admin/orders", config),
    axiosInstance.get("/api/v1/admin/requests/volunteers", config),
    axiosInstance.get("/api/v1/admin/requests/adoptions", config),
    axiosInstance.get("/api/v1/admin/requests/enrollments/training", config),
    axiosInstance.get("/api/v1/admin/requests/enrollments/grooming", config),
    axiosInstance.get("/api/v1/admin/requests/enrollments/boarding", config),
    axiosInstance.get("/api/v1/admin/requests/lost-found/lost-pets", config),
    axiosInstance.get("/api/v1/admin/requests/lost-found/found-pets", config),
  ]);

  return {
    shopItems: shopItems.data.total,
    adoptableAnimals: animals.data.total,
    orders: orders.data.total,
    volunteerApplications: volunteers.data.total,
    adoptionApplications: adoptions.data.total,
    trainingEnrollments: training.data.total,
    groomingEnrollments: grooming.data.total,
    boardingEnrollments: boarding.data.total,
    lostPets: lostPets.data.total,
    foundPets: foundPets.data.total,
  };
};

export const adminListShopItems = async ({ page, limit }) => {
  const response = await axiosInstance.get("/api/v1/admin/catalog/shop-items", {
    ...adminRequestConfig(),
    params: { page, limit },
  });

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

export const adminListAdoptableAnimals = async ({ page, limit }) => {
  const response = await axiosInstance.get("/api/v1/admin/adoption/animals", {
    ...adminRequestConfig(),
    params: { page, limit },
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

export const adminListOrders = async ({ page, limit }) => {
  const response = await axiosInstance.get("/api/v1/admin/orders", {
    ...adminRequestConfig(),
    params: { page, limit },
  });

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

export const adminListVolunteerApplications = async ({ page, limit }) => {
  const response = await axiosInstance.get("/api/v1/admin/requests/volunteers", {
    ...adminRequestConfig(),
    params: { page, limit },
  });

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

export const adminListAdoptionApplications = async ({ page, limit }) => {
  const response = await axiosInstance.get("/api/v1/admin/requests/adoptions", {
    ...adminRequestConfig(),
    params: { page, limit },
  });

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

export const adminListEnrollments = async ({ type, page, limit }) => {
  const response = await axiosInstance.get(
    `/api/v1/admin/requests/enrollments/${type}`,
    {
      ...adminRequestConfig(),
      params: { page, limit },
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

export const adminListLostFoundReports = async ({ type, page, limit }) => {
  const response = await axiosInstance.get(
    `/api/v1/admin/requests/lost-found/${type}`,
    {
      ...adminRequestConfig(),
      params: { page, limit },
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

