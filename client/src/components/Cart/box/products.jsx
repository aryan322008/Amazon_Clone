import React, { useState, useEffect } from "react";
import jolochipPNG from "../../../assets/images/joloChip.png";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCartItem,
  updateCartQty,
} from "../../../states/actions/cartAction";
import { setPriceAction } from "../../../states/actions/setPriceAction";
import { Link } from "react-router-dom";

const Products = ({
  image,
  title,
  qty,
  price,
  id,
  ageRating,
  desc,
  qtyField,
  deleteBtn,
  itemId,
  styles,
  contentForSearch
}) => {
  const cartProducts = useSelector((state) => state.cartProducts);
  const dynamicPrice = useSelector((state) => state.price);
  const dispatch = useDispatch();

  const [Qty, setQty] = useState(0);

  useEffect(() => {
    setQty(qty);
  }, []);

  const handleChange = (e) => {
    setQty(e.target.value);

    dispatch(updateCartQty({ id, qty: e.target.value }));

    const Price = dynamicPrice + price;

    dispatch(setPriceAction(Price));
  };

  const handleDelete = async () => {
    dispatch(deleteCartItem(id));
  };

  return (
    <>
      <div className="Products">
        <div className="img">
        <Link to={`/product/${itemId}`}><img src={image} alt="can't load" /> </Link>
        </div>

        <div className="discription">
          <div className="leftDesciption" style={styles && styles}>
            <span className="title">{contentForSearch?title.slice(0,80):title}</span>

            <div className="otherDiscription">
              <div className="size">
                <span>Rs. {price}</span>
              </div>

              <div className="size">
                <span> {ageRating} + </span>
              </div>

              {!qtyField && (
                <div className="size">
                  <span> Qty. {qty} </span>
                </div>
              )}
            </div>

            <div className="description" style={{ color: "grey" }}>
              <span>
                {!qtyField && !deleteBtn
                  ? desc.slice(0, 400)
                  : desc.slice(0, 100)}
                ...
              </span>
            </div>

            <div className="crudOption">
              <div className="quantity">
                {qtyField && (
                  <input
                    type="number"
                    placeholder="Qty"
                    value={Qty <= 0 ? 1 : Qty}
                    onChange={handleChange}
                  />
                )}
              </div>

              {deleteBtn && (
                <div className="delete" onClick={handleDelete}>
                  <span>Delete</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <hr />
    </>
  );
};

export default Products;
