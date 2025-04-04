import React, { useState } from "react";
import "./index.css";
import { Lock, Filter, Settings, ChevronDown } from "lucide-react";

const AdminPage = () => {
  const [searchSetting, setSearchSetting] = useState("");
  const [searchUser, setSearchUser] = useState("");

  return (
    <div className="settings-container">
      {/* Sidebar */}
      <aside className="settings-sidebar">
        <h2 className="sidebar-title">RAMARAO KALINGA</h2>
        <p className="account-id">Account ID: <strong>169222797</strong></p>
        <nav className="settings-menu">
          <button className="menu-item active">Overview</button>
          <p className="menu-section">ACCOUNT</p>
          <button className="menu-item">Plan and Billing</button>
          <button className="menu-item">Account Profile</button>
          <button className="menu-item">Security Settings</button>
          <button className="menu-item">Regional Settings</button>
          <button className="menu-item">
            <Lock size={16} /> Branding
          </button>
          <button className="menu-item">Stamps</button>
          <button className="menu-item">Updates</button>
          <button className="menu-item">Value Calculator</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="settings-content">
        {/* Search Settings & Users */}
        <section className="search-section">
          <h3 className="section-title">Find a Setting or User</h3>
          <div className="search-box">
            <label>Find a Setting</label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter keyword"
              value={searchSetting}
              onChange={(e) => setSearchSetting(e.target.value)}
            />
          </div>
          <div className="search-box">
            <label>Find a User</label>
            <div className="user-search">
              <select className="dropdown">
                <option>Name</option>
                <option>Email</option>
                <option>Role</option>
              </select>
              <input
                type="text"
                className="input-field"
                placeholder="Enter name"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
              />
              <button className="search-btn" disabled>Search</button>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="notifications-section">
          <h3 className="section-title">Notifications</h3>
          <div className="filter-bar">
            <button className="filter-btn">
              Type: All <ChevronDown size={14} />
            </button>
            <span className="filter-extra">+1</span>
            <button className="filter-btn">
              <Filter size={14} /> All Filters
            </button>
            <button className="reset-btn">Reset Filters</button>
            <Settings className="settings-icon" />
          </div>
          <div className="notification-item">
            <p>Product Update</p>
            <span className="notification-time">13 days</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminPage;
