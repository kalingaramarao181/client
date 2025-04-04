import React, { useEffect, useState } from "react";
import { uploadDocument } from "../../api/documentApi";
import { getUsersByRole } from "../../api/authApi";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import "./index.css";

const DocumentUploadForm = ({ fullName, onClose }) => {
  const [file, setFile] = useState(null);
  const [signerUsers, setSignerUsers] = useState([]);
  const [signerUser, setSignerUser] = useState("");
  const [signerUserEmail, setSignerUserEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [onlySigner, setOnlySigner] = useState(false);

  const loggedInUser = jwtDecode(Cookies.get("jwtToken"));
  console.log("Logged In User:", loggedInUser);
  

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
    if (!signerUserEmail) {
      alert("Signer user's email is required");
      return;
    }
    if (!emailSubject || !emailMessage) {
      alert("Email subject and message are required");
      return;
    }

    const formData = new FormData();
    formData.append("document", file);
    formData.append("signerUser", onlySigner ? loggedInUser?.email : signerUserEmail);
    formData.append("signerUserEmail", onlySigner ? loggedInUser?.email : signerUserEmail);
    formData.append("emailSubject", emailSubject);
    formData.append("emailMessage", emailMessage);
    formData.append("documentUser", fullName)

    try {
      await uploadDocument(formData);
      alert("Document uploaded and email sent successfully");
      onClose();
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Failed to upload document");
      console.log(signerUser);
      
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

        <div className="signer-info-container">
          <div className="signer-info">
            <h2 className="popup-title">Add recipients</h2>

            <div className="only-signer-checkbox">
              <input
                className="only-signer-input"
                id="only-signer"
                type="checkbox"
                checked={onlySigner}
                onChange={() => {
                  setOnlySigner(!onlySigner);
                  if (!onlySigner) {
                    setSignerUser(loggedInUser.id);
                    setSignerUserEmail(loggedInUser.email);
                  } else {
                    setSignerUser("");
                    setSignerUserEmail("");
                  }
                }}
              />
              <label className="only-signer-label" htmlFor="only-signer">
                I'm the only signer
              </label>
            </div>

            {!onlySigner && (
              <>
                <label>Name</label>
                <input
                  className="signer-name-input"
                  type="text"
                  onChange={(e) => setSignerUser(e.target.value)}
                />

                <label>Email</label>
                <input
                  className="signer-email-input"
                  type="email"
                  value={signerUserEmail}
                  onChange={(e) => setSignerUserEmail(e.target.value)}
                />
              </>
            )}
          </div>

          <div className="signer-info">
            <h2 className="popup-title">Add message</h2>

            <label>Email Subject</label>
            <input
              className="email-subject-input"
              type="text"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
            />

            <label>Email Message</label>
            <textarea
              rows="4"
              cols="50"
              placeholder="Type your message here..."
              className="email-message-textarea"
              value={emailMessage}
              onChange={(e) => setEmailMessage(e.target.value)}
            ></textarea>
          </div>
        </div>

        {!onlySigner && (
          <select
            onChange={(e) => {
              const selectedUserId = e.target.value;
              setSignerUser(selectedUserId);

              const selectedUser = signerUsers.find(
                (user) => String(user.id) === selectedUserId
              );
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
        )}

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