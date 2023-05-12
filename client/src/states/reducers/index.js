import { combineReducers } from "redux";
import cartProducts from "./cartProducts";
import products from "./products";
import auth from "./auth";
import price from "./price";
import ordersHistory from "./ordersHistory.js";
import orders from "./orders.js";
import my_products from "./my_products.js";
import search from "./search.js";
import search_display from "./searchDisplay.js";
import details from "./details.js";

export default combineReducers({
  cartProducts,
  products,
  auth,
  price,
  ordersHistory,
  orders,
  my_products,
  search,
  search_display,
  details
});
