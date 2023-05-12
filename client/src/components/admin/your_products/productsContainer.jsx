import React, { useEffect } from "react";
import Products from "../../Cart/box/products";
import Product from "./product";
import { fetch_my_products } from "../../../states/actions/my_products.js";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "react-router-dom";

const ProductsContainer = () => {
  const products = useSelector((state) => state.my_products);
  const dispatch = useDispatch();

  const user = localStorage.getItem("user");
  const admin_verified = localStorage.getItem("admin_verified");

  useEffect(() => {
    if(!user){
      return redirect("/auth");
    }
    
    if(!admin_verified){
      return redirect("/admin/login")
    }
  }, []);


  useEffect(() => {
    dispatch(fetch_my_products());
  }, []);

  return (
    <div className="container" style={{ position: "relative", top: "55px" }}>
      <div className="cartContainers">
        <div className="cart">
          {products.map(
            ({ price, ageRating, description, title, image, date, _id }) => {
              return (
                <Product
                  price={price}
                  ageRating={ageRating}
                  description={description}
                  title={title}
                  image={image}
                  date={date}
                  key={_id}
                  id={_id}
                />
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsContainer;
