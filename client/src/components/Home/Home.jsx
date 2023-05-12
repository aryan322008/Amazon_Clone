import React, { useState, useEffect } from "react";
import Carousel from "./carousel/carousel";
import Container from "./container/container";
import SearchContainer from "./search/search-container";

const Home = () => {
  const [display, setDisplay] = useState(true);

  return (
    <>
        <div>
      {/* {display ? ( */}
        <SearchContainer />
      {/* ) : ( */}
          <Carousel />
          <Container />
        </div>
      {/* )} */}
    </>
  );
};

export default Home;
