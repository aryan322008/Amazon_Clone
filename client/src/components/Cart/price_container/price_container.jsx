import React,{useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'


const PriceContainer = () => {
    const cartProducts = useSelector(state => state.cartProducts)
    const [price, setPrice] = useState(0);

    useEffect(() => {
        cartProducts.map(element => {
            setPrice((prev)=>{
               return Number(prev) + element.price;
            })
        });
    }, [cartProducts]);

    return (
        <div className="priceBox">

            <div className="subTotalTxt">

                <span className="maintxt">
                    Subtotal {cartProducts.length}
                </span>

                <span className="priceTxt">
                    : {price}
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
