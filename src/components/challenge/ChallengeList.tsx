import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Card, CardActionArea, CardMedia, CardContent, IconButton,LinearProgress } from "@mui/material";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FlashOnIcon from '@mui/icons-material/FlashOn';
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


const ChallengeProgressSection = () => (
    <Box sx={{ marginBottom: "40px",marginTop: "100px" }}>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "25px" }}>
            <FlashOnIcon sx={{ color: "#fff9ca", marginRight: "12px", fontSize: "2rem" }} />
            <Typography variant="h4" sx={{ 
                color: "#ffffff", 
                fontWeight: 700,
                background: "linear-gradient(81.02deg, #f1535d -22.47%, #ffffff 45.52%, #edc106 180.8%) text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                fontFamily: '"Plus Jakarta Sans", Arial, Helvetica, sans-serif'
            }}>
                Competition Stats Overview
            </Typography>
        </Box>
        <Grid container spacing={4}>
            {[
                { title: "Overall Participation", progress: 85, timeLeft: "2 days", participants: 342 },
                { title: "Submission Rate", progress: 65, timeLeft: "5 days", participants: 198 },
                { title: "Voting Activity", progress: 45, timeLeft: "1 week", participants: 156 }
            ].map((challenge, index) => (
                <Grid item xs={12} md={4} key={index}>
                    <Card sx={{
                        backgroundColor: "transparent",
                        border: "1px solid #ffffff26",
                        borderRadius: "15px",
                        padding: "28px",
                        backdropFilter: "blur(12px)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            transform: "translateY(-3px)",
                            border: "1px solid #ffffff26",
                            boxShadow: "0 12px 35px rgba(241, 83, 93, 0.15)"
                        }
                    }}>
                        <Typography variant="h6" sx={{ 
                            color: "#ffffff", 
                            fontWeight: 600, 
                            marginBottom: "18px",
                            fontFamily: '"Plus Jakarta Sans", Arial, Helvetica, sans-serif'
                        }}>
                            {challenge.title}
                        </Typography>
                        <Box sx={{ marginBottom: "12px" }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                <Typography sx={{ 
                                    color: "rgba(255, 255, 255, 0.7)", 
                                    fontSize: "0.9rem",
                                    fontFamily: '"Plus Jakarta Sans", Arial, Helvetica, sans-serif'
                                }}>
                                    Progress
                                </Typography>
                                <Typography sx={{ 
                                    color: "#fff9ca", 
                                    fontSize: "0.9rem", 
                                    fontWeight: 600,
                                    fontFamily: '"Plus Jakarta Sans", Arial, Helvetica, sans-serif'
                                }}>
                                    {challenge.progress}%
                                </Typography>
                            </Box>
                            <LinearProgress 
                                variant="determinate" 
                                value={challenge.progress}
                                sx={{
                                    height: "4px",
                                    borderRadius: "5px",
                                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                                    "& .MuiLinearProgress-bar": {
                                        background: "linear-gradient(81.02deg, #f1535d -4.47%, #ffffff 65.52%, #edc106 283.8%)",
                                        borderRadius: "5px"
                                    }
                                }}
                            />
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography sx={{ 
                                color: "rgba(255, 255, 255, 0.7)", 
                                fontSize: "0.9rem",
                                fontFamily: '"Plus Jakarta Sans", Arial, Helvetica, sans-serif'
                            }}>
                                {challenge.participants} participants
                            </Typography>
                            <Typography sx={{ 
                                color: "#efbec1", 
                                fontSize: "0.9rem", 
                                fontWeight: 600,
                                fontFamily: '"Plus Jakarta Sans", Arial, Helvetica, sans-serif'
                            }}>
                                {challenge.timeLeft} left
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
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
         
                <ChallengeProgressSection />
            
            </Box>
        </Box>
        <MinimalFooter />
    </>);
});

export default ChallengeList;