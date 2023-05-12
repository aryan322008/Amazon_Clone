import React, { useEffect } from "react";
import Products from "../box/products";
import { useSelector, useDispatch } from "react-redux";
import { getCartItems } from "../../../states/actions/cartAction";

const ProductsContainer = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cartProducts);
  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  return (
    <div className="cartContainers">
      <div className="cart">
        <h2>Shopping Cart</h2>
        <hr />
        {cartProducts.map((element, index) => {
          return (
            <Products
              image={element.item.image}
              title={element.item.title}
              key={element._id}
              ageRating={element.item.ageRating}
              qty={element.qty}
              price={element.item.price}
              id={element._id}
              itemId={element.item._id}
              desc={element.item.description}
              qtyField={true}
              deleteBtn={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductsContainer;
