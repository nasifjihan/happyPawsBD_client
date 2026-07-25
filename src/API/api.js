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

const getWithWarmup = async (url) => {
  await waitForApiReady();

  let lastError;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await axiosInstance.get(url);
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

// Lost Pet Form
export const addLostPet = async (data) => {
  const response = await axiosInstance.post("/lost_found/lost_form", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Get All Lost Pets
export const getLostPets = async () => {
  return getWithWarmup("/lost_found/lost_pets");
};

// Found Pet Form
export const addFoundPet = async (data) => {
  const response = await axiosInstance.post("/lost_found/found_form", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// All Found Pets
export const getFoundPets = async () => {
  return getWithWarmup("/lost_found/found_pets");
};

// Orders
export const orders = async (orderDetails) => {
  const response = await axiosInstance.post("/cart/orders", orderDetails);
  return response.data;
};

// Create Payment Session
export const createPaymentSession = async (
  cartItems,
  deliveryInfo,
  paymentMethod
) => {
  const response = await axiosInstance.post("/cart/orders/create-payment", {
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
    `/adoption/adoptable_pets/${code}`,
    adoption
  );
  return response.data;
};

export const trainingApplication = async (training, id) => {
  const response = await axiosInstance.post(`/training/${id}`, training);
  return response.data;
};

export const groomingApplication = async (grooming, id) => {
  const response = await axiosInstance.post(
    `/petcare/grooming/${id}`,
    grooming
  );
  return response.data;
};

export const boardingApplication = async (boarding, id) => {
  const response = await axiosInstance.post(
    `/petcare/boarding/${id}`,
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
