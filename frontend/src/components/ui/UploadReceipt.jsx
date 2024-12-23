import React, { useState } from "react";
import Tesseract from "tesseract.js";

const UploadReceipt = ({ onTextExtracted }) => {
    const [image, setImage] = useState(null);
    const [text, setText] = useState("");

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!image) return alert("Please upload an image.");

        const formData = new FormData();
        formData.append("receipt", image);

        // Upload image to backend
        const response = await fetch("http://localhost:5000/api/uploads/upload-receipt", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        if (data.filePath) {
            // Convert image to text using Tesseract.js
            Tesseract.recognize(
                data.filePath,
                "eng",
                {
                    logger: (info) => console.log(info),
                }
            ).then(({ data: { text } }) => {
                setText(text);
                onTextExtracted(text); // Pass extracted text to parent component
            });
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload & Extract</button>
            <textarea readOnly value={text} placeholder="Extracted text will appear here" />
        </div>
    );
};

export default UploadReceipt;