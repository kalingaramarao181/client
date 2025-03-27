import React, { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import html2canvas from "html2canvas";
import "./index.css";

const PhysicalSignature = () => {
  const [file, setFile] = useState(null);
  const previewRef = useRef(null);

  // Handle file upload via file input
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      const imageUrl = URL.createObjectURL(uploadedFile);
      setFile(imageUrl);
    }
  };

  // Handle file upload via drag & drop
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const imageUrl = URL.createObjectURL(acceptedFiles[0]);
      setFile(imageUrl);
    },
  });

  // Save the uploaded signature as an image
  const saveSignature = async () => {
    if (!file) {
      alert("Please upload a signature to save!");
      return;
    }

    const canvas = await html2canvas(previewRef.current);
    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "physical_signature.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Clear the uploaded signature
  const clearSignature = () => {
    setFile(null);
  };

  return (
    <div className="physical-signature-container">
      <h2>Upload Physical Signature</h2>

      {/* Drag & Drop Area */}
      <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the signature here...</p> : <p>Drag & Drop or Click to Upload</p>}
      </div>

      {/* File Input for Manual Upload */}
      <input type="file" accept="image/*" onChange={handleFileUpload} className="file-input" />

      {/* Signature Preview */}
      {file && (
        <div ref={previewRef} className="signature-preview">
          <img src={file} alt="Uploaded Signature" />
        </div>
      )}

      {/* Action Buttons */}
      <div className="signature-buttons">
        <button className="clear-btn" onClick={clearSignature}>Clear</button>
        <button className="save-btn" onClick={saveSignature}>Save</button>
      </div>
    </div>
  );
};

export default PhysicalSignature;
