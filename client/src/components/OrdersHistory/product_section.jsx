import React from "react";
import Products from "../Cart/box/products";

const ProductSection = ({ array, date, subtotal }) => {
  const new_date = new Date(date);

  return (
    <div className="prevProducts">
      <p className="date formattedDate my-4">
        {new_date.toLocaleDateString("en-US")}
      </p>

      {array.map((element) => {
        return (
          <Products
            title={element.item.title}
            image={element.item.image}
            ageRating={element.item.ageRating}
            price={element.item.price}
            author={element.item.author}
            color={element.item.color}
            qty={element.qty}
            id={element._id}
            desc={element.item.description}
            qtyField={false}
            deteleBtn={false}
            key={element._id}
            itemId={element.item._id}
          />
        );
      })}

      <p
        className="subTotal bold linear-gradient-color  subTotal_history" 
      >
        Subtotal : {subtotal}
      </p>
    </div>
  );
};

export default ProductSection;
