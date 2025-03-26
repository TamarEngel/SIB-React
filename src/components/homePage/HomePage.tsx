import { useEffect } from 'react';
import './HomePage.css'; // אל תשכח לכלול את ה-CSS החדש!

const HomePage = () => {
    useEffect(() => {
        // להוסיף את הקלאס 'home-page' ל-body רק בעמוד הבית
        document.body.classList.add('home-page');

        // להסיר את הקלאס 'home-page' כשעוזבים את הדף
        return () => {
            document.body.classList.remove('home-page');
        };
    }, []);

    return (
        <>
            {/* רקע ראשי עם תמונה */}
            <div className="page-content">
                {/* כל התוכן המופיע אחרי התמונה */}
                <h1>Welcome to Our Website</h1>
            </div>

            {/* פוטר בתחתית העמוד */}
            <div className="footer">
                <p>&copy; 2025 SIB. T.E ;</p>
            </div>
        </>
    );
}

export default HomePage;
