import { observer } from "mobx-react-lite";
import { Box, Typography, Grid, Paper, Chip, Divider } from "@mui/material";
import challengeStore from "../../store/challengeStore";
import WinningCreation from "../creation/WinningCreation";

const ChallengeHistory = observer(() => {    
    const notActiveCallenges = challengeStore.getNotActiveCallenges;

    return (
        <Box sx={{ 
            padding: { xs: 2, md: 4 }, 
            backgroundColor: "#080808", 
            color: "#ffffff",
            minHeight: "100vh",
            // עדין מאוד - רק רמז של גרדיאנט ברקע
            backgroundImage: "radial-gradient(circle at 10% 10%, rgba(20, 20, 22, 0.8) 0%, rgba(8, 8, 8, 1) 70%)"
        }}>
            {/* כותרת ראשית עם קו נקי */}
            <Typography sx={{
                fontSize: "clamp(1.5625rem, 0.8152rem + 2.9891vw, 2.25rem)",
                fontWeight: 600, // פחות עבה
                lineHeight: 1.4,
                fontFamily: '"Plus Jakarta Sans", Arial, Helvetica, sans-serif',
                marginTop: "40px",
                textAlign: "left",
                marginBottom: { xs: "24px", md: "32px" },
                color: "#ffffff", // צבע פשוט ונקי ללא גרדיאנט צבעוני
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                paddingBottom: "16px",
                maxWidth: "1200px",
                marginLeft: "auto",
                marginRight: "auto"
            }}>
                Challenge History
            </Typography>
            
            {/* רשת כרטיסים בעיצוב נקי ואלגנטי */}
            <Grid container spacing={3} sx={{ 
                marginTop: 1,
                maxWidth: "1200px",
                marginLeft: "auto",
                marginRight: "auto"
            }}>
                {notActiveCallenges.length > 0 ? (
                    notActiveCallenges.map((challenge) => (
                        <Grid item xs={12} sm={6} md={4} key={challenge.id}>
                            <Paper sx={{
                                padding: 0,
                                textAlign: "center",
                                backgroundColor: "rgba(22, 22, 22, 0.95)",
                                borderRadius: "10px",
                                overflow: "hidden",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                transition: "all 0.25s ease",
                                border: "1px solid rgba(40, 40, 40, 0.8)",
                                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
                                    borderColor: "rgba(60, 60, 60, 0.8)"
                                }
                            }}>
                                {/* כותרת האתגר */}
                                <Box sx={{
                                    padding: "18px 20px",
                                    textAlign: "left",
                                    position: "relative",
                                    borderBottom: "1px solid rgba(255, 255, 255, 0.07)"
                                }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <Typography variant="h5" sx={{ 
                                            color: "#ffffff", 
                                            fontWeight: 500,
                                            fontSize: "1.1rem",
                                            letterSpacing: "0.2px"
                                        }}>
                                            {challenge.title}
                                        </Typography>
                                        
                                        <Chip 
                                            label="Completed" 
                                            size="small"
                                            sx={{ 
                                                backgroundColor: "transparent",
                                                color: "rgba(255, 255, 255, 0.7)",
                                                border: "1px solid rgba(255, 255, 255, 0.15)",
                                                fontWeight: 400,
                                                fontSize: "0.7rem"
                                            }} 
                                        />
                                    </Box>
                                    
                                    <Box sx={{ 
                                        display: "flex", 
                                        alignItems: "center", 
                                        mt: 1,
                                        color: "rgba(255, 255, 255, 0.5)"
                                    }}>
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                fontSize: "0.85rem"
                                            }}
                                        >
                                            Participants: {challenge.countCreations}
                                        </Typography>
                                        
                                        <Box sx={{ ml: "auto", fontSize: "0.75rem" }}>
                                            #{challenge.id}
                                        </Box>
                                    </Box>
                                </Box>
                                
                                {/* מיכל התמונה בעיצוב נקי */}
                                <Box sx={{ 
                                    flex: 1, 
                                    display: "flex", 
                                    flexDirection: "column", 
                                    padding: "16px",
                                    backgroundColor: "rgba(18, 18, 18, 0.4)"
                                }}>
                                    <Typography 
                                        variant="body2" 
                                        sx={{ 
                                            textAlign: "left", 
                                            mb: 1.5,
                                            color: "rgba(255, 255, 255, 0.7)",
                                            fontSize: "0.85rem",
                                            fontWeight: 500,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px"
                                        }}
                                    >
                                        Winning Creation
                                    </Typography>
                                    
                                    {/* תמונה זוכה בתוך מסגרת נקייה */}
                                    <Box sx={{ 
                                        flex: 1, 
                                        borderRadius: "6px",
                                        overflow: "hidden",
                                        border: "1px solid rgba(255, 255, 255, 0.07)"
                                    }}>
                                        <WinningCreation challengeId={challenge.id} />
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Paper sx={{ 
                            padding: 3, 
                            textAlign: "center",
                            backgroundColor: "rgba(22, 22, 22, 0.95)",
                            borderRadius: "10px",
                            border: "1px solid rgba(40, 40, 40, 0.8)"
                        }}>
                            <Typography sx={{ 
                                color: "rgba(255, 255, 255, 0.7)"
                            }}>
                                No inactive challenges found
                            </Typography>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
});

export default ChallengeHistory;