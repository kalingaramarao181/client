import React, { useState } from "react";
import SignaturePad from "./SignaturePad";
import DraggableSignature from "./DraggableSignature";
import { addSignatureToPDF } from "../utils/pdfUtils";
import "../styles/documentSigner.css";

const DocumentSigner = () => {
    const [signature, setSignature] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [position, setPosition] = useState({ x: 50, y: 50 });

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const signPDF = async () => {
        if (!selectedFile) return alert("Please upload a PDF file.");
        const pdfBytes = await selectedFile.arrayBuffer();
        addSignatureToPDF(pdfBytes, signature, position.x, position.y);
    };

    return (
        <div className="doc-container">
            <h2 className="doc-title">EzySign - Position Signature</h2>
            
            <SignaturePad onSave={setSignature} />
            
            {signature && (
                <>
                    <h3>Click anywhere to place the signature:</h3>
                    <input type="file" accept=".pdf" onChange={handleFileUpload} className="doc-input" />
                    <div className="document-preview">
                        {selectedFile && (
                            <div className="document-area">
                                <DraggableSignature signature={signature} onPositionChange={setPosition} />
                            </div>
                        )}
                    </div>
                    <button onClick={signPDF} className="doc-btn sign-pdf">Sign PDF</button>
                </>
            )}
        </div>
    );
};

export default DocumentSigner;
