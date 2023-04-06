import React from 'react';
import Products from "../box/products"

const ProductsContainer = () => {
    return (

        <div className="cartContainers">

            <div className="cart">
                <h2>Shopping Cart</h2>
                <hr />
                <Products/>
                <Products/>
            </div>
        </div>
    );
}

export default ProductsContainer;
