import React from "react";
import product_image from "../../../assets/images/joloChip.png";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDispatch } from "react-redux";
import { delete_my_products } from "../../../states/actions/my_products.js";

const Product = ({ price, ageRating, description, title, image, date, id }) => {

  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(delete_my_products(id))
  };

  return (
    <div className="Products">
      <div className="img">
        <img src={image} alt="can't load" />
      </div>

      <div className="discription">
        <div className="leftDesciption">
          <span className="title">{title.slice(0,20)}</span>

          <div className="otherDiscription">
            <div className="size">
              <span>Rs. {price}</span>
            </div>

            <div className="color">
              <span> {ageRating} + </span>
            </div>
          </div>

          <div className="group">
            <div className="description">
              <span>{description.slice(0, 30)}...</span>
            </div>

            <div className="date">
              <span>{date}</span>
            </div>
          </div>

          <div className="crudOption">
            <div className="delete" onClick={handleDelete}>
              <span>
                <DeleteOutlineOutlinedIcon />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

// date
