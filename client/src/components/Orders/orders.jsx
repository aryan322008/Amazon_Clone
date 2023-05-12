import React, { useState, useEffect } from "react";
import Products from "../Cart/box/products";
import ProductsContainer from "../Cart/products_container/products_container";
import { CircularProgress } from "@material-ui/core";
import { addInOrders } from "../../states/actions/ordersAction";
import {
  addInCurrentOrders,
  fecthOrders,
} from "../../states/actions/currentOrdersActions";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import Gif from "./Gif.jsx";

const Orders = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [CurrentOrderTotal, setCurrentOrderTotal] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [status, setStatus] = useState("");

  const orders = useSelector((state) => state.orders);

  const price = orders.reduce((prevVal, currentVal) => {
    return prevVal + currentVal?.item?.price * currentVal?.qty;
  }, 0); //0 is default value,

  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, []);

  useEffect(() => {
    dispatch(fecthOrders());
    setCurrentOrderTotal(price);
  }, []);

  useEffect(() => {
    const getClientSecret = async () => {
      if (price != 0) {
        const { data } = await axios.post(
          `http://localhost:5000/payments/create?total=${price * 100}`
        );
        setClientSecret(data.clientSecret);
      }
    };

    getClientSecret();
  }, [orders]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setPaymentProcessing(true);
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (payload.paymentIntent.status === "succeeded") {
        setPaymentProcessing(false);

        setStatus("success");

        const ordersHistoryArray = orders.map((product) => {
          return { item: product.item._id, qty: product.qty };
        });

        // this is a action to add products inside order_history and not in current order
        dispatch(
          addInOrders({ products: ordersHistoryArray, subtotal: price })
        );

        setTimeout(() => {
          setStatus("");
          dispatch(addInCurrentOrders([]));
        }, 5000);
      }
    } catch (error) {
      setStatus("failure");
      setPaymentProcessing(false)
      setTimeout(() => {
        setStatus("");
      }, 5000);
    }
  };

  return (
    <div className="m-top cartContainer" style={{ justifyContent: "center" }}>
      <div
        className="cartContainers"
        style={{ height: "fitContent", width: "100%" }}
      >
        <div className="cart">
          <div className="ordersHeader flex">
            <h2>Your Orders:</h2>
            <Link to="/ordersHistory">
              <span>Check your previous orders</span>
            </Link>
          </div>

          <hr />
          <div className="ordersDetails">
            <div className="email">
              <span className="emailTxt bold">Email : </span>
              <span>{JSON.parse(user).email}</span>
            </div>
            <div className="address">
              <span className="emailTxt bold">Address : </span>
              <span>{"address"}</span>
            </div>
          </div>

          <hr />

          { orders.map((element, index) => {
            return (
              <Products
                title={element.item.title}
                image={element.item.image}
                ageRating={element.item.ageRating}
                price={element.item.price}
                author={element.item.author}
                color={element.item.color}
                qty={element.qty}
                id={element._id}
                desc={element.item.description}
                qtyField={false}
                deteleBtn={false}
                key={element._id}
                itemId={element.item._id}
                styles={{
                  flexDirection: "column",
                  display: "flex",
                  gap: "0.5rem",
                }}
              />
            );
          })}

          <div className="paymentForm">
            {status === "" ? (
              <div>
                <div
                  className="subTotal"
                  style={{ fontSize: "1.5rem", width: "100%" }}
                >
                  <span className="bold">Subtotal : </span>
                  <span>{price}</span>
                </div>

                <div className="d-flex justify-content-center align-items-center w-100">
                  <CircularProgress
                    style={{
                      visibility: `${paymentProcessing ? "visible" : "hidden"}`,
                      position: "absolute",
                    }}
                  />
                </div>
                <div
                  className="stripeForm"
                  style={{
                    visibility: `${!paymentProcessing ? "visible" : "hidden"}`,
                  }}
                >
                  <span className="bold display">Enter Card details : </span>

                  <form onSubmit={handleSubmit} className="form">
                    <CardElement />
                    <button
                      type="submit"
                      className="stripeBtn"
                      style={{ marginTop: "1rem" }}
                      disabled={price === 0 ? true : false}
                    >
                      Proceed to Buy
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <Gif status={status} price={price} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
