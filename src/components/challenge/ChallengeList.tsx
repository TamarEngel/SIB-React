// import { observer } from "mobx-react-lite";
// import { useNavigate } from "react-router-dom";
// import { Box, Typography, Grid, Card, CardActionArea, CardMedia, CardContent, IconButton } from "@mui/material";
// import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import challengeStore from "../../store/challengeStore";
// import { useEffect, useState } from "react";
// import MinimalFooter from "../homePage/MinimalFooter";

// const challengeImages = [
//     "/images/more/2.jpeg",
//     "/images/more/1.webp",
//     "/images/more/6.jpeg",
//     "/images/more/7.jpeg",
//     "/images/more/8.jpeg",
//     "/images/more/10.webp",
// ];

// const getRandomImage = () => challengeImages[Math.floor(Math.random() * challengeImages.length)];

// const ChallengeList = observer(() => {
//     const navigate = useNavigate();
//     const challenges = challengeStore.getSortCallenges;
//     const [page, setPage] = useState(1);

//     useEffect(() => {
//         document.body.style.backgroundColor = "#020202"; 
//         return () => {
//             document.body.style.backgroundColor = "";
//         };
//     }, []);

//     const handleNavigate = (challengeId: number) => {
//         navigate(`${challengeId}`);
//     };

//     const handlePageChange = (newPage: number) => {
//         setPage(newPage);
//     };

//     const challengesToShow = challenges.slice((page - 1) * 3, page * 3);

//     return (<>
  
//         <Box sx={{
//             backgroundColor: "#020202",
//             marginTop:"20px",
//             minHeight: "100vh",
//             padding: "95px 40px 70px",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center"
//         }}>
//             <Box sx={{
//                 textAlign: "left",
//                 width: "100%",
//                 maxWidth: "1180px",
//                 marginBottom: "30px",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center"
//             }}>
//                 <Box>
//                     <Typography sx={{
//                         fontSize: "clamp(1.5625rem, 0.8152rem + 2.9891vw, 2.25rem)",
//                         fontWeight: 700,
//                         color: "#ffffff",
//                         lineHeight: 1.4,
//                         fontFamily: '"Plus Jakarta Sans", Arial, Helvetica, sans-serif'
//                     }}>
//                         <span style={{color:"#fff9ca",margin:"5px",fontSize: "45px"}}>SIB</span>
//                          - The Ultimate AI Challenge Arena:
//                     </Typography>
//                     <Typography sx={{
//                         fontSize: "1.8rem",
//                         fontWeight: 400,
//                         background: "linear-gradient(81.02deg, #f1535d -22.47%, #ffffff 45.52%, #edc106 180.8%) text",
//                         WebkitBackgroundClip: "text",
//                         WebkitTextFillColor: "transparent",
//                         display: "inline-block",
//                         marginLeft:"8px"
//                     }}>
//                         Create, Compete & Conquer!
//                     </Typography>
//                 </Box>

//                 <Box sx={{
//                     display: "flex",
//                     gap: "10px", 
//                 }}>
//                     <IconButton
//                         onClick={() => handlePageChange(page - 1)}
//                         disabled={page === 1}
//                         sx={{
//                             backgroundColor: "transparent",
//                             borderRadius: "50%",
//                             padding: "10px",
//                             color: "white",
//                             border: "1px solid #999", 
//                             "&:hover": {
//                                 borderColor: "#fff", 
//                                 opacity: 0.8, 
//                             },
//                             "&:disabled": {
//                                 opacity: 0.3, 
//                                 cursor: "not-allowed", 
//                                 borderColor: "#999", 
//                             }
//                         }}
//                     >
//                         <NavigateBeforeIcon sx={{
//                             opacity: page === 1 ? 0.5 : 1, 
//                             transition: "opacity 0.3s",
//                         }} />
//                     </IconButton>

