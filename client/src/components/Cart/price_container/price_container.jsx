import React from 'react';

const PriceContainer = () => {
    return (
        <div className="priceBox">

            <div className="subTotalTxt">

                <span className="maintxt">
                    Subtotal (2 items)
                </span>

                <span className="priceTxt">
                    :1,318.00
                </span>

            </div>

            <div className="checkbox">
                <input type="checkbox" name="check" id="checkBox" />
                <span>This order contains a gift</span>
            </div>

            <button>Proceed to Buy</button>

        </div>
    )
}

export default PriceContainer;
