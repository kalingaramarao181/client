import React, { useRef } from "react";
import html2canvas from "html2canvas";
import "./index.css";

const TypedSignaterePan = ({ typedName, fontStyle }) => {
  const signatureRef = useRef(null);

  // Function to save signature as an image
  const saveSignature = async () => {
    if (!typedName) {
      alert("Please enter a name to save the signature!");
      return;
    }

    const canvas = await html2canvas(signatureRef.current);
    const image = canvas.toDataURL("image/png");

    // Create a download link
    const link = document.createElement("a");
    link.href = image;
    link.download = "signature.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="typed-signature-main-container">
      <div className="typed-signature-container" ref={signatureRef}>
        <h2 style={{ fontFamily: fontStyle, fontSize: "40px", color: "#000" }} className="typed-signature">
          {typedName}
        </h2>
      </div>
      <div className="typed-signature-btn-container">
        <button className="typed-signature-clear-btn" onClick={() => window.location.reload()}>Clear</button>
        <button className="typed-signature-save-btn" onClick={saveSignature}>Save</button>
      </div>
    </div>
  );
};

export default TypedSignaterePan;
