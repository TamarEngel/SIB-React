import { useEffect } from 'react';
import './HomePage.css';
import Footer from './Footer';

const sections = [
    
    {
        title: "Image generation",
        text: "Realtime Canvas lets you create lightning fast, instantaneous drawing-to-image AI generations. Select from a range of drawing tools and prompt settings and watch as your image transform live! Great for coming up with ideas for a new maketing campaign or taking control of the image generation process for precise results.",
        imgSrc: "/images/3.png",
        buttonText: "Generate Video"
    },
    {
        title: "Stay in control!",
        text: "Choose from a selection of high quality models and presets, covering almost any theme you can think of. Add in style elements or upload your own images for precise control over your generations. Perfect for headers, blog imagery, social media graphics and advertising visuals.",
        imgSrc: "/images/1.png",
        buttonText: "Build my First API key"
    },
    {
        title: "Motion",
        text: "Realtime Canvas lets you create lightning fast, instantaneous drawing-to-image AI generations. Select from a range of drawing tools and prompt settings and watch as your image transform live! Great for coming up with ideas for a new maketing campaign or taking control of the image generation process for precise results.",
        imgSrc: "/images/0.png",
        buttonText: "Generate Video"
    },
    {
        title: "Image generation",
        text: "Motion brings your marketing visuals to life, creating up to 4 seconds of animation. Select an image from your feed or upload your own and generate a video in seconds. Stitch them together to create promo videos, social media content, animated storyboards, video ads and more.",
        imgSrc: "/images/2.png",
        buttonText: "Generate Image"
    },
];

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
            <div className="backgroundImage">
                <img src="/images/Designer.jpg" alt="" />
            </div>
            <div className="content-container">
                {sections.map((section, index) => (
                    <div className={`section ${index % 2 === 0 ? "reverse" : ""}`} key={index}>
                        <img src={section.imgSrc} alt={section.title} className="section-image" />
                        <div className="section-text">
                            <h2>{section.title}</h2>
                            <p>{section.text}</p>
                            <button className="custom-button">
                                {section.buttonText}
                                <img src="/images/icons8-arrow-25.png" alt="arrow icon" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
}

export default HomePage;



