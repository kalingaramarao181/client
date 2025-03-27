import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import "../styles/signature.css";

const SignaturePad = ({ onSave }) => {
    const sigCanvas = useRef();

    const saveSignature = () => {
        const dataURL = sigCanvas.current.toDataURL("image/png");
        onSave(dataURL);
    };

    

    return (
        <div className="sig-container">
            <h3 className="sig-title">Draw Your Signature</h3>
            <SignatureCanvas ref={sigCanvas} canvasProps={{ width: 400, height: 200, className: "sig-canvas" }} />
            <div className="sig-buttons">
                <button onClick={saveSignature} className="sig-btn save">Save</button>
                <button onClick={() => sigCanvas.current.clear()} className="sig-btn clear">Clear</button>
            </div>
        </div>
    );
};

export default SignaturePad;
