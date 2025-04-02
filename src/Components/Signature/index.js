import React, { useState } from "react";
import SignaturePad from "../SignaturePad";
import TypedSignaterePan from "../TypedSignaterePan";
import PhysicalSignature from "../PhysicalSignature";
import "./index.css";

const Signature = ({ onClose }) => {
  const [signatureType, setSignatureType] = useState(null);
  const [typedName, setTypedName] = useState("");
  const [fontStyle, setFontStyle] = useState("");

  const renderSignaturePan = () => {
    if (signatureType === "digitalSignature") {
      return <SignaturePad />;
    } else if (signatureType === "typedSignature") {
      return <TypedSignaterePan typedName={typedName} fontStyle={fontStyle} />;
    } else if (signatureType === "physicalSignature") {
      return <PhysicalSignature />;  
    }
  };

  const handleFontChange = (font) => {
    setFontStyle(fontStyles[font]);
  };

  const fontStyles = {
    font1: "'Dancing Script', cursive",
    font2: "'Pacifico', cursive",
    font3: "'Great Vibes', cursive",
    font4: "'Parisienne', cursive",
    font5: "'Satisfy', cursive",
    font6: "'Allura', cursive",
    font7: "'Caveat', cursive",
    font8: "'Lobster', cursive",
    font9: "'Tangerine', cursive",
    font10: "'Homemade Apple', cursive",
    font11: "'Indie Flower', cursive",
    font12: "'Zeyada', cursive",
    font13: "'Sacramento', cursive",
    font14: "'Herr Von Muellerhoff', cursive",
    font15: "'Calligraffitti', cursive",
    font16: "'Reenie Beanie', cursive",
    font17: "'Alex Brush', cursive",
    font18: "'Marck Script', cursive",
    font19: "'Mr Dafoe', cursive",
    font20: "'Rochester', cursive",
  };

  return (
    <div className="popup-overlay">
       <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Pacifico&family=Great+Vibes&family=Parisienne&family=Satisfy&family=Allura&family=Caveat&family=Lobster&family=Tangerine&family=Homemade+Apple&family=Indie+Flower&family=Zeyada&family=Sacramento&family=Herr+Von+Muellerhoff&family=Calligraffitti&family=Reenie+Beanie&family=Alex+Brush&family=Marck+Script&family=Mr+Dafoe&family=Rochester&display=swap" />
      <div className="popup-content">
        <h1>Signature</h1>
        <button className="close-btn" onClick={onClose}>X</button>

        <div className="signature-container">
          <div className="signature-select-type-box">
            <h2>Select Signature Type</h2>
            <select onChange={(e) => setSignatureType(e.target.value)} className="signature-type-select">
              <option value="">Select Signature Type</option>
              <option value="digitalSignature">Digital Signature</option>
              <option value="typedSignature">Typed Signature</option>
              <option value="physicalSignature">Physical Signature</option>
            </select>

            {signatureType === "typedSignature" && (
              <>
                <select style={{ fontFamily: fontStyle }} onChange={(e) => handleFontChange(e.target.value)} className="signature-type-select">
                  <option value="">Select Signature Font</option>
                  {Object.keys(fontStyles).map((fontKey, index) => (
                    <option style={{ fontFamily: fontStyles[fontKey] }} key={index} value={fontKey}>
                      {fontKey.replace("font", "Signature Font ")}
                    </option>
                  ))}
                </select>

                <input onChange={(e) => setTypedName(e.target.value)} type="text" placeholder="Enter your name" className="signature-type-select" />
              </>
            )}
          </div>

          <div className="signature-select-type-box">
            <h2>Signature Preview</h2>
            {renderSignaturePan()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signature;
