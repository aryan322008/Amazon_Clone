import React from 'react';
import Products from '../Cart/box/products';
import ProductsContainer from '../Cart/products_container/products_container';

const Orders = () => {
    return (
        <div className="cartContainer" style={{justifyContent:"center"}}>
            <div className="cartContainers" style={{height:"fitContent"}}>

                <div className="cart">
                    <h2>Your Orders</h2>
                    <hr />
                    <Products />
                    <Products />
                </div>
            </div>
        </div>
    );
}

export default Orders;
