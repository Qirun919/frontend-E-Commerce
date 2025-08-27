import axios from "axios";

import { API_URL } from "./constants";

export const getOrders = async () => {
  const response = await axios.get(API_URL + "orders");
  return response.data;
};

export const createOrder = async (
  customerName,
  customerEmail,
  products,
  totalPrice
) => {
  const response = await axios.post(API_URL + "orders", {
    customerName,
    customerEmail,
    products,
    totalPrice,
  });

  const handleChangeStatus = async (newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/orders/${orders.id}`, {
        method: "PUT", // or PATCH depending on your backend
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update");

      // Update local UI
      setOrders((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      console.error(err);
    }
  };
  return response.data;
};
