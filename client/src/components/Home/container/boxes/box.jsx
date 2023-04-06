import React from 'react';

const Box = ({txt,price,rating, img , styles}) => {
    return (
        <div className="box" style={styles?styles:null}>

        <div className="boxHeader">
            <span className="txt">{txt}</span>
            <span className="price">{price}</span>
            <span className="starReview">{`${rating} Star`}</span>
        </div>

        <div className="product">
            <img src={img} alt="can't load image" />
            <button className="Btn">Add to Cart</button>
        </div>

    </div>

    );
}

export default Box;
