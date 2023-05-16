import React from "react";
import Navbar from "./components/Home/navbar/navbar";
import Auth from "./components/auth/auth";
import Cart from "./components/Cart/cart";
import OrdersHistory from "./components/OrdersHistory/OrdersHistory";
import Orders from "./components/Orders/orders";
import Sidebar from "./components/admin/dashboard/sidebar";
import Form from "./components/admin/add_products/form";
import Products from "./components/admin/your_products/productsContainer";
import AdminLogin from "./components/admin/login/form";
import Home from "./components/Home/Home";
import ProductDetails from "./components/productDetails/productDetails";
import ForgotPassword from "./components/auth/forgotPassword/forgotPassword";
import Verify_resetPassword from "./components/auth/verify_resetPassword/resetPassword"
import Message from "./components/message/message"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Mwm2gSJK14c2UQ1ZSKDBr1SBJgmDa6ea44x7wek9z9WSbgKwOcuL8INt5v6wFjrjQ3TK8YbSk08PBETm5pR09mq0021VW1IKz"
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        <Route
          path="/cart"
          element={
            <div className="main">
              <Navbar />
              <Cart />
            </div>
          }
        />

        <Route path="/auth" element={<Auth />} />

        <Route
          path="/orders"
          element={
            <div className="main">
              <Navbar />
              <Elements stripe={stripePromise}>
                <Orders />
              </Elements>
            </div>
          }
        />

        <Route
          path="/ordersHistory"
          element={
            <div className="main">
              <Navbar />
              <OrdersHistory />
            </div>
          }
        />

        <Route
          path="/admin/add_products"
          element={
            <div className="flexBox">
              <Sidebar />
              <Form />
            </div>
          }
        />

        <Route
          path="/admin/show_products"
          element={
            <div className="main d-flex">
              <Sidebar />
              <Products />
            </div>
          }
        />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/product/:id"
          element={
            <>
              <Navbar />
              <ProductDetails />
            </>
          }
        />
        <Route
          path="/auth/forgot-password"
          element={
            <>
              <ForgotPassword />
            </>
          }
        />
        <Route
          path="/forgot-password/verify"
          element={
            <>
              <Verify_resetPassword/>
            </>
          }
        />

        <Route
          path="/message/:id"
          element={
            <>
              <Message/>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
