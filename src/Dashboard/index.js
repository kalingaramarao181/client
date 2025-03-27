import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Overview from "../Components/Overview";
import Documents from "../Components/Documents";

import "./index.css";
import Teams from "../Components/Teams";
import PendingSignatures from "../Components/PendingSignatures";
import Profile from "../Components/Profile";
import Signature from "../Components/Signature";

const Dashboard = () => {
    const location = useLocation();
    return (
        <div className="client">
            <div className="dashboard-container">
                <Sidebar />
                <main className="main-content">
                    <Header />
                    {location.pathname === "/dashboard" &&  <Overview />}
                    <Routes>
                        <Route path="/" element={<Documents />} />
                        <Route path="/teams" element={<Teams />} />
                        <Route path="/pending" element={<PendingSignatures />} />
                        <Route path="/settings" element={<Profile />} />
                        <Route path="/signature" element={<Signature />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
