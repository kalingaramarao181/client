import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
import { Mail, Send, CheckCircle, Pencil } from "lucide-react";
import DocumentsList from "../DocumentsList";
import { getSignerDocuments } from "../../api/documentApi";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function Agreements({ documents }) {
  const navigate = useNavigate();
  const { tab } = useParams(); // Get current tab from URL

  const [search, setSearch] = useState("");
  const [asignedDocumets, setAsignedDocumets] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("jwtToken");
        if (!token) {
          console.error("JWT Token not found");
          return;
        }
        const decodedToken = jwtDecode(token);
        if (!decodedToken?.id) {
          console.error("Invalid token structure");
          return;
        }
        const userId = decodedToken.id;
        const [documentsData] = await Promise.all([getSignerDocuments(userId)]);

        if (Array.isArray(documentsData)) {
          setAsignedDocumets(documentsData);
        } else {
          console.error("Unexpected API response format:", documentsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUserData();
  }, []);

  const signedDocuments = documents.filter((document) => document.status === "signed");
  const actionRequiredDocuments = documents.filter((document) => document.status === "pending");

  // Render the correct content based on the tab from URL
  const renderAgreementPageContent = () => {
    switch (tab) {
      case "inbox":
        return <DocumentsList documents={asignedDocumets} />;
      case "sent":
        return <DocumentsList documents={documents} />;
      case "completed":
        return <DocumentsList documents={signedDocuments} />;
      case "action-required":
        return <DocumentsList documents={actionRequiredDocuments} />;
      default:
        return <DocumentsList documents={asignedDocumets} />;
    }
  };

  return (
    <div className="inbox-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <button className="btn primary-btn">Start Now</button>
        <button className="btn outline-btn">Shared Access</button>
        <nav className="sidebar-menu">
          <button onClick={() => navigate("/dashboard/agreements/inbox")} className={tab === "inbox" ? "menu-item active" : "menu-item"}>
            <Mail size={18} /> Inbox
          </button>
          <button onClick={() => navigate("/dashboard/agreements/sent")} className={tab === "sent" ? "menu-item active" : "menu-item"}>
            <Send size={18} /> Sent
          </button>
          <button onClick={() => navigate("/dashboard/agreements/completed")} className={tab === "completed" ? "menu-item active" : "menu-item"}>
            <CheckCircle size={18} /> Completed
          </button>
          <button onClick={() => navigate("/dashboard/agreements/action-required")} className={tab === "action-required" ? "menu-item active" : "menu-item"}>
            <Pencil size={18} /> Action Required
          </button>
        </nav>
      </aside>

      {/* Content */}
      <main className="inbox-content">
        <h2 className="inbox-title">{tab ? tab.replace("-", " ") : "Inbox"}</h2>
        {/* Filters */}
        <div className="filter-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search Inbox and Folders"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="filter-btn">Last 6 months</button>
          <button className="filter-btn">Status</button>
          <button className="filter-btn">Sender</button>
          <button className="filter-btn">Advanced search</button>
        </div>

        {/* Document List */}
        <div className="document-list">{renderAgreementPageContent()}</div>
      </main>
    </div>
  );
}
