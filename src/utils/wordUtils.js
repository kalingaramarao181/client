import { Document, Packer, Paragraph, ImageRun } from "docx";
import { saveAs } from "file-saver";

export const addSignatureToWord = async (signatureDataURL) => {
    const response = await fetch(signatureDataURL);
    const signatureBlob = await response.blob();
    const signatureArrayBuffer = await signatureBlob.arrayBuffer();

    const doc = new Document({
        sections: [
            {
                properties: {},
                children: [
                    new Paragraph("Signed Document"),
                    new Paragraph({
                        children: [
                            new ImageRun({
                                data: signatureArrayBuffer,
                                transformation: { width: 100, height: 50 },
                            }),
                        ],
                    }),
                ],
            },
        ],
    });

    const buffer = await Packer.toBlob(doc);
    saveAs(buffer, "signed_document.docx");
};
