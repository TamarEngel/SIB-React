// import { observer } from "mobx-react-lite";
// import { Box, Typography, Grid, Paper, Chip } from "@mui/material";
// import challengeStore from "../../store/challengeStore";
// import WinningCreation from "../creation/WinningCreation";

// const ChallengeHistory = observer(() => {    
//     const notActiveCallenges = challengeStore.getNotActiveCallenges;

//     return (
//         <Box sx={{ 
//             padding: { xs: 2, md: 4 }, 
//             backgroundColor: "#080808", 
//             color: "#ffffff",
//             minHeight: "100vh",
//             // עדין מאוד - רק רמז של גרדיאנט ברקע
//             backgroundImage: "radial-gradient(circle at 10% 10%, rgba(20, 20, 22, 0.8) 0%, rgba(8, 8, 8, 1) 70%)"
//         }}>
//             {/* כותרת ראשית עם קו נקי */}
//             <Typography sx={{
//                 fontSize: "clamp(1.5625rem, 0.8152rem + 2.9891vw, 2.25rem)",
//                 fontWeight: 600, // פחות עבה
//                 lineHeight: 1.4,
//                 fontFamily: '"Plus Jakarta Sans", Arial, Helvetica, sans-serif',
//                 marginTop: "40px",
//                 textAlign: "left",
//                 marginBottom: { xs: "24px", md: "32px" },
//                 color: "#ffffff", // צבע פשוט ונקי ללא גרדיאנט צבעוני
//                 borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
//                 paddingBottom: "16px",
//                 maxWidth: "1200px",
//                 marginLeft: "auto",
//                 marginRight: "auto"
//             }}>
//                 Challenge History
//             </Typography>
            
//             {/* רשת כרטיסים בעיצוב נקי ואלגנטי */}
//             <Grid container spacing={3} sx={{ 
//                 marginTop: 1,
//                 maxWidth: "1200px",
//                 marginLeft: "auto",
//                 marginRight: "auto"
//             }}>
//                 {notActiveCallenges.length > 0 ? (
//                     notActiveCallenges.map((challenge) => (
//                         <Grid item xs={12} sm={6} md={4} key={challenge.id}>
//                             <Paper sx={{
//                                 padding: 0,
//                                 textAlign: "center",
//                                 backgroundColor: "rgba(22, 22, 22, 0.95)",
//                                 borderRadius: "10px",
//                                 overflow: "hidden",
//                                 height: "100%",
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 transition: "all 0.25s ease",
//                                 border: "1px solid rgba(40, 40, 40, 0.8)",
//                                 boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
//                                 "&:hover": {
//                                     transform: "translateY(-4px)",
//                                     boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
//                                     borderColor: "rgba(60, 60, 60, 0.8)"
//                                 }
//                             }}>
//                                 {/* כותרת האתגר */}
//                                 <Box sx={{
//                                     padding: "18px 20px",
//                                     textAlign: "left",
//                                     position: "relative",
//                                     borderBottom: "1px solid rgba(255, 255, 255, 0.07)"
//                                 }}>
//                                     <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                                         <Typography variant="h5" sx={{ 
//                                             color: "#ffffff", 
//                                             fontWeight: 500,
//                                             fontSize: "1.1rem",
//                                             letterSpacing: "0.2px"
//                                         }}>
//                                             {challenge.title}
//                                         </Typography>
                                        
//                                         <Chip 
//                                             label="Completed" 
//                                             size="small"
//                                             sx={{ 
//                                                 backgroundColor: "transparent",
//                                                 color: "rgba(255, 255, 255, 0.7)",
//                                                 border: "1px solid rgba(255, 255, 255, 0.15)",
//                                                 fontWeight: 400,
//                                                 fontSize: "0.7rem"
//                                             }} 
//                                         />
//                                     </Box>
                                    
//                                     <Box sx={{ 
//                                         display: "flex", 
//                                         alignItems: "center", 
//                                         mt: 1,
//                                         color: "rgba(255, 255, 255, 0.5)"
//                                     }}>
//                                         <Typography 
//                                             variant="body2" 
//                                             sx={{ 
//                                                 fontSize: "0.85rem"
//                                             }}
//                                         >
//                                             Participants: {challenge.countCreations}
//                                         </Typography>
                                        
//                                         <Box sx={{ ml: "auto", fontSize: "0.75rem" }}>
//                                             #{challenge.id}
//                                         </Box>
//                                     </Box>
//                                 </Box>
                                
