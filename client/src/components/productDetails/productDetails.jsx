import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetails } from "../../states/actions/detailsActions.js";
import Details from "./detailsPage/details.jsx";

const ProductDetails = () => {
  const { id } = useParams();
  const details = useSelector((state) => state.details);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDetails(id));
  }, []);


  return (
    <div
      className="m-top cartContainer detailsContainer"
      style={{ justifyContent: "center" }}
    >
      <div
        className="cartContainers h-100"
        style={{ height: "fitContent", width: "100%" }}
      >
        <div className="cart flex-row" style={{gap:"1rem", padding:"0px 10px"}}>
          <Details
            image={details.image}
            title={details.title}
            description={details.description}
            author={details.author}
            ageRating={details.ageRating}
            price={details.price}
            key={details._id}
            id={details._id}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
