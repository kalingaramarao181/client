import { useState } from "react";
import "./index.css";
import Signature from "../Signature";
import { Pencil } from "lucide-react";

const Header = ({documents, fullName, shortName }) => {
  const [showPopup, setShowPopup]= useState(false);

  const pendingDocuments = documents.filter((document) => document.status === "pending").length;
  const completedDocuments = documents.filter((document) => document.status === "signed").length;
  return (
    <>
    <div className="ezy-navbar">
      <div className="ezy-welcome">
        <h2>Welcome back</h2>
        <p>
          <span className="ezy-avatar-name">{shortName}</span>
          {fullName} <span className="ezy-pencil" onClick={() => setShowPopup(true)}> <Pencil size={24} /></span>
        </p>
      </div>
      <div className="ezy-header-actions">
        <p className="ezy-header-actions-title">Last 6 Months</p>
        <div className="ezy-header-actions-list">
          <p className="ezy-header-actions-item">
            <span className="ezy-badge">{documents.length}</span>
            <span className="ezy-badge-title">Action Required</span>
          </p>
          <p className="ezy-header-actions-item">
            <span className="ezy-badge">{pendingDocuments}</span>
            <span className="ezy-badge-title">Waiting for Others</span>
          </p>
          <p className="ezy-header-actions-item">
            <span className="ezy-badge">0</span>
            <span className="ezy-badge-title">Expiring Soon</span>
          </p>
          <p className="ezy-header-actions-item">
            <span className="ezy-badge">{completedDocuments}</span>
            <span className="ezy-badge-title">Completed</span>
          </p>
        </div>
      </div>
    </div>
    {showPopup && <Signature onClose={() => setShowPopup(false)} />}
    </>
  );
};

export default Header;
