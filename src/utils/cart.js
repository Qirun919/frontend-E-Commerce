// add product to cart
export function AddToCart(product) {
  let cart = localStorage.getItem("cart");
  cart = cart ? JSON.parse(cart) : [];

  const existingProduct = cart.find((item) => item._id === product._id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
}

//get all the items in the cart
export function getCart() {
  let cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// update the cart to local storage
export function updateCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
}

// delete item from the cart
export function deleteItemFromCart(id) {
  let cart = getCart();
  cart = cart.filter((item) => item._id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
}
