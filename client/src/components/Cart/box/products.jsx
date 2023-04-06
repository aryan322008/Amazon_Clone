import React from 'react';
import jolochipPNG from "../../../assets/images/joloChip.png"

const Products = () => {
    return (
        <>
            <div className="Products">

                <div className="img">
                    <img src={jolochipPNG} alt="can't load" />
                </div>

                <div className="discription">
                    <div className="leftDesciption">
                        <span className="title">Jolochip laive with crazy nuts</span>

                        <div className="otherDiscription">

                            <div className="checkbox" style={{ marginBottom: "0px" }}>
                                <input type="checkbox" name="check" id="checkBox" />
                                <span>This order contains a gift</span>
                            </div>

                            <div className="size">
                                <span>size:  </span> 0 months-3 months
                            </div>

                            <div className="color">
                                <span>color:</span> black
                            </div>

                        </div>

                        <div className="crudOption">
                            <div className="quantity">

                                <input type="number" placeholder="Qty"/>

                        </div>


                    <div className="delete">
                        <span>Delete</span>
                    </div>
                </div>
            </div>


            <div className="priceInDescription">
                <span>$5.00</span>
            </div>

        </div >
        </div >

    <hr />

        </>
    );
}

export default Products;
