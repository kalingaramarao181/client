import React from "react";
import { motion } from "framer-motion";
import "./index.css";
import { FaFileSignature, FaShieldAlt, FaClock, FaUserCheck, FaLock, FaCloud } from "react-icons/fa";

const About = () => {
    return (
        <div className="about-container">

            {/* Section 1: Left Image - Right Text */}
            <motion.div 
                className="about-section" 
                initial={{ opacity: 0, x: -100 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 1 }}
            >
                <img src="https://www.shutterstock.com/image-photo/businessman-use-artificial-intelligence-ai-600nw-2425860711.jpg" alt="Ezysign" className="about-image" />
                <div className="about-text">
                    <h2>About Ezysign</h2>
                    <p>Ezysign is a secure and efficient digital signature platform designed for seamless document signing. Our platform ensures security, compliance, and ease of use.</p>
                </div>
            </motion.div>

            {/* Section 2: Icons About Ezysign */}
            

            {/* Section 3: Project Cards */}
            <motion.div 
                className="card-section"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1 }}
            >
                <div className="card">
                    <h3>Document Management</h3>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvSdhqHXfSUYe8A3zhFnupG0d7Lmsu3RKxIw&s"/>
                    <p>Manage, store, and retrieve documents easily with Ezysign.</p>
                </div>
                <div className="card">
                    <h3>Legally Binding</h3>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUe9JscjBML3YDZ726oUF5WaBQjKeeX4-UguKo4VFO9TuQcoco0KWABojjDweanShMjTs&usqp=CAU"/>
                    <p>All signatures comply with global legal standards.</p>
                </div>
                <div className="card">
                    <h3>Multi-User Collaboration</h3>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE4cCUsAkgeEFS5pFaRGoRzTsAkDVYoN-xWaJTHnpmoLxqWL3R_ZD5-NCFBo_QCXI4_eo&usqp=CAU"/>
                    <p>Invite multiple users to sign and manage documents seamlessly.</p>
                </div>
            </motion.div>
            <motion.div 
                className="icon-section"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <div className="icon-group">
                    <div className="icon-card"><FaFileSignature size={50} /><p>Easy Signing</p></div>
                    <div className="icon-card"><FaShieldAlt size={50} /><p>Secure Platform</p></div>
                    <div className="icon-card"><FaClock size={50} /><p>Fast Processing</p></div>
                </div>
                <div className="icon-group">
                    <div className="icon-card"><FaUserCheck size={50} /><p>User Verification</p></div>
                    <div className="icon-card"><FaLock size={50} /><p>Data Encryption</p></div>
                    <div className="icon-card"><FaCloud size={50} /><p>Cloud Storage</p></div>
                </div>
            </motion.div>
            <div className="about-card">
            <div className="about-text">
                <h2>About Ezysign</h2>
                <p>
                    Ezysign is a secure and efficient digital signature platform designed 
                    for seamless document signing. Our platform ensures security, compliance, 
                    and ease of use.
                </p>
            </div>
            <div className="about-image">
                <img 
                    src="data:image/jpeg;base64,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"
                    alt="Ezysign"
                />
            </div>
        </div>

        </div>
    );
};

export default About;
