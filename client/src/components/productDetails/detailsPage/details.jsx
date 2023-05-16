import React, { useState, useEffect } from "react";
import { addCartItem } from "../../../states/actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { create_checkout_session } from "../../../states/actions/paymentAction";
import { CircularProgress } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";

const Details = ({
  image,
  title,
  description,
  author,
  ageRating,
  price,
  id,
}) => {
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const [Qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const Options = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  };

  const handleCart = () => {
    dispatch(addCartItem({ id, qty: Qty }));
  };

  const handleChange = (event) => {
    setQty(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = localStorage.getItem("user");

    if (JSON.parse(user).token) {
      setLoader(true);
      dispatch(create_checkout_session({ id, qty: Qty }))
        .then((res) => {
          setLoader(false);
        })
        .catch((err) => {
          setLoader(false);

          toast.error("please try again after reloading", Options);
        });
    } else {
      toast.error("please sign in", Options);
    }
  };

  return (
    <>
      <div className="title" style={{ width: "95%" }}>
        <title className="d-block w-100">{title}</title>
      </div>

      <div className="bottomContainer d-flex" style={{ gap: "1rem" }}>
        <div className="image">
          <img className="img" src={image} alt="error loading" />
        </div>

        <div
          className="productsNonImageContainer d-flex"
          style={{ gap: "1rem" }}
        >
          <div className="details h-100 d-flex flex-column">
            <div className="detailsPrice detailsSubtotal">
              <span>₹{price}</span>
            </div>

            <hr />

            <div className="detailsPrice d-flex flex-column">
              <span>age rating:</span>
              <span className="px-3 f-14">{ageRating} yrs or older </span>
            </div>
            <hr />

            <div className="detailsPrice d-flex flex-column">
              <span>creator:</span>
              <span className="px-3 f-14"> {author}</span>
            </div>
            <hr />
          </div>

          <div
            className="priceBox align-items-start justify-content-start detailsActions"
            style={{ padding: "13px", paddingTop: "7px" }}
          >
            <div className="subTotalTxt my-2 detailsSubtotal">
              <span>₹{price}</span>
            </div>

            <div className="quantity my-4">
              <input
                type="number"
                placeholder="Qty"
                value={Qty <= 0 ? 1 : Qty}
                onChange={handleChange}
              />
            </div>

            <button className="my-2" onClick={handleCart}>
              Add to Cart
            </button>

            <form className="form" onSubmit={handleSubmit}>
              <button style={{ background: "#ffa41c" }}>
                {loader ? <CircularProgress /> : "Buy Now"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="desc">
        <span>Products Description</span>
        <p>{description}</p>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        limit={2}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Details;
