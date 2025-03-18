import React, { useState } from 'react';
import axios from 'axios';
import { getUserDataFromToken } from '../../utils/authUtils';

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const { userId, name, email} = getUserDataFromToken();console.log(userId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    console.log(file.name);
    console.log(file.type);

    try {
      const token= sessionStorage.getItem('token')
      // שלב 1: קבלת Presigned URL מהשרת
      const res = await axios.get('https://localhost:7143/api/Creation/upload-url', {
        params: {
          fileName: file.name,
          contentType: file.type
        },
        headers: {
          Authorization: `Bearer ${token}`  // שליחת ה-token
        }
      });

      const presignedUrl = res.data.url;
      console.log(presignedUrl);

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
      // const res2 = await axios.post(`https://localhost:7143/api/Creation`, {
      //           UserId :userId,
      //           FileName :file.name,
      //           FileType:file.type 
      //           ChallengeId :,
      //           ImageUrl :presignedUrl
      //       }, 
      //       {
      //         headers: {
      //           'Content-Type': 'application/json',
      //           'Accept': 'application/json',
      //           'Authorization': `Bearer ${token}`
      //         }
      //       }
      // );

      alert('הקובץ הועלה בהצלחה!');
    } catch (error) {
      console.error('שגיאה בהעלאה:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>העלה קובץ</button>
      {progress > 0 && <div>התקדמות: {progress}%</div>}
    </div>
  );
};

export default FileUploader;