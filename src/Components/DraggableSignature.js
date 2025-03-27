import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Draggable from "react-draggable";

// Ensure PDF.js worker is loaded properly
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

const DocumentSigner = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [numPages, setNumPages] = useState(0);
    const signature = "https://your-signature-image-url.com/sign.png"; // Replace with actual signature URL

    // Handle PDF upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPdfFile(URL.createObjectURL(file));
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Upload a PDF and Sign</h2>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />

            {pdfFile && (
                <div style={{ position: "relative", display: "inline-block", marginTop: "20px" }}>
                    <Document
                        file={pdfFile}
                        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                    >
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page key={index} pageNumber={index + 1} />
                        ))}
                    </Document>

                    {/* Draggable Signature */}
                    <Draggable>
                        <img
                            src={signature}
                            alt="Signature"
                            width="100px"
                            style={{
                                position: "absolute",
                                cursor: "move",
                                top: "50px", 
                                left: "50px"
                            }}
                        />
                    </Draggable>
                </div>
            )}
        </div>
    );
};

export default DocumentSigner;
