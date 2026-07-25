import axiosInstance from "./axiosInstance";

// Lost Pet Form
export const addLostPet = async (data) => {
  const response = await axiosInstance.post("/lost_found/lost_form", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Get All Lost Pets
export const getLostPets = async () => {
  const response = await axiosInstance.get("/lost_found/lost_pets");
  return response.data;
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
  const response = await axiosInstance.get("/lost_found/found_pets");
  return response.data;
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
