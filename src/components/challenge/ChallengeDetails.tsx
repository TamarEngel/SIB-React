import { Box, Typography, Grid, Paper } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChallengeType } from "../../models/challenge";
import { CreationType } from "../../models/creation";
import challengeStore from "../../store/challengeStore";
import CreationRating from "../creation/CreationRating";
import CreationView from "../creation/CreationView";
import FileUploader from "../creation/FileUploader ";

const ChallengeDetails = observer(() => {
    const { id } = useParams();
    const [currentChallenge, setCurrentChallenge] = useState<ChallengeType | null>(null);
    const [winningCreation, setWinningCreation] = useState<CreationType | null>(null);
    const [creations, setCreations] = useState<CreationType[]>([]);

    useEffect(() => {
        const fetchChallengeData = async () => {
            if (id) {
                const currentChall = await challengeStore.fetchChallengeById(Number(id));
                setCurrentChallenge(currentChall);

                if (currentChall?.countCreations > 0) {
                    const creationsData = await challengeStore.getSortedCreationsByChallenge(Number(id));
                    setCreations(creationsData!);

                    if (currentChall?.isDeleted) {
                        const winnerCreation = await challengeStore.getWinningCreation(Number(id));
                        setWinningCreation(winnerCreation);
                    }
                }
            }
        };
        if (!currentChallenge) {
            fetchChallengeData();
        }
        document.body.style.backgroundColor = "#000000";
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, [id, currentChallenge]);

    if (!currentChallenge) {
        return <div>טוען את פרטי האתגר...</div>;
    }

    return (
        <Box sx={{ padding: 3,marginTop:"50px",marginLeft:"60px",width:"80%" }}>
            {/* כותרת מעוצבת */}
            <Typography sx={{
                fontSize: "clamp(1.5625rem, 0.8152rem + 2.9891vw, 2.25rem)",
                fontWeight: 700,
                lineHeight: 1.4,
                fontFamily: '"Plus Jakarta Sans", Arial, Helvetica, sans-serif',
                marginTop: "40px",
                textAlign: "left",
                marginBottom: "20px",
                background: "linear-gradient(81.02deg, #f1535d -22.47%, #ffffff 30.52%, #edc106 75.8%) text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
            }}>
                {currentChallenge.title}
            </Typography>

            {/* תיאור מעוצב */}
            <Typography sx={{
                fontSize: "1rem",
                fontWeight: 400,
                lineHeight: 1.4,
                marginLeft: "8px",
                fontFamily: '"Plus Jakarta Sans", Arial, Helvetica, sans-serif',
                color: "#ffffff",
                textAlign: "left"
            }}>
                {currentChallenge.description}
            </Typography>


            {currentChallenge.isDeleted && (
                <Typography variant="h6" sx={{ color: "#ffffff" }}>This Challenge s fininshed</Typography>
            )}
            {/* הצגת התמונה הזוכה אם האתגר הסתיים */}
            {/* {currentChallenge.isDeleted && winningCreation && (
                <Box sx={{ marginTop: 3, textAlign: "left" }}>
                    <Typography variant="h6" sx={{ color: "#ffffff" }}>תמונה זוכה:</Typography>
                    <CreationView fileName={winningCreation.fileName} />
                    <Typography variant="body1" sx={{ marginTop: 1, color: "#ffffff" }}>
                        {winningCreation.fileName}
                    </Typography>
                </Box>
            )} */}

            {/* הצגת התמונות שהועלו לאתגר */}
            <Typography variant="h6" sx={{
                marginLeft: "10px",
                marginTop: 3,
                textAlign: "left",
                background: "linear-gradient(81.02deg, #f1535d -20.47%, #ffffff 10.52%, #edc106 20.8%) text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
            }}>
                Your Smart Shots
            </Typography>

            <Grid container spacing={4} sx={{
                marginTop: 3,  // רווח משמעותי בין הדפים
                display: 'flex',
                justifyContent: 'center',  // למרכז את התוכן
                alignItems: 'flex-start',  // לוודא שהם מתחילים מאותה שורה
                backgroundColor: "#000000",  // רקע שחור לדף
                padding: 3
            }}>
                {creations.length > 0 ? (
                    creations.map((creation) => (
                        <Grid item xs={12} sm={6} md={4} key={creation.id}>
                            <Paper sx={{
                                margin: "20px",
                                padding: 0.5,  // הגדלה של רווח בתוך הכרטיס
                                textAlign: "center",
                                backgroundColor: "black",  // רקע כהה יותר לכרטיסים
                                border: "1px solid #26272c",
                                width: "100%",
                                borderRadius: 2  // פינות מעוגלות
                            }}>
                                <CreationView fileName={creation.fileName} />
                                <Typography variant="body2" sx={{
                                    marginTop: 0.5,  // רווח קטן יותר בין התמונה לכיתוב
                                    color: "#ffffff",
                                    fontSize: "0.875rem"  // כיתוב קטן יותר
                                }}>
                                    {creation.fileName}
                                </Typography>
                                {currentChallenge.isDeleted && (
                                    <Typography variant="h6" sx={{
                                        color: "#ffffff",
                                        fontSize: "0.9rem"  // כיתוב קטן יותר
                                    }}>
                                        count #{creation.votes}
                                    </Typography>
                                )}
                                {!currentChallenge.isDeleted && (
                                    <CreationRating creationId={creation.id!} initialVotes={creation.votes!} />
                                )}
                            </Paper>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography sx={{
                            padding: 2,
                            color: "#ffffff",
                            fontSize: "0.9rem"  // כיתוב קטן יותר כאשר אין יצירות
                        }}>
                            לאתגר זה לא נשמרו תמונות, היה הראשון להתחרות
                        </Typography>
                    </Grid>
                )}
            </Grid>
            {/* הוספת תמונה לאתגר */}
            {!currentChallenge.isDeleted && (
                <FileUploader challengeId={currentChallenge.id} setCreations={setCreations} />
            )}


        </Box>
    );
});

export default ChallengeDetails;
