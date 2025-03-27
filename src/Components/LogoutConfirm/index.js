import Cookies from "js-cookie";
import "./index.css";

const LogoutConfirm = ({ onClose }) => {

    const handleLogout = () => {
        Cookies.remove("jwtToken");
        window.location.href = "/auth"; 
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h3 className="popup-title">Are You Sure You Want to Logout</h3>

                <div className="popup-buttons">
                    <button onClick={onClose} className="cancel-btn">Cancel</button>
                    <button onClick={handleLogout} className="submit-btn">Logout</button>
                </div>
            </div>
        </div>
    );
};

export default LogoutConfirm;
