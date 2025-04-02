import { useState } from "react";
import DocumentUploadForm from "../DocumentUploadForm";
import "./index.css";

const UploadDocumentCard = ({ fullName}) => {
  const [showPopup, setShowPopup] = useState(false);


  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  return (
    <>
    <div className="ezy-card ezy-upload-card">
      <p>Upload Document</p>
      <div className="ezy-drag-drop">
        <p>Drag & Drop your file here</p>
        <span>or</span>
        <button onClick={openPopup} className="ezy-btn-upload">
          Upload File
        </button>
      </div>
    </div>
      {showPopup && <DocumentUploadForm fullName={fullName} onClose={closePopup} />}
      </>
  );
};

export default UploadDocumentCard;
