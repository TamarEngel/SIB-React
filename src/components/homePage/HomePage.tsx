import { useEffect } from 'react';
import './HomePage.css';
import { Container, Grid, Typography, Card, CardContent } from '@mui/material';
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


const cardData = [
    {

        icon: (
            <svg className="brxe-svg" xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                <path
                    d="M22.9521 9.53711L23.6129 9.28207C25.2109 8.66532 26.469 7.39504 27.0705 5.79127L27.2939 5.19531C27.3496 4.91699 27.6279 4.75 27.9063 4.75C28.1289 4.75 28.4072 4.91699 28.4629 5.19531L28.7312 5.87823C29.341 7.43054 30.5695 8.65898 32.1218 9.26882L32.8047 9.53711C33.083 9.59277 33.25 9.87109 33.25 10.0938C33.25 10.3721 33.083 10.6504 32.8047 10.7061L32.2087 10.9295C30.605 11.531 29.3347 12.7891 28.7179 14.3871L28.4629 15.0479C28.4072 15.2705 28.1289 15.4375 27.9063 15.4375C27.6279 15.4375 27.3496 15.2705 27.2939 15.0479L27.0823 14.4735C26.4749 12.8247 25.1753 11.5251 23.5265 10.9177L22.9521 10.7061C22.6738 10.6504 22.5625 10.3721 22.5625 10.0938C22.5625 9.87109 22.6738 9.59277 22.9521 9.53711ZM17.8156 12.4963C18.6153 14.2495 20.021 15.6552 21.7742 16.4549L25.4014 18.1094C25.7354 18.2764 25.958 18.6104 25.958 18.9443C25.958 19.2783 25.7354 19.6123 25.4014 19.7793L21.7742 21.4338C20.021 22.2335 18.6153 23.6391 17.8156 25.3923L16.1611 29.0195C15.9941 29.3535 15.6602 29.5762 15.3262 29.5762C14.9922 29.5762 14.6582 29.3535 14.5469 29.0195L12.8424 25.3534C12.0385 23.6241 10.6432 22.2389 8.90816 21.4475L5.25098 19.7793C4.91699 19.6123 4.75 19.2783 4.75 18.9443C4.75 18.6104 4.91699 18.2764 5.25098 18.1094L8.90816 16.4412C10.6432 15.6498 12.0385 14.2646 12.8424 12.5353L14.5469 8.86914C14.6582 8.53516 14.9922 8.3125 15.3262 8.3125C15.6602 8.3125 15.9941 8.53516 16.1611 8.86914L17.8156 12.4963ZM27.2939 23.0078C27.3496 22.7295 27.6279 22.5625 27.9063 22.5625C28.1289 22.5625 28.4072 22.7295 28.4629 23.0078L29.05 24.5022C29.4565 25.537 30.2755 26.356 31.3103 26.7625L32.8047 27.3496C33.083 27.4053 33.25 27.6836 33.25 27.9063C33.25 28.1846 33.083 28.4629 32.8047 28.5186L31.3683 29.0572C30.2991 29.4581 29.4523 30.2969 29.0411 31.3622L28.4629 32.8604C28.4072 33.083 28.1289 33.25 27.9063 33.25C27.6279 33.25 27.3496 33.083 27.2939 32.8604L26.7632 31.4198C26.3583 30.3207 25.4918 29.4542 24.3927 29.0493L22.9521 28.5186C22.6738 28.4629 22.5625 28.1846 22.5625 27.9063C22.5625 27.6836 22.6738 27.4053 22.9521 27.3496L24.4503 26.7714C25.5156 26.3602 26.3544 25.5134 26.7553 24.4442L27.2939 23.0078Z"
                    fill="url(#paint0_linear_4728_17915)"
                />
                <defs>
                    <linearGradient id="paint0_linear_4728_17915" x1="5.82955" y1="10.75" x2="28.799" y2="7.20851" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#D951A5" />
                        <stop offset="0.499028" stopColor="#B14BF4" />
                        <stop offset="1" stopColor="#6E7BFC" />
                    </linearGradient>
                </defs>
            </svg>
        ),
        title: "Speed Up Your Advertising Game",
        text: "Generate high-quality banners, ads, headers, graphics, and videos custom-tailored to your campaigns. Boost your creative process, optimise your budget and save time."
    },
    {
        icon: (
            <svg className="brxe-svg" xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                <path
                    d="M5 3C3.34315 3 2 4.34315 2 6V22C2 23.6569 3.34315 25 5 25H21L28 31V6C28 4.34315 26.6569 3 25 3H5ZM5 5H25C25.5523 5 26 5.44772 26 6V26L22.5858 22.5858C22.2107 22.2107 21.6095 22.2107 21.2343 22.5858L17.7071 26.7071C17.3166 27.0976 16.6834 27.0976 16.2929 26.7071L12.2929 22.7071C11.9024 22.3166 11.2692 22.3166 10.8787 22.7071L8.29289 25.7071L5 23.4142V5Z"
                    fill="url(#paint0_linear_comment)"
                />
                <defs>
                    <linearGradient id="paint0_linear_comment" x1="5.82955" y1="10.75" x2="28.799" y2="7.20851" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#D951A5" />
                        <stop offset="0.499028" stopColor="#B14BF4" />
                        <stop offset="1" stopColor="#6E7BFC" />
                    </linearGradient>
                </defs>
            </svg>
        ),
        title: "Instant A/B testing for Graphics",
        text: "Create multiple variations of advertising images or videos in seconds. Quickly uncover the optimal ad creative, improve ROI and slash marketing costs."
    },
    {
        icon: (<svg className="brxe-svg" xmlns="http://www.w3.org/2000/svg" width="32" height="38" viewBox="0 0 38 38" fill="none">
            <path
                d="M19 0C8.50628 0 0 8.50628 0 19C0 29.4937 8.50628 38 19 38C29.4937 38 38 29.4937 38 19C38 8.50628 29.4937 0 19 0ZM19 34.4C10.2071 34.4 3 23.8366 3 19C3 14.1634 10.2071 7 19 7C27.8366 7 35 14.1634 35 19C35 23.8366 27.8366 34.4 19 34.4ZM12 14H26C26.5523 14 27 14.4477 27 15C27 15.5523 26.5523 16 26 16H12C11.4477 16 11 15.5523 11 15C11 14.4477 11.4477 14 12 14ZM12 20H26C26.5523 20 27 20.4477 27 21C27 21.5523 26.5523 22 26 22H12C11.4477 22 11 21.5523 11 21C11 20.4477 11.4477 20 12 20Z"
                fill="url(#paint0_linear_chat)"
            />
            <defs>
                <linearGradient id="paint0_linear_chat" x1="5.82955" y1="10.75" x2="28.799" y2="7.20851" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#D951A5" />
                    <stop offset="0.499028" stopColor="#B14BF4" />
                    <stop offset="1" stopColor="#6E7BFC" />
                </linearGradient>
            </defs>
        </svg>
        ),
        title: "Customize Content at Scale",
        text: "Customize your visual content to meet your brand's needs. No need to buy stock images when you can use our AI tools to create custom visuals for your audience and drive conversions."
    },
    {
        icon: (<svg className="brxe-svg" xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
            <path
                d="M18.9998 3.16669C10.2551 3.16669 3.1665 10.2553 3.1665 19C3.1665 27.7448 10.2551 34.8334 18.9998 34.8334C27.7446 34.8334 34.8332 27.7448 34.8332 19C34.8332 10.2553 27.7446 3.16669 18.9998 3.16669ZM16.6248 24.5417C16.6248 26.125 15.8332 26.9167 14.2498 26.9167C12.6665 26.9167 11.8748 26.125 11.8748 24.5417V19.7917C11.8748 18.2084 12.6665 17.4167 14.2498 17.4167C15.8332 17.4167 16.6248 18.2084 16.6248 19.7917V24.5417ZM26.1248 24.5417C26.1248 26.125 25.3332 26.9167 23.7498 26.9167C22.1665 26.9167 21.3748 26.125 21.3748 24.5417V13.4584C21.3748 11.875 22.1665 11.0834 23.7498 11.0834C25.3332 11.0834 26.1248 11.875 26.1248 13.4584V24.5417Z"
                fill="url(#paint0_linear_4728_17910)">
            </path>
            <defs>
                <linearGradient id="paint0_linear_4728_17910" x1="4.366" y1="9.83335" x2="29.8876" y2="5.89836" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#D951A5"></stop>
                    <stop offset="0.499028" stop-color="#B14BF4">
                    </stop><stop offset="1" stop-color="#6E7BFC"></stop>
                </linearGradient>
            </defs>
        </svg>
        ),
        title: "From Concept to Production",
        text: "Quickly ideate and concept your campaign with our AI tools. Save time and nail the brief by seamlessly integrating new ideas without breaking the creative budget."
    }
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

            <Container maxWidth="md" sx={{
                border: "1px solid #26272c",
                borderRadius: "15px",
                textAlign: "center",
                color: "white",
                mt: 10,
                paddingBottom: "35px", // הקטנתי את ה-padding התחתון
                paddingTop: "35px", // הקטנתי את ה-padding העליון
                margin: "0 auto", // למרכז את הקונטיינר
                marginBottom:"70px",
            }}>
                {/* קטע המספרים */}
                <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "400", marginBottom: "20px" }}>
                    Thousands of professionals use Leonardo.Ai for their marketing & advertising needs:
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    {[
                        { number: "500K", text: "Marketers leverage ", more: "Leonardo.Ai" },
                        { number: "1B+", text: "Images, headers and ", more: "videos generated" },
                        { number: "2.7M+", text: "Businesses using our API", more: "to create visuals" }
                    ].map((item, index) => (
                        <Grid item xs={12} sm={4} key={index} sx={{
                            borderLeft: index !== 0 ? "1px solid #26272c" : "none", // קו דק יותר
                            padding: "10px",
                            width: "100%", // רוחב אלמנט קטן יותר
                            maxWidth: "200px", // רוחב מקסימלי לכל אלמנט
                        }}>
                            <Typography variant="h4" sx={{
                                fontWeight: "bold",
                                fontSize: "1.7rem",  // גודל טקסט קטן יותר
                                background: "linear-gradient(81.02deg, #e79ca1 40.47%, #ffffff 45.52%, #edd87b 60.8%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}>
                                {item.number}
                            </Typography>
                            <p className="pp" style={{ fontSize: "0.85rem", margin: "5px 0" }}>{item.text}</p>
                            <p className="pp" style={{ fontSize: "0.85rem", margin: "5px 0" }}>{item.more}</p>
                        </Grid>
                    ))}
                </Grid>
            </Container>





            <div className="header-container">
                <p className="features-title">Our Features</p>
                <h1 className="features-heading">Tools For Marketing and Advertising Images</h1>
                <p className="features-text">
                    Our full suite of AI-powered tools are designed to boost your workflow - from idea, to pitch and final creative.
                    Here's how Leonardo.Ai can help you to quickly produce marketing images and videos:
                </p>
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

            <Container className="c2" maxWidth="lg" sx={{ textAlign: "center", color: "white", mt: 10 }}>
                <div className="head">
                    <h3>How Leonardo.Ai Helps You Achieve Your Marketing Goals</h3>
                    <p className="gg">
                        Leonardo's AI tools help marketers and advertisers produce high quality images for landing pages, blogs, paid adertising creative, social media and video content. Accelerate your marketing workflow, from creative idea to production ready assets. Our AI tools for marketers can help uplift your brand visuals, maximise creative budgets, improve ROI and create impressive  visuals for pitch decks.
                    </p>
                </div>
                {/* קטע הריבועים */}
                <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
                    {cardData.map((card, index) => (
                        <Grid item xs={12} sm={6} md={6} key={index}>
                            <Card sx={{
                                width: "500px", // הקטנתי את הרוחב של ה-Card
                                height: "150px", // גובה קטן יותר
                                background: "linear-gradient(0deg, #000000 0%, #0e0e0e 100%)",
                                border: "1px solid #26272c", // גבול בצבע שביקשת
                                borderRadius: "15px", // קצוות מעוגלים יותר
                                color: "white",
                                p: 2, // הפחתתי את הפדינג
                            }}>
                                <CardContent sx={{ paddingTop: "5px", paddingBottom: "0", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                    {/* אייקון צבעוני וגדול יותר */}
                                    {card.icon}
                                    {/* טקסט עברי עם סידור שמאל לימין */}
                                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "white", textAlign: "left" }}>
                                        {card.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 1, color: "white", fontSize: "14px", textAlign: "left" }}>
                                        {card.text}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default HomePage;



