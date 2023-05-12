import React, { useState, useEffect } from "react";
import History_product_section from "./product_section";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchHistory } from "../../states/actions/ordersAction";

const OrdersHistory = () => {
  const { name, orders } = useSelector((state) => state.ordersHistory);

  const user = localStorage.getItem("user");

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHistory());
  }, []);

  return (
    <div className="m-top cartContainer" style={{ justifyContent: "center" }}>
      <div
        className="cartContainers"
        style={{ height: "fitContent", width: "100%" }}
      >
        <div className="cart">
          <div className="productsHeader">
            <h2>Previous Orders For {name} :</h2>
          </div>
          <hr />

          {orders &&
            orders.map((element) => {
              return (
                <History_product_section
                  date={element.date}
                  array={element.products}
                  subtotal={element.subtotal}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default OrdersHistory;
