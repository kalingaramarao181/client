import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { FaHourglass } from "react-icons/fa6";
import { FaUpload } from "react-icons/fa";
import { TiGroup } from "react-icons/ti";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineSignature } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import "./index.css";
import { Link, useLocation } from "react-router-dom";
import DocumentUploadForm from "../DocumentUploadForm";
import { useState } from "react";
import LogoutConfirm from "../LogoutConfirm";

const Sidebar = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);

  const location = useLocation();

  const closePopup = () => {
    setShowPopup(false);
};


  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">EzySign</h2>
      <ul className="sidebar-menu">
        <Link className="sidebar-link" to="/dashboard">
          <li
            className={
              location.pathname === "/dashboard"
                ? "sidebar-item active"
                : "sidebar-item"
            }
          >
            <HiOutlineClipboardDocumentList className="sidebar-icon" />
            <span className="sidebar-text">My Documents</span>
          </li>
        </Link>
        <Link className="sidebar-link" to="/dashboard/pending">
          <li
            className={
              location.pathname === "/dashboard/pending"
                ? "sidebar-item active"
                : "sidebar-item"
            }
          >
            <FaHourglass className="sidebar-icon" />
            <span className="sidebar-text">Pending Signatures</span>
          </li>
        </Link>
          <li
            className="sidebar-item"
            onClick={() => setShowPopup(true)}
          >
            <FaUpload className="sidebar-icon" />
            <span className="sidebar-text">Upload Forms</span>
          </li>
        <Link className="sidebar-link" to="/dashboard/teams">
          <li
            className={
              location.pathname === "/dashboard/teams"
                ? "sidebar-item active"
                : "sidebar-item"
            }
          >
            <TiGroup className="sidebar-icon" />
            <span className="sidebar-text">Teams</span>
          </li>
        </Link>
        <Link className="sidebar-link" to="/dashboard/signature">
          <li
            className={
              location.pathname === "/dashboard/signature"
                ? "sidebar-item active"
                : "sidebar-item"
            }
          >
            <AiOutlineSignature className="sidebar-icon" />
            <span className="sidebar-text">Signature</span>
          </li>
        </Link>
        <Link className="sidebar-link" to="/dashboard/settings">
          <li
            className={
              location.pathname === "/dashboard/settings"
                ? "sidebar-item active"
                : "sidebar-item"
            }
          >
            <IoSettingsOutline className="sidebar-icon" />
            <span className="sidebar-text">Settings</span>
          </li>
        </Link>
          <li className="sidebar-item" onClick={() => setOpenLogoutConfirm(true)} >
            <LuLogOut className="sidebar-icon" />
            <span className="sidebar-text">Logout</span>
          </li>
      </ul>
      {showPopup && <DocumentUploadForm onClose={closePopup} />}
      {openLogoutConfirm && <LogoutConfirm onClose={() => setOpenLogoutConfirm(false)} />}
    </aside>
  );
};

export default Sidebar;
