import React from "react";
import successGif from "../../assets/success-gif.json";
import failureGif from "../../assets/failure-gif.json";
import Lottie from "react-lottie";

const Gif = ({ status, price }) => {
  const options = (gif) => {
    return  {
      loop: true,
      autoplay: true,
      animationData: gif,
      renderer: "svg",
    };
  };

  return (
    <>
      {status === "success" && (
        <div>
          <Lottie options={options(successGif)} height={200} width={200} />
          <span
            className="bold w-100 d-flex justify-content-center linear-gradient-color"
          >
            Rs.{price} payment succesful
          </span>
        </div>
      )}
      {status === "failure" && (
        <div>
          <Lottie options={options(failureGif)} height={200} width={200} />
        </div>
      )}
    </>
  );
};

export default Gif;
