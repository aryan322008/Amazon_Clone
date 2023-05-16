import React, { useState, useEffect } from "react";
import successGif from "../../assets/success-gif.json";
import failureGif from "../../assets/failure-gif.json";
import Lottie from "react-lottie";
import {useNavigate, useSearchParams } from "react-router-dom";
import { fetchDetails } from "../../states/actions/detailsActions.js";
import { useDispatch, useSelector } from "react-redux";
import { addInOrders } from "../../states/actions/ordersAction";
import { useParams } from "react-router-dom";

const Message = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");
  const qty = searchParams.get("qty");
  const details = useSelector((state) => state.details);
  const { id } = useParams();
  const navigate =  useNavigate()

  const [msgType, setMsgType] = useState("");

  useEffect(() => {
    dispatch(fetchDetails(id));
  }, []);

  useEffect(() => {
    if (type === "success") {
      setMsgType(true);

      if (details.title) {
       
        dispatch(
          addInOrders({
            products: { item: details._id, qty: qty },
            subtotal: details.price * qty,
          })
        );
        
        setTimeout(() => {
          navigate(`/product/${id}`)
        }, 2000);
        
      }
    } else if (type === "canceled") {
      setMsgType(false);

      setTimeout(() => {
        navigate(`/product/${id}`)
      }, 2000);
    }
  }, [details]);

  const options = (gif) => {
    return {
      loop: true,
      autoplay: true,
      animationData: gif,
      renderer: "svg",
    };
  };

  return (
    <div
      className="m-top cartContainer h-100"
      style={{ justifyContent: "center", top: "0px" }}
    >
      <div
        className="cartContainers h-100"
        style={{ height: "fitContent", width: "100%" }}
      >
        <div className="cart">
          {msgType ? (
            <div>
              <Lottie options={options(successGif)} height={500} width={500} />
              <div className="w-100 text-center">
                <h1 style={{ color: "#0c8ccd" }}>Payment Successful ✅ </h1>
              </div>
            </div>
          ) : (
            <div className="w-100 text-center">
              <Lottie options={options(failureGif)} height={500} width={500} />
              <h1 style={{ color: " #f7313e" }}>Payment Unsuccessful ❗ </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
