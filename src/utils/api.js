import axios from "axios";

const API_URL = "http://localhost:5919/products";

export async function getProducts(category) {
  const response = await axios.get(
    API_URL + (category === "all" ? "" : "?category=" + category)
  );
  return response.data;
}

export function getProduct() {}

export function addProduct() {}

export function updateProduct() {}

export function deleteProduct() {}