//                     <IconButton
//                         onClick={() => handlePageChange(page + 1)}
//                         disabled={page === Math.ceil(challenges.length / 3)}
//                         sx={{
//                             backgroundColor: "transparent",
//                             borderRadius: "50%",
//                             padding: "10px",
//                             color: "white",
//                             border: "1px solid #999", 
//                             "&:hover": {
//                                 borderColor: "#fff",
//                                 opacity: 0.8, 
//                             },
//                             "&:disabled": {
//                                 cursor: "not-allowed", 
//                             }
//                         }}
//                     >
//                         <NavigateNextIcon sx={{
//                         }} />
//                     </IconButton>
//                 </Box>
//             </Box>

//             <Grid container spacing={3} sx={{ maxWidth: "1180px" }}>
//                 {challengesToShow.length > 0 ? (
//                     challengesToShow.map((challenge) => (
//                         <Grid item key={challenge.id} xs={12} sm={6} md={4}>
//                             <Card
//                                 sx={{
//                                     backgroundColor: "transparent",
//                                     borderRadius: "12px",
//                                     overflow: "hidden",
//                                     position: "relative",
//                                     "&:hover .overlay": { opacity: 1 }
//                                 }}
//                             >
//                                 <CardActionArea onClick={() => handleNavigate(challenge.id)}>
//                                     <CardMedia
//                                         component="img"
//                                         height="200"
//                                         image={getRandomImage()}
//                                         alt={challenge.title}
//                                         sx={{ borderRadius: "12px", transition: "0.3s" }}
//                                     />
//                                     <Box className="overlay" sx={{
//                                         position: "absolute",
//                                         top: 0,
//                                         left: 0,
//                                         width: "100%",
//                                         height: "100%",
//                                         background: "rgba(0, 0, 0, 0.6)",
//                                         display: "flex",
//                                         flexDirection: "column",
//                                         justifyContent: "center",
//                                         alignItems: "center",
//                                         opacity: 0,
//                                         transition: "opacity 0.3s",
//                                         borderRadius: "12px",
//                                         color: "#ffffff",
//                                         padding: "16px",
//                                         textAlign: "center"
//                                     }} >
//                                         <Typography variant="h6">{challenge.title}</Typography>
//                                         <Typography variant="body2">Number of competitors: {challenge.countCreations}</Typography>
//                                     </Box>
//                                 </CardActionArea>
//                                 <CardContent sx={{ textAlign: "center", backgroundColor: "#121212", borderRadius: "0 0 12px 12px" }}>
//                                     <Typography variant="h6" sx={{ color: "#ffffff" }}>
//                                         {challenge.title}
//                                     </Typography>
//                                     <Typography variant="body2" sx={{ color: "#9094a6" }}>
//                                         {challenge.description}
//                                     </Typography>
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     ))
//                 ) : (
//                     <Typography sx={{ padding: 2, color: "#ffffff" }}>No challenges available</Typography>
//                 )}
//             </Grid>
//         </Box>
//         <MinimalFooter />
//         </>
//     );
// });

// export default ChallengeList;




import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Card, CardActionArea, CardMedia, CardContent, IconButton, Button, Chip, LinearProgress } from "@mui/material";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
// import PaletteIcon from '@mui/icons-material/Palette';
import challengeStore from "../../store/challengeStore";
import { useEffect, useState } from "react";
import MinimalFooter from "../homePage/MinimalFooter";

const challengeImages = [
    "/images/more/2.jpeg",
    "/images/more/1.webp",
    "/images/more/6.jpeg",
    "/images/more/7.jpeg",
    "/images/more/8.jpeg",
    "/images/more/10.webp",
];

const getRandomImage = () => challengeImages[Math.floor(Math.random() * challengeImages.length)];

// Mock data for new features
const trendingChallenges = [
    { id: 1, title: "Cyberpunk Dreams", participants: 1247, trend: "+15%" },
    { id: 2, title: "Mystic Portraits", participants: 892, trend: "+23%" },
    { id: 3, title: "Neon Landscapes", participants: 2156, trend: "+8%" }
];

