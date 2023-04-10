import React, { useEffect } from 'react';
import Products from "../box/products"
import { useSelector, useDispatch } from 'react-redux'

const ProductsContainer = () => {
    const cartProducts = useSelector(state => state.cartProducts)
    // image, title, size, color, qty ,price 
    useEffect(() => {
    }, []);
    console.log(cartProducts)

    return (
        <div className="cartContainers">

            <div className="cart">
                <h2>Shopping Cart</h2>
                <hr />
                {cartProducts.map((element, index) => {
                    return <Products
                     image={element.img}
                    title={element.txt}
                     key={index} 
                     size={"none"}
                     color={"red"}
                     qty={element.qty || 1}
                     price={element.price}   
                     />
                })}
                {/* <Products/> */}
            </div>
        </div>
    );
}

export default ProductsContainer;
