import React from "react";
import "./index.css"; 

const FooterBar = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Beedata. All rights reserved.</p>
        </footer>
    );
};

export default FooterBar;
