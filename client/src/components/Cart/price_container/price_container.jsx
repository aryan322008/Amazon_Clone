import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPriceAction } from "../../../states/actions/setPriceAction";
import { addInCurrentOrders } from "../../../states/actions/currentOrdersActions";
import { useNavigate } from "react-router-dom";
import { payments } from "../../../api/index.js";
import axios from "axios";

const PriceContainer = () => {
  const cartProducts = useSelector((state) => state.cartProducts);
  const dynamicPrice = useSelector((state) => state.price);
  const [price, setPrice] = useState(0);
  const [clientSecret, setClientSecret] = useState("");

  const navigate = useNavigate();

  const user = localStorage.getItem("token");

  const dispatch = useDispatch();

  useEffect(() => {
    const price = cartProducts.reduce((prevVal, currentVal) => {
      return prevVal + currentVal.item.price * currentVal.qty;
    }, 0); //0 is default value,
    dispatch(setPriceAction(price));
  }, [cartProducts]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ordersArray = cartProducts.map((product) => {
      return { item: product.item._id, qty: product.qty };
    });

    dispatch(addInCurrentOrders(ordersArray));

    navigate("/orders");
  };

  return (
    <div className="priceBox">
      <div className="subTotalTxt">
        <span className="maintxt">Subtotal {cartProducts.length}</span>

        <span className="priceTxt">: Rs.{dynamicPrice}</span>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <button type="submit">Proceed to Buy</button>
      </form>
    </div>
  );
};

export default PriceContainer;
