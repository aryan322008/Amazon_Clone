import React, { useEffect, useState } from "react";
import Products from "../../Cart/box/products";
import { fetchSearchItems } from "../../../states/actions/searchAction.js";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { getSearchItems } from "../../../states/actions/searchAction.js";
import { setSearchDisplay } from "../../../states/actions/searchDisplayAction.js";
import { CircularProgress } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const SearchContainer = () => {
  const searchObj = useSelector((state) => state.search);
  const searchDisplay = useSelector((state) => state.search_display);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");
  const page = searchParams.get("page");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchDisplay({ loader: true }));

    dispatch(fetchSearchItems({ search, page })).then((res) => {
      console.log("done");
      dispatch(setSearchDisplay({ loader: false }));
    });
  }, []);

  const handleClick = () => {
    dispatch(setSearchDisplay({ display: false }));

    dispatch(getSearchItems([]));
  };

  const increasePage = () => {
    const increasedPage = Number(page) + 1;

    dispatch(getSearchItems({ searchText: search, page: increasedPage }));

    navigate(`/?search=${search}&page=${increasedPage}`);
  };

  const decreasePage = () => {
    const decreasedPage = Number(page) - 1;

    dispatch(getSearchItems({ searchText: search, page: decreasedPage }));

    navigate(`/?search=${search}&page=${decreasedPage}`);
  };

  return (
    <>
      {searchDisplay.display && (
        <div
          className="m-top cartContainer search bg-transparent h-100"
          style={{
            justifyContent: "center",
            position: "absolute",
            flexDirection: "row",
          }}
        >
          <div
            className="cartContainers bg-transparent border-transparent align-items-center justify-content-center d-flex w-100"
            style={{ height: "fitContent" }}
          >
            <div
              className="cart white_tint paddingForSearch w-75"
              style={{ position: "relative", height: "fitContent" }}
            >
              <div className="ordersHeader flex my-0 align-items-center">
                <h2>Search Results:</h2>

                <div
                  className="hamburger mx-2"
                  style={{ display: "inline", cursor: "pointer" }}
                  onClick={handleClick}
                >
                  <CloseIcon />
                </div>
              </div>

              <hr />
              <div className="tags">//badges here</div>

              <hr />

              {searchDisplay.loader ? (
                <CircularProgress />
              ) : (
                <div className="productsContainer">
                  {typeof searchObj.search_items === "object" ? (
                    <>
                      <div className="productCarouselContainer">
                        <button
                          className="productCarouselButtons"
                          onClick={decreasePage}
                        >
                          {page > 1 && "<"}
                        </button>
                        <button
                          className="productCarouselButtons"
                          style={{ right: "1px" }}
                          onClick={increasePage}
                        >
                          {searchObj.totalSearchItems > page && ">"}
                        </button>
                      </div>

                      {typeof searchObj.search_items === "object" &&
                        searchObj.search_items.map((element, index) => {
                          return (
                            <Products
                              title={element.title}
                              image={element.image}
                              ageRating={element.ageRating}
                              price={element.price}
                              author={element.author}
                              color={element.color}
                              qty={element.qty || 1}
                              id={element._id}
                              desc={element.description}
                              qtyField={false}
                              deteleBtn={false}
                              itemId={element._id}
                              key={`${element._id}${index}`}
                              styles={{
                                flexDirection: "column",
                                display: "flex",
                                gap: "0.5rem",
                              }}
                              contentForSearch={true}
                            />
                          );
                        })}
                    </>
                  ) : (
                    <div className="h1">
                      <h3>No search results</h3>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchContainer;
