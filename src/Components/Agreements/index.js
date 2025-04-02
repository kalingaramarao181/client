import React, { useState } from "react";
import "./index.css";
import { Mail, Send, CheckCircle, Pencil } from "lucide-react";
import DocumentsList from "../DocumentsList";
import Signature from "../Signature";

export default function Agreements({documents}) {
  const [search, setSearch] = useState("");
  const [showAgreemetContent, setShowAgreemetContent] = useState("Inbox");

  const renderAgreementPageContent = () => {
    if (showAgreemetContent === "Inbox") {
      return <DocumentsList documents={documents}/>
    }else if (showAgreemetContent === "Signature") {
      <Signature/>;
    }
  }

  return (
    <div className="inbox-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <button className="btn primary-btn">Start Now</button>
        <button className="btn outline-btn">Shared Access</button>
        <nav className="sidebar-menu">
          <button onClick={() => setShowAgreemetContent("Inbox")} className={showAgreemetContent === "Inbox" ? "menu-item active" : "menu-item"}><Mail size={18} /> Inbox</button>
          <button className="menu-item"><Send size={18} /> Sent</button>
          <button className="menu-item"><CheckCircle size={18} /> Completed</button>
          <button className="menu-item"><Pencil size={18} /> Action Required</button>
        </nav>
      </aside>

      {/* Content */}
      <main className="inbox-content">
        <h2 className="inbox-title">{showAgreemetContent}</h2>

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
        <div className="document-list">
          {renderAgreementPageContent()}
        </div>
      </main>
    </div>
  );
}
