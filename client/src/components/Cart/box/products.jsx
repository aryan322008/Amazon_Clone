import React from 'react';
import jolochipPNG from "../../../assets/images/joloChip.png"

const Products = ({image, title, size, color, qty ,price }) => {
    return (
        <>
            <div className="Products">

                <div className="img">
                    <img src={image} alt="can't load" />
                </div>

                <div className="discription">
                    <div className="leftDesciption">
                        <span className="title">{title}</span>

                        <div className="otherDiscription">

                            <div className="checkbox" style={{ marginBottom: "0px" }}>
                                <input type="checkbox" name="check" id="checkBox" />
                                <span>This order contains a gift</span>
                            </div>

                            <div className="size">
                                <span>size:  </span> {size}
                            </div>

                            <div className="color">
                                <span>color:</span> {color}
                            </div>

                        </div>

                        <div className="crudOption">
                            <div className="quantity">

                                <input type="number" placeholder="Qty" value={qty}/>

                        </div>


                    <div className="delete">
                        <span>Delete</span>
                    </div>
                </div>
            </div>


            <div className="priceInDescription">
                <span>{price}</span>
            </div>

        </div >
        </div >

    <hr />

        </>
    );
}

export default Products;
