import React, { useState } from 'react';
import axios from 'axios';
import { getUserDataFromToken } from '../../utils/authUtils';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Typography } from '@mui/material';

const apiUrl = import.meta.env.VITE_APP_API_URL;    // קישור לשרת

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
  const handleDragOver = (e:React.DragEvent<HTMLDivElement>) => {
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
        alert("אין אפשרות להעלות קובץ ללא התחברות.");
        return;
      }
      // שלב 1: קבלת Presigned URL מהשרת
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
        console.error('שגיאה בקבלת Presigned URL:', error);
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage = error.response.data;
          if (errorMessage === "Can`t Upload 2 creations!") {
            alert("❌ אינך יכול להעלות יותר משתי יצירות לאתגר זה!");
          } else {
            alert(errorMessage || "שגיאה בקבלת קישור להעלאה.");
          }
        } else {
          alert("שגיאה בלתי צפויה. נסה שוב מאוחר יותר.");
        }
        return;
      }

      // שלב 2: העלאת הקובץ ישירות ל-S3
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

      // שלב 3: שמירת הקובץ בדאטה בייס
      console.log("📦 נתונים שנשלחים:", {
        UserId: userId,
        FileName: file.name,
        FileType: file.type,
        ChallengeId: challengeId,
        ImageUrl: presignedUrl
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

      const newCreation = res2.data.creation;  // התמונה החדשה שנשמרה
      console.log("📦 תמונה חדשה:", newCreation);

      setCreations((prevCreations) => [...prevCreations, newCreation]);

      alert(res2.data.message || "התמונה נשמרה בהצלחה!");

    } catch (error) {
      console.error('שגיאה בשמירת התמונה :', error);
      alert('הייתה שגיאה במהלך ההעלאה. אנא נסה שוב מאוחר יותר.');
    }
  };

  return (

    <div style={{ textAlign: "center", color: "#ffffff" }}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          width: "300px",
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
        <p>גרור לכאן קובץ או בחר מהמחשב</p>
      </div>

      <input
        id="file-upload"
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <label htmlFor="file-upload" className="custom-button" style={buttonStyle}>
        בחירת קובץ
      </label>

      {file && <p style={{ marginTop: "10px", fontSize: "14px" }}>{file.name}</p>}

      <button onClick={handleUpload} className="custom-button" style={buttonStyle}>
        העלה קובץ
      </button>
     {progress > 0 && <Typography sx={{ color: "#ffffff", marginTop: '8px' }}>התקדמות: {progress}%</Typography>}

    </div>

    // <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
    //   {/* כפתור בחירת קובץ */}
    //   <label htmlFor="file-upload">
    //     <Box component="span" sx={{
    //       display: 'inline-block',
    //       background: 'linear-gradient(45deg, #f1535d, #edc106)',
    //       color: '#fff',
    //       padding: '8px 16px',
    //       borderRadius: '8px',
    //       cursor: 'pointer',
    //       fontWeight: 'bold',
    //       transition: 'transform 0.2s ease-in-out',
    //       '&:hover': { transform: 'scale(1.05)' }
    //     }}>
    //       בחירת קובץ
    //     </Box>
    //   </label>
    //   <input
    //     id="file-upload"
    //     type="file"
    //     onChange={handleFileChange}
    //     style={{ display: 'none' }}
    //   />

    //   {/* כפתור העלאה */}
    //   <button onClick={handleUpload} style={{
    //     background: 'linear-gradient(45deg, #f1535d, #edc106)',
    //     color: '#fff',
    //     padding: '8px 16px',
    //     border: 'none',
    //     borderRadius: '8px',
    //     cursor: 'pointer',
    //     fontWeight: 'bold',
    //     transition: 'transform 0.2s ease-in-out',
    //   }}
    //     onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
    //     onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    //   >
    //     העלה קובץ
    //   </button>

    //   {/* הצגת ההתקדמות */}
    //   {progress > 0 && <Typography sx={{ color: "#ffffff", marginTop: '8px' }}>התקדמות: {progress}%</Typography>}
    // </Box>
    // <div>
    //   <input type="file" onChange={handleFileChange} />
    //   <button onClick={handleUpload}>העלה קובץ</button>
    //   {progress > 0 && <div>התקדמות: {progress}%</div>}
    // </div>
  );
};

// buttonStyle[":hover"] = { backgroundColor: "#333333" };

const buttonStyle = {
  height: "43px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  backgroundColor: "#000000",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  border: "1px solid #26272c",
  borderRadius: "38px",
  transition: "all 0.15s ease-in-out",
  cursor: "pointer",
  margin: "10px",
};

export default FileUploader;