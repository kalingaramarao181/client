import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./index.css";

const SignatureApp = () => {
  const [documentFile, setDocumentFile] = useState(null);
  const [signature, setSignature] = useState(null);
  const [docType, setDocType] = useState("");
  const docRef = useRef(null);
  const sigRef = useRef(null);

  const handleDocUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type === "application/pdf") {
      setDocType("pdf");
      setDocumentFile(URL.createObjectURL(file));
    } else if (file.type.startsWith("image/")) {
      setDocType("image");
      setDocumentFile(URL.createObjectURL(file));
    }
  };

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSignature(URL.createObjectURL(file));
    }
  };

  const downloadSignedDocument = () => {
    html2canvas(docRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      if (docType === "pdf") {
        const pdf = new jsPDF("p", "mm", "a4");
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, "PNG", 0, 0, width, height);
        pdf.save("signed_document.pdf");
      } else {
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "signed_document.png";
        link.click();
      }
    });
  };

  return (
    <div className="signature-app-container">
      <h2 className="signature-app-title">Document Signing App</h2>

      <div className="signature-app-upload-container">
        <input className="signature-app-upload" type="file" onChange={handleDocUpload} accept="application/pdf,image/*" />
        <input className="signature-app-upload" type="file" onChange={handleSignatureUpload} accept="image/*" />
      </div>

      {/* Document Viewer */}
      <div ref={docRef} className="signature-app-document-viewer">
        {/* PDF Display */}
        {docType === "pdf" && documentFile && (
          <iframe src={documentFile} className="signature-app-pdf-frame" title="Document Viewer" />
        )}

        {/* Draggable Signature */}
        {signature && (
          <Draggable nodeRef={sigRef}>
            <img
              ref={sigRef}
              src={signature}
              alt="Signature"
              width="120px"
              className="signature-app-signature"
            />
          </Draggable>
        )}
      </div>

      <button onClick={downloadSignedDocument} className="signature-app-download-btn">
        Download Signed Document
      </button>
    </div>
  );
};


export default SignatureApp;
