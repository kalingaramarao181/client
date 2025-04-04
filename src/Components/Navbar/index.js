import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import LogoutConfirm from "../LogoutConfirm";
import { useLocation } from "react-router-dom";


const Navbar = ({ shortName}) => {
  const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);
  const location = useLocation();

  const pathPermition = () => {
    if (location.pathname === "/dashboard/agreements") {
      return true
    }
    else if (location.pathname === "/dashboard/agreements/sent") {
      return true
    }
    else if (location.pathname === "/dashboard/agreements/inbox") {
      return true
    }
    else if (location.pathname === "/dashboard/agreements/action-required") {
      return true
    }
    else if (location.pathname === "/dashboard/agreements/completed") {
      return true
    }
    else {
      return false
    }
  }

   

  return (
    <div className="ezy-sidebar">
        <img src="images/applogo.png" alt="Logo" className="ezy-logo" />
        <nav className="ezy-nav">
          <ul>
            <Link className="ezy-nav-link" to={"/dashboard"}><li className={`ezy-nav-item ${useLocation().pathname === "/dashboard" && "active"}`}>Home</li></Link>
            <Link className="ezy-nav-link" to={"/dashboard/agreements"}><li className={`ezy-nav-item ${pathPermition() && "active" }`}>Agreements</li></Link>
            <Link className="ezy-nav-link" to={"/dashboard/templates"}><li className={`ezy-nav-item ${useLocation().pathname === "/dashboard/templates" && "active" }`}>Templates</li></Link>
            <Link className="ezy-nav-link" to={"/dashboard/admin"}><li className={`ezy-nav-item ${useLocation().pathname === "/dashboard/admin" && "active" }`}>Admin</li></Link>
          </ul>
          <div className="ezy-navbar-actions">
            <button className="ezy-btn-buy"  onClick={() => setOpenLogoutConfirm(true)} >Logout</button>
            <div className="ezy-avatar">{shortName}</div>
          </div>
        </nav>
      {openLogoutConfirm && <LogoutConfirm onClose={() => setOpenLogoutConfirm(false)} />}
      </div>
  );
};

export default Navbar;