const topCreators = [
    { id: 1, name: "PixelMaster", wins: 12, avatar: "🎨", badge: "gold" },
    { id: 2, name: "AIArtist", wins: 8, avatar: "🌟", badge: "silver" },
    { id: 3, name: "NeonDreamer", wins: 6, avatar: "⚡", badge: "bronze" }
];

const featuredTools = [
    { name: "Style Transfer", icon: "🎭", description: "Transform your images with AI-powered style transfer" },
    { name: "Color Enhance", icon: "🌈", description: "Boost colors and contrast with intelligent algorithms" },
    { name: "Prompt Builder", icon: "✨", description: "Generate perfect prompts for your AI creations" },
    { name: "Remix Engine", icon: "🔄", description: "Combine and remix existing artworks" }
];

const ChallengeStats = () => (
    <Box sx={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        borderRadius: "20px",
        padding: "30px",
        marginBottom: "40px",
        border: "1px solid rgba(255, 153, 204, 0.2)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(45deg, rgba(255, 0, 150, 0.1) 0%, rgba(0, 255, 255, 0.1) 100%)",
            zIndex: 0
        }
    }}>
        <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography variant="h4" sx={{
                color: "#fff",
                fontWeight: 700,
                textAlign: "center",
                marginBottom: "20px",
                background: "linear-gradient(45deg, #ff0096, #00ffff, #ff0096)",
                backgroundSize: "200% 200%",
                animation: "gradient 3s ease infinite",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                "@keyframes gradient": {
                    "0%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                    "100%": { backgroundPosition: "0% 50%" }
                }
            }}>
                Challenge Arena Stats
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Box sx={{ textAlign: "center" }}>
                        <Typography variant="h3" sx={{ color: "#00ffff", fontWeight: 700 }}>12.5K</Typography>
                        <Typography sx={{ color: "#ccc" }}>Total Submissions</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Box sx={{ textAlign: "center" }}>
                        <Typography variant="h3" sx={{ color: "#ff0096", fontWeight: 700 }}>3.2K</Typography>
                        <Typography sx={{ color: "#ccc" }}>Active Creators</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Box sx={{ textAlign: "center" }}>
                        <Typography variant="h3" sx={{ color: "#00ff00", fontWeight: 700 }}>48</Typography>
                        <Typography sx={{ color: "#ccc" }}>Live Challenges</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Box sx={{ textAlign: "center" }}>
                        <Typography variant="h3" sx={{ color: "#ffff00", fontWeight: 700 }}>2.1M</Typography>
                        <Typography sx={{ color: "#ccc" }}>Total Views</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </Box>
);

