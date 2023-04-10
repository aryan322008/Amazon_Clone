import React from 'react';
import product1 from "../../../assets/images/joloChip.png"
import Box from "./boxes/box"

const Container = () => {
    return (

        <div className="container">

            <div className="twoBoxesContainer">
            <Box txt={"JOLOCHIP Hottest CHIP Madness – Last CHIP Challenge"} rating={"5"} styles={{}} img={product1} price={32}  />

            <Box txt={"JOLOCHIP Hottest CHIP Madness – Last CHIP Challenge"} rating={"5"} styles={{ marginRight: "0rem" }} img={product1} price={32} />

            </div>

            <div className="threeBoxContainer">
                {/* Box one*/}

                <Box txt={"JOLOCHIP Hottest CHIP Madness – Last CHIP Challenge"} rating={"5"} styles={{}} img={product1} price={32} />

                <Box txt={"JOLOCHIP Hottest CHIP Madness – Last CHIP Challenge"} rating={"5"} styles={{}} img={product1} price={32} />

                <Box txt={"JOLOCHIP Hottest CHIP Madness – Last CHIP Challenge"} rating={"5"} styles={{ marginRight: "0rem" }} img={product1} price={32} />
                

            </div>


            <div className="singleBoxContainer threeBoxContainer">
             
            <Box txt={"JOLOCHIP Hottest CHIP Madness – Last CHIP Challenge"} rating={"5"} styles={{ marginRight: "0rem" }} img={product1} price={32} />
            
            </div>

        </div>


    );
}

export default Container;


// For now i'll just add some products on the mane page and once i make the whole project i can just remove those products and change it into the current amazon layout obviously simplified