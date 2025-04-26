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



// import { observer } from "mobx-react-lite";
// import { Box, Typography } from "@mui/material";
// import { useState, useEffect } from "react";
// import challengeStore from "../../store/challengeStore";
// import WinningCreation from "../creation/WinningCreation";
// import { ChallengeType } from "../../models/challenge";

// const ChallengeHistory = observer(() => {    
//     const notActiveCallenges = challengeStore.getNotActiveCallenges;
//     const [selectedChallenge, setSelectedChallenge] = useState<ChallengeType>();
//     const [hoverIndex, setHoverIndex] = useState(null as number | null); 
    
//     // Set first challenge as selected by default
//     useEffect(() => {
//         if (notActiveCallenges.length > 0 && !selectedChallenge) {
//             setSelectedChallenge(notActiveCallenges[0]);
//         }
//     }, [notActiveCallenges, selectedChallenge]);

//     return (
//         <Box sx={{ 
//             padding: { xs: 2, md: 5 }, 
//             backgroundColor: "#000000", 
//             color: "#ffffff",
//             minHeight: "100vh",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             overflow: "hidden",
//             width: "100%",
//         }}>
//             {/* Center container with proper spacing */}
//             <Box sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", md: "row" },
//                 width: "100%",
//                 maxWidth: "1200px",
//                 gap: { xs: 3, md: 3 },
//                 height: { md: "calc(100vh - 100px)" },
//                 minHeight: { md: "600px" },
//                 position: "relative",
//                 padding: { xs: 0, md: 3 }
//             }}>
//                 {/* Left side - Challenge list */}
//                 <Box sx={{ 
//                     flex: { xs: "1 1 100%", md: "0 0 300px" },
//                     height: { xs: "auto", md: "100%" },
//                     maxHeight: { md: "calc(100vh - 100px)" },
//                     overflow: { xs: "visible", md: "auto" },
//                     scrollbarWidth: "thin",
//                     scrollbarColor: "rgba(100, 100, 100, 0.3) transparent",
//                     "&::-webkit-scrollbar": {
//                         width: "4px",
//                     },
//                     "&::-webkit-scrollbar-track": {
//                         background: "rgba(0, 0, 0, 0.1)",
//                     },
//                     "&::-webkit-scrollbar-thumb": {
//                         background: "rgba(100, 100, 100, 0.3)",
//                         borderRadius: "3px",
//                     }
//                 }}>
//                     {notActiveCallenges.length > 0 ? (
//                         notActiveCallenges.map((challenge, index) => (
//                             <Box 
//                                 key={challenge.id}
//                                 onClick={() => setSelectedChallenge(challenge)}
//                                 onMouseEnter={() => setHoverIndex(index)}
//                                 onMouseLeave={() => setHoverIndex(null)}
//                                 sx={{
//                                     borderRadius: "12px",
//                                     backgroundColor: selectedChallenge?.id === challenge.id 
//                                         ? "rgba(25, 25, 25, 0.9)" 
//                                         : "rgba(15, 15, 15, 0.5)",
//                                     padding: "16px 20px",
//                                     margin: "0 0 12px 0",
//                                     cursor: "pointer",
//                                     border: selectedChallenge?.id === challenge.id 
//                                         ? "1px solid rgba(80, 80, 80, 0.3)" 
//                                         : "1px solid rgba(50, 50, 50, 0.3)",
//                                     position: "relative",
//                                     transition: "all 0.2s ease",
//                                     transform: hoverIndex === index ? "translateY(-2px)" : "translateY(0)",
//                                     boxShadow: hoverIndex === index || selectedChallenge?.id === challenge.id 
//                                         ? "0 4px 12px rgba(0, 0, 0, 0.2)" 
//                                         : "none",
//                                 }}
//                             >
//                                 {/* Challenge number */}
//                                 <Box sx={{
//                                     position: "absolute",
//                                     top: "14px",
//                                     right: "14px",
//                                     fontSize: "0.75rem",
//                                     color: "rgba(150, 150, 150, 0.7)",
//                                 }}>
//                                     #{challenge.id}
//                                 </Box>
                                
//                                 {/* Title */}
//                                 <Typography sx={{ 
//                                     color: "rgba(255, 255, 255, 0.95)",
//                                     fontWeight: 500,
//                                     fontSize: "1rem",
//                                     mb: 1,
//                                     pr: 3
//                                 }}>
//                                     {challenge.title}
//                                 </Typography>
                                
//                                 {/* Info row */}
//                                 <Box sx={{ 
//                                     display: "flex", 
//                                     justifyContent: "space-between",
//                                     mt: 1
//                                 }}>
//                                     <Typography sx={{ 
//                                         color: "rgba(200, 200, 200, 0.8)",
//                                         fontSize: "0.8rem"
//                                     }}>
//                                         {challenge.countCreations} Entries
//                                     </Typography>
                                    
//                                     <Typography sx={{
//                                         fontSize: "0.8rem",
//                                         color: "rgba(200, 200, 200, 0.8)"
//                                     }}>
//                                         Completed
//                                     </Typography>
//                                 </Box>
//                             </Box>
//                         ))
//                     ) : (
//                         <Box sx={{ 
//                             padding: "30px", 
//                             textAlign: "center",
//                             backgroundColor: "rgba(15, 15, 15, 0.5)",
//                             borderRadius: "12px",
//                             border: "1px solid rgba(50, 50, 50, 0.3)"
//                         }}>
//                             <Typography sx={{ 
//                                 color: "rgba(255, 255, 255, 0.7)",
//                                 fontSize: "0.9rem"
//                             }}>
//                                 No completed challenges found
//                             </Typography>
//                         </Box>
//                     )}
//                 </Box>
                
