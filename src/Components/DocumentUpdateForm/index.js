import React, {  useState } from "react";
import { updateDocument } from "../../api/documentApi";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import "./index.css";

const DocumentUpdateForm = ({ fullName, onClose, documentId }) => {
  const [file, setFile] = useState(null);

  const loggedInUser = jwtDecode(Cookies.get("jwtToken"));
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("document", file);
    formData.append("signerUserEmail", loggedInUser.email);
    formData.append("documentUser", fullName);

    try {
      await updateDocument(formData, documentId); 
      alert("Document uploaded and email sent successfully");
      onClose();
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Failed to upload document");
      
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3 className="popup-title">Upload Document</h3>

        <div
          className="file-drop-area"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.docx,.jpg,.png"
            className="file-input"
            id="file-input"
          />
          <p>
            {file ? (
              file.name
            ) : (
              <label className="upload-label" htmlFor="file-input">
                Drag & Drop or Click to{" "}
                <span className="upload-label">Upload</span>
              </label>
            )}
          </p>
        </div>

        <div className="popup-buttons">
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button onClick={handleSubmit} className="submit-btn">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpdateForm;