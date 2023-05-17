import React, { useState, useEffect } from "react";
import logo from "../../../assets/images/amazon-logo.png";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { getSearchItems } from "../../../states/actions/searchAction.js";
import { setSearchDisplay } from "../../../states/actions/searchDisplayAction.js";
import { useSearchParams } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const searchObj = useSelector((state) => state.search);
  const [searchText, setSearchText] = useState("");
  const [display, setDisplay] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  

  const Options = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  };

  const navigate = useNavigate();

  useEffect(() => {
    const search = searchParams.get("search");
    setSearchText(search || "");
  }, []);

  const handleClick = async () => {
    setDisplay(!display);
  };

  const handleChange = async (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = async () => {
    searchText.length
      ? dispatch(setSearchDisplay({ display: true }))
      : toast.error("Type Some text", Options);

    dispatch(setSearchDisplay({ loader: true }));

    dispatch(getSearchItems({searchText, page : page || 1}))
    .then((res) => {

      setTimeout(() => {
        dispatch(setSearchDisplay({ loader: false }));
      }, 500);
    })


    navigate(`/?search=${searchText}&page=${page || 1}`);
    
  };

  return (
    <div className="Navbar">
      <div className="hamburger mx-2" onClick={handleClick}>
        {display ? <CloseIcon /> : <MenuIcon />}
      </div>

      {/* logo for navbar  */}
      <div className="logo">
        <img src={logo}/>
        <span className="img_span">.in</span>
      </div>

      {/* search */}
      <div className="search">
        <input
          type="text"
          onChange={handleChange}
          placeholder={"search by catogries or title"}
          value={searchText}
        />
        <button className="searchBtn" onClick={handleSearch}>
          <SearchIcon />
        </button>
      </div>

      {/* links */}
      <div
        className="nav-links"
        style={{
          opacity: `${display ? "1" : "0"}`,
          visibility: `${display ? "visible" : "hidden"}`,
        }}
        data-expanded={`${display ? "true" : "false"}`}
      >
        <Link
          to="/auth"
          className="a-tag"
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          <div className="link">
            <span className="backgroundLinkTxt">Hello, sign in</span>
            <span className="mainLink">Accounts & Lists</span>
          </div>
        </Link>

        <Link
          to="/orders"
          className="a-tag"
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          <div className="link">
            <span className="backgroundLinkTxt">Returns</span>
            <span className="mainLink">& Orders</span>
          </div>
        </Link>

        <Link
          to="/cart"
          className="a-tag"
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          <div className="link cartLinkBtn">
            <span>
              <ShoppingCartOutlinedIcon />
            </span>
            <span>Cart</span>
          </div>
        </Link>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        limit={2}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Navbar;
