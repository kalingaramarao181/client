import { Routes, Route } from "react-router-dom";
import "./index.css";
import Teams from "../Components/Teams";
import Profile from "../Components/Profile";
import Signature from "../Components/Signature";
import DashboardHome from "../Components/DashboardHome";
import Agreements from "../Components/Agreements";
import { getUserDetails } from "../api/authApi";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Navbar from "../Components/Navbar";
import TemplatesPage from "../Components/Templates";
import { getDocuments } from "../api/documentApi";
import AdminPage from "../Components/Admin";

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState({});
  const [shortName, setShortName] = useState("");
  const [documents, setDocuments] = useState([]);
      
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
              const [documentsData] = await Promise.all([getDocuments(userId)]);
      
              if (Array.isArray(documentsData)) {
                setDocuments(documentsData);
              } else {
                console.error("Unexpected API response format:", documentsData);
              }
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
          fetchUserData();
        }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("jwtToken");
        if (!token) throw new Error("No JWT token found");

        const decoded = jwtDecode(token);
        const userId = decoded.id;

        const userData = await getUserDetails(userId);
        setUserDetails(userData);
        setShortName(
          userData.fullName
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2) || ""
        );
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchUser();
  }, []);
  return (
    <div className="client">
      <Navbar shortName={shortName} />
      <Routes>
        <Route
          path="/"
          element={
            <DashboardHome documents={documents} userDetails={userDetails} shortName={shortName}  />
          }
        />
        <Route path="/agreements/:tab" element={<Agreements documents={documents} />} />
        <Route path="/agreements" element={<Agreements documents={documents} />} />

        <Route path="/admin" element={<AdminPage documents={documents} />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/settings" element={<Profile />} />
        <Route path="/signature" element={<Signature />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
