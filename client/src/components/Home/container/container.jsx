import React, { useEffect } from 'react';
import product1 from "../../../assets/images/joloChip.png"
import Box from "./boxes/box"
import { useSelector, useDispatch } from 'react-redux'
import { getItems } from "../../../states/actions/cartAction"

const Container = () => {
    const dispatch = useDispatch()

    const products = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getItems())
    }, []);

    console.log(products)

    return (

        <div className="container">

            <div className="twoBoxesContainer">
                {/* <Box txt={"JOLOCHIP Hottest CHIP Madness – Last CHIP Challenge"} rating={"5"} styles={{}} img={product1} price={32}  />

            <Box txt={"JOLOCHIP Hottest CHIP Madness – Last CHIP Challenge"} rating={"5"} styles={{ marginRight: "0rem" }} img={product1} price={32} /> */}

                {products.slice(0, 2).map((element, index) => {
                    return <Box
                        txt={element.title}
                        rating={element.rating}
                        img={product1}
                        price={element.price}
                        author={element.author}
                        color={element.color}
                        size={element.size}
                        qty={element.qty}
                    />
                })}

            </div>

            <div className="threeBoxContainer">
                {/* Box one*/}

                {/* <Box txt={"JOLOCHIP Hottest CHIP Madness – Last CHIP Challenge"} rating={"5"} styles={{}} img={product1} price={32} />

                <Box txt={"JOLOCHIP Hottest CHIP Madness – Last CHIP Challenge"} rating={"5"} styles={{}} img={product1} price={32} />

                <Box txt={"JOLOCHIP Hottest CHIP Madness – Last CHIP Challenge"} rating={"5"} styles={{ marginRight: "0rem" }} img={product1} price={32} />
                 */}
                {products.slice(2, 5).map((element, index) => {
                    return <Box
                        txt={element.title}
                        rating={element.rating}
                        img={product1}
                        price={element.price}
                        author={element.author}
                        color={element.color}
                        size={element.size}
                        qty={element.qty}
                    />
                })}

            </div>


            <div className="singleBoxContainer threeBoxContainer">

                {/* <Box txt={"JOLOCHIP Hottest CHIP Madness – Last CHIP Challenge"} rating={"5"} styles={{ marginRight: "0rem" }} img={product1} price={32} /> */}

                {products.slice(-1).map((element, index) => {
                    return <Box
                        txt={element.title}
                        rating={element.rating}
                        img={product1}
                        price={element.price}
                        author={element.author}
                        color={element.color}
                        size={element.size}
                        qty={element.qty}
                    />
                })}

            </div>

        </div>


    );
}

export default Container;


// For now i'll just add some products on the mane page and once i make the whole project i can just remove those products and change it into the current amazon layout obviously simplified