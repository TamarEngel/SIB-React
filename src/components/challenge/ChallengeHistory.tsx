// import { observer } from "mobx-react-lite";
// import { Box, Typography, Grid, Paper } from "@mui/material";
// import challengeStore from "../../store/challengeStore";
// import WinningCreation from "../creation/WinningCreation";

// const ChallengeHistory = observer(() => {    
//     const notActiveCallenges = challengeStore.getNotActiveCallenges;

//     return (
//         <Box sx={{ padding: 3, backgroundColor: "#000000", color: "#ffffff" }}>
//             <Typography sx={{
//                 fontSize: "clamp(1.5625rem, 0.8152rem + 2.9891vw, 2.25rem)",
//                 fontWeight: 700,
//                 lineHeight: 1.4,
//                 fontFamily: '"Plus Jakarta Sans", Arial, Helvetica, sans-serif',
//                 marginTop: "40px",
//                 textAlign: "left",
//                 marginBottom: "20px",
//                 background: "linear-gradient(81.02deg, #f1535d -22.47%, #ffffff 30.52%, #edc106 75.8%) text",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//             }}>
//                 Challenge History
//             </Typography>
//             <Grid container spacing={3} sx={{ marginTop: 2 }}>
//                 {notActiveCallenges.length > 0 ? (
//                     notActiveCallenges.map((challenge) => (
//                         <Grid item xs={12} sm={6} md={4} key={challenge.id}>
//                             <Paper sx={{
//                                 padding: 2,
//                                 textAlign: "center",
//                                 backgroundColor: "#1e1e1e",
//                                 border: "1px solid #26272c",
//                                 borderRadius: 2,
//                             }}>
//                                 <Typography variant="h5" sx={{ color: "#ffffff" }}>
//                                     {challenge.title}
//                                 </Typography>
//                                 <Typography variant="body1" sx={{ color: "#ffffff", marginTop: 1 }}>
//                                     Participants: {challenge.countCreations}
//                                 </Typography>
                                
//                                 {/* Winning image */}
//                                 <WinningCreation challengeId={challenge.id} />
//                             </Paper>
//                         </Grid>
//                     ))
//                 ) : (
//                     <Grid item xs={12}>
//                         <Typography sx={{ padding: 2, color: "#ffffff" }}>No inactive challenges found</Typography>
//                     </Grid>
//                 )}
//             </Grid>
//         </Box>
//     );
// });

// export default ChallengeHistory;


import { observer } from "mobx-react-lite";
import { Box, Typography, Grid, Paper, Chip, Divider } from "@mui/material";
import challengeStore from "../../store/challengeStore";
import WinningCreation from "../creation/WinningCreation";

