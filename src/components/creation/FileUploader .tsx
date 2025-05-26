import React, { useState } from 'react';
import axios from 'axios';
import { getUserDataFromToken } from '../../utils/authUtils';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Typography } from '@mui/material';

const apiUrl = import.meta.env.VITE_APP_API_URL; 

const FileUploader = ({ challengeId, setCreations }: { challengeId: number; setCreations: React.Dispatch<React.SetStateAction<any[]>> }) => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const { userId } = getUserDataFromToken();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleUpload = async () => {
    if (!file) return;
    console.log(file.name);
    console.log(file.type);

    try {
      const token = sessionStorage.getItem('token')
      if (!token) {
        alert("You must be logged in to upload files.");
        return;
      }
      let presignedUrl;
      try {
        const res = await axios.get(`${apiUrl}/api/Creation/upload-url`, {
          params: {
            fileName: file.name,
            contentType: file.type,
            challengeId: challengeId
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        presignedUrl = res.data.url;
      } catch (error) {
        console.error('Error fetching Presigned URL:', error);
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage = error.response.data;
          if (errorMessage === "Can`t Upload 2 creations!") {
            alert("❌ You can't upload more than two creations for this challenge!");
          } else {
            alert(errorMessage || "Error getting upload link.");
          }
        } else {
          alert("Unexpected error. Please try again later.");
        }
        return;
      }

      await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setProgress(percent);
        },
      });

      const res2 = await axios.post(`${apiUrl}/api/Creation`, {
        UserId: userId,
        FileName: file.name,
        FileType: file.type,
        ChallengeId: challengeId,
        ImageUrl: presignedUrl
      },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const newCreation = res2.data.creation; 

      setCreations((prevCreations) => [...prevCreations, newCreation]);

      alert(res2.data.message || "✅ Your image has been uploaded successfully!");

    } catch (error) {
      console.error('Error saving the image:', error);
      alert('An error occurred during the upload. Please try again later.');
    }
  };

  return (

    <div style={{ textAlign: "center", color: "#ffffff" }}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          width: "400px",
          height: "150px",
          border: dragActive ? "2px dashed #ffffff" : "2px dashed #555",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "20px auto",
          cursor: "pointer",
          backgroundColor: dragActive ? "#333333" : "transparent",
        }}
      >
        <CloudUploadIcon style={{ fontSize: "50px", color: "#ffffff" }} />
        <p style={{ fontSize: "15px" }}>Drag a file here or select from your computer using the button below.</p>
      </div>

      <input
        id="file-upload"
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <label htmlFor="file-upload" className="custom-button" style={buttonStyle}>
        Select a file
      </label>

      {file && <p style={{ marginTop: "10px", fontSize: "14px" }}>{file.name}</p>}

      <button onClick={handleUpload} className="custom-button" style={buttonStyle}>
        Upload a file
      </button>
      {progress > 0 && <Typography sx={{ color: "#ffffff", marginTop: '8px' }}>progress: {progress}%</Typography>}

    </div>

  );
};
const buttonStyle = {
  width: "135px",
  height: "43px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  backgroundColor: "#000000",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "600",
  border: "1px solid #26272c",
  borderRadius: "38px",
  transition: "all 0.15s ease-in-out",
  cursor: "pointer",
  margin: "10px",
};

export default FileUploader;