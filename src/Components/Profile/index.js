import React, {useEffect, useState} from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import "./index.css";
import { getUserDetails } from "../../api/authApi";


const Profile = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
            const fetchUser = async () => {
                try {
                    const token = Cookies.get("jwtToken");
                    if (!token) throw new Error("No JWT token found");
    
                    const decoded = jwtDecode(token);
                    const userId = decoded.id;
    
                    const userData = await getUserDetails(userId);
                    setUser(userData);
                } catch (err) {
                    console.log(err.message);
                }
            };
    
            fetchUser();
        }, []);

  return (
    <div className="main-content">
      <div className="profile-container">
        <img
          src="images/profile-demo-image.jpeg"
          alt="Profile-Icon"
          className="profile-img"
        />
        <div className="profile-name">{user.fullName}</div>
        <div classname="profile-email">{user.email}</div>

        <div className="profile-sections">
          <div className="section">
            <div className="section-title">Personal Information</div>
            <div className="profile-item">
              <span>user</span> <span>JohnDoe123</span>
            </div>
            <div className="profile-item">
              <span>Email</span> <span>{user.email}</span>
            </div>
            <div className="profile-item">
              <span>Phone</span> <span>+1 123 456 7890</span>
            </div>
            <div className="profile-item">
              <span>Address</span> <span>123 Main Street, NY</span>
            </div>
          </div>

          <div className="section">
            <div className="section-title">Security</div>
            <div className="profile-item">
              <span>Password</span> <span>********</span>
            </div>
            <div className="profile-item">
              <span>Two-Factor Authentication</span> <span>Enabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
