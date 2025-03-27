import React from "react";
import Navbar from "./Components/Navbar";
import FooterBar from "./Components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import Secure from "./Components/Secure";
import DocumentSigner from "./Components/DocumentSigner";
import Dashboard from "./Dashboard";
import SignatureApp from "./SignatureApp";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/signature-app" element={<SignatureApp />} />
        <Route element={<Secure />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/add-signature" element={<DocumentSigner />} />
        </Route>
      </Routes>
      <FooterBar />
    </Router>
  );
}

export default App;
