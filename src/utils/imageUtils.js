import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

export const addSignatureToImage = async (imageElement, signatureDataURL) => {
    const signatureImg = new Image();
    signatureImg.src = signatureDataURL;
    signatureImg.onload = async () => {
        const canvas = await html2canvas(imageElement);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(signatureImg, canvas.width - 150, canvas.height - 100, 100, 50);

        const signedImageURL = canvas.toDataURL("image/png");
        saveAs(signedImageURL, "signed_image.png");
    };
};
