import axiosInstance from "./axiosInstance";
import { appEnv } from "../config/env";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isRenderApi = /onrender\.com/i.test(appEnv.apiBaseUrl);
let readyCheckPromise = null;

const waitForApiReady = async () => {
  if (!isRenderApi) {
    return;
  }

  if (!readyCheckPromise) {
    readyCheckPromise = (async () => {
      for (let attempt = 0; attempt < 4; attempt += 1) {
        try {
          const response = await axiosInstance.get("/ready", {
            validateStatus: () => true,
          });

          if (response.status === 200) {
            return;
          }
        } catch (error) {
          // Keep retrying while the service is waking up.
        }

        await sleep(1500 * (attempt + 1));
      }
    })().finally(() => {
      readyCheckPromise = null;
    });
  }

  await readyCheckPromise;
};

const shouldRetryGetRequest = (error) => {
  const status = error?.response?.status;

  return (
    !status ||
    status === 408 ||
    status === 425 ||
    status === 429 ||
    status >= 500
  );
};

const getWithWarmup = async (url, config) => {
  await waitForApiReady();

  let lastError;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await axiosInstance.get(url, config);
      return response.data;
    } catch (error) {
      lastError = error;

      if (!shouldRetryGetRequest(error) || attempt === 2) {
        throw error;
      }

      await sleep(1000 * (attempt + 1));
    }
  }

  throw lastError;
};

const createQueryConfig = (params = {}) => ({
  params: Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined)
  ),
});

// Lost Pet Form
export const addLostPet = async (data) => {
  const response = await axiosInstance.post("/api/v1/lost-found/lost-pets", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Get All Lost Pets
export const getLostPets = async (params) =>
  getWithWarmup(
    "/api/v1/lost-found/lost-pets",
    createQueryConfig(params)
  );

// Found Pet Form
export const addFoundPet = async (data) => {
  const response = await axiosInstance.post("/api/v1/lost-found/found-pets", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// All Found Pets
export const getFoundPets = async (params) =>
  getWithWarmup(
    "/api/v1/lost-found/found-pets",
    createQueryConfig(params)
  );

// Orders
export const orders = async (orderDetails) => {
  const response = await axiosInstance.post("/api/v1/orders", orderDetails);
  return response.data;
};

export const getPublicOrder = async (token) => {
  const response = await axiosInstance.get(`/api/v1/orders/public/${token}`);
  return response.data;
};

// Create Payment Session
export const createPaymentSession = async (
  cartItems,
  deliveryInfo,
  paymentMethod
) => {
  const response = await axiosInstance.post("/api/v1/payments/checkout-session", {
    items: cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    })),
    deliveryInfo,
    paymentMethod,
  });
  return response.data;
};

// Adoption, Training, Grooming, Boarding
export const adoptionApplication = async (adoption, code) => {
  const response = await axiosInstance.post(
    `/api/v1/adoption/applications/${code}`,
    adoption
  );
  return response.data;
};

export const trainingApplication = async (training, id) => {
  const response = await axiosInstance.post(
    `/api/v1/enrollments/training/${id}`,
    training
  );
  return response.data;
};

export const groomingApplication = async (grooming, id) => {
  const response = await axiosInstance.post(
    `/api/v1/enrollments/grooming/${id}`,
    grooming
  );
  return response.data;
};

export const boardingApplication = async (boarding, id) => {
  const response = await axiosInstance.post(
    `/api/v1/enrollments/boarding/${id}`,
    boarding
  );
  return response.data;
};

export const volunteerApplication = async (application) => {
  const response = await axiosInstance.post(
    "/api/v1/volunteers/applications",
    application
  );
  return response.data;
};

export const getAdoptableAnimals = async () =>
  getWithWarmup("/api/v1/adoption/animals");

export const getAdoptableAnimal = async (code) =>
  getWithWarmup(`/api/v1/adoption/animals/${code}`);

export const getShopItems = async () =>
  getWithWarmup("/api/v1/catalog/shop-items");

export const getVetProviders = async (params) =>
  getWithWarmup("/api/v1/vets", createQueryConfig(params));

export const getVetDirectoryMeta = async (params) =>
  getWithWarmup("/api/v1/vets/meta", createQueryConfig(params));

export const getPrograms = async (type, params) =>
  getWithWarmup(`/api/v1/programs/${type}`, createQueryConfig(params));

export const getProgram = async (type, id) =>
  getWithWarmup(`/api/v1/programs/${type}/${id}`);

export const requestOnlineConsultation = async (payload) => {
  await waitForApiReady();
  const response = await axiosInstance.post("/api/v1/consultations/online", payload);
  return response.data;
};

export const submitReview = async (payload) => {
  await waitForApiReady();
  const response = await axiosInstance.post("/api/v1/reviews", payload);
  return response.data;
};

export const getApprovedReviews = async (params) =>
  getWithWarmup("/api/v1/reviews", createQueryConfig(params));
