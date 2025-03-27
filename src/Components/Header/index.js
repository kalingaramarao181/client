import { useEffect, useState } from "react";
import DocumentUploadForm from "../DocumentUploadForm";
import { getUserDetails } from "../../api/authApi";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import "./index.css";

const Header = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = Cookies.get("jwtToken");
                if (!token) throw new Error("No JWT token found");

                const decoded = jwtDecode(token);
                const userId = decoded.id;

                const userData = await getUserDetails(userId);
                setUserDetails(userData);
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchUser();
    }, []);
    

    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="header">
            <h1 className="header-title">Welcome, {userDetails.fullName}</h1>
            <button className="add-document-btn" onClick={openPopup}>
                + New Document
            </button>

            {showPopup && <DocumentUploadForm onClose={closePopup} />}
        </div>
    );
};

export default Header;
