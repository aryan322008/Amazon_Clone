import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {addItem} from "../../../../states/actions/cartAction"

const Box = ({txt,price,rating, img , styles}) => {
    const cartProducts = useSelector(state => state.cartProducts)
    const dispatch = useDispatch() 

// // image, title, size, color, qty ,price 
    const handleClick = () => {
        dispatch(addItem({txt, price, rating, img}))
    }

    return (
        <div className="box" style={styles?styles:null}>

        <div className="boxHeader">
            <span className="txt">${txt}</span>
            <span className="price">{price}</span>
            <span className="starReview">{`${rating} Star`}</span>
        </div>

        <div className="product">
            <img src={img} alt="can't load image" />
            <button className="Btn" onClick={handleClick}>Add to Cart</button>
        </div>

    </div>

    );
}

export default Box;
