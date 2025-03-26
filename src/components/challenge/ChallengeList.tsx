import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Card, CardActionArea, CardMedia, CardContent, IconButton } from "@mui/material";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import challengeStore from "../../store/challengeStore";
import { useEffect, useState } from "react";

const challengeImages = [
    "/images/more/2.jpeg",
    "/images/more/1.webp",
    "/images/more/6.jpeg",
    "/images/more/7.jpeg",
    "/images/more/8.jpeg",
    "/images/more/10.webp",
];

const getRandomImage = () => challengeImages[Math.floor(Math.random() * challengeImages.length)];

const ChallengeList = observer(() => {
    const navigate = useNavigate();
    const challenges = challengeStore.getSortCallenges;
    const [page, setPage] = useState(1);

    useEffect(() => {
        document.body.style.backgroundColor = "#000000"; // רקע שחור
        return () => {
            document.body.style.backgroundColor = ""; // מחזירים את הרקע המקורי כשהקומפוננטה נעלמת
        };
    }, []);

    const handleNavigate = (challengeId: number) => {
        navigate(`${challengeId}`);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    // חישוב האתגרים להציג בדף הנוכחי
    const challengesToShow = challenges.slice((page - 1) * 3, page * 3);

    return (
        <Box sx={{
            backgroundColor: "#06080d",
            marginTop:"20px",
            minHeight: "100vh",
            padding: "66px 20px 36px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            {/* כותרות */}
            <Box sx={{
                textAlign: "left",
                width: "100%",
                maxWidth: "1180px",
                marginBottom: "30px",
                display: "flex",
                justifyContent: "space-between", // מקם את כפתורי הניווט בצד ימין
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

                {/* כפתורי ניווט */}
                <Box sx={{
                    display: "flex",
                    gap: "10px", // רווח בין הכפתורים
                }}>
                    <IconButton
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        sx={{
                            backgroundColor: "transparent",
                            borderRadius: "50%",
                            padding: "10px",
                            color: "white",
                            border: "1px solid #999", // מסגרת אפרפרה דקה
                            "&:hover": {
                                borderColor: "#fff", // שינוי צבע המסגרת ללבן כשמרחפים על הכפתור
                                opacity: 0.8, // שינוי של opacity בעת ריחוף
                            },
                            "&:disabled": {
                                opacity: 0.3, // שינוי opacity כשלא ניתן ללחוץ
                                cursor: "not-allowed", // שינוי הסמן כשלא ניתן ללחוץ
                                borderColor: "#999", // שמירה על הצבע האפרפר כשלא פעיל
                            }
                        }}
                    >
                        <NavigateBeforeIcon sx={{
                            opacity: page === 1 ? 0.5 : 1, // חצי שקיפות אם הכפתור לא פעיל
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
                            border: "1px solid #999", // מסגרת אפרפרה דקה
                            "&:hover": {
                                borderColor: "#fff", // שינוי צבע המסגרת ללבן כשמרחפים על הכפתור
                                opacity: 0.8, // שינוי של opacity בעת ריחוף
                            },
                            "&:disabled": {
                                cursor: "not-allowed", // שינוי הסמן כשלא ניתן ללחוץ
                            }
                        }}
                    >
                        <NavigateNextIcon sx={{
                        }} />
                    </IconButton>
                </Box>
            </Box>

            {/* רשימת האתגרים */}
            <Grid container spacing={3} sx={{ maxWidth: "1180px" }}>
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
                    <Typography sx={{ padding: 2, color: "#ffffff" }}>אין אתגרים זמינים.</Typography>
                )}
            </Grid>
        </Box>
    );
});

export default ChallengeList;