const ChallengeHistory = observer(() => {    
    const notActiveCallenges = challengeStore.getNotActiveCallenges;

    return (
        <Box sx={{ 
            padding: 3, 
            backgroundColor: "#000000", 
            color: "#ffffff",
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(32, 75, 233, 0.03) 0%, rgba(32, 75, 233, 0) 70%), radial-gradient(circle at 80% 10%, rgba(233, 32, 99, 0.03) 0%, rgba(233, 32, 99, 0) 70%)",
            minHeight: "100vh"
        }}>
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
                textShadow: "0 0 15px rgba(255, 255, 255, 0.1)"
            }}>
                Challenge History
            </Typography>
            
            <Grid container spacing={3} sx={{ marginTop: 2 }}>
                {notActiveCallenges.length > 0 ? (
                    notActiveCallenges.map((challenge) => (
                        <Grid item xs={12} sm={6} md={4} key={challenge.id}>
                            <Paper sx={{
                                padding: 0,
                                textAlign: "center",
                                backgroundColor: "rgba(30, 30, 30, 0.8)",
                                border: "1px solid rgba(38, 39, 44, 0.8)",
                                borderRadius: 2,
                                overflow: "hidden",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 15px rgba(241, 83, 93, 0.1)"
                                }
                            }}>
                                {/* כותרת האתגר */}
                                <Box sx={{
                                    padding: 2,
                                    textAlign: "left",
                                    position: "relative",
                                    zIndex: 1
                                }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <Typography variant="h5" sx={{ 
                                            color: "#ffffff", 
                                            fontWeight: 600,
                                            fontSize: "1.25rem",
                                            textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)"
                                        }}>
                                            {challenge.title}
                                        </Typography>
                                        
                                        <Chip 
                                            label="Completed" 
                                            size="small"
                                            sx={{ 
                                                backgroundColor: "rgba(241, 83, 93, 0.2)",
                                                color: "#f1535d",
                                                border: "1px solid rgba(241, 83, 93, 0.3)",
                                                fontWeight: 500,
                                                fontSize: "0.7rem"
                                            }} 
                                        />
                                    </Box>
                                    
                                    <Box sx={{ 
                                        display: "flex", 
                                        alignItems: "center", 
                                        mt: 1,
                                        justifyContent: "space-between"
                                    }}>
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                color: "rgba(255, 255, 255, 0.7)",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 0.5,
                                                fontSize: "0.85rem"
                                            }}
                                        >
                                            <Box 
                                                component="span" 
                                                sx={{ 
                                                    width: 8, 
                                                    height: 8, 
                                                    borderRadius: "50%", 
                                                    backgroundColor: "#edc106",
                                                    display: "inline-block"
                                                }} 
                                            />
                                            Participants: {challenge.countCreations}
                                        </Typography>
                                        
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                color: "rgba(255, 255, 255, 0.5)",
                                                fontSize: "0.75rem"
                                            }}
                                        >
                                            ID: #{challenge.id}
                                        </Typography>
                                    </Box>
                                </Box>
                                
                                {/* קו מפריד עם גרדיאנט */}
                                <Divider sx={{ 
                                    borderColor: "transparent",
                                    height: "2px",
                                    background: "linear-gradient(to right, rgba(241, 83, 93, 0.5), rgba(237, 193, 6, 0.5))",
                                    width: "100%",
                                    margin: 0
                                }} />
                                
                                {/* מסגרת התמונה הזוכה עם אפקטים */}
                                <Box sx={{ 
                                    flex: 1, 
                                    display: "flex", 
                                    flexDirection: "column",
                                    position: "relative",
                                    padding: "1rem",
                                    background: "rgba(0, 0, 0, 0.2)"
                                }}>
                                    {/* אפקט ניאון סביב המיכל */}
                                    <Box sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        boxShadow: "inset 0 0 15px rgba(241, 83, 93, 0.1), inset 0 0 30px rgba(237, 193, 6, 0.05)",
                                        pointerEvents: "none",
                                        zIndex: 0
                                    }} />
                                    
                                    {/* התמונה הזוכה בתוך מסגרת מעוצבת */}
                                    <Box sx={{ 
                                        position: "relative", 
                                        flex: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        zIndex: 1
                                    }}>
                                        <Typography 
                                            variant="body1" 
                                            sx={{ 
                                                textAlign: "left", 
                                                mb: 1,
                                                color: "#ffffff",
                                                fontSize: "0.9rem",
                                                fontWeight: 600,
                                                letterSpacing: "0.5px",
                                                textTransform: "uppercase"
                                            }}
                                        >
                                            Winning Creation
                                        </Typography>
                                        
                                        {/* תמונה זוכה עם אפקטים */}
                                        <Box sx={{ 
                                            flex: 1,
                                            position: "relative",
                                            borderRadius: "8px",
                                            overflow: "hidden",
                                            border: "1px solid rgba(255, 255, 255, 0.1)",
                                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                                            transition: "transform 0.3s ease",
                                            "&:hover": {
                                                transform: "scale(1.02)"
                                            }
                                        }}>
                                            <WinningCreation challengeId={challenge.id} />
                                        </Box>
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
                            backgroundColor: "rgba(30, 30, 30, 0.8)",
                            border: "1px solid rgba(38, 39, 44, 0.8)",
                            borderRadius: 2
                        }}>
                            <Typography sx={{ 
                                color: "rgba(255, 255, 255, 0.7)",
                                fontSize: "1rem"
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