const TrendingSection = () => (
    <Box sx={{ marginBottom: "40px" }}>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <TrendingUpIcon sx={{ color: "#ff0096", marginRight: "10px", fontSize: "2rem" }} />
            <Typography variant="h4" sx={{ color: "#fff", fontWeight: 700 }}>
                Trending Now
            </Typography>
        </Box>
        <Grid container spacing={2}>
            {trendingChallenges.map((challenge) => (
                <Grid item xs={12} md={4} key={challenge.id}>
                    <Card sx={{
                        background: "linear-gradient(135deg, rgba(255, 0, 150, 0.1) 0%, rgba(0, 255, 255, 0.1) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "15px",
                        padding: "20px",
                        backdropFilter: "blur(10px)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 10px 30px rgba(255, 0, 150, 0.3)"
                        }
                    }}>
                        <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
                            {challenge.title}
                        </Typography>
                        <Typography sx={{ color: "#ccc", marginBottom: "10px" }}>
                            {challenge.participants} participants
                        </Typography>
                        <Chip 
                            label={challenge.trend} 
                            sx={{ 
                                background: "linear-gradient(45deg, #00ff00, #00ffff)",
                                color: "#000",
                                fontWeight: 600
                            }} 
                        />
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Box>
);

const LeaderboardSection = () => (
    <Box sx={{ marginBottom: "40px" }}>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <EmojiEventsIcon sx={{ color: "#ffff00", marginRight: "10px", fontSize: "2rem" }} />
            <Typography variant="h4" sx={{ color: "#fff", fontWeight: 700 }}>
                Top Creators
            </Typography>
        </Box>
        <Grid container spacing={2}>
            {topCreators.map((creator, index) => (
                <Grid item xs={12} md={4} key={creator.id}>
                    <Card sx={{
                        background: creator.badge === 'gold' 
                            ? "linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 140, 0, 0.2) 100%)"
                            : creator.badge === 'silver' 
                            ? "linear-gradient(135deg, rgba(192, 192, 192, 0.2) 0%, rgba(169, 169, 169, 0.2) 100%)"
                            : "linear-gradient(135deg, rgba(205, 127, 50, 0.2) 0%, rgba(184, 115, 51, 0.2) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "15px",
                        padding: "20px",
                        textAlign: "center",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: creator.badge === 'gold' 
                                ? "0 10px 30px rgba(255, 215, 0, 0.4)"
                                : "0 10px 30px rgba(255, 255, 255, 0.2)"
                        }
                    }}>
                        <Typography variant="h2" sx={{ marginBottom: "10px" }}>
                            {creator.avatar}
                        </Typography>
                        <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
                            {creator.name}
                        </Typography>
                        <Typography sx={{ color: "#ccc" }}>
                            {creator.wins} wins
                        </Typography>
                        <Typography sx={{ 
                            color: creator.badge === 'gold' ? "#ffd700" 
                                 : creator.badge === 'silver' ? "#c0c0c0" 
                                 : "#cd7f32",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            fontSize: "0.8rem",
                            marginTop: "5px"
                        }}>
                            #{index + 1} {creator.badge}
                        </Typography>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Box>
);

const AIToolsSection = () => (
    <Box sx={{ marginBottom: "40px" }}>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <AutoAwesomeIcon sx={{ color: "#00ffff", marginRight: "10px", fontSize: "2rem" }} />
            <Typography variant="h4" sx={{ color: "#fff", fontWeight: 700 }}>
                AI Creative Tools
            </Typography>
        </Box>
        <Grid container spacing={3}>
            {featuredTools.map((tool, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card sx={{
                        background: "linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(255, 0, 255, 0.1) 100%)",
                        border: "1px solid rgba(0, 255, 255, 0.3)",
                        borderRadius: "20px",
                        padding: "25px",
                        textAlign: "center",
                        height: "200px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        "&:hover": {
                            transform: "translateY(-10px)",
                            boxShadow: "0 15px 40px rgba(0, 255, 255, 0.4)",
                            border: "1px solid rgba(0, 255, 255, 0.6)"
                        }
                    }}>
                        <Typography variant="h2" sx={{ marginBottom: "15px" }}>
                            {tool.icon}
                        </Typography>
                        <Typography variant="h6" sx={{ 
                            color: "#fff", 
                            fontWeight: 600,
                            marginBottom: "10px"
                        }}>
                            {tool.name}
                        </Typography>
                        <Typography sx={{ 
                            color: "#ccc", 
                            fontSize: "0.9rem",
                            lineHeight: 1.4
                        }}>
                            {tool.description}
                        </Typography>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Box>
);

const ChallengeProgressSection = () => (
    <Box sx={{ marginBottom: "40px" }}>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <FlashOnIcon sx={{ color: "#ff0096", marginRight: "10px", fontSize: "2rem" }} />
            <Typography variant="h4" sx={{ color: "#fff", fontWeight: 700 }}>
                Active Challenges Progress
            </Typography>
        </Box>
        <Grid container spacing={3}>
            {[
                { title: "Futuristic Cities", progress: 85, timeLeft: "2 days", participants: 342 },
                { title: "Digital Portraits", progress: 65, timeLeft: "5 days", participants: 198 },
                { title: "Abstract Dreams", progress: 45, timeLeft: "1 week", participants: 156 }
            ].map((challenge, index) => (
                <Grid item xs={12} md={4} key={index}>
                    <Card sx={{
                        background: "linear-gradient(135deg, rgba(255, 0, 150, 0.1) 0%, rgba(0, 255, 255, 0.1) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "15px",
                        padding: "25px",
                        backdropFilter: "blur(10px)"
                    }}>
                        <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600, marginBottom: "15px" }}>
                            {challenge.title}
                        </Typography>
                        <Box sx={{ marginBottom: "10px" }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                                <Typography sx={{ color: "#ccc", fontSize: "0.9rem" }}>Progress</Typography>
                                <Typography sx={{ color: "#00ffff", fontSize: "0.9rem", fontWeight: 600 }}>
                                    {challenge.progress}%
                                </Typography>
                            </Box>
                            <LinearProgress 
                                variant="determinate" 
                                value={challenge.progress}
                                sx={{
                                    height: "8px",
                                    borderRadius: "4px",
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    "& .MuiLinearProgress-bar": {
                                        background: "linear-gradient(45deg, #ff0096, #00ffff)",
                                        borderRadius: "4px"
                                    }
                                }}
                            />
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography sx={{ color: "#ccc", fontSize: "0.9rem" }}>
                                {challenge.participants} participants
                            </Typography>
                            <Typography sx={{ color: "#ffff00", fontSize: "0.9rem", fontWeight: 600 }}>
                                {challenge.timeLeft} left
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Box>
);

const CallToActionSection = () => (
    <Box sx={{
        background: "linear-gradient(135deg, #ff0096 0%, #00ffff 50%, #ff0096 100%)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 6s ease infinite",
        borderRadius: "25px",
        padding: "50px 30px",
        textAlign: "center",
        marginBottom: "40px",
        "@keyframes gradientShift": {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" }
        }
    }}>
        <Typography variant="h3" sx={{ 
            color: "#fff", 
            fontWeight: 700, 
            marginBottom: "20px",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
        }}>
            Ready to Create Magic?
        </Typography>
        <Typography variant="h6" sx={{ 
            color: "#fff", 
            marginBottom: "30px",
            opacity: 0.9
        }}>
            Join thousands of creators in the ultimate AI art challenge arena
        </Typography>
        <Button 
            variant="contained" 
            size="large"
            sx={{
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1.2rem",
                padding: "15px 40px",
                borderRadius: "50px",
                textTransform: "none",
                "&:hover": {
                    background: "rgba(255, 255, 255, 0.3)",
                    transform: "scale(1.05)",
                    boxShadow: "0 10px 30px rgba(255, 255, 255, 0.3)"
                }
            }}
        >
            Start Creating Now ✨
        </Button>
    </Box>
);

const ChallengeList = observer(() => {
    const navigate = useNavigate();
    const challenges = challengeStore.getSortCallenges;
    const [page, setPage] = useState(1);

    useEffect(() => {
        document.body.style.backgroundColor = "#020202"; 
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    const handleNavigate = (challengeId: number) => {
        navigate(`${challengeId}`);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const challengesToShow = challenges.slice((page - 1) * 3, page * 3);

    return (<>
        <Box sx={{
            backgroundColor: "#020202",
            marginTop:"20px",
            minHeight: "100vh",
            padding: "95px 40px 70px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <Box sx={{
                textAlign: "left",
                width: "100%",
                maxWidth: "1180px",
                marginBottom: "30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Box>
                    <Typography sx={{
                        fontSize: "clamp(1.5625rem, 0.8152rem + 2.9891vw, 2.25rem)",
                        fontWeight: 700,
                        color: "#ffffff",
                        lineHeight: 1.4,
                        fontFamily: '"Plus Jakarta Sans", Arial, Helvetica, sans-serif'
                    }}>
                        <span style={{color:"#fff9ca",margin:"5px",fontSize: "45px"}}>SIB</span>
                         - The Ultimate AI Challenge Arena:
                    </Typography>
                    <Typography sx={{
                        fontSize: "1.8rem",
                        fontWeight: 400,
                        background: "linear-gradient(81.02deg, #f1535d -22.47%, #ffffff 45.52%, #edc106 180.8%) text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        display: "inline-block",
                        marginLeft:"8px"
                    }}>
                        Create, Compete & Conquer!
                    </Typography>
                </Box>

                <Box sx={{
                    display: "flex",
                    gap: "10px", 
                }}>
                    <IconButton
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        sx={{
                            backgroundColor: "transparent",
                            borderRadius: "50%",
                            padding: "10px",
                            color: "white",
                            border: "1px solid #999", 
                            "&:hover": {
                                borderColor: "#fff", 
                                opacity: 0.8, 
                            },
                            "&:disabled": {
                                opacity: 0.3, 
                                cursor: "not-allowed", 
                                borderColor: "#999", 
                            }
                        }}
                    >
                        <NavigateBeforeIcon sx={{
                            opacity: page === 1 ? 0.5 : 1, 
                            transition: "opacity 0.3s",
                        }} />
                    </IconButton>

                    <IconButton
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === Math.ceil(challenges.length / 3)}
                        sx={{
                            backgroundColor: "transparent",
                            borderRadius: "50%",
                            padding: "10px",
                            color: "white",
                            border: "1px solid #999", 
                            "&:hover": {
                                borderColor: "#fff",
                                opacity: 0.8, 
                            },
                            "&:disabled": {
                                cursor: "not-allowed", 
                            }
                        }}
                    >
                        <NavigateNextIcon sx={{
                        }} />
                    </IconButton>
                </Box>
            </Box>

            <Grid container spacing={3} sx={{ maxWidth: "1180px", marginBottom: "60px" }}>
                {challengesToShow.length > 0 ? (
                    challengesToShow.map((challenge) => (
                        <Grid item key={challenge.id} xs={12} sm={6} md={4}>
                            <Card
                                sx={{
                                    backgroundColor: "transparent",
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    position: "relative",
                                    "&:hover .overlay": { opacity: 1 }
                                }}
                            >
                                <CardActionArea onClick={() => handleNavigate(challenge.id)}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={getRandomImage()}
                                        alt={challenge.title}
                                        sx={{ borderRadius: "12px", transition: "0.3s" }}
                                    />
                                    <Box className="overlay" sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        background: "rgba(0, 0, 0, 0.6)",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        opacity: 0,
                                        transition: "opacity 0.3s",
                                        borderRadius: "12px",
                                        color: "#ffffff",
                                        padding: "16px",
                                        textAlign: "center"
                                    }} >
                                        <Typography variant="h6">{challenge.title}</Typography>
                                        <Typography variant="body2">Number of competitors: {challenge.countCreations}</Typography>
                                    </Box>
                                </CardActionArea>
                                <CardContent sx={{ textAlign: "center", backgroundColor: "#121212", borderRadius: "0 0 12px 12px" }}>
                                    <Typography variant="h6" sx={{ color: "#ffffff" }}>
                                        {challenge.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#9094a6" }}>
                                        {challenge.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography sx={{ padding: 2, color: "#ffffff" }}>No challenges available</Typography>
                )}
            </Grid>

            {/* New Enhanced Sections */}
            <Box sx={{ width: "100%", maxWidth: "1180px" }}>
                <ChallengeStats />
                <TrendingSection />
                <LeaderboardSection />
                <ChallengeProgressSection />
                <AIToolsSection />
                <CallToActionSection />
            </Box>
        </Box>
        <MinimalFooter />
    </>);
});

export default ChallengeList;