import React from 'react';
import PriceContainer from './price_container/price_container';
import ProductsContainer from './products_container/products_container';

const Cart = () => {
    return (
        <div className="cartContainer">

            <ProductsContainer />
            <PriceContainer />

        </div>
    );
}

export default Cart;

// First create Subtotal then create the products container