import React, { useState } from "react";
import "./index.css";
import { MoreVertical, Star, Users } from "lucide-react";

const templates = [
  {
    id: 1,
    name: "[Untitled]",
    owner: "RAMARAO KALINGA",
    createdDate: "3/31/2025",
    createdTime: "09:15:43 pm",
    lastChangeDate: "3/31/2025",
    lastChangeTime: "09:15:44 pm",
  },
];

export default function TemplatesPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="templates-container">
      {/* Sidebar */}
      <aside className="templates-sidebar">
        <button className="btn primary-btn">Create Template</button>
        <nav className="templates-menu">
          <button className="menu-item active"><Star size={18} /> My Templates</button>
          <button className="menu-item"><Users size={18} /> Shared with Me</button>
          <button className="menu-item"><Star size={18} /> Favorites</button>
          <button className="menu-item">Show More</button>
        </nav>
        <div className="workflow-section">
          <p className="workflow-title">Workflow Templates</p>
          <span className="beta-tag">Beta</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="templates-content">
        <h2 className="templates-title">My Templates</h2>

        {/* Filters */}
        <div className="filter-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search My Templates"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="filter-btn">Date</button>
          <button className="filter-btn">Advanced search</button>
        </div>

        {/* Template List */}
        <div className="template-list">
          {templates
            .filter((tpl) => tpl.name.toLowerCase().includes(search.toLowerCase()))
            .map((tpl) => (
              <div key={tpl.id} className="template-item">
                <div className="template-info">
                  <input type="checkbox" className="template-checkbox" />
                  <Star className="star-icon" />
                  <p className="template-name">{tpl.name}</p>
                </div>
                <div className="template-details">
                  <p className="template-owner">{tpl.owner}</p>
                  <p>{tpl.createdDate} {tpl.createdTime}</p>
                  <p>{tpl.lastChangeDate} {tpl.lastChangeTime}</p>
                </div>
                <button className="use-btn">Use</button>
                <MoreVertical className="menu-icon" />
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
