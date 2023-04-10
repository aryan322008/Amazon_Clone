import React,{useEffect} from 'react';
import logo from "../../../assets/images/amazon-logo.png";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {getItems} from "../../../states/actions/cartAction"



const Navbar = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  return (

    <div className="Navbar">

      {/* logo for navbar  */}
      <div className="logo">
        <img src={logo} />
        <span className="img_span">.in</span>
      </div>

      {/* search */}
      <div className="search">
        <input type="text" />
        <button className="searchBtn"><SearchIcon /></button>
      </div>

      {/* links */}
        <div className="nav-links">

      <Link to="/auth"  style={{textDecoration:"none", color:"white"}}>
          <div className="link">
            <span className="backgroundLinkTxt">Hello, sign in</span>
            <span className="mainLink">Accounts & Lists</span>
          </div>
      </Link>

      <Link to="/orders" style={{textDecoration:"none", color:"white"}}>
        <div className="link">
          <span className="backgroundLinkTxt">Returns</span>
          <span className="mainLink">& Orders</span>
        </div>
      </Link>

      <Link to="/cart" style={{textDecoration:"none", color:"white"}}>
        <div className="link cartLinkBtn">
          <span><ShoppingCartOutlinedIcon /></span>
          <span>Cart</span>
        </div>
      </Link>

    </div>
    </div>

  );
}

export default Navbar;