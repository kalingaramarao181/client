import { PDFDocument } from "pdf-lib";

export const addSignatureToPDF = async (pdfBytes, signatureImage, x, y) => {
    try {
        console.log("PDF Signature Placement - X:", x, "Y:", y);

        if (isNaN(x) || isNaN(y)) {
            throw new Error("Invalid coordinates: x or y is NaN");
        }

        const pdfDoc = await PDFDocument.load(pdfBytes);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        const signatureImageBytes = await fetch(signatureImage).then(res => res.arrayBuffer());
        const signatureImageEmbed = await pdfDoc.embedPng(signatureImageBytes);

        firstPage.drawImage(signatureImageEmbed, {
            x,
            y,
            width: 100,
            height: 50,
        });

        const modifiedPdfBytes = await pdfDoc.save();
        return modifiedPdfBytes;
    } catch (error) {
        console.error("Error processing PDF:", error);
        throw error;
    }
};
