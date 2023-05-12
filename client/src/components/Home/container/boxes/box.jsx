import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCartItem } from "../../../../states/actions/cartAction";
import { Link } from "react-router-dom";

const Box = ({ txt, price, rating, img, id, index, color, desc, author }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addCartItem({ id }));
  };

  return (
    <div className={`box ${index === 0 ? "m-left" : ""}`}>
      <div className="boxHeader">
        <span className="txt">{txt.slice(0,100)}...</span>
        <span className="price">Rs.{price}</span>
        <span className="price">{`${rating} +`}</span>
        <p className="txt" style={{ marginTop: "0.5rem" , color:"#575757"}}>
          {author}
        </p>
      </div>

      <div className="product">
      <Link to={`/product/${id}`}><img src={img} alt="can't load image" /></Link> 
        <button className="Btn" onClick={handleClick}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Box;