//                                 {/* מיכל התמונה בעיצוב נקי */}
//                                 <Box sx={{ 
//                                     flex: 1, 
//                                     display: "flex", 
//                                     flexDirection: "column", 
//                                     padding: "16px",
//                                     backgroundColor: "rgba(18, 18, 18, 0.4)"
//                                 }}>
//                                     <Typography 
//                                         variant="body2" 
//                                         sx={{ 
//                                             textAlign: "left", 
//                                             mb: 1.5,
//                                             color: "rgba(255, 255, 255, 0.7)",
//                                             fontSize: "0.85rem",
//                                             fontWeight: 500,
//                                             textTransform: "uppercase",
//                                             letterSpacing: "0.5px"
//                                         }}
//                                     >
//                                         Winning Creation
//                                     </Typography>
                                    
//                                     {/* תמונה זוכה בתוך מסגרת נקייה */}
//                                     <Box sx={{ 
//                                         flex: 1, 
//                                         borderRadius: "6px",
//                                         overflow: "hidden",
//                                         border: "1px solid rgba(255, 255, 255, 0.07)"
//                                     }}>
//                                         <WinningCreation challengeId={challenge.id} />
//                                     </Box>
//                                 </Box>
//                             </Paper>
//                         </Grid>
//                     ))
//                 ) : (
//                     <Grid item xs={12}>
//                         <Paper sx={{ 
//                             padding: 3, 
//                             textAlign: "center",
//                             backgroundColor: "rgba(22, 22, 22, 0.95)",
//                             borderRadius: "10px",
//                             border: "1px solid rgba(40, 40, 40, 0.8)"
//                         }}>
//                             <Typography sx={{ 
//                                 color: "rgba(255, 255, 255, 0.7)"
//                             }}>
//                                 No inactive challenges found
//                             </Typography>
//                         </Paper>
//                     </Grid>
//                 )}
//             </Grid>
//         </Box>
//     );
// });

// export default ChallengeHistory;



// ChallengeHistory.tsx
import { observer } from "mobx-react-lite";
import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import challengeStore from "../../store/challengeStore";
import WinningCreation from "../creation/WinningCreation";
import { ChallengeType } from "../../models/challenge";

