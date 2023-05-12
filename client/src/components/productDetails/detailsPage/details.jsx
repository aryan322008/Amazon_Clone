import React from "react";
import { addCartItem } from "../../../states/actions/cartAction";
import {  useDispatch } from "react-redux";

const Details = ({ image, title, description, author, ageRating, price, id }) => {
  
  const dispatch = useDispatch();
  
  const handleCart = () => {
    dispatch(addCartItem(id))
  };

  return (
    <>
      <div className="image">
        <img classname="img" src={image} alt="error loading" />
      </div>
      <div className="productsNonImageContainer d-flex" style={{ gap: "1rem" }}>
        <div className="details h-100">
          <hr style={{ marginTop: "0px" }} />
          <div className="title">
            <title className="d-block w-100">{title}</title>
          </div>
          <hr />

          <div className="detailsPrice detailsSubtotal">
            <span>₹{price}</span>
          </div>

          <hr />

          <div className="detailsPrice d-flex flex-column">
            <span>age rating:</span>
            {ageRating}
            <span className="px-3 f-14"> 4 yrs or older </span>
          </div>
          <hr />

          <div className="detailsPrice d-flex flex-column">
            <span>creator:</span>
            {author}
            <span className="px-3 f-14">Aryan Gavale</span>
          </div>
          <hr />

          <div className="desc">
            <p>{description}</p>
          </div>
        </div>

        <div
          className="priceBox align-items-start justify-content-start detailsActions"
          style={{ padding: "13px", paddingTop: "7px" }}
        >
          <div className="subTotalTxt my-2 detailsSubtotal">
            <span>₹{price}</span>
          </div>

          <div className="quantity">
            <input
              type="number"
              placeholder="Qty"
              //   value={Qty <= 0 ? 1 : Qty}
              //   onChange={handleChange}
            />
          </div>
          <form className="form">
            <button className="my-2" onClick={handleCart}>
              Add to Cart
            </button>
            <button style={{ background: "#ffa41c" }}>Buy Now</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Details;

//age rating, colors,author
