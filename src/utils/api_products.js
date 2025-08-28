import axios from "axios";

import { API_URL } from "./constants";

// show all products
export async function getProducts(category, page = 1) {
  const response = await axios.get(
    API_URL +
      "products?page=" +
      page +
      (category === "all" ? "" : "&category=" + category)
  );
  // http://localhost:5919/products?page=1&category=Consoles
  return response.data;
}

// show product with id
export async function getProduct(id) {
  const response = await axios.get(API_URL + "products/" + id);
  return response.data;
}

// create product
export async function addProduct(name, description, price, category, image) {
  const response = await axios.post(API_URL + "products", {
    name,
    description,
    price,
    category,
    image,
  });
  return response.data;
}

// update product with id
export async function updateProduct(
  id,
  name,
  description,
  price,
  category,
  image
) {
  const response = await axios.put(API_URL + "products/" + id, {
    name: name,
    description: description,
    price: price,
    category,
    image,
  });
  return response.data;
}

export async function deleteProduct(id) {
  const response = await axios.delete(API_URL + "products/" + id);
  return response.data;
}
