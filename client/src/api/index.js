import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }
  return req;
});

const fetchItem = async () => {
  return await API.get("/items/getItem");
};

const addItem = async (formData) => {
  return await API.post("/items/addItem", formData);
};

const fetchCartItem = async () => {
  return await API.get("/items/getCartItems");
};

const addCartItem = async ({id, qty}) => {
  return await API.post("/items/addCartItem", {id, qty});
};

const deleteCartItem = async (id) => {
  return await API.post(`/items/deleteCartItem/${id}`);
};

const updateCartQty = async (updateValue) => {
  return await API.post(`/items/updateCartItem`, updateValue);
};

const register = async (formData) => {
  return await API.post("/auth/register", formData);
};

const login = async (formData) => {
  return await API.post("/auth/login", formData);
};

const payments = async () => {
  return await API.post("/payment/create-checkout-session");
};

const addInOrders = async (cartProducts) => {
  return await API.post("/orders/add-orders", cartProducts);
};

const addInCurrentOrders = async (cartProducts) => {
  return await API.post("/orders/current-orders/add", cartProducts);
};

const fecthOrders = async () => {
  return await API.post("/orders/fetch");
};

const fetch_my_products = async () => {
  return await API.get("/items/my-products");
};

const delete_my_products = async (id) => {
  return await API.post(`/items/my-products/delete/${id}`);
};

const checkAdmin = async (formData) => {
  return await API.post("/auth/admin/login", formData);
};

const fetchHistory = async () => {
  return await API.get("/orders/fetch-orders");
};

const getSearchItems = async ({searchText, page}) => {
  console.log(searchText)
  return await API.post(`/search/get?search_text=${searchText}&page=${page}`);
};

const fetchSearchItems = async ({search, page}) => {
  return await API.get(`/search/fetch?search_text=${search}&page=${page}`);
};

const fetchDetails = async (id) => {
  return await API.get(`/product_details/${id}`);
};

const forgotPassword = async (email) => {
  return await API.post(`/auth/forgot-password`, {email} );
};

const resetPassword = async ({veriCode, newPass, email}) => {
  return await API.post(`/auth/reset-password`,{veriCode, newPass, email} );
};

const create_checkout_session = async ({id, qty}) => {
  return await API.post("/payments/create-checkout-session", {id, qty});
};

export {
  fetchItem,
  fetchCartItem,
  addCartItem,
  register,
  login,
  deleteCartItem,
  updateCartQty,
  payments,
  addInOrders,
  addInCurrentOrders,
  fecthOrders,
  addItem,
  fetch_my_products,
  delete_my_products,
  checkAdmin,
  fetchHistory,
  getSearchItems,
  fetchSearchItems,
  fetchDetails, 
  forgotPassword, 
  resetPassword,
  create_checkout_session
};
