import { useEffect, useState } from 'react';
import axios from 'axios';
const apiUrl=import.meta.env.VITE_APP_API_URL ;   

const CreationView = ({ fileName }: { fileName: string }) => {

    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                        
                const response = await axios.get(`${apiUrl}/api/Creation/download-url/${fileName}`, {});
        
                setImageUrl(response.data.downloadUrl);  
        
            } catch (error) {
                console.error('ERORR IMPORT URL:', error);
            }
        };
        
        fetchImageUrl();

    }, [fileName]); 

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
                opacity: '0.85',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)'; 
                e.currentTarget.style.opacity = '1'; 
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'; 
            }}
        />
    ) : (
        <p>Loading image...</p>
    )}
</div>

    );
};

export default CreationView;