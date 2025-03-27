import React, { useState, useEffect } from "react";
import { getSignerDocuments } from "../../api/documentApi";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import "./index.css";
import { getUserDetails } from "../../api/authApi";

const PendingSignatures = () => {
  const [signerDocuments, setSignerDocuments] = useState([]);

  useEffect(() => {
    const fetchUserAndDocuments = async () => {
      try {
        const token = Cookies.get("jwtToken");
        if (!token) throw new Error("No JWT token found");
        const decodedToken = jwtDecode(token);
        if (!decodedToken?.id) throw new Error("Invalid token structure");

        const userId = decodedToken.id;
        console.log("Fetching user details and documents for:", userId);
        const [userData, documentsData] = await Promise.all([
          getUserDetails(userId),
          getSignerDocuments(userId),
        ]);

        console.log("User Data:", userData);
        console.log("Documents Data:", documentsData);


        if (Array.isArray(documentsData)) {
          setSignerDocuments(documentsData);

          const uniqueUserIds = [...new Set(documentsData.map(doc => doc.user_id))];

          console.log("Fetching user details for IDs:", uniqueUserIds);

          const userPromises = uniqueUserIds.map(id => getUserDetails(id));
          const userResponses = await Promise.all(userPromises);

          // Map user_id to user name
          const userMap = {};
          userResponses.forEach(user => {
            if (user?.id && user?.name) {
              userMap[user.id] = user.name;
            }
          });

          console.log("User Map:", userMap);
        } else {
          console.error("Unexpected API response format:", documentsData);
        }
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchUserAndDocuments();
  }, []);


  return (
    <div className="main-content">
      <h1>Pending Signatures</h1>
      <div className="pending-container">
        {signerDocuments.length === 0 ? (
          <p>No pending documents found.</p>
        ) : (
          signerDocuments.map((document) => (
            <div key={document.id} className="pending-card">
              <div className="document-title">{document.title}</div>
              <div className="requested-by">
                Requested by: {getUserDetails(document.user_id).name}
              </div>
              <div className="date-requested">
                Date Requested: {document.created_at}
              </div>
              <div className="action-buttons">
                <button className="action-btn primary-btn">Approve</button>
                <button className="action-btn secondary-btn">Reject</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PendingSignatures;
