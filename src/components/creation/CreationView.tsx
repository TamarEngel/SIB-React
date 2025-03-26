import { useEffect, useState } from 'react';
import axios from 'axios';
const apiUrl=import.meta.env.VITE_APP_API_URL ;    // קישור לשרת

const CreationView = ({ fileName }: { fileName: string }) => {

    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                        
                const response = await axios.get(`${apiUrl}/api/Creation/download-url/${fileName}`, {});
        
                setImageUrl(response.data.downloadUrl);  // הגדרת ה-URL לקבלת התמונה
        
            } catch (error) {
                console.error('שגיאה בהבאת ה-URL:', error);
            }
        };
        
        fetchImageUrl();

    }, [fileName]); // מבצע את הקריאה כל פעם ששם הקובץ משתנה

    return (
<div>
    {imageUrl ? (
        <img
            src={imageUrl}
            alt="Uploaded Image"
            style={{
                width: '90%',
                marginTop: "10px",
                borderRadius: '8px',
                transition: "transform 0.2s ease-in-out, opacity 0.5s",
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                cursor: 'pointer',
                opacity: '0.85', // ברירת מחדל קצת שקוף
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)'; // הגדלה ממש עדינה
                e.currentTarget.style.opacity = '1'; // השקיפות יורדת לאפס (תמונה נראית בבהירות מלאה)
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'; // חוזר לגודל המקורי
                // e.currentTarget.style.opacity = '0.85'; // חוזר לשקיפות המקורית
            }}
        />
    ) : (
        <p>טוען תמונה...</p>
    )}
</div>

        // <div>
        //     {imageUrl ? (
        //         <img src={imageUrl} alt="Uploaded Image" style={{ width: '90%',marginTop:"10px", borderRadius: '8px' }} />
        //     ) : (
        //         <p>טוען תמונה...</p>
        //     )}
        // </div>
    );
};

export default CreationView;