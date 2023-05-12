import React, { useEffect } from "react";
import Box from "./boxes/box";
import { useSelector, useDispatch } from "react-redux";
import { getItems } from "../../../states/actions/cartAction";

const Container = () => {
  const dispatch = useDispatch();
  const searchDisplay = useSelector((state) => state.search_display);

  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getItems());
  }, []);


  return (
    <>
    <div className="Container" style={{filter: `blur(${searchDisplay.display?"5px":"0px"})`}}>

    <h1 className="products_header">Latest Products</h1>

      <div className="twoBoxesContainer">
        {products.slice(0, 2).map((element, index) => {
          return (
            <Box
              txt={element.title}
              rating={element.ageRating}
              img={element.image}
              price={element.price}
              author={element.author}
              color={element.color}
              id={element._id}
              elemet={`${element._id} ${index}`}
              index={index}
              desc={element.description}
            />
          );
        })}
      </div>

      <div className="threeBoxContainer">
        {products.slice(2, 5).map((element, index) => {
          return (
            <Box
              txt={element.title}
              rating={element.ageRating}
              img={element.image}
              price={element.price}
              author={element.author}
              color={element.color}
              id={element._id}
              index={index}
              elemet={`${element._id} ${index}`}
              desc={element.description}
            />
          );
        })}
      </div>

      <div className="singleBoxContainer threeBoxContainer">
        {products.slice(-1).map((element, index) => {
          return (
            <Box
              txt={element.title}
              rating={element.ageRating}
              img={element.image}
              price={element.price}
              author={element.author}
              color={element.color}
              id={element._id}
              index={index}
              elemet={`${element._id} ${index}`}
              desc={element.description}
            />
          );
        })}
      </div>
    </div>
    </>
  );
};

export default Container;
