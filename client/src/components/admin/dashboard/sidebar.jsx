import React, { useState } from "react";
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const showSidebar = () => {
    setShow(!show);
  };

  const handleClose = () => {
    setShow(!show);
  }

  return (
    <div id="layout">
      <Link to="#" id="menuLink" class="menu-link" onClick={showSidebar}>
        <span></span>
      </Link>

      <div id="menu" style={{ marginLeft: `${show ? "0px" : "-150px"}` }}>

        <div class="pure-menu">

        <div className="pure-menu-heading d-flex justify-content-between align-items-center" 
        style={{padding:"0px"}}>
          <Link className="pure-menu-heading" to="/">
            Amazon
          </Link>
            <div className="close mx-2 d-xl-none d-xxl-none d-md-none d-lg-none" onClick={handleClose}><CloseIcon/></div>
        </div>

          <ul class="pure-menu-list" >
            <li class="pure-menu-item">
              <Link to="/admin/add_products" class="pure-menu-link">
                Add Products
              </Link>
            </li>

            <li class="pure-menu-item">
              <Link to="/admin/show_products" class="pure-menu-link">
                My Products
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
