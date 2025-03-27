import React, { useEffect, useState } from "react";
import { uploadDocument } from "../../api/documentApi";
import { getUsersByRole } from "../../api/authApi";
import "./index.css";

const DocumentUploadForm = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [signerUsers, setSignerUsers] = useState([]); // List of signer users
  const [signerUser, setSignerUser] = useState(""); // Selected signer user ID
  const [signerUserEmail, setSignerUserEmail] = useState(""); // Selected signer's email

  // Fetch signer users when component loads
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUsersByRole(5);
        setSignerUsers(userData);
      } catch (error) {
        console.error("Error fetching signer users:", error);
      }
    };

    fetchUserData();
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle document upload
  const handleSubmit = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }
    if (!signerUser) {
      alert("Please select a signer user");
      return;
    }
    if (!signerUserEmail) {
      alert("Signer user's email is missing");
      return;
    }

    const formData = new FormData();
    formData.append("document", file);
    formData.append("signerUser", signerUser);
    formData.append("signerUserEmail", signerUserEmail); 

    try {
      const res = await uploadDocument(formData);
      console.log("Upload Response:", res);
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

        {/* Drag and Drop Area */}
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

        {/* Signer Selection Dropdown */}
        <select
          onChange={(e) => {
            const selectedUserId = e.target.value;
            setSignerUser(selectedUserId);

            // Find the selected user's email
            const selectedUser = signerUsers.find(user => String(user.id) === selectedUserId);
            setSignerUserEmail(selectedUser ? selectedUser.email : ""); 
          }}
          className="assign-select"
          required
        >
          <option className="assign-option" value="">
            Assign to
          </option>
          {signerUsers.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {/* Buttons */}
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

export default DocumentUploadForm;
