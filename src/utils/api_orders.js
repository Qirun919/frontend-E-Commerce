import axios from "axios";

import { API_URL } from "./constants";

export const createOrder = async (
  customerName,
  customerEmail,
  getProducts,
  totalPrice
) => {
  const response = await axios.post(API_URL + "orders", {
    customerName,
    customerEmail,
    getProducts,
    totalPrice,
  });

  return response.data;
};