//                 {/* Right side - Winning showcase */}
//                 <Box sx={{ 
//                     flex: { xs: "1 1 100%", md: "1 1 calc(100% - 320px)" },
//                     height: { xs: "500px", sm: "600px", md: "100%" },
//                     borderRadius: "16px",
//                     overflow: "hidden",
//                     backgroundColor: "rgba(10, 10, 10, 0.7)",
//                     border: "1px solid rgba(40, 40, 40, 0.3)",
//                     boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center"
//                 }}>
//                     {selectedChallenge ? (
//                         <WinningCreation challengeId={selectedChallenge.id} />
//                     ) : (
//                         <Box sx={{ 
//                             textAlign: "center", 
//                             padding: "40px",
//                             maxWidth: "400px"
//                         }}>
//                             <Typography sx={{ 
//                                 color: "rgba(255, 255, 255, 0.7)",
//                                 fontSize: "1.1rem",
//                                 mb: 2
//                             }}>
//                                 Select a challenge to view its winning creation
//                             </Typography>
//                         </Box>
//                     )}
//                 </Box>
//             </Box>
//         </Box>
//     );
// });

// export default ChallengeHistory;



import { observer } from "mobx-react-lite";
import { Box, Typography } from "@mui/material";
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
            width: "100%",
            height: "100vh", // Use full viewport height
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#000000", 
            color: "#ffffff",
            overflow: "hidden", // Prevent overflow at the root level
        }}>
            {/* Main container */}
            <Box sx={{
                flex: 1, // Fill available space
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                width: "100%",
                padding: { xs: 2, md: 5 },
                maxWidth: "100%", // Ensure it doesn't exceed the viewport
                gap: { xs: 3, md: 3 },
                overflow: "hidden", // Prevent overflow
            }}>
                {/* Left side - Challenge list */}
                <Box sx={{ 
                    flex: { xs: "1 1 100%", md: "0 0 300px" },
                    display: "flex",
                    flexDirection: "column",
                    height: { xs: "auto", md: "100%" },
                    overflow: "auto", // Make the list scrollable
                    paddingRight: 1,
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(100, 100, 100, 0.3) transparent",
                    "&::-webkit-scrollbar": {
                        width: "4px",
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "rgba(0, 0, 0, 0.1)",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "rgba(100, 100, 100, 0.3)",
                        borderRadius: "3px",
                    }
                }}>
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
                                        ? "rgba(25, 25, 25, 0.9)" 
                                        : "rgba(15, 15, 15, 0.5)",
                                    padding: "16px 20px",
                                    margin: "0 0 12px 0",
                                    cursor: "pointer",
                                    border: selectedChallenge?.id === challenge.id 
                                        ? "1px solid rgba(80, 80, 80, 0.3)" 
                                        : "1px solid rgba(50, 50, 50, 0.3)",
                                    position: "relative",
                                    transition: "all 0.2s ease",
                                    transform: hoverIndex === index ? "translateY(-2px)" : "translateY(0)",
                                    boxShadow: hoverIndex === index || selectedChallenge?.id === challenge.id 
                                        ? "0 4px 12px rgba(0, 0, 0, 0.2)" 
                                        : "none",
                                    flexShrink: 0, // Prevent item from shrinking
                                }}
                            >
                                {/* Challenge number */}
                                <Box sx={{
                                    position: "absolute",
                                    top: "14px",
                                    right: "14px",
                                    fontSize: "0.75rem",
                                    color: "rgba(150, 150, 150, 0.7)",
                                }}>
                                    #{challenge.id}
                                </Box>
                                
                                {/* Title */}
                                <Typography sx={{ 
                                    color: "rgba(255, 255, 255, 0.95)",
                                    fontWeight: 500,
                                    fontSize: "1rem",
                                    mb: 1,
                                    pr: 3
                                }}>
                                    {challenge.title}
                                </Typography>
                                
                                {/* Info row */}
                                <Box sx={{ 
                                    display: "flex", 
                                    justifyContent: "space-between",
                                    mt: 1
                                }}>
                                    <Typography sx={{ 
                                        color: "rgba(200, 200, 200, 0.8)",
                                        fontSize: "0.8rem"
                                    }}>
                                        {challenge.countCreations} Entries
                                    </Typography>
                                    
                                    <Typography sx={{
                                        fontSize: "0.8rem",
                                        color: "rgba(200, 200, 200, 0.8)"
                                    }}>
                                        Completed
                                    </Typography>
                                </Box>
                            </Box>
                        ))
                    ) : (
                        <Box sx={{ 
                            padding: "30px", 
                            textAlign: "center",
                            backgroundColor: "rgba(15, 15, 15, 0.5)",
                            borderRadius: "12px",
                            border: "1px solid rgba(50, 50, 50, 0.3)"
                        }}>
                            <Typography sx={{ 
                                color: "rgba(255, 255, 255, 0.7)",
                                fontSize: "0.9rem"
                            }}>
                                No completed challenges found
                            </Typography>
                        </Box>
                    )}
                </Box>
                
                {/* Right side - Winning showcase */}
                <Box sx={{ 
                    flex: { xs: "1 1 100%", md: "1 1 calc(100% - 320px)" },
                    height: { xs: "500px", sm: "600px", md: "100%" },
                    borderRadius: "16px",
                    backgroundColor: "rgba(10, 10, 10, 0.7)",
                    border: "1px solid rgba(40, 40, 40, 0.3)",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden", // Prevent content from overflowing
                    position: "relative" // Needed for absolute positioning inside
                }}>
                    {selectedChallenge ? (
                        <WinningCreation challengeId={selectedChallenge.id} />
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
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
});

export default ChallengeHistory;