const ChallengeHistory = observer(() => {    
    const notActiveCallenges = challengeStore.getNotActiveCallenges;
    const [selectedChallenge, setSelectedChallenge] = useState<ChallengeType>();
    const [hoverIndex, setHoverIndex] = useState(null as number | null); 
    
    // Set first challenge as selected by default
    useEffect(() => {
        if (notActiveCallenges.length > 0 && !selectedChallenge) {
            setSelectedChallenge(notActiveCallenges[0]);
        }
    }, [notActiveCallenges, selectedChallenge]);

    return (
        <Box sx={{ 
            padding: { xs: 2, md: 4 }, 
            backgroundColor: "#080808", 
            color: "#ffffff",
            minHeight: "100vh",
            backgroundImage: "radial-gradient(circle at 10% 30%, rgba(40, 40, 60, 0.4) 0%, rgba(8, 8, 8, 1) 70%)",
            overflow: "hidden"
        }}>
            {/* Enhanced header with subtle gradient animation */}
            <Typography sx={{
                fontSize: "clamp(1.75rem, 1rem + 3vw, 2.5rem)",
                fontWeight: 600,
                lineHeight: 1.2,
                fontFamily: '"Plus Jakarta Sans", Arial, sans-serif',
                marginTop: { xs: "30px", md: "40px" },
                textAlign: "center",
                marginBottom: { xs: "40px", md: "60px" },
                position: "relative",
                maxWidth: "1200px",
                marginLeft: "auto",
                marginRight: "auto",
                backgroundImage: "linear-gradient(90deg, #e2e2ff 0%, #ffffff 25%, #c9c9ff 50%, #ffffff 75%, #e2e2ff 100%)",
                backgroundSize: "200% auto",
                color: "transparent",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                animation: "shine 6s linear infinite",
                "@keyframes shine": {
                    "0%": { backgroundPosition: "0% center" },
                    "100%": { backgroundPosition: "200% center" },
                },
                "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-15px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "80px",
                    height: "3px",
                    background: "linear-gradient(90deg, rgba(140, 140, 255, 0.1), rgba(180, 180, 255, 0.6), rgba(140, 140, 255, 0.1))",
                    borderRadius: "2px"
                }
            }}>
                Challenge Collection
            </Typography>
            
            {/* Innovative split layout */}
            <Box sx={{ 
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                maxWidth: "1300px",
                margin: "0 auto",
                gap: { xs: 4, md: 0 },
                height: { md: "calc(100vh - 240px)" },
                minHeight: { md: "500px" }
            }}>
                {/* Left side - Challenge list */}
                <Box sx={{ 
                    flex: { xs: "1 1 100%", md: "0 0 320px" },
                    mr: { md: 4 },
                    position: "relative",
                    height: { xs: "auto", md: "100%" },
                    overflow: { xs: "visible", md: "auto" },
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(120, 120, 255, 0.3) transparent",
                    "&::-webkit-scrollbar": {
                        width: "5px",
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "rgba(0, 0, 0, 0.1)",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "rgba(120, 120, 255, 0.3)",
                        borderRadius: "3px",
                    }
                }}>
                    {/* Decorative element */}
                    <Box sx={{
                        position: "absolute",
                        left: { xs: "-50px", md: "-70px" },
                        top: "-40px",
                        width: "150px",
                        height: "150px",
                        background: "radial-gradient(circle, rgba(120, 120, 255, 0.08) 0%, rgba(120, 120, 255, 0) 70%)",
                        borderRadius: "50%",
                        zIndex: 0,
                        pointerEvents: "none"
                    }} />
                    
                    {notActiveCallenges.length > 0 ? (
                        notActiveCallenges.map((challenge, index) => (
                            <Box 
                                key={challenge.id}
                                onClick={() => setSelectedChallenge(challenge)}
                                onMouseEnter={() => setHoverIndex(index)}
                                onMouseLeave={() => setHoverIndex(null)}
                                sx={{
                                    borderRadius: "12px",
                                    backgroundColor: selectedChallenge?.id === challenge.id 
                                        ? "rgba(40, 40, 70, 0.9)" 
                                        : "rgba(25, 25, 35, 0.6)",
                                    padding: "16px 20px",
                                    margin: "0 0 15px 0",
                                    cursor: "pointer",
                                    border: selectedChallenge?.id === challenge.id 
                                        ? "1px solid rgba(140, 140, 255, 0.3)" 
                                        : "1px solid rgba(60, 60, 80, 0.3)",
                                    position: "relative",
                                    overflow: "hidden",
                                    transition: "all 0.3s ease",
                                    transform: hoverIndex === index ? "translateY(-3px)" : "translateY(0)",
                                    boxShadow: hoverIndex === index || selectedChallenge?.id === challenge.id 
                                        ? "0 8px 24px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(80, 80, 150, 0.12)" 
                                        : "none",
                                    "&::before": {
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "3px",
                                        height: "100%",
                                        background: selectedChallenge?.id === challenge.id 
                                            ? "linear-gradient(180deg, rgba(120, 120, 255, 0.8), rgba(160, 160, 255, 0.3))" 
                                            : "transparent",
                                        borderRadius: "3px 0 0 3px",
                                        transition: "all 0.3s ease"
                                    },
                                    "&::after": {
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: hoverIndex === index && selectedChallenge?.id !== challenge.id
                                            ? "linear-gradient(135deg, rgba(100, 100, 255, 0.05) 0%, transparent 100%)"
                                            : "transparent",
                                        zIndex: 0,
                                        pointerEvents: "none"
                                    }
                                }}
                            >
                                {/* Challenge number pill */}
                                <Box sx={{
                                    position: "absolute",
                                    top: "14px",
                                    right: "16px",
                                    backgroundColor: "rgba(30, 30, 50, 0.7)",
                                    borderRadius: "12px",
                                    padding: "2px 8px",
                                    fontSize: "0.65rem",
                                    color: "rgba(180, 180, 255, 0.9)",
                                    border: "1px solid rgba(100, 100, 255, 0.15)"
                                }}>
                                    #{challenge.id}
                                </Box>
                                
                                {/* Challenge info */}
                                <Box sx={{ position: "relative", zIndex: 1 }}>
                                    <Typography variant="h6" sx={{ 
                                        color: selectedChallenge?.id === challenge.id 
                                            ? "rgba(255, 255, 255, 1)" 
                                            : "rgba(255, 255, 255, 0.9)",
                                        fontWeight: 600,
                                        fontSize: "1rem",
                                        mb: 1,
                                        pr: 4
                                    }}>
                                        {challenge.title}
                                    </Typography>
                                    
                                    <Box sx={{ 
                                        display: "flex", 
                                        alignItems: "center", 
                                        justifyContent: "space-between"
                                    }}>
                                        <Box sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            color: "rgba(255, 255, 255, 0.7)"
                                        }}>
                                            <Box component="span" sx={{
                                                width: "6px",
                                                height: "6px",
                                                borderRadius: "50%",
                                                backgroundColor: "rgba(140, 140, 255, 0.7)",
                                                mr: 1
                                            }} />
                                            <Typography variant="body2" sx={{ 
                                                color: "rgba(255, 255, 255, 0.7)",
                                                fontSize: "0.8rem"
                                            }}>
                                                {challenge.countCreations} Entries
                                            </Typography>
                                        </Box>
                                        
                                        <Box sx={{
                                            padding: "3px 8px",
                                            backgroundColor: "rgba(20, 120, 60, 0.2)",
                                            color: "rgba(100, 255, 150, 0.9)",
                                            borderRadius: "4px",
                                            fontSize: "0.7rem",
                                            border: "1px solid rgba(100, 255, 150, 0.2)"
                                        }}>
                                            Completed
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        ))
                    ) : (
                        <Box sx={{ 
                            padding: "30px", 
                            textAlign: "center",
                            backgroundColor: "rgba(25, 25, 35, 0.6)",
                            borderRadius: "12px",
                            border: "1px solid rgba(60, 60, 80, 0.3)"
                        }}>
                            <Typography sx={{ 
                                color: "rgba(255, 255, 255, 0.7)",
                                fontSize: "1rem",
                                mb: 2
                            }}>
                                No completed challenges found
                            </Typography>
                            <Button 
                                variant="outlined" 
                                sx={{
                                    color: "rgba(140, 140, 255, 0.9)",
                                    borderColor: "rgba(140, 140, 255, 0.3)",
                                    "&:hover": {
                                        borderColor: "rgba(140, 140, 255, 0.6)",
                                        backgroundColor: "rgba(140, 140, 255, 0.05)"
                                    }
                                }}
                            >
                                View Active Challenges
                            </Button>
                        </Box>
                    )}
                </Box>
                
                {/* Right side - Winner showcase */}
                <Box sx={{ 
                    flex: { xs: "1 1 100%", md: "1 1 calc(100% - 360px)" },
                    height: { xs: "400px", sm: "500px", md: "100%" },
                    position: "relative",
                    borderRadius: "16px",
                    overflow: "hidden",
                    backgroundColor: "rgba(15, 15, 22, 0.7)",
                    border: "1px solid rgba(60, 60, 100, 0.3)",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backdropFilter: "blur(20px)"
                }}>
                    {/* Background decorative elements */}
                    <Box sx={{
                        position: "absolute",
                        right: "-100px",
                        bottom: "-80px",
                        width: "300px",
                        height: "300px",
                        background: "radial-gradient(circle, rgba(120, 120, 255, 0.06) 0%, rgba(120, 120, 255, 0) 70%)",
                        borderRadius: "50%",
                        zIndex: 0,
                        pointerEvents: "none"
                    }} />
                    
                    <Box sx={{
                        position: "absolute",
                        left: "15%",
                        top: "10%",
                        width: "200px",
                        height: "200px",
                        background: "radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 70%)",
                        borderRadius: "50%",
                        zIndex: 0,
                        pointerEvents: "none"
                    }} />
                    
                    {/* Trophy icon decorative element */}
                    {selectedChallenge && (
                        <Box sx={{
                            position: "absolute",
                            top: "20px",
                            left: "20px",
                            zIndex: 2,
                            backgroundColor: "rgba(20, 20, 40, 0.7)",
                            backdropFilter: "blur(4px)",
                            padding: "12px 18px",
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                            border: "1px solid rgba(140, 140, 255, 0.2)"
                        }}>
                            <Typography 
                                component="span" 
                                role="img" 
                                aria-label="trophy" 
                                sx={{ fontSize: "1.2rem", color: "rgba(255, 215, 0, 0.9)" }}
                            >
                                🏆
                            </Typography>
                            <Typography sx={{ 
                                color: "#fff", 
                                fontWeight: 500,
                                fontSize: "0.9rem"
                            }}>
                                Winning Creation
                            </Typography>
                        </Box>
                    )}
                    
                    {/* Main content */}
                    {selectedChallenge ? (
                        <Box sx={{ 
                            width: "100%", 
                            height: "100%", 
                            position: "relative",
                            zIndex: 1
                        }}>
                            <WinningCreation challengeId={selectedChallenge.id} />
                        </Box>
                    ) : (
                        <Box sx={{ 
                            textAlign: "center", 
                            padding: "40px",
                            maxWidth: "400px"
                        }}>
                            <Typography sx={{ 
                                color: "rgba(255, 255, 255, 0.7)",
                                fontSize: "1.1rem",
                                mb: 2
                            }}>
                                Select a challenge to view its winning creation
                            </Typography>
                            <Typography sx={{ 
                                color: "rgba(255, 255, 255, 0.5)",
                                fontSize: "0.9rem"
                            }}>
                                Each challenge showcases the creative work that received the most votes
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
});

export default ChallengeHistory;

